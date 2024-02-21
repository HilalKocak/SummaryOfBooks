const app = require('../../index');
const request = require('supertest')(app);

const mongoose = require('mongoose');


const Book = require('../../models/book')
const Genre = require('../../models/genre')
const Post = require('../../models/post')
const User = require('../../models/user');




describe('User routes', () => {
  let userId;
  let genreId;
  let bookId;
  beforeAll(async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/book-test');
  });

  afterAll(async () => {
 
    await User.deleteMany({});
    await Book.deleteMany({});
    await Post.deleteMany({});
    await Genre.deleteMany({});
    await mongoose.disconnect();
  });



  it('should create a new user', async () => {
    // Create a new user
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

  it('should get all users', async () => {
    const response = await request.get('/users');
    expect(response.status).toBe(200);
  });

  it('should get a single user', async () => {
    const response = await request.get(`/users/${userId}`);
    expect(response.status).toBe(200);
  });

  it('should return 404 if user not found', async () => {
    const invalidUserId = '65d65f3d4050a85444613423';
    const response = await request.get(`/users/${invalidUserId}`);
    expect(response.status).toBe(404);
    expect(response.text).toBe('Can not find user');
  });

  it('should add a genre to a user', async () => {
    const genreName = 'Fantasy';
    const response = await request
      .post(`/users/${userId}/genre`)
      .send({ name: genreName });

    expect(response.status).toBe(201);

 
    expect(response.body.name).toBe(genreName);
    console.log("**", response.body.user._id, userId)
    expect(response.body.user._id).toEqual(userId);
    
    genreId = response.body._id

    const savedGenre = await Genre.findById(genreId);
    expect(savedGenre).toBeDefined();
    expect(savedGenre.name).toBe(genreName);
    expect(savedGenre).toMatchObject({ name: genreName });
  });

  it('should create a new book for a user', async () => {
    const newBook = { name: 'New Book', author: 'Author', genreId: `${genreId}` }; 
    const response = await request
      .post(`/users/${userId}/book`)
      .send(newBook);
    expect(response.status).toBe(201);
    bookId = response.body._id;
    console.log("response.body", response.body)
    console.log("newBook", newBook)
    expect(response.body).toMatchObject({name: 'New Book', author: 'Author'});
  });

  it('should get a single book', async () => {
    const response = await request.get(`/books/${bookId}`);
    expect(response.status).toBe(200);
  });

  it('should update a book', async () => {
    const newName = 'Updated Book Name';
    const response = await request
      .patch(`/books/${bookId}`)
      .send({ name: newName });
    expect(response.status).toBe(200);
    expect(response.text).toBe('Updated!');

   
    const updatedBook = await Book.findById(bookId);
    expect(updatedBook.name).toBe(newName);
  });

  it('should delete a book', async () => {
    const response = await request.delete(`/books/delete-book/${bookId}`);
    expect(response.status).toBe(200);
    expect(response.text).toBe('OK');
  });

  
  it('should delete a user', async () => {
    const response = await request.delete(`/users/${userId}`);
    expect(response.status).toBe(200);
  });


});
