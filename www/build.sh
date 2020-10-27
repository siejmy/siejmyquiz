#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "${DIR}"
set -e

DIST_DIR="${DIR}/dist"
PUBLIC_DIR="${DIR}/public"

rm -rf "${DIST_DIR}" || echo "No need to rm dist dir"
cp -R "${PUBLIC_DIR}" "${DIST_DIR}"
