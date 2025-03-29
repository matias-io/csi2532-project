#!/bin/bash


OWNER=$(stat -f %Su dockerRun.sh)

if [[ "$OWNER" != "adityabaindur" ]]; then
  echo "You are not the owner of this script. Exiting."
  exit 1
fi

echo "Owner confirmed. Proceeding with the script..."

correct_password=$(grep '^docker.password=' src/main/resources/application.properties | cut -d'=' -f2)

if [[ -z "$correct_password" ]]; then
  echo "Password not found in src/main/resources/application.properties. Exiting."
  exit 1
fi

echo "What is the password? (this will be checked securely): "
read -s response 

response=$(echo "$response" | tr '[:upper:]' '[:lower:]')

if [[ "$response" != "$correct_password" ]]; then
  echo "Exiting script. ......You chose not to proceed as you CANNOT PUSH......"
  exit 1
fi


echo "Proceeding with the Docker build and push..."


check_docker_running() {
  docker_info=$(docker info 2>/dev/null)
  if [[ $? -eq 0 ]]; then
    echo "Docker is running."
    return 0
  else
    return 1
  fi
}

open_docker() {
  open -a Docker
  echo "Waiting for Docker to start..."
}

wait_for_docker() {
  while ! check_docker_running; do
    sleep 2
  done
}

check_docker_running
if [[ $? -ne 0 ]]; then
  open_docker
  wait_for_docker
fi

echo "Docker is now running. Proceeding with the script..."

echo "cleaning"
mvn clean package # Clean the build; It makes the JAR file

echo "docker building"
docker buildx build --platform linux/amd64 -t test-deployment -f Dockerfile.backend . #This builds the Dockerfile

# echo "docker tagging"
# docker tag test-deployment thekillerbkill/test-deployment:latest #This tags it to me, so basically names me as creator and owner

# echo "docker pushing to my repo"
# docker push thekillerbkill/test-deployment:latest #This actually pushes it to the Docker Hub

# You can see the current deployment at: https://hub.docker.com/repository/docker/thekillerbkill/test-deployment/general
