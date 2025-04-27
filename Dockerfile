FROM ubuntu:22.04

# Install system dependencies
RUN apt-get update && \
    apt-get install -y \
      curl \
      build-essential \
      libwebkit2gtk-4.0-dev \
      libsoup2.4-dev \
      pkg-config \
      libssl-dev \
      libgtk-3-dev \
      ca-certificates \
      git \
      nodejs \
      npm

# Install Rust
RUN curl -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

WORKDIR /app

# Copy your project files
COPY . .

# Install npm dependencies
RUN npm install

# Build the Tauri app
CMD ["npm", "run", "tauri", "build"]
