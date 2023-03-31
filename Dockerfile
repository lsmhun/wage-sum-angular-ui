#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
#stage 2
FROM nginx:alpine

ENV WAGESUM_SERVER_ADDRESS=wagesum
ENV WAGESUM_SERVER_PORT=3000


COPY --from=node /app/dist/wage-sum-angular-ui /usr/share/nginx/html