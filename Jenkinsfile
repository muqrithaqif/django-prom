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
                    // Start the application
                    sh 'docker-compose up -d'

                    // Set up Python virtual environment and install test dependencies
                    sh '''
                        python3 -m venv .venv
                        . .venv/bin/activate
                        pip install --upgrade pip
                        pip install pytest selenium
                    '''

                    // Run tests in the virtual environment
                    sh '''
                        . .venv/bin/activate
                        sleep 15  # Wait for the app to initialize
                        python3 test_devopstest.py
                    '''

                    // Stop the application
                    sh 'docker-compose down'
                }
            }
        }

        stage('Deploy Application') {
            steps {
                script {
                    sh 'docker-compose up -d'
                }
            }
        }
    }
}
