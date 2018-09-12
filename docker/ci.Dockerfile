FROM cypress/base:8
RUN mkdir /app
COPY . /app
WORKDIR /app
RUN yarn
RUN yarn bootstrap
RUN $(npm bin)/cypress verify
