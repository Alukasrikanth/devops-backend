pipeline {
agent any

```
environment {
    DOCKER_IMAGE = "alukasrikanth/devops-app"
}

stages {

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
                sh 'npm ci'
                sh 'npm run build'
            }
        }
    }

    stage('Docker Build') {
        steps {
            sh 'docker build -t $DOCKER_IMAGE .'
        }
    }

    stage('Docker Push') {
        steps {
            withCredentials([string(credentialsId: 'dockerhub-pass', variable: 'PASS')]) {
                sh 'docker login -u alukasrikanth -p $PASS'
                sh 'docker push $DOCKER_IMAGE'
            }
        }
    }
}
```

}
