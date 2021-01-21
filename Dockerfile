FROM node:14.15.2-alpine
WORKDIR /home/node/app
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
ENV IP="0.0.0.0"
ENV PORT="46000"
ENV API_URL="https://apik8s.wepa.dev"
COPY package.json .
RUN npm install --production
COPY . .
RUN mkdir logs
RUN chown -R node:node /home/node
USER node
CMD ["node", "server.js"]
