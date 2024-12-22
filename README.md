
# Running Django and Jenkins Projects with Python in Docker Locally

This guide provides instructions for setting up and running Django and Jenkins projects locally using Docker. By leveraging Docker, you can streamline the setup process and ensure consistent development environments for both applications. Follow the steps below to get started.

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Docker](https://www.docker.com/) (Docker Desktop for Windows/Mac or Docker Engine for Linux)
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)
- Python 3.8 or later (for Django-related tasks outside the container, if needed)
- [Node](https://nodejs.org/en)
- Git (to clone the repository)

---

## Setup Environment

Follow these steps to set up the environment:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/muqrithaqif/django-prom
   cd <repository_directory>
   ```

2. **Build Docker Images**
   Navigate to the relevant directories and build the Docker images:
   ```bash
   docker-compose build
   ```

3. **Start the Containers**
   Start the containers for Django and Jenkins:
   ```bash
   docker-compose up
   ```

4. **Install Dependencies (Optional)**
   If you need to install Python packages or other dependencies manually:
   ```bash
   pip install -r requirements.txt
   ```

5. **Access the Applications**
   - Django: Open `http://localhost:8000` in your browser.
   - Jenkins: Open `http://localhost:8080` in your browser.

6. **Run Migrations (Django)**
   ```bash
   docker exec -it <django_container_name> python manage.py migrate
   ```

---

## Usage

1. **Apply Changes to the Frontend**
   To apply any changes to the frontend, navigate to the `DevOpsClassFront` folder and run:
   ```bash
   npm run build
   ```

2. **Run Frontend Locally**
   To run the React frontend locally for development, navigate to the `DevOpsClassFront` folder and run:
   ```bash
   npm run dev
   ```

3. **Run Jenkins in Docker**
   To set up Jenkins in a Docker container, navigate to the `JenkinsDocker` folder and run:
   ```bash
   docker-compose up -d
   ```
   Once the container is running, you can set up Jenkins in your web browser by visiting `http://localhost:8080`.

4. **Setup Your Pipeline in Jenkins**
   You can set up the Pipeline in Jenkins in your web browser by visiting `http://localhost:8080`. Make sure the pipeline definition    is referring to the Jenkinsfile (in the project file)

