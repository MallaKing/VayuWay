#!/bin/bash
set -o allexport
source .env
set +o allexport

echo "Deleting from: http://${ip}:8000"

ID='6801f291ef93c035a0813924' 

curl -X DELETE "http://${ip}:8000/api/v1/corridors/$ID" \
  -H "Content-Type: application/json"