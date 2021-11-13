export default {
  development: {
    appPort: process.env.APP_PORT,
    host: process.env.DB_HOST,
    schema: process.env.DB_SCHEMA,
    dBaseUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_SCHEMA}?${process.env.DB_OPTIONS}`,
    saltRounds: process.env.SALT_ROUNDS,
    cookie_name: process.env.COOKIE_NAME,
    secret: process.env.SECRET,
    tokenExpDate: process.env.TOKEN_EXPIRY_DATE,
  },
  production: {},
};
