# syntax=docker/dockerfile:1
ARG NODE_VERSION=23-bookworm
ARG DEBIAN_CODENAME=slim
ARG SOURCE_DIR=/home/jenkins


FROM node:${NODE_VERSION}-${DEBIAN_CODENAME} AS builder
ARG SOURCE_DIR
WORKDIR "$SOURCE_DIR"

RUN corepack enable
COPY . .
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --no-frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --no-frozen-lockfile
RUN rm  -rf dist  && \
  rm -rf release  && \ 
  mkdir release  && \
  pnpm build && \
  tar czvf release/app.tar.gz -C dist/ .


FROM builder AS test
ARG SOURCE_DIR
WORKDIR "$SOURCE_DIR"
#RUN pnpm run test
RUN echo "nothing to do"


FROM nginx:stable AS runtime
SHELL [ "/bin/bash", "-euo", "pipefail", "-c" ]

ARG SOURCE_DIR
COPY --from=builder --chown=0 --link [ "${SOURCE_DIR}/release/app.tar.gz",  "/app.tar.gz" ]
#COPY --from=builder --chown=0 --link [ "${SOURCE_DIR}/config/default.conf.template", "/etc/nginx/templates/default.conf.template"]

RUN apt-get install gettext-base 
RUN mkdir /app
RUN cp /app.tar.gz /usr/share/nginx/html && \
  cd /usr/share/nginx/html && \
  cp index.html index.html.template && \
  envsubst < index.html.template > index.html && \
  tar xzvf app.tar.gz && \
  rm app.tar.gz && \
  chown -R nginx:nginx .

