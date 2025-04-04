import { Schema, model, mongoose } from '../lib/db';

// Interface for Transaction document
interface ITransaction {
  userId: string;
  accountId: string;
  type: 'debit' | 'credit' | 'transfer';
  amount: number;
  description: string;
  category: string;
  status: 'pending' | 'completed' | 'failed' | 'reversed';
  transactionDate: Date;
  reference: string;
  merchant?: string;
  location?: string;
  currency: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Mock for Transaction Schema
const TransactionSchema = new Schema<ITransaction>(
  {
    userId: { 
      type: String, 
      required: true,
      index: true 
    },
    accountId: { 
      type: String, 
      required: true 
    },
    type: { 
      type: String, 
      required: true,
      enum: ['debit', 'credit', 'transfer'] 
    },
    amount: { 
      type: Number, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    category: { 
      type: String, 
      required: true 
    },
    status: { 
      type: String, 
      required: true,
      enum: ['pending', 'completed', 'failed', 'reversed'],
      default: 'completed' 
    },
    transactionDate: { 
      type: Date, 
      default: Date.now 
    },
    reference: { 
      type: String 
    },
    merchant: { 
      type: String 
    },
    location: { 
      type: String 
    },
    currency: { 
      type: String, 
      default: 'INR' 
    },
    isActive: { 
      type: Boolean, 
      default: true 
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
TransactionSchema.index({ userId: 1, transactionDate: -1 });
TransactionSchema.index({ accountId: 1 });
TransactionSchema.index({ status: 1 });

// Mock implementation for Transaction model
class MockTransactionModel {
  static find(query = {}) {
    // Mock transactions data based on user ID
    const userId = query.userId || '1';
    
    return Promise.resolve([
      {
        _id: '1',
        userId,
        accountId: '1',
        type: 'debit',
        amount: 1500,
        description: 'Groceries at SuperMart',
        category: 'Food & Groceries',
        status: 'completed',
        transactionDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        reference: 'TXN123456',
        merchant: 'SuperMart',
        location: 'Main Street',
        currency: 'INR',
        isActive: true,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        toObject: function() {
          return this;
        }
      },
      {
        _id: '2',
        userId,
        accountId: '1',
        type: 'credit',
        amount: 25000,
        description: 'Salary Deposit',
        category: 'Income',
        status: 'completed',
        transactionDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        reference: 'TXN123457',
        merchant: 'Employer Inc',
        currency: 'INR',
        isActive: true,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        toObject: function() {
          return this;
        }
      },
      {
        _id: '3',
        userId,
        accountId: '2',
        type: 'debit',
        amount: 2000,
        description: 'Restaurant Dinner',
        category: 'Dining',
        status: 'completed',
        transactionDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        reference: 'TXN123458',
        merchant: 'Fine Dining Restaurant',
        location: 'Downtown',
        currency: 'INR',
        isActive: true,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        toObject: function() {
          return this;
        }
      },
      {
        _id: '4',
        userId,
        accountId: '3',
        type: 'debit',
        amount: 5000,
        description: 'Loan EMI Payment',
        category: 'Loan Payment',
        status: 'completed',
        transactionDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
        reference: 'TXN123459',
        merchant: 'Rural Development Bank',
        currency: 'INR',
        isActive: true,
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        toObject: function() {
          return this;
        }
      },
      {
        _id: '5',
        userId,
        accountId: '1',
        type: 'debit',
        amount: 3500,
        description: 'Utility Bills',
        category: 'Bills & Utilities',
        status: 'completed',
        transactionDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
        reference: 'TXN123460',
        merchant: 'Utility Provider',
        currency: 'INR',
        isActive: true,
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
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
      accountId: '1',
      type: 'debit',
      amount: 1500,
      description: 'Groceries at SuperMart',
      category: 'Food & Groceries',
      status: 'completed',
      transactionDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      reference: 'TXN123456',
      merchant: 'SuperMart',
      location: 'Main Street',
      currency: 'INR',
      isActive: true,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      save: () => Promise.resolve(this),
      toObject: function() {
        return this;
      }
    });
  }

  static create(transactionData: any) {
    return Promise.resolve({
      _id: 'new-transaction-id',
      ...transactionData,
      transactionDate: transactionData.transactionDate || new Date(),
      reference: transactionData.reference || `TXN${Math.floor(Math.random() * 1000000)}`,
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
      accountId: '1',
      ...updateData,
      type: updateData.type || 'debit',
      amount: updateData.amount || 1500,
      updatedAt: new Date(),
      toObject: function() {
        return this;
      }
    });
  }

  static countDocuments(query = {}) {
    return Promise.resolve(25); // Mock count
  }
}

// Use the mock model instead of mongoose.model
const Transaction = typeof mongoose.models.Transaction !== 'undefined' 
  ? mongoose.models.Transaction 
  : model<ITransaction>('Transaction', TransactionSchema);

// Replace the export with our mock for development
export default MockTransactionModel; 