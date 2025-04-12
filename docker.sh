#!/bin/bash

docker buildx create --use
docker login
docker buildx build \
  --platform linux/amd64 \
  -t marcelnoehre/sqeez-webservice:latest \
  . \
  --push
