module.exports = {
  db: {
    host: process.env.DB_HOST || "drteeth.mysql.database.azure.com",
    user: process.env.DB_USER || "drteeth@drteeth",
    password: process.env.DB_PASSWORD || "teethdr99.",
    database: process.env.DB_DATABASE || "drteeth",
    ssl: process.env.DB_SSL || true,
    multipleStatements: process.env.DB_MULTIPLESTATEMENTS || true,
  },
};
