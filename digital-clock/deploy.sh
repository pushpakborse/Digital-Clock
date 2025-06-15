#!/bin/bash

# This script is used by Jenkins to deploy the application

# Build the Docker image
docker build -t digital-clock:latest .

# Stop and remove any existing container
docker stop digital-clock-container || true
docker rm digital-clock-container || true

# Run the new container
docker run -d -p 80:80 --name digital-clock-container digital-clock:latest

echo "Digital Clock application deployed successfully!"