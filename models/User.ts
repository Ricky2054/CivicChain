import { Schema, model, mongoose } from '../lib/db';

// Interface for User document
interface IUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  aadhaarNumber: string;
  socialCredit: {
    score: number;
    lastUpdated: Date;
    categories: {
      civic: number;
      finance: number;
      environment: number;
      education: number;
      health: number;
      community: number;
    };
    history?: Array<{
      category: string;
      change: number;
      date: Date;
      reason: string;
      newCategoryScore: number;
      newTotalScore: number;
    }>;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Mock for User Schema
const UserSchema = new Schema<IUser>(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true, 
      lowercase: true 
    },
    phone: { 
      type: String, 
      required: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    aadhaarNumber: { 
      type: String, 
      required: true, 
      unique: true 
    },
    socialCredit: {
      score: { 
        type: Number, 
        default: 100 
      },
      lastUpdated: { 
        type: Date, 
        default: Date.now 
      },
      categories: {
        civic: { 
          type: Number, 
          default: 50 
        },
        finance: { 
          type: Number, 
          default: 50 
        },
        environment: { 
          type: Number, 
          default: 50 
        },
        education: { 
          type: Number, 
          default: 50 
        },
        health: { 
          type: Number, 
          default: 50 
        },
        community: { 
          type: Number, 
          default: 50 
        }
      },
      history: [
        {
          category: String,
          change: Number,
          date: { 
            type: Date, 
            default: Date.now 
          },
          reason: String,
          newCategoryScore: Number,
          newTotalScore: Number
        }
      ]
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    updatedAt: { 
      type: Date, 
      default: Date.now 
    }
  },
  { timestamps: true }
);

// Add indexes for frequently queried fields
UserSchema.index({ email: 1 });
UserSchema.index({ aadhaarNumber: 1 });
UserSchema.index({ 'socialCredit.score': -1 });

// Mock implementation for User model
// This will prevent errors when importing User without mongoose installed
class MockUserModel {
  static findById(id: string) {
    // Return mock user data for development
    return Promise.resolve({
      _id: id,
      name: 'Mock User',
      email: 'user@example.com',
      phone: '1234567890',
      aadhaarNumber: '123456789012',
      socialCredit: {
        score: 450,
        lastUpdated: new Date(),
        categories: {
          civic: 70,
          finance: 80,
          environment: 60,
          education: 75,
          health: 65,
          community: 90
        },
        history: [],
        toObject: function() {
          return this;
        }
      },
      save: () => Promise.resolve(this),
      toObject: function() {
        return this;
      }
    });
  }

  static find() {
    return Promise.resolve([
      {
        _id: '1',
        name: 'Mock User 1',
        email: 'user1@example.com',
        socialCredit: { score: 450 }
      },
      {
        _id: '2',
        name: 'Mock User 2',
        email: 'user2@example.com',
        socialCredit: { score: 380 }
      }
    ]);
  }

  static findOne({ email }: { email: string }) {
    return Promise.resolve({
      _id: '1',
      name: 'Mock User',
      email,
      password: '$2a$10$mockPasswordHash',
      phone: '1234567890',
      aadhaarNumber: '123456789012',
      socialCredit: {
        score: 450,
        categories: {
          civic: 70,
          finance: 80,
          environment: 60,
          education: 75,
          health: 65,
          community: 90
        }
      }
    });
  }

  static countDocuments() {
    return Promise.resolve(2);
  }

  static create(userData: any) {
    return Promise.resolve({
      _id: 'new-user-id',
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
}

// Use the mock model instead of mongoose.model
const User = typeof mongoose.models.User !== 'undefined' 
  ? mongoose.models.User 
  : model<IUser>('User', UserSchema);

// Replace the export with our mock for development
export default MockUserModel; 