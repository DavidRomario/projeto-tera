module.exports = {
  username: process.env.MYSQL_USER || "tenisstore",
  password_root: process.env.MYSQL_ROOT_PASSWORD || "password",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "db",
  host: process.env.MYSQL_HOST || "localhost",
  dialect: "mysql",
};
