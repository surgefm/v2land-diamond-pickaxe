FROM node:alpine as builder
WORKDIR /app

## Install build toolchain, install node deps and compile native add-ons
RUN apk add --no-cache make git
COPY package.json yarn.lock ./
RUN yarn --only=development
COPY . .
RUN yarn run build

FROM node:alpine as app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN mkdir -p /app/node_modules && chown -R node:node /app
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --only=production

## Copy built node modules and binaries without including the toolchain
COPY . .
COPY --from=builder --chown=node:node /app/dist ./dist

EXPOSE 3000
USER node
CMD [ "yarn", "run", "start:prod" ]