module.exports = {
  apps: [
    {
      name: 'hirenxt-backend-dev',           // Name of the app
      script: 'npm',                // Use npm to run the command
      args: 'run start:prod',       // Command to run (npm run start:prod)
      instances: 1,                 // Number of instances (can be 'max' for auto scaling)
      autorestart: true,            // Restart if the app crashes
      watch: true
    }
    // Add more apps as needed
  ],
};
