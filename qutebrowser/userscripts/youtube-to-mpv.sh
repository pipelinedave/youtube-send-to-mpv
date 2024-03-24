#!/bin/bash
url="$QUTE_URL"
encoded_url=$(python -c "import urllib.parse; print(urllib.parse.quote('$url'))")
if [[ $url == *"youtube.com/watch"* ]]; then
  notify-send "Sending to MPV" "$url"
  # This sends a GET request now
  curl "http://localhost:3000/?url=$encoded_url"
else
  notify-send "Not a YouTube video"
fi
