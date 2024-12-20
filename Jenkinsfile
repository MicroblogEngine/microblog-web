@Library('jenkins-pipeline-library@main')

//project CI/CD pipeline config
String dockerRepository = "training/microblog-web"
String dockerRegistry = "registry.local:5000"
dockerPipeline([
    dockerRepository: dockerRepository,
    dockerRegistry: dockerRegistry,
    platform: "linux/amd64"
])
