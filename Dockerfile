# syntax=docker/dockerfile:1
ARG NODE_VERSION=12.16.1
ARG DEBIAN_CODENAME=buster

ARG SOURCE_DIR=/home/jenkins

FROM node:${NODE_VERSION}-${DEBIAN_CODENAME} AS builder

ARG SOURCE_DIR

WORKDIR "$SOURCE_DIR"
COPY . .
RUN rm  -rf dist  && \
  rm -rf release  && \ 
  mkdir release  && \
  rm -f yarn.lock  && \
  yarn install --no-optional && \
  npm run build:aot:nightly && \
  tar czvf release/pqd-lolui.tar.gz -C dist/ .

FROM builder AS test

ARG SOURCE_DIR

WORKDIR "$SOURCE_DIR"

RUN npm run test

FROM nginx:stable AS runtime
SHELL [ "/bin/bash", "-euo", "pipefail", "-c" ]

ARG SOURCE_DIR
COPY --from=builder --chown=0 --link [ "${SOURCE_DIR}/release/pqd-lolui.tar.gz",  "/pqd-lolui.tar.gz" ]

RUN mkdir /app

RUN chmod +x /entrypoint.sh && \
  cp /config/* /etc/nginx && \
  cp /pqd-lolui.tar.gz /app && \
  cd /app && \
  chown -R nginx:nginx * && \
  tar xzvf pqd-lolui.tar.gz && \
  rm pqd-lolui.tar.gz

CMD ["/entrypoint.sh"]
