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
                    sh './jenkins/scripts/test.sh'
                    //sh 'npm run test'
                }
        }
        stage('Deliver') {
            steps {
                sh './jenkins/scripts/deliver.sh'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                sh './jenkins/scripts/kill.sh'
            }
        }
    }

}
