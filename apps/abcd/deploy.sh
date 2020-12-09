#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "${DIR}"
set -e

source "../project.config.sh"

./app/deploy.sh
./backend/deploy.sh
