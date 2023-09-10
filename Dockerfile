FROM node:20-alpine AS build
WORKDIR /usr/src/app
ENV NODE_ENV=develop
COPY ["./package.json", ".env", "./"]
RUN yarn
COPY . .
RUN yarn build

FROM node:20-alpine AS production
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY ["./package.json", "./.env", "./"]
RUN yarn install --production

FROM node:20-alpine AS deploy
WORKDIR /usr/src/app
COPY [".env", "./"]
COPY --from=build /usr/src/app/build ./
COPY --from=production /usr/src/app/node_modules ./node_modules
EXPOSE 3000
CMD [ "node", "./cmd/rest.cmd.js" ]