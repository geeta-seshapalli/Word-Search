# WordSearch App

A simple and interactive web-based dictionary application that allows users to search for word definitions, meanings, examples, and antonyms using the [Dictionary API](https://dictionaryapi.dev/). The app features a clean UI, dark mode toggle, toast notifications, and automated testing with Selenium WebDriver. It is containerized using Docker and deployable to Kubernetes.

## 🔍Features
- **Word Search**: Search for any English word to retrieve its definition, part of speech, example, and antonyms.🔍
- **Dark Mode**: Toggle between light and dark themes for better accessibility and user experience. 🌙
- **Toast Notifications**: Display success or error messages for user actions (e.g., successful word fetch or error for invalid words).
- **Responsive Design**: Optimized for both desktop and mobile devices.📱
- **Automated Testing**: Selenium WebDriver tests for dark mode functionality and word search functionality. 🔄
- **Containerization**: Dockerized for easy deployment.⚡
- **Kubernetes Support**: Includes a Kubernetes deployment configuration for scalable hosting. 🧩

## 🛠Tech Stack
- **Frontend**: HTML, CSS, JavaScript 💻
- **API**: [Dictionary API](https://dictionaryapi.dev/) 🌐
- **Testing**: Selenium WebDriver (Node.js) 🧪
- **Containerization**: Docker 🐳
- **Orchestration**: Kubernetes ☸️
- **Web Server**: Nginx 🔧

## 💡Prerequisites
To run this project locally or deploy it, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (for running Selenium tests)
- [Docker](https://www.docker.com/) (for containerization)
- [Kubernetes](https://kubernetes.io/) (optional, for deployment)
- A modern web browser (e.g., Chrome, Firefox)

## 🚀Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/<geeta-seshapalli>/wordsearch.git
cd wordsearch
```
### 2. Run Locally
Open index.html in a web browser to use the app locally.
Ensure an internet connection to fetch data from the Dictionary API.
```
docker build -t wordsearch-app .
```
This will create a Docker image with the tag wordsearch-app.
- **Run the Docker container**: After the image is successfully built, you can run the Docker container using the following command
```bash
docker run -p 80:80 wordsearch-app
```
This will start the Nginx container and map port 80 of the container to port 80 on your local machine. You can now access the application at http://localhost:80 in your web browser.

## ***Kubernetes Setup***
 To deploy the WordSearch application using Kubernetes, apply the following configuration files:
 ```bash
kubectl apply -f wordsearch-deployment.yaml
kubectl apply -f wordsearch-service.yaml
```
- wordsearch-deployment.yaml: Defines the deployment for the WordSearch app, including replicas and resource requests/limits.
- wordsearch-service.yaml: Exposes the app via a Kubernetes service.

You can access the app using the external IP assigned to the service (for LoadBalancer) or node IP (for NodePort).

## ***Selenium Setup***
Run the Selenium Tests
to validate the functionality of the app, including dark mode and word search, run the following Selenium tests:
```bash
node SeleniumTestDarkMode.js
node SeleniumWordTest.js
```
These tests will ensure that dark mode is toggleable and that the word search feature works correctly by verifying the word definitions and examples.

## ***Kubernetes Configuration***
- Deployment (wordsearch-deployment.yaml)
This file defines the deployment for the application. It creates two replicas of the Nginx container running your app.
```bash
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wordsearch-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: wordsearch
  template:
    metadata:
      labels:
        app: wordsearch
    spec:
      containers:
      - name: wordsearch
        image: <dockerhub username>/wordsearch-app:latest
        ports:
        - containerPort: 80

```
- Service (wordsearch-service.yaml)
This file creates a Kubernetes service to expose the application to the outside world.
```bash
apiVersion: v1
kind: Service
metadata:
  name: wordsearch-service
spec:
  selector:
    app: wordsearch
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: LoadBalancer  # Change to NodePort for local testing
```
- Resource Requests and Limits
The deployment file also sets resource requests and limits for CPU and memory. This helps Kubernetes ensure that the application runs efficiently:
```bash
resources:
  requests:
    memory: "64Mi"
    cpu: "250m"
  limits:
    memory: "128Mi"
    cpu: "500m"
```
## 📊 ***Testing*** 
- ## Selenium Test for Dark Mode
The first test ensures that dark mode can be toggled correctly by checking if the background color of the body changes after the button is clicked.

- ## Selenium Test for Word Search
The second test simulates a user searching for a word and verifies that the definition and other details (such as examples) are displayed correctly.

## 🧑‍💻 Developer

**Geeta Seshapalli**  
🔗 [LinkedIn](https://www.linkedin.com/in/geetaseshapalli)  
🐱 [GitHub](https://github.com/geeta-seshapalli)

## 📝 Contribution

Feel free to fork this repository and submit pull requests. If you encounter any issues or have suggestions for improvements, please open an issue. 🙌
> _If you find this repository helpful, please give it a ⭐️!_
