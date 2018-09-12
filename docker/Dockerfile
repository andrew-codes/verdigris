FROM node:carbon-jessie
RUN mkdir /app
COPY . /app
WORKDIR /app
RUN yarn
RUN yarn bootstrap
