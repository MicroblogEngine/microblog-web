pipeline {
    agent any
    BASE_IMAGE="training/microblog-web" 
    stages {
        stage('Build') {
            steps {
                script {
                    sh "docker build -t $BASE_IMAGE --target builder ."
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    sh "docker run --rm $BASE_IMAGE test"
                }
            }
        }
        stage('Runtime') {
            steps {
                script {
                    sh "docker build -t $BASE_IMAGE --target runtime ."
                }
            }
        }
        stage('Publish') {
            steps {
                script {
                    sh "docker push registry.local:5000/$BASE_IMAGE"
                }
            }
        }
    }
} 