FROM node:alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
RUN pwd
RUN ls /usr/src/app/
RUN npm install
RUN npm install -g @angular/cli
COPY . .
RUN ls /usr/src/app
RUN cat package.json
EXPOSE 4200
ENTRYPOINT ["npm", "start"]
