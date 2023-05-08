const { faker } = require("@faker-js/faker");

const UserModel = require("../models/user");
const TodoModel = require("../models/todo");
const userService = require("../services/user");

const seeder = async () => {
  try {
    const users = [];
    const todos = [];

    for (let i = 0; i < 10; i++) {
      const user = await UserModel.create({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: await userService.hashPassword("123456"),
      });

      users.push(user);
    }

    for (let i = 0; i < 50; i++) {
      const todo = await TodoModel.create({
        title: faker.lorem.slug(),
        description: faker.lorem.sentence(),
        status: faker.helpers.arrayElement([true, false]),
        user: faker.helpers.arrayElement(users),
      });

      todos.push(todo);
    }

    console.log("Seeding completed");
  } catch (error) {
    console.log(error);
  }
};

module.exports = seeder;
