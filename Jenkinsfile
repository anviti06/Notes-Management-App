pipeline {
    agent any
    environment{
        CI = "true"
    }
    stages {
        stage ('Build') {

            steps {
                sh 'npm install'
                sh 'npm audit fix'
            }
        }
    
        stage ('Test') {
            steps {
                    sh 'npm test'//'./jenkins/scripts/test.sh'
                }
        }
    }

}
