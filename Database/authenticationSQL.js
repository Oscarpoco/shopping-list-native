import { openDatabaseAsync } from 'expo-sqlite';


let db;

// INITIALIZE DATABASE
export const initializeAuthenticationDatabase = async () => {
    try {

        if (!db) {
            db = await openDatabaseAsync('appDatabase.db');
        }

        await db.execAsync(`
                PRAGMA journal_mode = WAL;
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    email TEXT NOT NULL UNIQUE,
                    password TEXT NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    phone TEXT NOT NULL UNIQUE,
                    status TEXT NOT NULL
                );
                `);

        console.log('DATABASE INITIALIZED SUCCESSFULLY AND TABLE CREATED (IF NOT EXISTS).');
        return true;
    } catch (error) {
        console.error('Error initializing database', error);
        throw new Error('Failed to initialize database');
    }
}
// ENDS


