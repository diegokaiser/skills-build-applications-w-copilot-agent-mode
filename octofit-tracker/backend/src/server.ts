import express from 'express';
import './config/database.js';
import { Activity } from './models/activity.js';
import { Leaderboard } from './models/leaderboard.js';
import { Team } from './models/team.js';
import { User } from './models/user.js';
import { Workout } from './models/workout.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api', apiBaseUrl });
});

app.get('/api/users/', (_request, response) => {
  User.find().sort({ name: 1 }).lean().then((users) => response.json(users));
});

app.get('/api/teams/', (_request, response) => {
  Team.find().populate('members', 'name email avatar level').sort({ totalPoints: -1 }).lean().then((teams) => response.json(teams));
});

app.get('/api/activities/', (_request, response) => {
  Activity.find().populate('user', 'name email avatar').sort({ completedAt: -1 }).lean().then((activities) => response.json(activities));
});

app.get('/api/leaderboard/', (_request, response) => {
  Leaderboard.find().populate('user', 'name email avatar').sort({ rank: 1 }).lean().then((entries) => response.json(entries));
});

app.get('/api/workouts/', (_request, response) => {
  Workout.find().sort({ title: 1 }).lean().then((workouts) => response.json(workouts));
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
});