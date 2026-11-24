FROM node:22.23.5-bookworm-slim@sha256:be979e5523c76fa4d5ca4ebd3099078f220aa47ec39c48ad5b5df9314debd6eb AS build
WORKDIR /app
COPY package.json yarn.lock ./
# yarn 1 corrupts a cache two installs write at once
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn,sharing=locked yarn install --frozen-lockfile
COPY tsconfig.json ./
COPY src src
RUN yarn build-ts

# Only the runtime dependencies and the compiled code: a smaller image exports and starts faster
FROM node:22.23.5-bookworm-slim@sha256:be979e5523c76fa4d5ca4ebd3099078f220aa47ec39c48ad5b5df9314debd6eb
WORKDIR /app
COPY package.json yarn.lock ./
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn,sharing=locked yarn install --frozen-lockfile --production
COPY --from=build /app/dist dist
# The runtime only runs node: drop the bundled npm, whose own dependencies carry CVEs no Node 22 release fixes
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx
ENV NODE_ENV=production
CMD ["node", "dist/app.js"]
