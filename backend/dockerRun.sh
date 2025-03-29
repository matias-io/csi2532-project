#  PLEASE DO NOT MODIFY THIS FILE; IT WILL MESS UP THE ENTIRE DEPLOY SEQUENCE

echo "NIHAO MA, if you are not Aditya the first, please do not execute this script, IT WILLLLLL PUSH TO MY DOCKER REPO, AND AS IT's mine and you do not have write access, it will NYET work my brother."

# Ask for confirmation before proceeding
echo "Are you sure you want to continue? (yes/no): "
read response
# Convert response to lowercase for consistency
response=$(echo "$response" | tr '[:upper:]' '[:lower:]')

if [[ "$response" != "yes" ]]; then
  echo "Exiting script. ......You chose not to proceed as you CANNOT PUSH......"
  exit 1
fi

# Proceed with the script if the response is "yes"
echo "Proceeding with the Docker build and push..."

echo "cleaning"
mvn clean package # Clean the build; It makes the JAR file

echo "docker building"
docker buildx build --platform linux/amd64 -t test-deployment -f Dockerfile.backend . #This builds the socker file

echo "docker taging"
docker tag test-deployment thekillerbkill/test-deployment:latest #This is me specific; It tages it to me, so basically names me as creator and owner

echo "docker pushing to my repo"
docker push thekillerbkill/test-deployment:latest #This actually pushes it to the docker.hub


# You can see the current deployment at: https://hub.docker.com/repository/docker/thekillerbkill/test-deployment/general