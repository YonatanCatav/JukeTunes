FROM node:8.12-alpine

# Install Python
RUN apk add g++ make python

# Create work directory
WORKDIR /usr/src/app

# Copy app source to work directory
COPY . /usr/src/app

# Install app dependencies
RUN yarn install

# Build and run the app
CMD npm start serve
