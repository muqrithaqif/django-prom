pipeline {
    agent any
    
    stages {

        stage('Setup Environment') {
            steps {
                script {
                    sh 'apt-get update'
                    sh 'apt-get install -y docker.io docker-compose python3 python3-venv python3-pip'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image for your Django app
                    sh '''
                    docker-compose version
                    docker-compose build
                    '''
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Run the application in detached mode
                    sh 'docker-compose up -d'

                    // Set up Python virtual environment and install test dependencies
                    sh '''
                        python3 -m venv .venv
                        . .venv/bin/activate
                        pip install pytest selenium
                    '''

                    // Run tests
                    sh '''
                        sleep 15  # Wait for the app to initialize
                        python test_devopstest.py
                    '''

                    // Stop the application after tests
                    sh 'docker-compose down'
                }
            }
        }

        stage('Deploy Application') {
            steps {
                script {
                    // Restart the app in detached mode for production
                    sh '''
                        docker-compose up -d
                    '''
                }
            }
        }
    }
}
