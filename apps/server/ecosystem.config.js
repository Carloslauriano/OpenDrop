module.exports = {
  apps: [
    {
      name: 'OpenDropServer',
      script: './build/index.js',
      exec_mode: 'fork', 
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 8080
      }
    }
  ]
};
