# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Expose the port Express is using
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
