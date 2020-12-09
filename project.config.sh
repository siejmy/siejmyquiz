#!/usr/bin/env bash
export DIR_PROJECT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"


export GCP_PROJECT_ID="siejmy"
export GCP_REGION_CLOUDRUN="europe-west1"

export DIR_APPS="${DIR_PROJECT}/apps"
export DIR_DIST_HOSTING="${DIR_PROJECT}/dist_hosting"
export DIR_STATIC="${DIR_PROJECT}/static"
export DIR_DIRESTORE="${DIR_PROJECT}/firestore"
