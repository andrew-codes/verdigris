#!/usr/bin/env bash

wget -qO- 'https://cli.netlify.com/download/latest/linux' | tar xz

yarn build:website

if [ $PROD ]; then
  ./netlifyctl -A "$NETLIFY_TOKEN" deploy
  PUBLISH_URL="https://verdigris.andrew.codes"
  PUBLISH_TYPE="Production"
else
  PUBLISH_URL=$(./netlifyctl -A "$NETLIFY_TOKEN" deploy --draft | grep https.*com$ | sed 's/^ *//;s/$//')
  PUBLISH_TYPE="Preview"
fi

echo -e "PUBLISH_URL='$PUBLISH_URL'"

UPDATE_STATUS_CMD=$(cat <<-END
  curl -u "$GITHUB_USER:$GITHUB_TOKEN" -X POST -d '{
    "state": "success",
    "target_url": "$PUBLISH_URL",
    "description": "$PUBLISH_TYPE Deployment URL",
    "context": "Deployment/$PUBLISH_TYPE"
  }' -H "Content-Type: application/json" "https://api.github.com/repos/$GITHUB_USER/verdigris/statuses/$SHA"
END
)

eval $UPDATE_STATUS_CMD
