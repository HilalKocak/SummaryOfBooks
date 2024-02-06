const BaseDatabase = require('./base-database')
const User = require('../models/user')


class UserDatabase extends BaseDatabase {
    findByName(name) {
        const objects = this.load()
        return objects.find(o => o.name == name)
     }

     addPostToUser(user, post) {
        console.log('this is my post', post);
        const objects = this.load();
        const index = objects.findIndex(o => o.id === user.id)
        if (index == -1) throw new Error(`Cannot find ${this.model.name} instance with id ${user.id} `)
        if (!objects[index].posts) {
            objects[index].posts = [];
        }
        objects[index].posts.push(post);
        this.save(objects);
    }

    getUserPosts(userId) {
        const users = this.load();
        const user = users.find(u => u.id === userId);
        return user ? user.posts : [];
    }

  
    

    
}

module.exports = new UserDatabase(User)