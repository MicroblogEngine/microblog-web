# syntax=docker/dockerfile:1
ARG NODE_VERSION=23.4
ARG DEBIAN_CODENAME=slim

ARG SOURCE_DIR=/home/jenkins

FROM node:${NODE_VERSION}-${DEBIAN_CODENAME} AS builder

ARG SOURCE_DIR

WORKDIR "$SOURCE_DIR"

RUN corepack enable
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile
COPY . .
RUN pnpm build && \
  tar czvf release/app.tar.gz -C dist/ .

FROM builder AS test

ARG SOURCE_DIR

WORKDIR "$SOURCE_DIR"

RUN npm run test

FROM nginx:stable AS runtime
SHELL [ "/bin/bash", "-euo", "pipefail", "-c" ]

ARG SOURCE_DIR
COPY --from=builder --chown=0 --link [ "${SOURCE_DIR}/release/app.tar.gz",  "/app.tar.gz" ]

RUN mkdir /app

RUN cp /app.tar.gz /usr/share/nginx && \
  cd /usr/share/nginx && \
  tar xzvf app.tar.gz && \
  rm app.tar.gz

