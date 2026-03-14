export default () => ({
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL,
})
