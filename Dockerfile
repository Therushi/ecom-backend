# Use the base Node.js image
FROM node:lts

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

# Copy the rest of the application files to the container
COPY . .

# Specify the command to run your application with nodemon
CMD [ "nodemon", "server.js" ]
