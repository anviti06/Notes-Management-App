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
                sh 'npm install'
                sh 'cd client'
                sh 'npm install'
                sh 'cd ..'
                sh 'npm run test'
                sh 'rm -rf node_modules/'
                sh 'rm -rf client/node_modules'
            }
        }
        //stage ('Deliver') {
            //steps {
                    //sh 'npm run dev'
                    //sh 'kill'
            //}
        //}
    }

}
