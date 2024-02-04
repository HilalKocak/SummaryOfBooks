const BaseDatabase = require('./base-database')
const User = require('../models/user')


class UserDatabase extends BaseDatabase {
    findByName(name) {
        const objects = this.load()
        console.log("here",objects)
        return objects.find(o => o.name == name)
     }

     addPostToUser(user, post) {
        const objects = this.load();
        const index = objects.findIndex(o => o.id === user.id)
        if (index == -1) throw new Error(`Cannot find ${this.model.name} instance with id ${user.id} `)
        const newUser = objects.find(u => u.id === user.id); 
        if (!newUser.posts) {
            newUser.posts = [];
        }
        newUser.posts.push(post);
        
        objects.splice(index, 1, newUser);
        console.log('is added to db');
        console.log(objects)
        this.save(objects);
        const objects2 = this.load();
        console.log('we are seeing a new post');
        console.log(objects2);
    }

    getUserPosts(userId) {
        const users = this.load();
        const user = users.find(u => u.id === userId);
        return user ? user.posts : [];
    }

  
    

    
}

module.exports = new UserDatabase(User)