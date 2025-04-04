import { Schema, model, mongoose } from '../lib/db';

// Interface for CivicEvent document
interface ICivicEvent {
  title: string;
  description: string;
  category: string;
  type: string;
  location: string | null;
  organizer: string;
  startDate: Date;
  endDate: Date;
  points: number;
  maxParticipants: number | null;
  currentParticipants: number;
  image: string | null;
  isActive: boolean;
  participants: Array<{
    userId: string;
    status: 'registered' | 'attended' | 'completed' | 'cancelled';
    registrationDate: Date;
  }>;
}

// Mock for CivicEvent Schema
const CivicEventSchema = new Schema<ICivicEvent>(
  {
    title: { 
      type: String, 
      required: true,
      trim: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    category: { 
      type: String, 
      required: true,
      enum: ['environment', 'education', 'health', 'community', 'governance', 'other']
    },
    type: { 
      type: String, 
      required: true,
      enum: ['local', 'online', 'hybrid']
    },
    location: { 
      type: String, 
      default: null 
    },
    organizer: { 
      type: String, 
      required: true 
    },
    startDate: { 
      type: Date, 
      required: true 
    },
    endDate: { 
      type: Date, 
      required: true 
    },
    points: { 
      type: Number, 
      required: true,
      min: 1 
    },
    maxParticipants: { 
      type: Number, 
      default: null 
    },
    currentParticipants: { 
      type: Number, 
      default: 0 
    },
    image: { 
      type: String, 
      default: null 
    },
    isActive: { 
      type: Boolean, 
      default: true 
    },
    participants: [
      {
        userId: { 
          type: String, 
          required: true 
        },
        status: { 
          type: String, 
          enum: ['registered', 'attended', 'completed', 'cancelled'], 
          default: 'registered' 
        },
        registrationDate: { 
          type: Date, 
          default: Date.now 
        }
      }
    ]
  }
);

// Add indexes for frequently queried fields
CivicEventSchema.index({ category: 1 });
CivicEventSchema.index({ startDate: 1 });
CivicEventSchema.index({ 'participants.userId': 1 });
CivicEventSchema.index({ isActive: 1 });

// Mock implementation for CivicEvent model
class MockCivicEventModel {
  static find(query = {}) {
    // Return mock civic event data
    return Promise.resolve([
      {
        _id: '1',
        title: 'Community Cleanup Drive',
        description: 'Join the community in cleaning up the local park and surrounding areas',
        category: 'environment',
        type: 'local',
        location: 'Central Park',
        organizer: 'City Council',
        startDate: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
        endDate: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
        points: 50,
        maxParticipants: 75,
        currentParticipants: 42,
        image: '/images/events/cleanup.jpg',
        isActive: true,
        participants: [],
        toObject: function() {
          return this;
        }
      },
      {
        _id: '2',
        title: 'Digital Literacy Workshop',
        description: 'Teach basic digital skills to underserved community members',
        category: 'education',
        type: 'hybrid',
        location: 'Public Library',
        organizer: 'Tech For All',
        startDate: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000),
        endDate: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
        points: 60,
        maxParticipants: 30,
        currentParticipants: 18,
        image: '/images/events/digital.jpg',
        isActive: true,
        participants: [],
        toObject: function() {
          return this;
        }
      }
    ]);
  }

  static findById(id: string) {
    return Promise.resolve({
      _id: id,
      title: 'Community Cleanup Drive',
      description: 'Join the community in cleaning up the local park and surrounding areas',
      category: 'environment',
      type: 'local',
      location: 'Central Park',
      organizer: 'City Council',
      startDate: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
      endDate: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
      points: 50,
      maxParticipants: 75,
      currentParticipants: 42,
      image: '/images/events/cleanup.jpg',
      isActive: true,
      participants: [
        {
          userId: '1',
          status: 'registered',
          registrationDate: new Date()
        }
      ],
      save: () => Promise.resolve(this),
      toObject: function() {
        return this;
      }
    });
  }

  static countDocuments() {
    return Promise.resolve(5);
  }

  static aggregate() {
    return Promise.resolve([
      {
        _id: { year: 2025, month: 4 },
        count: 3,
        points: 150
      },
      {
        _id: { year: 2025, month: 3 },
        count: 2,
        points: 110
      }
    ]);
  }

  static findByIdAndUpdate(id: string, update: any) {
    return Promise.resolve({
      _id: id,
      ...update,
      title: 'Community Cleanup Drive',
      isActive: update.isActive !== undefined ? update.isActive : true
    });
  }
}

// Use the mock model instead of mongoose.model
const CivicEvent = typeof mongoose.models.CivicEvent !== 'undefined' 
  ? mongoose.models.CivicEvent 
  : model<ICivicEvent>('CivicEvent', CivicEventSchema);

// Replace the export with our mock for development
export default MockCivicEventModel; 