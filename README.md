# PhishAware — Phishing Awareness and Detection Application

**Course:** 351 CP 81 — Comprehension 1  
**Project:** Phishing Awareness and Detection Application  
**Review deadline:** 9 November 2026

PhishAware is a three-page student portfolio and a small, explainable email-text checker. It teaches readers to question unexpected requests, demonstrates common signals with a fictional message, and lets a user analyse sample text locally in their browser.

## Portfolio pages

- `index.html` — awareness lesson: how phishing works, six common signals, annotated practice message, response steps, and a knowledge check.
- `project.html` — interactive rule-based email-text checker and quick checklist.
- `review.html` — project scope, methodology, limitations, and lecturer review information.

## Run locally

Open `index.html` in a modern browser. No build step, server, or third-party runtime is required. The checker does not transmit or store the entered text.

## Repository and GitHub Pages

The intended repository URL is <https://github.com/jolechaula/phishing-awareness-detection>. The portfolio links use this address. Create that repository under the `jolechaula` GitHub account and push these project files to its `main` branch. Add the lecturer as a collaborator at `stanslausphillimon@gmail.com`.

The repository includes a GitHub Actions workflow for Pages. In repository **Settings → Pages**, set the build and deployment source to **GitHub Actions**. The workflow publishes the site whenever changes are pushed to `main`; GitHub Pages will show the public URL after deployment completes.

## Project materials

- `app.js`, `style.css`, and the three HTML pages are the source code.
- `data/training-examples.json` contains fictional, clearly labelled training examples. It is illustrative teaching data, not collected email data or a machine-learning training set.
- `docs/METHODOLOGY.md` explains the checks and limitations.

## Privacy and scope

The checker analyses text only in the browser tab. Do not paste real confidential email content into a public demonstration. It does not inspect full mail headers, authenticate senders, expand links, scan attachments, or contact a threat-intelligence service. Pattern matching can flag benign text or miss a real phishing message. A low signal count is not proof an email is safe.
