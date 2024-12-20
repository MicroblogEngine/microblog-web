@Library('jenkins-pipeline-library@main')

String appFamily= 'microblog'
String appName = 'web'

//project CI/CD pipeline config
String dockerRepository = "training/${appFamily}-${appName}"
String dockerRegistry = "registry.local:5000"
String infraJob = "/Training/${appFamily}-${appName}-kube"
dockerPipeline([
    dockerRepository: dockerRepository,
    dockerRegistry: dockerRegistry,
    platform: "linux/amd64",
    infra: [
        job: infraJob
    ]
])
