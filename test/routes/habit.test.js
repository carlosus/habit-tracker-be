require('../data-helpers');
const request = require('supertest');
const app = require('../../lib/app');
const Habit = require('../../lib/models/Habit');

jest.mock('../../lib/middleware/ensure-auth.js');

describe('habit routes', () => {
  it('can create a habit', () => {
    return request(app)
      .post('/api/v1/habits')
      .send({ habit: 'blah', description: 'blah blah' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          habit: 'blah',
          description: 'blah blah',
          user: '1234',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets all habits', () => {
    return request(app)
      .get('/api/v1/habits')
      .then(res => {
        expect(res.body).toHaveLength(3);
      });
  });

  it('gets a habit by id', async() => {
    const habit = await Habit.create({
      habit: 'My Habit',
      description: 'Huh?',
      user: '1234'
    });

    return request(app)
      .get(`/api/v1/habits/${habit._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...habit.toJSON(),
          _id: habit._id.toString(),
          createdAt: habit.createdAt.toISOString(),
          updatedAt: habit.updatedAt.toISOString()
        });
      });
  });

  it('updates a habit name', async() => {
    const habit = await Habit.create({
      habit: 'My Habit',
      description: 'Huh?',
      user: '1234'
    });

    return request(app)
      .patch(`/api/v1/habits/${habit._id}`)
      .send({ habit: 'Works' })
      .then(res => {
        expect(res.body.habit).toEqual('Works');
      });
  });

  it('updates a habit description', async() => {
    const habit = await Habit.create({
      habit: 'My Habit',
      description: 'Huh?',
      user: '1234'
    });

    return request(app)
      .patch(`/api/v1/habits/${habit._id}`)
      .send({ description: 'Works' })
      .then(res => {
        expect(res.body.description).toEqual('Works');
      });
  });

  it('deletes a habit by id', async() => {
    const habit = await Habit.create({
      habit: 'My Habit',
      description: 'Huh?',
      user: '1234'
    });

    return request(app)
      .delete(`/api/v1/habits/${habit._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...habit.toJSON(),
          _id: habit._id.toString(),
          createdAt: habit.createdAt.toISOString(),
          updatedAt: habit.updatedAt.toISOString()
        });
      });
  });
});

