# Phishing URL Detector

A lightweight web-based tool that analyzes URLs and identifies potential phishing attempts using heuristic detection techniques.

This project demonstrates how suspicious patterns in URLs can be analyzed to detect phishing indicators such as domain impersonation, suspicious top-level domains, excessive subdomains, and other common attack patterns.

---

## Features

* Analyze URLs for potential phishing indicators
* Detect suspicious domain patterns
* Identify raw IP-based URLs
* Flag suspicious top-level domains (TLDs)
* Detect excessive subdomains and long URLs
* Highlight suspicious keywords commonly used in phishing attacks
* Display a risk score and explanation for the detection

---

## How It Works

The application uses a simple client–server architecture:

1. The user enters a URL in the web interface.
2. The frontend sends the URL to the backend using a POST request.
3. The Flask backend processes the request.
4. The URL is analyzed using heuristic rules in the detection engine.
5. The backend returns the result as JSON.
6. The frontend displays the analysis result, risk score, and detected indicators.

Detection rules currently check for patterns such as:

* Suspicious top-level domains (e.g., `.ru`, `.tk`, `.ml`)
* URLs containing IP addresses instead of domain names
* Brand impersonation attempts
* Excessive subdomains
* Long or heavily encoded URLs
* Presence of phishing-related keywords (login, verify, secure, account, etc.)
* Use of unencrypted HTTP connections

---

## Project Structure

```
phishing-url-detector
│
├── static
│   ├── script.js
│   └── styles.css
│
├── templates
│   └── index.html
│
├── venv
├── app.py
├── detector.py
└── requirements.txt
```

* **app.py** – Flask server handling requests
* **detector.py** – URL analysis and phishing detection logic
* **templates/** – HTML frontend
* **static/** – JavaScript and styling files

---

## Installation

Clone the repository:

```
git clone https://github.com/yourusername/phishing-url-detector.git
cd phishing-url-detector
```

Create a virtual environment:

```
python3 -m venv venv
```

Activate the environment:

**Linux / macOS**

```
source venv/bin/activate
```

**Windows**

```
venv\Scripts\activate
```

Install dependencies:

```
pip install -r requirements.txt
```

---

## Running the Application

Start the Flask server:

```
python app.py
```

Open your browser and visit:

```
http://127.0.0.1:5000
```

Enter a URL and click **Check URL** to analyze it.

---

## Example Test URLs

You can test the detector using example patterns such as:

```
http://paypal-login-security.ru
http://192.168.1.1/login
http://paypal.com@malicious-site.ru
http://secure-login-account-update.tk
```

---

## Disclaimer

This tool uses heuristic analysis and is intended for educational and demonstration purposes only.
It does not replace professional phishing detection systems or security tools.

---

## Future Improvements

Possible enhancements include:

* Integration with threat intelligence APIs (e.g., VirusTotal)
* Machine learning-based phishing detection
* Browser extension for real-time URL analysis
* Domain reputation checks
* Real-time blacklist lookups

---

## License

This project is open-source and available for educational use.
