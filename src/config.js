module.exports = {
  db: {
    host: process.env.DB_HOST || "database-drteeth.czkzrsspkzs1.us-east-2.rds.amazonaws.com",
    user: process.env.DB_USER || "drteeth", 
    password: process.env.DB_PASSWORD || "proyecto",
    database: process.env.DB_DATABASE || "proyecto_drteeth", 
    ssl: process.env.DB_SSL || true,
    multipleStatements: process.env.DB_MULTIPLESTATEMENTS || true,
  },
};
