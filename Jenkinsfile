pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                script {
                    // Set DEBIAN_FRONTEND to noninteractive to avoid prompts
                    sh 'export DEBIAN_FRONTEND=noninteractive'

                    // Update and upgrade packages
                    sh 'sudo apt-get update'
                    sh 'sudo apt-get upgrade -y'

                    // Install required dependencies for Docker
                    sh '''
                        sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common lsb-release
                        curl -fsSL https://download.docker.com/linux/debian/gpg | sudo tee /etc/apt/trusted.gpg.d/docker.asc
                        sudo echo "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list
                        sudo apt-get update
                    '''

                    // Install Docker and Docker Compose
                    sh '''
                        sudo apt-get install -y docker-ce docker-ce-cli containerd.io
                        sudo apt-get install -y docker-compose
                    '''

                    // Check Docker version
                    sh 'docker --version'

                    // Check Docker Compose version
                    sh 'docker compose version'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // Set DEBIAN_FRONTEND to noninteractive again for the Test stage
                    sh 'export DEBIAN_FRONTEND=noninteractive'
                    sh 'sudo apt-get update'
                    sh 'sudo apt-get upgrade -y'

                    sh '''
                        docker compose version
                        docker compose up -d
                    '''

                    sh 'sudo apt-get install -y python3 python3-venv python3-pip'

                    sh '''
                        python3 -m venv .venv
                        . .venv/bin/activate
                        pip install pytest selenium

                        sleep 15
                        python test_devopstest.py
                    '''
                }
            }
        }
    }
}
