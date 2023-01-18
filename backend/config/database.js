module.exports = {
  username: process.env.MYSQL_USER || "root",
  password_root: process.env.MYSQL_ROOT_PASSWORD || "password",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DATABASE || "backend",
  host: process.env.MYSQL_HOST || "localhost",
  dialect: "mysql",
};
