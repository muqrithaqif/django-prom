pipeline {
    agent any
    
    stages {

        stage('Build') {
            steps {
                script {
                    // Set DEBIAN_FRONTEND to noninteractive to avoid prompts
                    sh 'export DEBIAN_FRONTEND=noninteractive'
                    sh 'sudo apt-get update'
                    sh 'sudo apt-get upgrade -y'

                    sh '''
                        docker compose version
                    '''
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
