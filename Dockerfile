FROM node:18-buster-slim

RUN apt-get update && \ 
  apt-get install -y build-essential \
  wget \
  python3 \
  make \
  gcc \ 
  libc6-dev 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ARG PORT
ENV PORT ${PORT}

CMD ["npm", "start"]