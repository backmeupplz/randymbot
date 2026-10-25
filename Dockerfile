FROM node:22.23.4-bookworm-slim AS build
WORKDIR /app
COPY package.json yarn.lock ./
# yarn 1 corrupts a cache two installs write at once
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn,sharing=locked yarn install --frozen-lockfile
COPY tsconfig.json ./
COPY src src
RUN yarn build-ts

# Only the runtime dependencies and the compiled code: a smaller image exports and starts faster
FROM node:22.23.4-bookworm-slim
WORKDIR /app
COPY package.json yarn.lock ./
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn,sharing=locked yarn install --frozen-lockfile --production
COPY --from=build /app/dist dist
ENV NODE_ENV=production
CMD ["node", "dist/app.js"]
