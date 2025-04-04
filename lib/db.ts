// Mock mongoose implementation since we're having issues installing the real package

// Define mongoose Types
export const Types = {
  ObjectId: (id: string) => id
};

// Define a mongoose Schema class
class Schema {
  constructor(definition: any, options?: any) {
    this.definition = definition;
    this.options = options;
  }
  
  index(fields: any, options?: any) {
    return this;
  }
  
  virtual(name: string) {
    return {
      get: (fn: Function) => {}
    };
  }
}

// Mock model function
function model(name: string, schema?: any) {
  return {
    find: () => Promise.resolve([]),
    findById: () => Promise.resolve({}),
    findOne: () => Promise.resolve({}),
    countDocuments: () => Promise.resolve(0),
    create: (data: any) => Promise.resolve(data),
    findByIdAndUpdate: () => Promise.resolve({}),
    aggregate: () => Promise.resolve([]),
  };
}

// Mock mongoose connection
async function connect(uri: string) {
  console.log('Mock mongoose connected to:', uri);
  return { connection: { readyState: 1 } };
}

// Define mock session functions
function startSession() {
  return Promise.resolve({
    startTransaction: () => {},
    commitTransaction: () => Promise.resolve(),
    abortTransaction: () => Promise.resolve(),
    endSession: () => {}
  });
}

// Export the mongoose mock
const mongoose = {
  connect,
  Schema,
  model,
  models: {},
  startSession,
  Types
};

// Mock dbConnect function
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/civic-chain';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
export { mongoose, Schema, model }; 