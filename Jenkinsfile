pipeline {
    agent any
    environment {
        BASE_IMAGE = "training/microblog-web" 
    }        
    stages {
        stage('Lint') {
            steps {
                script {
                    sh "docker run -e HADOLINT_FAILURE_THRESHOLD=error --rm -i hadolint/hadolint < Dockerfile"
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    sh "docker build -t ${env.BASE_IMAGE} --target builder ."
                }
            }
        }
        // stage('Test') {
        //     steps {
        //         script {
        //             sh "docker run --rm ${env.BASE_IMAGE} test"
        //         }
        //     }
        // }
        stage('Runtime') {
            steps {
                script {
                    sh "docker build -t ${env.BASE_IMAGE} --target runtime ."
                }
            }
        }
        stage('Publish') {
            steps {
                script {
                    sh "docker push registry.local:5000/${env.BASE_IMAGE}"
                }
            }
        }
    }
} 