FROM node:latest
WORKDIR /app
COPY package.json ./
RUN yarn
#RUN yarn build
COPY . .
EXPOSE 3000
CMD ["yarn", "run", "start"]
