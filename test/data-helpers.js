require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const Habit = require('../lib/models/Habit');

beforeAll(() => {
  connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

beforeEach(() => {
  return Habit.create([
    { habit: 'Drink Water', description: 'This is good', user: '1234' },
    { habit: 'Eat Food', description: 'MMMM', user: '1234' },
    { habit: 'Sleep', description: 'Rest is good', user: '1234' }
  ]);
});

afterAll(() => {
  return mongoose.connection.close();
});
