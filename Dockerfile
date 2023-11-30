ARG PACKAGE_NAME

FROM node:20-slim as base
ARG PACKAGE_NAME

RUN npm install -g pnpm@8.11


FROM base as build
ARG PACKAGE_NAME
WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY packages/${PACKAGE_NAME} ./packages/${PACKAGE_NAME}

RUN echo "node-linker=hoisted" >> .npmrc

RUN pnpm --filter ${PACKAGE_NAME}... install && \
    pnpm --filter ${PACKAGE_NAME} build


FROM base
ARG PACKAGE_NAME
WORKDIR /usr/src/app

COPY --from=build --chown=node:node /usr/src/app/package.json ./package.json
COPY --from=build --chown=node:node /usr/src/app/node_modules ./node_modules
COPY --from=build --chown=node:node /usr/src/app/packages/${PACKAGE_NAME}/.env ./packages/${PACKAGE_NAME}/.env
COPY --from=build --chown=node:node /usr/src/app/packages/${PACKAGE_NAME}/package.json ./packages/${PACKAGE_NAME}/package.json
COPY --from=build --chown=node:node /usr/src/app/packages/${PACKAGE_NAME}/dist ./packages/${PACKAGE_NAME}/dist

WORKDIR /usr/src/app/packages/${PACKAGE_NAME}
EXPOSE 3000
CMD node dist/index.js
