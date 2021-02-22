const env = process.env

export default {
   type: 'postgres',
   host: env.DB_HOST,
   port: 5432,
   username: env.DB_USER,
   password: env.DB_PASS,
   database: env.DATABASE,
   logging: false,
   extra: {
      ssl: {
        rejectUnauthorized: false
      }
   },
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}