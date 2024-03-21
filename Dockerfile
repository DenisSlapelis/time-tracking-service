FROM node:20.11.0-slim AS NODE_PROD

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

USER nonroot

WORKDIR /app

ENV NODE_ENV production

COPY package*.json ./

RUN npm install --ignore-scripts

RUN npm run build

COPY . /app

EXPOSE 8000

CMD [ "npm", "start" ]
