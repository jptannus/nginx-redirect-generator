FROM node:current-alpine3.10

WORKDIR /app
RUN apk add npm && npm update -g npm
ADD . /app

ENTRYPOINT ["npm", "start"]
CMD []
