const instancesEnvVar = process.env.MICROSERVICE_INSTANCES;
const parsedInstances = parseInt(instancesEnvVar, 10);
const instances = (!isNaN(parsedInstances) && parsedInstances > 0)
  ? parsedInstances
  : 1;

console.log(`[PM2 Config] Determined instance count: ${instances} (Requested: ${instancesEnvVar})`);

module.exports = {
  apps: [
    {
      name: "default",
      script: "npm",
      args: "start",
      instances: instances,
      exec_mode: "cluster",
      env: {
        ...process.env,
      },
      log_date_format: "YYYY-MM-DD HH:mm Z",
      // max_memory_restart: "250M", // Restart if memory exceeds 250MB
      out_file: "/dev/null",
      error_file: "/dev/null",
      // merge_logs: true, //Merge logs from all instances into one file (useful for cluster mode)
    }
  ],
}