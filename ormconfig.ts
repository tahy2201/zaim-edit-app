const env = process.env

export default {
   type: 'postgres',
   url: env.DATABASE_URL,
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