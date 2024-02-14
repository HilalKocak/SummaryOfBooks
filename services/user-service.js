const BaseService = require('./base-service');
const User = require('../models/user');

class UserService extends BaseService {
    async findByName(name) {
        const objects = await this.load();
        return objects.find(o => o.name == name);
    }

    async addPostToUser(userId, post) {
        try {
            // Kullanıcıyı bul ve posts dizisine yeni gönderiyi ekleyerek güncelle
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $push: { posts: post } },
                { new: true } // Güncellenmiş belgeyi döndürmek için {new: true} kullanılır
            );
    
            // Kullanıcı bulunamazsa hata döndür
            if (!updatedUser) {
                throw new Error('Kullanıcı bulunamadı.');
            }
    
            return updatedUser;
        } catch (error) {
            throw new Error('Gönderi eklenirken bir hata oluştu.');
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
            // Kullanıcıyı bul
            const user = await User.findById(userId);

            if (!user) {
                throw new Error('Kullanıcı bulunamadı.');
            }

            // Kullanıcının genres dizisine yeni türü ekle
            user.genres.push(genre);

            // Kullanıcıyı kaydet
            await user.save();

            return user;
        } catch (error) {
            throw new Error('Tür eklenirken bir hata oluştu.');
        }
    }

    async getUserPosts(userId) {
        const users = await this.load();
        const user = users.find(u => u.id === userId);
        return user ? user.posts : [];
    }
}

module.exports = new UserService(User);
