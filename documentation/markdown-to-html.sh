#!/bin/bash

# Read markdown content from file
markdown_content=$(cat $1)

# Convert markdown to HTML
html_content=$(gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  /markdown \
  -f text="$markdown_content"
)

# Write HTML content to file
echo "$html_content" > $2

echo "Conversion completed. HTML content written to $2"
