FROM node:14.17
COPY . .
RUN npx lerna clean --yes
RUN rm -rf node_modules
RUN npm install
RUN npm run build
CMD npm start