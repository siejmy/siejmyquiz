#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "${DIR}"
set -e

source project.config.sh

"${DIR_PROJECT}/build.sh"

"${DIR_APPS}/deploy.sh"
"${DIR_PROJECT}/abcd/deploy.sh"

firebase deploy --only hosting,firestore
