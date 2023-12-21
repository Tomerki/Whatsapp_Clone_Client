#!/bin/bash

# Create package.json file
echo '{
  "name": "whatsapp_clone_project",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@microsoft/signalr": "^8.0.0",
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^14.1.2",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.6.2",
    "bootstrap": "^5.1.3",
    "react": "^18.0.0",
    "react-bootstrap": "^2.2.3",
    "react-bootstrap-icons": "^1.8.1",
    "react-dom": "^18.0.0",
    "react-router-dom": "^6.3.0",
    "react-scripts": "5.0.0",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}' > package.json

# Install dependencies
npm install

# Inform user
echo "Project setup complete. You can now run 'npm start' to start the development server."
