#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "${DIR}"
set -e
set +x

source project.config.sh

rm -rf "${DIR_DIST_HOSTING}" || echo "No need to rm ${DIR_DIST_HOSTING}"
mkdir -p "${DIR_DIST_HOSTING}"
cp -R "${DIR_STATIC}" "${DIR_DIST_HOSTING}"

"${DIR_APPS}/build.sh"
