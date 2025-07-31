// This is a simulated user database.
// In a real application, you would use a proper database like Firestore.

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // Password should be hashed in a real app
}

// In-memory array to store users
export const users: User[] = [];

let userIdCounter = 1;

/**
 * Adds a new user to the simulated database.
 * In a real app, this would also hash the password.
 */
export function addUser(user: Omit<User, 'id'>): User {
  if (users.find(u => u.email === user.email)) {
    throw new Error('User with this email already exists.');
  }
  const newUser: User = { ...user, id: userIdCounter++ };
  users.push(newUser);
  console.log('Current users:', users); // For debugging
  return newUser;
}

/**
 * Validates user credentials.
 * In a real app, this would compare a hashed password.
 */
export function validateUser(email?: string, password?: string): User | undefined {
    if (!email || !password) {
        return undefined;
    }
    const user = users.find(u => u.email === email && u.password === password);
    return user;
}

/**
 * Finds a user by email.
 */
export function findUserByEmail(email: string): User | undefined {
  return users.find(u => u.email === email);
}
