/**
 * Firebase Admin Initialization
 *
 * - Loads Firebase Admin SDK using environment variables
 * - Sets up Firestore database instance
 * - Exports the `db` object for use in controllers and routes
 */

// Import Firebase Admin SDK
const admin = require('firebase-admin');

// Initialize Firebase Admin with credentials from .env
admin.initializeApp({
    credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

const db = admin.firestore();
module.exports = db;
