#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "${DIR}"
set -e

cp -R "${DIR}/dist" "${DIR_DIST_HOSTING}/quizabcd"
