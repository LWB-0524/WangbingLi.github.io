#!/bin/bash
# Google Scholar数据每日更新脚本

cd "$(dirname "$0")"
python3 scholar.py
cp scholar_data.json ../scholar_data.json
echo "Scholar data updated at $(date)"
