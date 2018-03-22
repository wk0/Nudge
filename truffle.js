module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ganache_gui: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" 
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 500
    }
  } 
};
