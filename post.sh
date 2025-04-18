#!/bin/bash
set -o allexport
source .env
set +o allexport
echo "Posting to: http://${ip}:8000"

USER="Sh"
ID=456
FILE="bm.geojson"

jq -n --arg user "$USER" --argjson corid "$ID" --argjson corridor "$(cat $FILE)" \
  '{user: $user, corid: $corid, corridor: $corridor}' > payload.json

curl -X POST  http://${ip}:8000/api/v1/corridors/new \
  -H "Content-Type: application/json" \
  -d @payload.json
