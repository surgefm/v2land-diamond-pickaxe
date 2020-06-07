FROM node:alpine as builder
WORKDIR /app

## Install build toolchain, install node deps and compile native add-ons
RUN apk add --no-cache make git
COPY . .
RUN yarn && \
    yarn run build && \
    yarn run prune && \
    yarn cache clean

FROM node:alpine as app
RUN mkdir -p /app/node_modules && chown -R node:node /app
WORKDIR /app

## Copy built node modules and binaries without including the toolchain
COPY --from=builder --chown=node:node /app ./

EXPOSE 3000
USER node
CMD [ "yarn", "run", "start:prod" ]