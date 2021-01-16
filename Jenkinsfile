pipeline {
    agent any
    environment{
        CI = "true"
    }
    stages {
        stage ('Build') {

            steps {
                sh 'cd client'
                sh 'npm install'
                sh 'cd ..'
            }
        }
    
        //stage ('Test') {
          //  steps {
            //        sh 'npm test'//'./jenkins/scripts/test.sh'
            //    }
        //}
        stage ('Compile') {
            steps {
                    sh 'cd client'
                    sh 'npm install'
                    sh 'cd ..'
                    sh 'npm run test'

                    //sh './jenkins/scripts/test.sh'
                    //sh 'npm run test'
                }
        }
    }

}
