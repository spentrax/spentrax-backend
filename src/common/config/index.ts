export default function configuration() {
  return {
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    jwtAccessDuration: process.env.JWT_ACCESS_DURATION,
    jwtRefreshDuration: process.env.JWT_REFRESH_DURATION,
    apiKey: process.env.API_KEY,
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL,
  }
}
