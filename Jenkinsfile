pipeline {
    agent any

    tools {
        jdk 'jdk21'
        nodejs 'node20'
        maven 'maven3'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Alukasrikanth/devops-backend.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t banking-backend .'
            }
        }

        stage('Test') {
            steps {
                dir('backend') {
                    sh 'mvn test'
                }
            }
        }
    }

    post {
        success {
            echo '✅ Build Successful!'
        }
        failure {
            echo '❌ Build Failed!'
        }
    }
}
