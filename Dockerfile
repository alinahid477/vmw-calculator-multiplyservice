FROM node:12.4.0-alpine

WORKDIR /app/

COPY ./package.json /app/package.json
RUN npm install
RUN npm install -g nodemon

COPY ./src/ /app/src/

ENTRYPOINT ["nodemon","--inspect=0.0.0.0","./src/index.js"]