import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

declare global {
  // cache connections per database name
  var __mongooseConnections: Record<string, mongoose.Connection> | undefined;
}

if (!global.__mongooseConnections) global.__mongooseConnections = {};

/**
 * Connect to a specific MongoDB database and return a mongoose.Connection
 * This caches one connection per database name (so you can connect to multiple DBs)
 */
async function dbConnect(databaseName = ""): Promise<mongoose.Connection> {
  const name = databaseName || "admin";
  const cache = global.__mongooseConnections as Record<string, mongoose.Connection>;

  if (cache[name] && cache[name].readyState === 1) {
    return cache[name];
  }

  // If a connection is already being established but not open, return it after open
  if (cache[name]) {
    // wait for open
    await new Promise<void>((resolve, reject) => {
      cache[name].once("open", () => resolve());
      cache[name].once("error", (err) => reject(err));
    });
    return cache[name];
  }

  // create a new connection for this database name
  const conn = mongoose.createConnection(MONGODB_URI, {
    dbName: databaseName || undefined,
    bufferCommands: false,
    serverSelectionTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 30000, // 30 seconds
  });

  // wait for connection to open or error
  await new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error(`Connection timeout for database: ${name}`));
    }, 35000);

    conn.once("open", () => {
      clearTimeout(timeout);
      console.log(`MongoDB connected to database: ${name}`);
      resolve();
    });
    conn.once("error", (err) => {
      clearTimeout(timeout);
      console.error(`MongoDB connection error for database ${name}:`, err);
      reject(err);
    });
  });

  cache[name] = conn;
  return conn;
}

export default dbConnect;