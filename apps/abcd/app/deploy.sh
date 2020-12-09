#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "${DIR}"
set -e

mkdir -p "${DIR_DIST_HOSTING}/quizabcd"
cp -R "${DIR}/dist/" "${DIR_DIST_HOSTING}/quizabcd"
echo "Successfully copied ${DIR}/dist/ to ${DIR_DIST_HOSTING}/quizabcd"
