#Adding base image
FROM public.ecr.aws/lambda/nodejs:14
# Alternatively, you can pull the base image from Docker Hub: amazon/aws-lambda-nodejs:14

COPY . /var/task/

# Install NPM dependencies for function
RUN npm i -g typescript aws-cdk@^2.8.0 yarn
RUN yarn

# Build TypeScript files
RUN tsc

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)

CMD [ "app.handler" ]

