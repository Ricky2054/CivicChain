import { Schema, model, mongoose } from '../lib/db';

// Interface for FinancialAccount document
interface IFinancialAccount {
  userId: string;
  accountNumber: string;
  type: string;
  balance: number;
  name: string;
  institution: string;
  isActive: boolean;
  isVerified: boolean;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mock for FinancialAccount Schema
const FinancialAccountSchema = new Schema<IFinancialAccount>(
  {
    userId: { 
      type: String, 
      required: true,
      index: true 
    },
    accountNumber: { 
      type: String, 
      required: true,
      unique: true 
    },
    type: { 
      type: String, 
      required: true,
      enum: ['Savings', 'Checking', 'Credit', 'Loan', 'Investment'] 
    },
    balance: { 
      type: Number, 
      required: true,
      default: 0 
    },
    name: { 
      type: String, 
      required: true 
    },
    institution: { 
      type: String, 
      required: true 
    },
    isActive: { 
      type: Boolean, 
      default: true 
    },
    isVerified: { 
      type: Boolean, 
      default: false 
    },
    currency: { 
      type: String, 
      default: 'INR' 
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
FinancialAccountSchema.index({ userId: 1, isActive: 1 });
FinancialAccountSchema.index({ accountNumber: 1 });

// Mock implementation for FinancialAccount model
class MockFinancialAccountModel {
  static find(query = {}) {
    // Mock accounts data based on user ID
    const userId = query.userId || '1';
    
    return Promise.resolve([
      {
        _id: '1',
        userId,
        accountNumber: 'SB1001',
        type: 'Savings',
        balance: 12500.75,
        balanceRaw: 12500.75,
        name: 'Primary Savings',
        institution: 'State Bank',
        isActive: true,
        isVerified: true,
        currency: 'INR',
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
        updatedAt: new Date(),
        toObject: function() {
          return this;
        }
      },
      {
        _id: '2',
        userId,
        accountNumber: 'CC2002',
        type: 'Credit',
        balance: -5200.30,
        balanceRaw: -5200.30,
        name: 'Credit Card',
        institution: 'National Bank',
        isActive: true,
        isVerified: true,
        currency: 'INR',
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
        updatedAt: new Date(),
        toObject: function() {
          return this;
        }
      },
      {
        _id: '3',
        userId,
        accountNumber: 'LN3003',
        type: 'Loan',
        balance: -50000,
        balanceRaw: -50000,
        name: 'Small Business Loan',
        institution: 'Rural Development Bank',
        isActive: true,
        isVerified: true,
        currency: 'INR',
        createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000), // 120 days ago
        updatedAt: new Date(),
        toObject: function() {
          return this;
        }
      }
    ]);
  }

  static findById(id: string) {
    return Promise.resolve({
      _id: id,
      userId: '1',
      accountNumber: 'SB1001',
      type: 'Savings',
      balance: 12500.75,
      name: 'Primary Savings',
      institution: 'State Bank',
      isActive: true,
      isVerified: true,
      currency: 'INR',
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      save: () => Promise.resolve(this),
      toObject: function() {
        return this;
      }
    });
  }

  static findOne(query = {}) {
    return Promise.resolve({
      _id: '1',
      userId: '1',
      accountNumber: query.accountNumber || 'SB1001',
      type: 'Savings',
      balance: 12500.75,
      name: 'Primary Savings',
      institution: 'State Bank',
      isActive: true,
      isVerified: true,
      currency: 'INR',
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      toObject: function() {
        return this;
      }
    });
  }

  static create(accountData: any) {
    return Promise.resolve({
      _id: 'new-account-id',
      ...accountData,
      createdAt: new Date(),
      updatedAt: new Date(),
      toObject: function() {
        return this;
      }
    });
  }

  static findByIdAndUpdate(id: string, updateData: any, options = {}) {
    return Promise.resolve({
      _id: id,
      userId: '1',
      accountNumber: 'SB1001',
      ...updateData,
      type: updateData.type || 'Savings',
      institution: updateData.institution || 'State Bank',
      updatedAt: new Date(),
      toObject: function() {
        return this;
      }
    });
  }
}

// Use the mock model instead of mongoose.model
const FinancialAccount = typeof mongoose.models.FinancialAccount !== 'undefined' 
  ? mongoose.models.FinancialAccount 
  : model<IFinancialAccount>('FinancialAccount', FinancialAccountSchema);

// Replace the export with our mock for development
export default MockFinancialAccountModel; 