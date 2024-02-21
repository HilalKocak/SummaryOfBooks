const app = require('../../index');
const request = require('supertest')(app);

const mongoose = require('mongoose');
const Book = require('../../models/book')

describe('Book routes', () => {
  let bookId;

  beforeAll(async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/book-test');
    const book = await Book.create({ name: 'Test Book' });
    bookId = book._id;
  });

  afterAll(async () => {
    
    await Book.deleteMany({});
  });

  it('should get all books', async () => {
    const response = await request.get('/books');
    expect(response.status).toBe(200);
  });



 


});
