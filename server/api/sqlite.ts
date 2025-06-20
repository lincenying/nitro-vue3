import { useDatabase } from 'nitropack/runtime'

export default defineEventHandler(async () => {
    const db = useDatabase()

    // Create users table
    await db.sql`DROP TABLE IF EXISTS users`
    await db.sql`CREATE TABLE IF NOT EXISTS users ("id" TEXT PRIMARY KEY, "firstName" TEXT, "lastName" TEXT, "email" TEXT)`

    // Add a new user
    const userId = String(Math.round(Math.random() * 10_000))
    await db.sql`INSERT INTO users VALUES (${userId}, 'John', 'Doe', '')`

    // Query for users
    const { rows } = await db.sql`SELECT * FROM users WHERE id = ${userId}`

    return {
        code: 200,
        message: 'API is working',
        data: rows,
    }
})
