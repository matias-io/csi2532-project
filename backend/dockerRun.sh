mvn clean package # Clean the build; It makes the JAR file
docker buildx build --platform linux/amd64 -t test-deployment -f Dockerfile.backend . #This builds the socker file
docker tag test-deployment thekillerbkill/test-deployment:latest #This is me specific; It tages it to me, so basically names me as creator and owner
docker push thekillerbkill/test-deployment:latest #This actually pushes it to the docker.hub


# You can see the current deployment at: https://hub.docker.com/repository/docker/thekillerbkill/test-deployment/general