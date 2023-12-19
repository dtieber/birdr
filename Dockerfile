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
COPY packages ./packages

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=${PACKAGE_NAME} --prod /usr/prod/${PACKAGE_NAME}


FROM base
ARG PACKAGE_NAME

COPY --from=build /usr/prod/${PACKAGE_NAME} /usr/prod/${PACKAGE_NAME}
WORKDIR /usr/prod/${PACKAGE_NAME}

EXPOSE 3000
CMD node dist/index.js
