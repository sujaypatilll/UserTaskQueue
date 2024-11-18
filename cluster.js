const cluster = require('cluster');
const os = require('os');
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  console.log(`Master process is running. Forking for ${numCPUs} CPUs.`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Starting a new one.`);
    cluster.fork();
  });
} else {
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} running on port ${PORT}`);
  });
}