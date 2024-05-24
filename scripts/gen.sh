WORKPLACE="$HOME/workplace/Accounts"

WORKSPACE="$WORKPLACE/AccountsApp"
SCHEMA_PATH="http://localhost:8080/openapi.json"

(
  cd "$WORKSPACE"
  rm -rf openapi-client
  npx openapi -i "$SCHEMA_PATH" -o openapi-client
)
