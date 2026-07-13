#!/usr/bin/env python3
"""Fetch Google Scholar author metrics from SerpAPI for the static site."""

from __future__ import annotations

import argparse
import json
import os
import tempfile
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import requests


SERPAPI_ENDPOINT = "https://serpapi.com/search.json"
DEFAULT_AUTHOR_ID = "mczdUnAAAAAJ"
REPOSITORY_ROOT = Path(__file__).resolve().parent.parent


def extract_metrics(payload: dict[str, Any]) -> dict[str, int]:
    """Extract all-time citation metrics without relying on table ordering."""
    table = payload.get("cited_by", {}).get("table")
    if not isinstance(table, list):
        raise ValueError("SerpAPI response does not contain a cited_by table")

    field_map = {
        "citations": "citations_all",
        "h_index": "h_index_all",
        "i10_index": "i10_index_all",
    }
    metrics: dict[str, int] = {}

    for row in table:
        if not isinstance(row, dict):
            continue
        for source_key, output_key in field_map.items():
            value = row.get(source_key)
            if isinstance(value, dict) and isinstance(value.get("all"), int):
                metrics[output_key] = value["all"]

    missing = set(field_map.values()) - set(metrics)
    if missing:
        raise ValueError(f"SerpAPI response is missing metrics: {', '.join(sorted(missing))}")

    return metrics


def fetch_scholar_data(
    api_key: str,
    author_id: str = DEFAULT_AUTHOR_ID,
    session: Any = requests,
) -> dict[str, Any]:
    """Fetch and validate one author profile from SerpAPI."""
    response = session.get(
        SERPAPI_ENDPOINT,
        params={
            "engine": "google_scholar_author",
            "author_id": author_id,
            "api_key": api_key,
            "hl": "en",
        },
        timeout=(5, 20),
    )

    if response.status_code != 200:
        raise RuntimeError(f"SerpAPI request failed with HTTP {response.status_code}")

    payload = response.json()
    if payload.get("error"):
        raise RuntimeError(f"SerpAPI returned an error: {str(payload['error'])[:200]}")

    metrics = extract_metrics(payload)
    return {
        "name": payload.get("author", {}).get("name", "Wangbing Li"),
        **metrics,
        "last_updated": datetime.now(timezone.utc).isoformat(),
        "profile_url": f"https://scholar.google.com/citations?user={author_id}",
        "source": "SerpAPI / Google Scholar",
    }


def write_json_atomic(data: dict[str, Any], output_path: Path) -> None:
    """Write a complete JSON snapshot without exposing a partial file."""
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(
        "w",
        encoding="utf-8",
        dir=output_path.parent,
        delete=False,
        suffix=".tmp",
    ) as temp_file:
        json.dump(data, temp_file, ensure_ascii=False, indent=2)
        temp_file.write("\n")
        temp_path = Path(temp_file.name)
    temp_path.replace(output_path)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--output",
        type=Path,
        default=REPOSITORY_ROOT / "scholar_data.json",
        help="Path to the generated frontend JSON file",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    api_key = os.environ.get("SERPAPI_KEY", "").strip()
    if not api_key:
        raise SystemExit("SERPAPI_KEY is required; configure it as a GitHub Actions secret")

    data = fetch_scholar_data(api_key)
    write_json_atomic(data, args.output)
    print(f"Scholar data written to {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
