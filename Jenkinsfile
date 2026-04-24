pipeline {
  agent any

  environment {
    // You will need to configure these credentials and URLs in Jenkins
    DOCKER_REGISTRY = 'YOUR_DOCKER_REGISTRY'
    DOCKER_CREDENTIALS_ID = 'docker-registry-credentials'
    OPENSHIFT_CREDENTIALS_ID = 'openshift-credentials'
    OPENSHIFT_SERVER = 'https://api.YOUR_OPENSHIFT_CLUSTER:6443'
    OPENSHIFT_PROJECT = 'banking-app'
  }

  tools {
    jdk 'jdk21'
    nodejs 'node20'
  }

  stages {
    stage('Build Application Jars/Dist') {
      parallel {
        stage('Backend') {
          steps {
            dir('backend') {
              sh 'mvn -q -DskipTests package'
            }
          }
        }
        stage('Frontend') {
          steps {
            dir('frontend') {
              sh 'npm ci'
              sh 'npm run build'
            }
          }
        }
      }
    }

    stage('Build Docker Images') {
      steps {
        script {
          docker.withRegistry("https://${DOCKER_REGISTRY}", DOCKER_CREDENTIALS_ID) {
            dir('backend') {
              def backendImage = docker.build("${DOCKER_REGISTRY}/banking-backend:latest")
              backendImage.push()
            }
            dir('frontend') {
              def frontendImage = docker.build("${DOCKER_REGISTRY}/banking-frontend:latest")
              frontendImage.push()
            }
          }
        }
      }
    }

    stage('Deploy to OpenShift') {
      steps {
        withCredentials([string(credentialsId: OPENSHIFT_CREDENTIALS_ID, variable: 'OC_TOKEN')]) {
          sh """
            oc login --token=\$OC_TOKEN --server=${OPENSHIFT_SERVER} --insecure-skip-tls-verify
            oc project ${OPENSHIFT_PROJECT}
            
            # Apply Backend Manifests
            oc apply -f openshift/backend-deployment.yaml
            
            # Apply Frontend Manifests
            oc apply -f openshift/frontend-deployment.yaml
          """
        }
      }
    }
  }
}

