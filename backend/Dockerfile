FROM node:12-alpine

MAINTAINER David Romario

RUN mkdir /app/

WORKDIR /app/

COPY ./ /app/
RUN npm install

EXPOSE 3030
ENTRYPOINT ["npm", "run", "dev"]