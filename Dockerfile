FROM node:14.17
COPY . .
RUN npm install
CMD npm start