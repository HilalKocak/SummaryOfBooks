const app = require('../../index');
const request = require('supertest')(app);
app.use((err, req, res, next) => {
  // Hata durumunda JSON formatında yanıt döndür
  res.status(500).json({ error: 'Internal server error' });
});
const mongoose = require('mongoose');


const Book = require('../../models/book')
const Genre = require('../../models/genre')
const Post = require('../../models/post')
const User = require('../../models/user');

const userService = require('../../services/user-service')
const bookService = require('../../services/book-service')


describe('User routes', () => {
  let newBook;
  let userId;
  let genreId;
  let bookId;
  beforeAll(async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/book-test');
  });

  // afterAll(async () => {
 
  //   await User.deleteMany({});
  //   await Book.deleteMany({});
  //   await Post.deleteMany({});
  //   await Genre.deleteMany({});
  //   await mongoose.disconnect();
  // });



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
    expect(response.body.user._id).toEqual(userId);
    
    genreId = response.body._id

    const savedGenre = await Genre.findById(genreId);
    expect(savedGenre).toBeDefined();
    expect(savedGenre.name).toBe(genreName);
    expect(savedGenre).toMatchObject({ name: genreName });
  });

  it('should create a new book for a user', async () => {
     newBook = { name: 'New Book', author: 'Author', genreId: `${genreId}` }; 
    const response = await request
      .post(`/users/${userId}/book`)
      .send(newBook);
    expect(response.status).toBe(201);
    bookId = response.body._id;
    // console.log("response.body", response.body)
    // console.log("newBook", newBook)
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


  it('user should add a quote to the book', async () => {
    
    const postToCreate = {
      quote: 'This is quote',
      bookId: bookId
    };

    const createPostResponse = await request
      .post(`/users/${userId}/post`)
      .send(postToCreate)
      .expect(201);

    const createdPost = createPostResponse.body;
    // console.log('testQuote', createdPost.quote)
    // console.log('testBookId', bookId)
    expect(createdPost.quote).toEqual('This is quote');
    expect(createdPost.book._id).toBe(bookId);

  });



it('should return users books', async () => {
  const response = await request.get(`/users/${userId}/books`);

  expect(response.status).toBe(200);
  expect(response.text).toContain(userId); 
});

it('should update a user', async () => {
  const updatedUser = { name: 'Updated User Name' };
  const updateResponse = await request
  .patch(`/users/${userId}`)
  .send(updatedUser)
  .expect(200);

  // console.log("Updated User Response:", updateResponse.body);

 
});

it('should return posts for a user and book', async () => {

  const samplePosts = [
    { quote: 'new content', user: userId, book: bookId },
    { quote: 'another content', user: userId, book: bookId },
   
  ];

  await Post.insertMany(samplePosts);

  const response = await request
    .get(`/users/${userId}/book/${bookId}/posts`)
    .expect(200);
 
 
  response.body.forEach((post, index) => {
    expect(post.user._id).toBe(userId);
    expect(post.book._id).toBe(bookId);
    
  });
});


it('should handle errors in creating a new user next', async () => {
  const userToCreate = {
    // name: 'Hilal', // Missing 'name' field
    email: 'hk@gmail.com'
  };

  const createResponse = await request
      .post('/users')
      .send(userToCreate)
      .expect(500); // Expecting a server error due to missing 'name' field

});


it('should handle error when create a new book for a user', async () => {
  newBook = { name: 'New Book', author: 'Author', genreId: `${genreId}` }; 
 const response = await request
   .post(`/users/${'12333208394'}/book`)//invalid userId
   .send(newBook)
   .expect(500);

});

it('should handle error when create a genre for a user', async() => {
  const genreName = 'Fantasy';
  const response = await request
    .post(`/users/${'12333208394'}/genre`) //invalid userId
    .send({ name: genreName })
    .expect(500);
})

it('user should handle error when add a quote to the book with invalid userıD', async () => {
  
  const postToCreate = {
    quote: 'This is quote',
    bookId: bookId
  };
  await request
    .post(`/users/${'12333208394'}/post`) //invalid userId
    .send(postToCreate)
    .expect(500);

});

it('should return 404 if user not found', async () => {
  const invalidUserId = '65d65f3d4050a85444613423';
  const response = await request.get(`/users/${invalidUserId}/books`);
  expect(response.status).toBe(404);
  expect(response.text).toBe('Can not find user');
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
