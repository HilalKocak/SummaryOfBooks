const userService = require('../user-service');
const User = require('../../models/user');
const app = require('../../index');
const request = require('supertest')(app);


describe('UserService', () => {
  describe('findByName', () => {
    it('should return the user with the given name', async () => {
      const userToCreate = {
        name: 'findByName',
        email: 'hilal@gmail.com',
        phone: '2233'
    };
      
      const createResponse = await request
      .post('/users')
      .send(userToCreate)
      .expect(200);

      const foundUser = await userService.findByName('findByName');
      console.log("foundUser", foundUser)
      expect(foundUser.name).toBe('findByName');
    });


  });
});
