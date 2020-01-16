FROM node:12-stretch
RUN apt-get update && apt-get install -y apt-transport-https ca-certificates
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
WORKDIR /usr/front
RUN apt-get install -y yarn zsh vim
RUN yarn global add @vue/cli typescript
RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
COPY package.json /usr/front
COPY yarn.lock /usr/front
RUN yarn install
#CMD ["yarn", "start"]
