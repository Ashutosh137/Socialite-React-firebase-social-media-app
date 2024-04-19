# Running Socialite React App with Docker

This repository contains the Dockerfile and instructions to run a Docker container for the Socialite React App.

## Prerequisites

Before you begin, make sure you have Docker installed on your system. You can download and install Docker from [here](https://www.docker.com/get-started).

## Usage

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/Ashutosh137/Socialite-React-firebase-social-media-app
    ```

2. Navigate to the cloned directory:

    ```bash
    cd socialite-react-docker
    ```

3. Build the Docker image:

    ```bash
    docker build -t socialite-react .
    ```

4. Run the Docker container:

    ```bash
    docker run -it -p 3000:5173 socialite-react
    ```

    This command will start the React app and expose it on port 3000. You can access the app by visiting http://localhost:3000 in your web browser.

## Customizations

If you need to customize any environment variables or configurations, you can modify the Dockerfile before building the image.

## Troubleshooting

- **Port Already in Use**: If port 3000 is already in use on your system, you can change the port mapping in the `docker run` command to a different available port, for example:

    ```bash
    docker run -it -p 4000:5173 socialite-react
    ```
