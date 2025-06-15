pipeline {
    agent any
    
    tools {
        nodejs 'Node16' // Use the NodeJS installation configured in Jenkins
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test -- --watchAll=false'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t digital-clock:${BUILD_NUMBER} .'
                sh 'docker tag digital-clock:${BUILD_NUMBER} digital-clock:latest'
            }
        }
        
        stage('Deploy') {
            steps {
                // Make the deploy script executable
                sh 'chmod +x deploy.sh'
                // Run the deployment script
                sh './deploy.sh'
            }
        }
    }
    
    post {
        success {
            echo 'Digital Clock application deployed successfully!'
        }
        failure {
            echo 'Deployment failed. Check the logs for details.'
        }
    }
}