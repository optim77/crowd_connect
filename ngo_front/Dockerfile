# Step 1: Build the React application
FROM node:18-alpine AS build

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React application for production
RUN npm run build

# Step 2: Serve the built application using nginx
FROM nginx:1.23-alpine

# Copy the built React app from the previous build stage to nginx's html directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration file to replace the default configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to allow external access
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
