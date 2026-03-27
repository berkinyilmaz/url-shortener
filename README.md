# URL Shortener

Minimal web app to **turn long links into clean, short URLs**.
No signup.
No config.
Just paste and shorten.

---

## Live Demo

https://url-shortener-lyart-sigma.vercel.app/

---

## Features

- **Instant URL shortening** via TinyURL API
- **One-click copy** – copy short link to clipboard
- **URL validation** – auto-adds `https://` if missing, rejects invalid URLs
- **Smart length check** – warns if your URL is already short enough
- **Keyboard friendly** – press Enter to shorten
- **Clear button** – quickly reset the input field
- Clean, responsive, Apple-inspired dark UI
- No authentication
- No ads
- No watermarks

---

## Tech Stack

- React (Vite)
- Vanilla CSS (Apple-inspired UI)
- TinyURL API (URL shortening)
- Vercel (static deploy)

---

## How It Works

1. **Paste your URL** into the input field
2. **Click Shorten** (or press Enter)
3. **Copy the short link** with one click
4. **Share it** anywhere

---

## Privacy

No data is stored by this app.
Short links are processed by [TinyURL](https://tinyurl.com).

---

## Installation

```bash
# Clone the repo
git clone <YOUR_REPO_URL>

# Install dependencies
cd url-shortener
npm install

# Run locally
npm run dev
```
