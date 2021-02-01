# pulling official nodejs base image
FROM node:13.12.0-alpine as build

# Creating directories for source code
RUN mkdir -p /usr/src/app
RUN npm install keycloak-js

# set working directory
WORKDIR /usr/src/app

# copying source code to container
COPY frontend/ ./


# Installing and building the front-end react app
RUN npm install
#RUN npm start
