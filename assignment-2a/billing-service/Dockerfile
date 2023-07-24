FROM node:16-alpine

# Create app directory
WORKDIR /app

# We have to install nodemon globally before moving into the working directory
RUN npm install -g nodemon

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080

# RUN npm run build

CMD ["npm", "start"]