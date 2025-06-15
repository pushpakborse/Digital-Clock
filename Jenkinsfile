pipeline {
    agent any
    
    // Define tools needed for the pipeline
    tools {
        nodejs 'Node22'
    }
    
    // Pipeline triggers configuration
    triggers {
        // Trigger build on code push to repository
        githubPush()
        // Trigger build on tag creation
        pollSCM('* * * * *')
    }
    
    // Environment variables
    environment {
        // Jira integration credentials
        JIRA_CREDENTIALS = credentials('jira-credentials')
        // Email notification recipients
        EMAIL_RECIPIENTS = 'pushpakborse7124@gmail.com'
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Checkout source code from SCM
                checkout scm
                
                // Log the start of the pipeline
                script {
                    currentBuild.description = "Build #${BUILD_NUMBER} for commit ${GIT_COMMIT}"
                    echo "Starting pipeline for commit: ${GIT_COMMIT}"
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                sh 'npm install'
            }
            post {
                failure {
                    // Log dependency installation failures
                    echo "Failed to install dependencies"
                    // Send email notification on failure
                    emailext (
                        subject: "FAILED: Digital Clock - Dependency Installation",
                        body: "Dependency installation failed for Digital Clock build #${BUILD_NUMBER}",
                        recipientProviders: [[$class: 'DevelopersRecipientProvider']],
                        to: "${EMAIL_RECIPIENTS}"
                    )
                }
            }
        }
        
        // stage('Run Tests') {
        //     steps {
        //         sh 'npm test -- --watchAll=false'
        //     }
        // }
        
        stage('Build') {
            steps {
                // Build the application
                sh 'npm run build'
            }
            post {
                failure {
                    // Log build failures
                    echo "Build failed"
                    // Update Jira ticket status on build failure
                    sh 'curl -u ${JIRA_CREDENTIALS} -X POST -H "Content-Type: application/json" --data \'{"transition":{"id":"31"}}\' "https://your-jira-instance/rest/api/2/issue/${JIRA_ISSUE_KEY}/transitions"'
                    // Send email notification on build failure
                    emailext (
                        subject: "FAILED: Digital Clock - Build",
                        body: "Build failed for Digital Clock build #${BUILD_NUMBER}",
                        recipientProviders: [[$class: 'DevelopersRecipientProvider']],
                        to: "${EMAIL_RECIPIENTS}"
                    )
                }
                success {
                    // Log build success
                    echo "Build completed successfully"
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                // Build and tag Docker image
                sh 'docker build -t digital-clock:${BUILD_NUMBER} .'
                sh 'docker tag digital-clock:${BUILD_NUMBER} digital-clock:latest'
            }
            post {
                failure {
                    // Log Docker build failures
                    echo "Docker image build failed"
                    // Send email notification on Docker build failure
                    emailext (
                        subject: "FAILED: Digital Clock - Docker Build",
                        body: "Docker image build failed for Digital Clock build #${BUILD_NUMBER}",
                        recipientProviders: [[$class: 'DevelopersRecipientProvider']],
                        to: "${EMAIL_RECIPIENTS}"
                    )
                }
            }
        }
        
        stage('Deploy') {
            steps {
                // Make the deploy script executable
                sh 'chmod +x deploy.sh'
                // Run the deployment script
                sh './deploy.sh'
                
                // Update Jira ticket with deployment status
                script {
                    try {
                        sh 'curl -u ${JIRA_CREDENTIALS} -X POST -H "Content-Type: application/json" --data \'{"body":"Deployment completed successfully for version ${BUILD_NUMBER}"}\' "https://your-jira-instance/rest/api/2/issue/${JIRA_ISSUE_KEY}/comment"'
                    } catch (Exception e) {
                        echo "Failed to update Jira: ${e.message}"
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo 'Digital Clock application deployed successfully!'
            // Send success notification via email
            emailext (
                subject: "SUCCESS: Digital Clock Deployment - Build #${BUILD_NUMBER}",
                body: """
                <p>Digital Clock deployment was successful!</p>
                <p>Build Number: ${BUILD_NUMBER}</p>
                <p>Check the <a href='${BUILD_URL}'>build logs</a> for more details.</p>
                """,
                mimeType: 'text/html',
                recipientProviders: [[$class: 'DevelopersRecipientProvider']],
                to: "${EMAIL_RECIPIENTS}"
            )
        }
        failure {
            echo 'Deployment failed. Check the logs for details.'
            // Send failure notification via email
            emailext (
                subject: "FAILED: Digital Clock Deployment - Build #${BUILD_NUMBER}",
                body: """
                <p>Digital Clock deployment failed!</p>
                <p>Build Number: ${BUILD_NUMBER}</p>
                <p>Check the <a href='${BUILD_URL}'>build logs</a> for more details.</p>
                """,
                mimeType: 'text/html',
                recipientProviders: [[$class: 'DevelopersRecipientProvider']],
                to: "${EMAIL_RECIPIENTS}"
            )
        }
        always {
            // Archive logs for future reference
            archiveArtifacts artifacts: 'logs/**/*.log', allowEmptyArchive: true
        }
    }
}