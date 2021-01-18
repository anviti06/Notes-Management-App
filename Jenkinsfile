pipeline {
    agent any
    environment{
        CI = "true"
    }
    stages {
        stage ('Build') {

            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
    
        stage ('Test') {
            steps {
   
                sh 'npm run test'
                //sh 'rm -rf node_modules/'
                //sh 'rm -rf client/node_modules'
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
