#!/bin/bash

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check for required tools
if ! command_exists node; then
    echo "Node.js is required but not installed. Please install Node.js first."
    exit 1
fi

if ! command_exists npm; then
    echo "npm is required but not installed. Please install npm first."
    exit 1
fi

if ! command_exists psql; then
    echo "PostgreSQL is required but not installed. Please install PostgreSQL first."
    exit 1
fi

echo "Setting up the project..."

# Create PostgreSQL database and user
echo "Setting up database..."
sudo -u postgres psql <<EOF
CREATE DATABASE notes_app;
CREATE USER notes_user WITH ENCRYPTED PASSWORD 'securepassword';
GRANT ALL PRIVILEGES ON DATABASE notes_app TO notes_user;
EOF

# Install backend dependencies
echo "Setting up backend..."
cd backend
npm install
echo "Building backend..."
npm run build

# Install frontend dependencies
echo "Setting up frontend..."
cd ../frontend
npm install
echo "Building frontend..."
npm run build

# Start both applications
echo "Starting the applications..."
cd ../backend
npm run start:dev &
cd ../frontend
npm run dev

# Trap SIGINT to kill both processes
trap 'kill $(jobs -p)' SIGINT
wait
