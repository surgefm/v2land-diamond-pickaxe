FROM node:alpine as builder

## Install build toolchain, install node deps and compile native add-ons
RUN apk add --no-cache make g++
RUN yarn


FROM node:alpine as app

## Copy built node modules and binaries without including the toolchain
COPY --from=builder node_modules .

EXPOSE 3000

USER node