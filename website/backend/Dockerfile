# Use the official Node.js image.
FROM node:16

# Create and set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY backend/ .
RUN npm install

# Copy the rest of the application
COPY ../frontend /app/frontend


# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]







