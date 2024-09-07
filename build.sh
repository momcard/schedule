#!/usr/bin/sh

rm -rf temp

BUILD_DIR=temp npm run build || exit

BUILD=$?
if [ ! $BUILD -eq 0 ]; then
  echo "build fail"
  exit 1
fi

if [ ! -d "temp" ]; then
  echo '\033[31m temp Directory not exists!\033[0m'
  exit 1
fi

rm -rf .next

mv temp .next

pm2 reload ao --update-env

echo "succeeded"
