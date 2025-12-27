import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Report = sequelize.define('Report', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  title: {
    type: DataTypes.STRING(500),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  category: {
    type: DataTypes.ENUM(
      'harassment',
      'assault',
      'stalking',
      'suspicious_activity',
      'poor_lighting',
      'unsafe_area',
      'other'
    ),
    allowNull: false
  },
  severity: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'critical'),
    defaultValue: 'medium'
  },
  status: {
    type: DataTypes.ENUM('pending', 'under_review', 'resolved', 'closed'),
    defaultValue: 'pending'
  },
  location: {
    type: DataTypes.JSONB,
    allowNull: false,
    validate: {
      isValidLocation(value) {
        if (!value.latitude || !value.longitude) {
          throw new Error('Location must include latitude and longitude');
        }
      }
    }
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  incidentDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  timeOfDay: {
    type: DataTypes.ENUM('morning', 'afternoon', 'evening', 'night'),
    allowNull: true
  },
  attachments: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: []
  },
  aiClassification: {
    type: DataTypes.JSONB,
    allowNull: true,
    comment: 'AI-generated classification and risk score'
  },
  adminNotes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  resolvedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  resolvedBy: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: 'Whether this report is visible on public map'
  },
  upvotes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'reports',
  indexes: [
    { fields: ['userId'] },
    { fields: ['status'] },
    { fields: ['category'] },
    { fields: ['severity'] },
    { fields: ['incidentDate'] },
    { fields: ['location'], using: 'gin' }
  ]
});

export default Report;
