# stage 1 building the code
FROM node as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

# stage 2
FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY --from=builder /usr/src/app/dist ./dist

COPY  ormconfig.json .

COPY .env .
 
EXPOSE 4000

CMD node dist/src/index.js

