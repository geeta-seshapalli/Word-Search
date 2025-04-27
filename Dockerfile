# Use an official Nginx image from Docker Hub
FROM nginx:alpine

# Set the working directory inside the container
WORKDIR /usr/share/nginx/html

# Copy the contents of the local directory to the Nginx container directory
COPY . .

# Expose port 80 so that it can be accessed from the outside
EXPOSE 80

# Start the Nginx service when the container is run
CMD ["nginx", "-g", "daemon off;"]
