import sequelize from '../config/database.js';
import User from './User.js';
import Report from './Report.js';

// Define relationships
User.hasMany(Report, {
    foreignKey: 'userId',
    as: 'reports'
});

Report.belongsTo(User, {
    foreignKey: 'userId',
    as: 'reporter'
});

Report.belongsTo(User, {
    foreignKey: 'resolvedBy',
    as: 'resolver'
});

// Export models and sequelize instance
export {
    sequelize,
    User,
    Report
};

export default {
    sequelize,
    User,
    Report
};
