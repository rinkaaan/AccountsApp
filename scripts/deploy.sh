source ~/startup.sh
WORKPLACE="$HOME/workplace/Accounts"

WORKSPACE="$WORKPLACE/AccountsApp"
(
  cd "$WORKSPACE"
  rsync-project Accounts
  ssh root@hetzner "cd ~/workplace/Accounts/AccountsApp && npm run build"
)
