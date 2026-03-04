const glowWrap = document.getElementById('glowWrap');
    const urlInput = document.getElementById('urlInput');
    const checkBtn = document.getElementById('checkBtn');

    /* Focus / blur → toggle glow class */
    urlInput.addEventListener('focus', () => glowWrap.classList.add('focused'));
    urlInput.addEventListener('blur', () => glowWrap.classList.remove('focused'));
    urlInput.addEventListener('keydown', e => { if (e.key === 'Enter') checkURL(); });
    checkBtn.addEventListener('click', checkURL);

    async function checkURL() {

      const raw = urlInput.value.trim();

      if (!raw) {
        urlInput.focus();
        shake(glowWrap);
        return;
      }

      checkBtn.disabled = true;
      showLoader();

      try {

        const response = await fetch("/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ url: raw })
        });

        const data = await response.json();

        const result = {
          safe: data.result === "Likely Safe",
          score: data.result === "Likely Safe" ? 10 : 70,
          reasons: data.reasons.map(r => ({
            text: r,
            severity: "high"
          }))
        };

        showResult(raw, result);

      } catch (error) {

        document.getElementById("result").innerHTML =
          "<div class='loader'>Backend connection error</div>";

      }

      checkBtn.disabled = false;
    }

    function shake(el) {
      el.animate([
        { transform: 'translateX(0)' },
        { transform: 'translateX(-5px)' },
        { transform: 'translateX(5px)' },
        { transform: 'translateX(-4px)' },
        { transform: 'translateX(4px)' },
        { transform: 'translateX(0)' },
      ], { duration: 320, easing: 'ease-out' });
    }

    function showLoader() {
      const el = document.getElementById('result');
      el.style.animation = 'none'; el.offsetHeight;
      el.innerHTML = `<div class="loader"><div class="spinner"></div>Analyzing URL…</div>`;
    }

    function showResult(url, { safe, score, reasons }) {
      const el = document.getElementById('result');
      const cls = safe ? 'safe' : 'warn';
      const ico = safe
        ? `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 9l3.5 3.5L14 5.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 6v4M9 12.5v.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M7.27 3.2L1.93 12.9A2 2 0 003.66 16h10.68a2 2 0 001.73-3.1L10.73 3.2a2 2 0 00-3.46 0z" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linejoin="round"/></svg>`;

      const rHTML = reasons.map((r, i) => `
      <li class="reason-item" style="animation-delay:${.04 + i * .07}s">
        <span class="reason-dot ${r.severity === 'safe' ? 'safe' : 'warn'}"></span>
        <span>${r.text}</span>
      </li>`).join('');

      el.innerHTML = `
      <div class="result-card">
        <div class="result-header">
          <div class="result-icon ${cls}">${ico}</div>
          <div>
            <div class="result-label ${cls}">${safe ? 'Likely Safe' : 'Suspicious'}</div>
            <div class="result-verdict">${safe ? 'No threats detected' : 'Potential phishing risk'}</div>
          </div>
        </div>
        <div class="result-url">${esc(url)}</div>
        <div class="result-sep"></div>
        <div class="score-section">
          <div class="score-meta"><span>${safe ? 'Risk' : 'Threat'} Score</span><span>${score}%</span></div>
          <div class="score-track"><div class="score-fill ${cls}" id="scoreBar" style="width:0%"></div></div>
        </div>
        <div class="result-sep"></div>
        <div class="reasons-section">
          <div class="reasons-title">Analysis Details</div>
          <ul class="reasons-list">${rHTML}</ul>
        </div>
      </div>`;

      requestAnimationFrame(() => requestAnimationFrame(() => {
        const b = document.getElementById('scoreBar');
        if (b) b.style.width = score + '%';
      }));

      el.style.animation = 'none'; el.offsetHeight;
      el.style.animation = 'fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both';
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 120);
    }

    function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }