pipeline {
    agent any

    parameters {
        booleanParam(name: 'SKIP_BUILD', defaultValue: false, description: 'Skip the build stage?')
    }
    
    stages {

        stage('Build') {
            when {
                expression { !params.SKIP_BUILD }
            }
            steps {
                script {
                    sh 'apt-get update'
                    sh 'apt-get upgrade -y'

                    sh '''
                       
                        docker compose version
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