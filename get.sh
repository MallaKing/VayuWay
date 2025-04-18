#!/bin/bash
set -o allexport
source .env
set +o allexport
echo "Fetching from: http://${ip}:8000"

ID=456 # Replace with a valid _id from your DB

curl -X GET "http://${ip}:8000/api/v1/corridors/$ID" \
  -H "Content-Type: application/json"