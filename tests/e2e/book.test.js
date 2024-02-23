const app = require('../../index');
const request = require('supertest')(app);

const mongoose = require('mongoose');
const Book = require('../../models/book')

describe('Book routes', () => {

  beforeAll(async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/book-test');
  });

  afterAll(async () => {
    
    await Book.deleteMany({});
  });

  it('should get all books', async () => {
    const response = await request.get('/books');
    expect(response.status).toBe(200);
  });


  it('should create a new user', async () => {
  
    const userToCreate = {
        name: 'Test user',
        email: 'hilal@gmail.com',
        phone: '2233'
    };
    const createResponse = await request
        .post('/users')
        .send(userToCreate)
        .expect(200);

    userId = createResponse.body._id;


    const userCreated = createResponse.body;
    expect(userCreated).toMatchObject(userToCreate);
   

});




 


});
