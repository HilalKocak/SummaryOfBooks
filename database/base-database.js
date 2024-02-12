

const fs = require('fs')
const flatted = require('flatted')

class BaseDatabase{
    constructor(model) {
        this.model = model;
        this.filename = model.name.toLowerCase();
       
    }


    save(objects) {
      return this.model.insertMany(objects)
    }

    load() {
      return this.model.find()
    }

    async insert(object) {
      return await this.model.create(object)
   
     }
   

    

     async removeBy(property, value) {
      return this.model.deleteOne({ [property]: value })
  
    }

      async find(id) {
        // return this.model.find({ _id: id})
        return this.model.findById(id)
      }
    
      async findBy(property, value) {
        return this.model.find({ [property]: value })
      }


    async update(object) {
        const objects = await this.load()

        const index = objects.findIndex(o => o.id == object.id)

        if (index == -1) throw new Error(`Cannot find ${this.model.name} instance with id ${object.id}`)

        objects.splice(index, 1, object)
        await this.save(objects)
    }


}
module.exports = BaseDatabase
 