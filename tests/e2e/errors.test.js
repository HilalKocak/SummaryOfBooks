const app = require('../../index');
const request = require('supertest')(app);

const mongoose = require('mongoose');


const Book = require('../../models/book')
const Genre = require('../../models/genre')
const Post = require('../../models/post')
const User = require('../../models/user');

const userService = require('../../services/user-service')
const bookService = require('../../services/book-service')



describe('should handle service errors', ()=> {

    beforeAll(async () => {
        mongoose.connect('mongodb://127.0.0.1:27017/book-test');
      });

    const userId = '65d795ae176c2cd291190131'; //invalid

      
      
      it('should return 404 if user not found when retrieving posts', async () => {
      
        const userId = '65d795ae176c2cd291190131'; //invalid
        const bookId = '65d79c47be557f080f275416';
      
        jest.spyOn(userService, 'find').mockResolvedValue(null);
        jest.spyOn(bookService, 'find').mockResolvedValue(
          {}
        );
      
        const response = await request.get(`/users/${userId}/book/${bookId}/posts`);
      
        expect(response.status).toBe(404);
      
        expect(response.text).toContain('Can not find user');
      
      });
      
      
      it('should return 404 if book not found when retrieving posts', async () => {
      
        const userId = '65d79a35c89eb1fa2b886d0e'; 
        const bookId = '65d79c47be557f080f275410';//invalid
      
        jest.spyOn(userService, 'find').mockResolvedValue({});
        jest.spyOn(bookService, 'find').mockResolvedValue(null);
      
        const response = await request.get(`/users/${userId}/book/${bookId}/posts`);
      
        expect(response.status).toBe(404);
        expect(response.text).toContain('Can not find book');
      });
      
      it('should return 404 if both user and book not found when retrieving posts', async () => {
        const userId = '65d79a35c89eb1fa2b886d0e'; 
        const bookId = '65d79c47be557f080f275410'; //invalid
      
        jest.spyOn(userService, 'find').mockResolvedValue(null);
        jest.spyOn(bookService, 'find').mockResolvedValue(null);
      
        const response = await request.get(`/users/${userId}/book/${bookId}/posts`);
      
        expect(response.status).toBe(404);
        expect(response.text).toContain('Can not find user and book');
      });


      it('should handle errors in creating a new post', async () => {
        const postToCreate = {
          quote: 'This is quote',
          // bookId: bookId missing
        };
    
          await request
          .post(`/users/${userId}/post`)
          .send(postToCreate)
          .expect(404);
    });
        
    it('should return 404 if user not found when creating genre', async () => {
      const invalidUserId = '65d795ae176c2cd291190131'; 
    
      const response = await request.post(`/users/${invalidUserId}/genre`);
     
      expect(response.status).toBe(404);
      expect(response.text).toBe('User not found');
    });

   


    
})