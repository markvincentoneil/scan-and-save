# Scan and Save v2

This folder is the **experimental v2** build. The original app in the parent folder is unchanged.

## What’s new in v2

- API lookup cache on this device (faster repeat scans of the same barcode)
- Open Facts, Open Products Facts, and optional upc.dev (enable in Settings)
- Settings: auto-start camera, auto-scan, primary flyer button
- Barcode format variants (UPC/EAN)
- Label photo OCR when databases miss
- Raddar.ca search button
- App version + update refresh hint

## Run locally

```bash
cd v2
python serve-https.py
```

Open `https://YOUR-PC-IP:8443/` on your iPhone (same Wi‑Fi).

## Host

Upload the **contents of this `v2` folder** to a path like `https://yoursite.com/scan-and-save/v2/` or use a separate repo branch. Update `start_url` in `manifest.webmanifest` if needed.

## Version

**2.0.0** — see footer in the app.
