pipeline {
    agent any
    
    stages {

        stage('Build') {
            steps {
                script {
                    sh 'apt-get update'
                    sh 'apt-get upgrade -y'

                    sh '''
                       
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

                    sh 'apt-get update'
                    sh 'apt-get upgrade -y'
                    sh '''
                        docker compose version
                        docker compose up -d
                        '''

                    sh 'apt-get install -y python3 python3-venv python3-pip'

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
