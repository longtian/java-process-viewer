# webpack
FROM mhart/alpine-node as builder
WORKDIR /src
COPY package.json .
RUN npm install --registry=https://registry.npm.taobao.org
COPY . .
RUN npm run-script build
# server
FROM mhart/alpine-node
WORKDIR /src
COPY package.json .
ENV NODE_ENV=production ES=es:9200
RUN npm install --no-cache --registry=https://registry.npm.taobao.org -production
COPY . .
COPY --from=builder /src/dist ./dist
EXPOSE 3000
CMD ["node","server.js"]