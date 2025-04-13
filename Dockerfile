#build
FROM node:23-bookworm AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN rm -rf node_modules

#deploy
FROM node:23-bookworm

RUN apt update -y && \
    apt upgrade -y && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir /entrypoint.d
COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh

#pm2
WORKDIR /app
COPY ./pm2.config.cjs ./
RUN npm install pm2 -g
COPY --from=build /app .
RUN npm install --omit=dev

RUN echo "$(date -u)" >/build_time.txt
ENTRYPOINT ["/entrypoint.sh"]
