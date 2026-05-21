# Scan and Save (iPhone web app)

A single HTML page that:

1. Uses your iPhone camera to scan a **UPC / EAN** barcode  
2. Looks up the product name via **Open Food Facts** (free, no API key)  
3. Lets you **copy** the name (and edit it first if you want)  
4. Opens **Flipp search** so you can paste and compare prices  

## Why HTTPS matters

Safari only allows camera access on **secure pages** (`https://` or `localhost`).  
Opening `index.html` from Files will **not** enable the camera.

## Quick test on your iPhone (same Wi‑Fi)

On your computer, in this folder:

```bash
cd /home/mo/Desktop/Project1/upc-to-flipp
python3 -m http.server 8080
```

Find your computer’s local IP (e.g. `192.168.1.10`), then on the iPhone open:

`http://YOUR_COMPUTER_IP:8080`

> **Note:** Plain `http://` on a LAN IP may still block the camera on iOS. For a reliable test, use one of the HTTPS options below.

### HTTPS with a tunnel (recommended)

Install [ngrok](https://ngrok.com/) or use [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/), point it at port 8080, and open the `https://` URL on your phone.

## Add to iPhone Home Screen (recommended)

1. Run `python3 serve-https.py` and open the **HTTPS** URL on your iPhone in **Safari**.  
2. Tap **Share** → **Add to Home Screen** → **Add**.  
3. Launch **Scan and Save** from your home screen like a normal app.

Safari cannot add itself to the home screen automatically — the in-app **Add to Home Screen — how to** button shows these steps.

After the first visit, a small **service worker** (`sw.js`) caches the page so the home-screen icon still opens when your computer is off (barcode lookup still needs internet).

### Download HTML backup

The **Download HTML backup** button saves a copy of `index.html`. On iPhone, opening that file from **Files** will **not** enable the camera — iOS requires HTTPS. Use the home-screen shortcut for real use.

## Using Flipp

iOS does **not** let one website paste into another app’s search box automatically. This app:

- **Copies** the product name to your clipboard  
- **Opens** `https://flipp.com/search?q=...` (query may or may not pre-fill)  
- You **long-press** in Flipp’s search field → **Paste** if needed  

Tip: Shorten long names (e.g. `2% milk 2L` instead of the full label) for better Flipp results.

## Limits

- **Open Food Facts** covers many packaged foods, not everything in Canadian stores.  
- If lookup fails, the barcode number is still copied so you can search manually.  
- Works best on **packaged** items with a standard UPC, not produce sold by weight.

## Host on GitHub Pages (step by step)

GitHub gives you a free **https://** address. The iPhone camera works from that link.

### Part 1 — Create the repository on GitHub

1. Sign in at [github.com](https://github.com).
2. Click the **+** (top right) → **New repository**.
3. **Repository name:** `scan-and-save` (or any name you like).
4. Choose **Public**.
5. Leave “Add a README” **unchecked** (you already have files on your computer).
6. Click **Create repository**.
7. Keep that page open — you will need the URL it shows, e.g.  
   `https://github.com/YOUR_USERNAME/scan-and-save.git`

### Part 2 — Upload from your computer

Open a terminal and run these commands **one block at a time**.  
Replace `YOUR_USERNAME` and `scan-and-save` with your real GitHub username and repo name.

```bash
cd /home/mo/Desktop/Project1/upc-to-flipp

git init
git add index.html manifest.webmanifest sw.js README.md .gitignore .nojekyll
git commit -m "Scan and Save web app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/scan-and-save.git
git push -u origin main
```

**First time using git?** GitHub may ask you to log in in the browser or use a **Personal Access Token** instead of a password.  
See: [GitHub — adding an existing project](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-an-existing-project-to-github-using-the-command-line).

### Part 3 — Turn on GitHub Pages

1. On GitHub, open your **scan-and-save** repository.
2. Click **Settings** → **Pages** (left sidebar).
3. Under **Build and deployment** → **Source**, choose **Deploy from a branch**.
4. **Branch:** `main` — **Folder:** `/ (root)` → click **Save**.
5. Wait 1–2 minutes. Refresh the Pages section. You will see a green link, e.g.  
   **`https://YOUR_USERNAME.github.io/scan-and-save/`**

That link is your app. Open it on your computer to confirm it loads.

### Part 4 — iPhone home screen

1. On iPhone, open that **https://** link in **Safari** (not Chrome).
2. Delete any old broken home-screen icon for this app.
3. **Share** → **Add to Home Screen** → **Scan and Save** → **Add**.

You can use the app anywhere you have internet; your computer does not need to be on.

### Updating the app later

After you change files on your computer:

```bash
cd /home/mo/Desktop/Project1/upc-to-flipp
git add -A
git commit -m "Describe your change"
git push
```

Wait a minute, then reload the page on your phone (close Safari tab and open the link again).

## Files

- `index.html` — the entire app (no build step)
- `manifest.webmanifest`, `sw.js` — home screen / offline cache (include these on GitHub)
- `serve-https.py` — optional, local HTTPS testing only (not required on GitHub)
# scan-and-save
