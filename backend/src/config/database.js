import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || 'women_safety_db',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: true,
        underscored: true,
        freezeTableName: true
    }
});

// Test connection
export const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ PostgreSQL connection established successfully.');
        return true;
    } catch (error) {
        console.error('❌ Unable to connect to PostgreSQL:', error.message);
        return false;
    }
};

// Sync database
export const syncDatabase = async (force = false) => {
    try {
        await sequelize.sync({ force, alter: !force });
        console.log(`✅ Database ${force ? 'reset and ' : ''}synchronized successfully.`);
    } catch (error) {
        console.error('❌ Database sync error:', error.message);
        throw error;
    }
};

export default sequelize;
