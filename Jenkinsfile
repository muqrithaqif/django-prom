pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    // Install necessary dependencies for Docker Compose, if not installed
                    sh '''
                        apt-get update
                        apt-get upgrade -y
                        apt-get install -y python3 python3-venv python3-pip docker-compose
                    '''

                    // Check Docker Compose version
                    sh 'docker compose version'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // Set up Python virtual environment and install dependencies
                    sh '''
                        python3 -m venv .venv
                        source .venv/bin/activate
                        pip install pytest selenium
                    '''

                    // Start Docker containers using Docker Compose
                    sh 'docker compose up -d'

                    // Allow some time for the containers to spin up
                    sleep 15

                    // Run tests using pytest
                    sh '''
                        python -m pytest test_devopstest.py
                    '''

                    // Optionally stop and clean up Docker containers
                    sh 'docker compose down'
                }
            }
        }
    }
}
