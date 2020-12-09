#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "${DIR}"
set -e

CONTAINER_NAME="abcd"
CLOUDRUN_TAG="gcr.io/${GCP_PROJECT_ID}/${CONTAINER_NAME}"

gcloud builds submit --tag "${CLOUDRUN_TAG}"

gcloud beta run deploy abcd \
                       --allow-unauthenticated \
                       --region "${GCP_REGION_CLOUDRUN}" \
                       --image "${CLOUDRUN_TAG}" \
                       --platform managed

