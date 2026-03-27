import { useState } from "react";

export default function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function isValidUrl(string) {
    try {
      const url = new URL(string);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }

  async function shortenUrl() {
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    let finalUrl = url.trim();
    if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
      finalUrl = "https://" + finalUrl;
    }

    if (!isValidUrl(finalUrl)) {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setError("");
    setShortUrl("");
    setCopied(false);

    try {
      const response = await fetch(
        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(finalUrl)}`
      );

      if (!response.ok) {
        setError("Failed to shorten URL. Please try again.");
        return;
      }

      const short = await response.text();

      if (short.startsWith("https://tinyurl.com/")) {
        if (short.length >= finalUrl.length) {
          setError("Your URL is already short enough!");
        } else {
          setShortUrl(short);
        }
      } else {
        setError("Failed to shorten URL. Please try again.");
      }
    } catch (err) {
      console.error("Shortening failed:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copyToClipboard() {
    if (!shortUrl) return;

    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      shortenUrl();
    }
  }

  function reset() {
    setUrl("");
    setShortUrl("");
    setError("");
    setCopied(false);
  }

  return (
    <div className="page">
      <div className="shell">
        <main className="card">
          <header className="header">
            <h1 className="title">URL Shortener</h1>
            <p className="subtitle">Turn long links into clean, short URLs.</p>
          </header>

          <div className="inputGroup">
            <label className="label" htmlFor="url-input">
              Paste your URL
            </label>
            <div className="inputWrapper">
              <input
                id="url-input"
                type="url"
                className="input"
                placeholder="https://example.com/very-long-url..."
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError("");
                }}
                onKeyDown={handleKeyDown}
                aria-label="Enter URL to shorten"
              />
              {url && (
                <button
                  className="clearBtn"
                  onClick={() => {
                    setUrl("");
                    setError("");
                  }}
                  aria-label="Clear input"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
            {error && <p className="errorText">{error}</p>}
          </div>

          <button
            className="btnPrimary"
            onClick={shortenUrl}
            disabled={loading || !url.trim()}
            aria-label="Shorten URL"
          >
            {loading ? (
              <span className="loadingDots">
                <span></span>
                <span></span>
                <span></span>
              </span>
            ) : (
              "Shorten"
            )}
          </button>

          {shortUrl && (
            <div className="result">
              <div className="resultHeader">
                <span className="resultLabel">Your short link</span>
                <button
                  className="newBtn"
                  onClick={reset}
                  aria-label="Create new short link"
                >
                  + New
                </button>
              </div>
              <div className="resultBox">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="shortLink"
                >
                  {shortUrl}
                </a>
                <button
                  className="copyBtn"
                  onClick={copyToClipboard}
                  aria-label="Copy short URL"
                >
                  {copied ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}
        </main>

        <footer className="credit">
          <a
            className="creditLink"
            href="https://instagram.com/berkindev"
            target="_blank"
            rel="noreferrer"
          >
            Coded by @berkindev
          </a>
        </footer>
      </div>
    </div>
  );
}
