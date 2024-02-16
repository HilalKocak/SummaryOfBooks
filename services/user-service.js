const BaseService = require('./base-service');
const User = require('../models/user');

class UserService extends BaseService {
    async findByName(name) {
        const objects = await this.load();
        return objects.find(o => o.name == name);
    }

    async addPostToUser(userId, post) {
        try {
            
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $push: { posts: post } },
                { new: true }
            );
    
            
            if (!updatedUser) {
                throw new Error('Cannot find user');
            }
    
            return updatedUser;
        } catch (error) {
            throw new Error('Error');
        }
    }

    async addBookToUser(user, book) {
        const objects = await this.load();

        if (!Array.isArray(objects)) {
            throw new Error('Loaded data is not an array.');
        }

        const index = objects.findIndex(o => o.id === user.id);

        if (index === -1) {
            throw new Error(`Cannot find ${this.model.name} instance with id ${user.id}`);
        }

        if (!objects[index].books) {
            objects[index].books = [];
        }

        objects[index].books.push(book);

        await this.save(objects);
    }

    async addGenreToUser(userId, genre) {
        try {
           
            const user = await User.findById(userId);

            if (!user) {
                throw new Error('Can not find user');
            }

         
            user.genres.push(genre);

            await user.save();

            return user;
        } catch (error) {
            throw new Error('Error');
        }
    }

    async getUserPosts(userId) {
        const users = await this.load();
        const user = users.find(u => u.id === userId);
        return user ? user.posts : [];
    }
}

module.exports = new UserService(User);
