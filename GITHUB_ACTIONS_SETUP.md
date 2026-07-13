# GitHub Pages daily refresh setup

The site uses `.github/workflows/deploy-pages.yml` as its single update and
deployment pipeline.

## What the workflow does

- Runs after every push to `main`.
- Runs daily at 09:17 Asia/Shanghai (01:17 UTC).
- Fetches Google Scholar author metrics from SerpAPI.
- Tests the updater before publishing.
- Writes `scholar_data.json` and commits the daily snapshot on scheduled runs.
- Publishes the static site with GitHub's official Pages artifact actions.

The daily snapshot commit is intentional: GitHub can disable schedules in a
public repository after 60 days without repository activity.

## Required secret

1. Rotate any SerpAPI key that has previously appeared in source control.
2. Open the repository's **Settings → Secrets and variables → Actions**.
3. Create or replace the repository secret named `SERPAPI_KEY`.
4. Never put the secret value in Python, Markdown, HTML, JSON, or workflow logs.

## Required Pages setting

Open **Settings → Pages → Build and deployment** and set **Source** to
**GitHub Actions**. The workflow uses `actions/configure-pages`,
`actions/upload-pages-artifact`, and `actions/deploy-pages`.

## Manual verification

Run **Actions → Refresh data and deploy GitHub Pages → Run workflow**. Confirm:

- all four updater tests pass;
- the Scholar refresh step succeeds;
- the `github-pages` deployment succeeds;
- `scholar_data.json` on the deployed site has today's timestamp.

## Visitor map

Visitor locations are collected by the embedded visitor-map provider in real
time. GitHub Actions does not update this data. The provider widget must be
registered for the deployed site URL and its unique embed code must be placed
in `index.html`.
