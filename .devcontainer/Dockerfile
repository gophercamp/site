FROM mcr.microsoft.com/devcontainers/javascript-node:20

# Install additional packages
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    curl \
    git \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Install global node packages
RUN npm install -g npm@latest

# Set up non-root user
USER node

# Set working directory
WORKDIR /workspace
