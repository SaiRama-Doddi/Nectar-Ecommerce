# Use Node.js LTS base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json files
COPY package*.json ./

# Install dependencies (including Prisma)
RUN npm install

# Copy the rest of your app files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the port your Express app runs on
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
