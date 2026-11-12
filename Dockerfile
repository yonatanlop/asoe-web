# Etapa 1: genera el sitio estático (no necesita dependencias de npm)
FROM node:22-alpine AS build
ARG PREVIEW=1
WORKDIR /app
COPY tools/build.js tools/build.js
COPY src src
RUN PREVIEW=${PREVIEW} node tools/build.js

# Etapa 2: sirve los archivos con nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
