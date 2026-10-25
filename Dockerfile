FROM node:22.23.4-bookworm-slim
WORKDIR /app
COPY package.json yarn.lock ./
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn yarn install --frozen-lockfile
COPY . .
RUN yarn build-ts
ENV NODE_ENV=production
CMD ["node", "dist/app.js"]
