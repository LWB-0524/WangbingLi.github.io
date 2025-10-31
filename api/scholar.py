#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Google Scholar Citation Data Fetcher
Fetch Google Scholar citation data using SerpAPI and cache it
"""

import json
import os
import time
from datetime import datetime, timedelta
import requests

# Configuration
SERPAPI_KEY = os.environ.get("SERPAPI_KEY", "7eacbeb37f14223a652afdd95b65827a6086c73b33b6a6b26b1f36c3c244b831")
AUTHOR_ID = "mczdUnAAAAAJ"
CACHE_FILE = os.path.join(os.path.dirname(__file__), "scholar_cache.json")
CACHE_DURATION = 24  # Cache for 24 hours

def fetch_scholar_data():
    """Fetch Google Scholar data from SerpAPI"""
    url = "https://serpapi.com/search"
    params = {
        "engine": "google_scholar_author",
        "author_id": AUTHOR_ID,
        "api_key": SERPAPI_KEY,
        "hl": "en"
    }
    
    try:
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        # Extract key data
        author_info = data.get("author", {})
        cited_by = data.get("cited_by", {})
        table = cited_by.get("table", [])
        
        # Extract citations (first element)
        citations_all = 0
        if len(table) > 0 and "citations" in table[0]:
            citations_all = table[0]["citations"].get("all", 0)
        
        # Extract h-index (second element)
        h_index_all = 0
        if len(table) > 1 and "h_index" in table[1]:
            h_index_all = table[1]["h_index"].get("all", 0)
        
        # Extract i10-index (third element)
        i10_index_all = 0
        if len(table) > 2 and "i10_index" in table[2]:
            i10_index_all = table[2]["i10_index"].get("all", 0)
        
        scholar_data = {
            "name": author_info.get("name", ""),
            "citations_all": citations_all,
            "h_index_all": h_index_all,
            "i10_index_all": i10_index_all,
            "last_updated": datetime.now().isoformat(),
            "profile_url": f"https://scholar.google.com/citations?user={AUTHOR_ID}"
        }
        
        return scholar_data
    except Exception as e:
        print(f"Error fetching scholar data: {e}")
        return None

def load_cache():
    """Load cached data"""
    if not os.path.exists(CACHE_FILE):
        return None
    
    try:
        with open(CACHE_FILE, 'r', encoding='utf-8') as f:
            cache = json.load(f)
            
        # Check if cache is expired
        last_updated = datetime.fromisoformat(cache.get("last_updated", ""))
        if datetime.now() - last_updated < timedelta(hours=CACHE_DURATION):
            return cache
        else:
            return None
    except Exception as e:
        print(f"Error loading cache: {e}")
        return None

def save_cache(data):
    """Save data to cache"""
    try:
        with open(CACHE_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        return True
    except Exception as e:
        print(f"Error saving cache: {e}")
        return False

def get_scholar_data():
    """Get Scholar data (prioritize cache)"""
    # Try to load from cache first
    cached_data = load_cache()
    if cached_data:
        print("Using cached data")
        return cached_data
    
    # Cache doesn't exist or expired, fetch from API
    print("Fetching fresh data from SerpAPI")
    fresh_data = fetch_scholar_data()
    
    if fresh_data:
        save_cache(fresh_data)
        return fresh_data
    else:
        # API failed, try to return expired cache
        if os.path.exists(CACHE_FILE):
            with open(CACHE_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        return None

def generate_json_file():
    """Generate JSON file for frontend use"""
    data = get_scholar_data()
    if data:
        output_file = os.path.join(os.path.dirname(__file__), "scholar_data.json")
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"Scholar data saved to {output_file}")
        return True
    else:
        print("Failed to generate scholar data")
        return False

if __name__ == "__main__":
    generate_json_file()
