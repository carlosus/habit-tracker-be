const chance = require('chance').Chance();
const Habit = require('../lib/models/Habit');

module.exports = async({ habits = 5 } = { habits: 5 }) => {
  const createdHabits = await Habit.create(
    [...Array(habits)].map(() => ({
      name: chance.name(),
      description: chance.string(),
      user: chance.string(),
      timestamps: chance.timestamp()
    }))
  );


  return {
    habits: createdHabits,
  };
};
