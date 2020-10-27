#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "${DIR}"
set -e

echo "# Installing siejmyquiz"

echo "# Building www"
./www/build.sh


echo "# Building apps/quiz"
./apps/quiz/build.sh
mkdir www/dist/apps
cp -R apps/quiz/dist www/dist/apps/quiz
