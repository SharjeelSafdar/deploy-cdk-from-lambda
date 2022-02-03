#Adding base image
FROM amazon/aws-lambda-nodejs:12
# Alternatively, you can pull the base image from Docker Hub: public.ecr.aws/lambda/nodejs:12

COPY handler package*.json /var/task/

# Install NPM dependencies for function
RUN npm install

WORKDIR "handler"

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "index.handler" ]