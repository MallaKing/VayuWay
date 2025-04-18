set -o allexport
source .env
set +o allexport
echo "Updating to: http://${ip}:8000"

USER="john_doe"
ID=123
FILE="corridor.json"

jq -n --arg user "$USER" --argjson corid "$ID" --argjson corridor "$(cat $FILE)" \
  '{user: $user, corid: $corid, corridor: $corridor}' > payload.json

curl -X PUT http://${ip}:8000/api/v1/corridors/new \
  -H "Content-Type: application/json" \
  -d @payload.json