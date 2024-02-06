const BaseDatabase = require('./base-database')
const User = require('../models/user')


class UserDatabase extends BaseDatabase {
    async findByName(name) {
        const objects = await this.load()
        return objects.find(o => o.name == name)
     }
     async addPostToUser(user, post) {
        console.log('this is my post', post);
        const objects = await this.load();
    
        if (!Array.isArray(objects)) {
            throw new Error('Loaded data is not an array.');
        }
    
        const index = objects.findIndex(o => o.id === user.id);
    
        if (index === -1) {
            throw new Error(`Cannot find ${this.model.name} instance with id ${user.id}`);
        }
    
        if (!objects[index].posts) {
            objects[index].posts = [];
        }
    
        objects[index].posts.push(post);
    
        await this.save(objects);
    }
    

    async getUserPosts(userId) {
        const users = await this.load();
        const user = users.find(u => u.id === userId);
        return user ? user.posts : [];
    }

}

module.exports = new UserDatabase(User)