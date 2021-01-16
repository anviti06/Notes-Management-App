pipeline {
    agent any
    environment{
        CI = "true"
    }
    stages {
        stage ('Build') {

            steps {
                sh 'npm install'
                sh 'cd client'
                sh 'npm install'
                sh 'cd ..'
            }
        }
    
        stage ('Test') {
            steps {
                    sh 'npm run test'
            }
        }
        stage ('Deliver') {
            steps {
                    sh 'npm run dev'
                    sh 'kill'
            }
        }
    }

}
