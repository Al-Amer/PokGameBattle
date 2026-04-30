import sequelize from '../config/database';
import User from '../models/User';

const syncDatabase = async () => {
  try {
    // Sync all models (create tables if they don't exist)
    await sequelize.sync({ alter: true });
    console.log('✅ Database tables created/updated');
    
    // Check if test user exists
    const userCount = await User.count();
    if (userCount === 0) {
      await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        wins: 5,
        losses: 2,
        totalBattles: 7,
        favoritePokemon: 'charizard'
      });
      console.log('✅ Test user created: test@example.com / password123');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Database sync failed:', error);
    return false;
  }
};

export default syncDatabase;
