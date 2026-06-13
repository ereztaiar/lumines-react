# syntax=docker/dockerfile:1

# ---- Build stage ----
# Compiles the React app into static assets in /app/dist via `yarn build`.
FROM node:22-alpine AS build
WORKDIR /app

# Copy manifests first so `yarn install` is cached unless dependencies change.
# Each workspace package.json is needed for yarn to resolve the workspace graph.
COPY package.json yarn.lock ./
COPY packages/@lumines/core/package.json packages/@lumines/core/package.json
COPY packages/@lumines/game-router/package.json packages/@lumines/game-router/package.json
COPY packages/@lumines/menu/package.json packages/@lumines/menu/package.json
COPY packages/@lumines/splash/package.json packages/@lumines/splash/package.json
COPY packages/@lumines/game-components/package.json packages/@lumines/game-components/package.json

RUN yarn install --frozen-lockfile

# Copy the rest of the source and build.
COPY . .
RUN yarn build

# ---- Serve stage ----
# Serves the static build with nginx, with SPA history-API fallback.
FROM nginx:1.27-alpine AS serve
COPY config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
