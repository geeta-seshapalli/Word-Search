pipeline {
    agent any

    environment {
        NODE_HOME = tool name: 'nodejs', type: 'NodeJS' // Ensure this matches the name configured in Jenkins Global Tool Configuration
    }

    stages {
        stage('Checkout') {
            steps {
                // Fetch the latest code from the GitHub repository
                git branch: 'main', url: 'https://github.com/geeta-seshapalli/Word-Search.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Install Node.js dependencies
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Run your tests
                    sh 'npm test'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Build your project
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                script {
                    // Deploy the project to the staging environment
                    sh 'npm run deploy:staging'
                }
            }
        }

        stage('Notify') {
            steps {
                echo 'Deployment completed!'
            }
        }
    }

    post {
        success {
            echo 'Build and Deployment successful!'
        }
        failure {
            echo 'Build failed. Please check the logs.'
        }
    }
}
