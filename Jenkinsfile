pipeline {
    agent any
    
    stages {

        stage('Build') {
            steps {
                script {
                    // Use sudo for apt-get commands or ensure the user has appropriate privileges
                    sh '''
                        sudo apt-get update
                        sudo apt-get upgrade -y
                        
                        docker compose version
                        mkdir -p /shared/html
                        cp -r ./DevopsClassFront/dist/* /shared/html/
                    '''
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    sh '''
                        sudo apt-get update
                        sudo apt-get upgrade -y
                        sudo apt-get install -y python3 python3-venv python3-pip
                        
                        docker compose version
                        docker compose up -d

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
