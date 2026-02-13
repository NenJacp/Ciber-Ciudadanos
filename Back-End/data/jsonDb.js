const fs = require('fs').promises;
const path = require('path');

const USERS_FILE = path.join(__dirname, 'users.json');

// Helper to read users from the JSON file
async function readUsers() {
    try {
        const data = await fs.readFile(USERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // File not found, return empty array
            return [];
        }
        console.error('Error reading users.json:', error);
        return [];
    }
}

// Helper to write users to the JSON file
async function writeUsers(users) {
    try {
        await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing to users.json:', error);
    }
}

// Mimic a simplified pg pool query function
const jsonDb = {
    // Specific methods that userController will use
    findUserByEmail: async (email) => {
        const users = await readUsers();
        return users.find(user => user.email === email);
    },
    // NEW: Find user by username
    findUserByUsername: async (username) => {
        const users = await readUsers();
        return users.find(user => user.username === username);
    },
    createUser: async (username, email, password) => {
        const users = await readUsers();
        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1, // Simple ID generation
            username,
            email,
            password, // In a real app, hash this!
            created_at: new Date().toISOString(),
        };
        users.push(newUser);
        await writeUsers(users);
        return newUser;
    },
    // A simplified query for find by email to match pg pool interface if needed,
    // though direct methods are preferred for clarity with JSON db.
    query: async (sql, params) => {
        if (sql.includes('SELECT * FROM users WHERE email = $1') && params && params[0]) {
            const user = await jsonDb.findUserByEmail(params[0]);
            return { rows: user ? [user] : [] };
        }
        // NEW: Handle SELECT by username
        if (sql.includes('SELECT * FROM users WHERE username = $1') && params && params[0]) {
            const user = await jsonDb.findUserByUsername(params[0]);
            return { rows: user ? [user] : [] };
        }
        // For INSERT
        if (sql.includes('INSERT INTO users') && params) {
            // This is very basic and assumes order of params: username, email, password
            const newUser = await jsonDb.createUser(params[0], params[1], params[2]);
            return { rows: [newUser] };
        }
        console.warn('jsonDb.query received an unhandled SQL:', sql);
        return { rows: [] };
    }
};

module.exports = jsonDb;
