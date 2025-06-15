# Digital Clock React Application

A simple yet attractive digital clock built with React.

## Features

- Real-time clock that updates every second
- Displays current time in hours, minutes, and seconds
- Shows current date
- Stylish design with glowing effect

## Deployment with Jenkins

This project includes a Jenkins pipeline for automated deployment. The pipeline:

1. Checks out the code from the repository
2. Installs dependencies
3. Runs tests
4. Builds the React application
5. Creates a Docker image
6. Deploys the application using Docker

### Prerequisites

- Jenkins server with:
  - NodeJS Plugin (configured with Node 16)
  - Docker installed on the Jenkins server
  - Necessary permissions to run Docker commands

### Setting Up the Jenkins Pipeline

1. In Jenkins, create a new Pipeline job
2. Configure it to use SCM for the pipeline definition
3. Point it to your repository and specify the path to the Jenkinsfile
4. Save and run the pipeline

### Manual Deployment

If you want to deploy manually:

```bash
# Build the application
npm install
npm run build

# Build and run with Docker
docker build -t digital-clock .
docker run -d -p 80:80 --name digital-clock-container digital-clock
```

## Accessing the Application

Once deployed, the application will be available at:
- http://localhost (if deployed locally)
- http://your-server-ip (if deployed to a server)

## Development.

To run the application in development mode:

```bash
npm install
npm start
```

This will start the development server at http://localhost:3000
