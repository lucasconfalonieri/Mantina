module.exports = {
  database: {
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
};
