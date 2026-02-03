## 🧠 Project Overview

This project is a **DevOps-focused web application** designed to demonstrate how to containerize and orchestrate a web application using **Docker** and **Kubernetes**.

The main objective of this project is to highlight **infrastructure design, containerization, orchestration, and scalability**, rather than application business logic.

The application is composed of multiple services that run independently and communicate through internal networking, following a **production-style architecture**.

---

## 🏗️ Architecture

The application follows a simple but realistic architecture:

Browser
|
Frontend (React + Nginx)
|
Backend (Node.js + Express API)
|
MySQL Database

Each component runs in its **own container** and is deployed as a separate service.  
This separation allows independent deployment, scaling, and maintenance of each part of the system.

---

## ⚙️ DevOps & Infrastructure Features

This project was implemented with a strong emphasis on **DevOps best practices**, including:

- **Docker multi-stage builds** to separate build-time and runtime environments
- **Docker Compose** for local multi-container orchestration
- **Persistent volumes** to ensure MySQL data is not lost when containers restart
- **Service-based networking** enabling containers to communicate using service names instead of IP addresses
- **Kubernetes Deployments** for pod management, self-healing, and rolling updates
- **Kubernetes Services** to provide stable networking and internal load balancing
- **Horizontal scaling** of the backend using Kubernetes:
  ```bash
  kubectl scale deployment backend --replicas=3
