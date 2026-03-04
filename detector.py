#checks if url is malicious
from urllib.parse import urlparse
import re

suspicious_tlds = ["ru", "tk", "ml", "ga", "cf"]

def analyze_url(url):

    reasons = []

    parsed = urlparse(url)
    domain = parsed.netloc

    # check IP address in URL
    if re.match(r"\d+\.\d+\.\d+\.\d+", domain):
        reasons.append("URL uses IP address instead of domain")

    # check hyphen abuse
    if domain.count("-") > 2:
        reasons.append("Too many hyphens in domain")

    # suspicious TLD
    tld = domain.split(".")[-1]
    if tld in suspicious_tlds:
        reasons.append("Suspicious top level domain")

    # long url
    if len(url) > 75:
        reasons.append("URL length unusually long")

    # multiple subdomains
    if domain.count(".") > 3:
        reasons.append("Too many subdomains")

    if reasons:
        return "Suspicious", reasons
    else:
        return "Likely Safe", []