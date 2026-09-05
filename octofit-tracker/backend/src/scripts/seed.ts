import mongoose from 'mongoose';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Alex Morgan', email: 'alex.morgan@example.com', avatar: 'AM', level: 12 },
      { name: 'Jordan Lee', email: 'jordan.lee@example.com', avatar: 'JL', level: 9 },
      { name: 'Taylor Smith', email: 'taylor.smith@example.com', avatar: 'TS', level: 7 },
    ]);

    const teams = await Team.insertMany([
      { name: 'Peak Performers', motto: 'Small steps, strong finish.', members: [users[0]._id, users[1]._id], totalPoints: 2480 },
      { name: 'Morning Movers', motto: 'Start strong together.', members: [users[2]._id], totalPoints: 1120 },
    ]);

    await Activity.insertMany([
      { user: users[0]._id, type: 'Run', durationMinutes: 42, calories: 410, completedAt: new Date('2026-09-03T07:30:00Z') },
      { user: users[1]._id, type: 'Strength', durationMinutes: 35, calories: 280, completedAt: new Date('2026-09-04T18:00:00Z') },
      { user: users[2]._id, type: 'Cycling', durationMinutes: 55, calories: 520, completedAt: new Date('2026-09-05T06:45:00Z') },
    ]);

    await Leaderboard.insertMany([
      { user: users[0]._id, points: 1480, rank: 1, streakDays: 14 },
      { user: users[1]._id, points: 1000, rank: 2, streakDays: 9 },
      { user: users[2]._id, points: 720, rank: 3, streakDays: 6 },
    ]);

    await Workout.insertMany([
      { title: 'Full-body foundation', category: 'Strength', difficulty: 'Beginner', durationMinutes: 30, exercises: ['Squats', 'Push-ups', 'Plank'] },
      { title: 'Tempo run builder', category: 'Cardio', difficulty: 'Intermediate', durationMinutes: 35, exercises: ['Warm-up', 'Tempo intervals', 'Cool-down'] },
      { title: 'Mobility reset', category: 'Mobility', difficulty: 'Beginner', durationMinutes: 20, exercises: ['Hip openers', 'Thoracic rotations', 'Hamstring stretch'] },
    ]);

    console.log(`Seeded ${users.length} users, ${teams.length} teams, 3 activities, 3 leaderboard entries, and 3 workouts`);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
