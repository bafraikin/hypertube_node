FROM node:12-alpine
EXPOSE 3000 9229


RUN apk add zsh curl git python3 g++ gcc make
RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"


WORKDIR /home/app

COPY package.json /home/app/
COPY package-lock.json /home/app/

RUN npm ci

COPY . /home/app

#RUN npm run build

#CMD ./scripts/start.sh
