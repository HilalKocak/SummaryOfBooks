

const fs = require('fs')
const flatted = require('flatted')

class BaseDatabase{
    constructor(model) {
        this.model = model;
        this.filename = model.name.toLowerCase();
       
    }


    save(objects) {
        return new Promise((resolve, reject) => {
            fs.writeFile(`./${this.filename}.json`, flatted.stringify(objects, null, 2), (err) => {
            if (err) return reject(err)
            resolve()
          })
        })
      }



    load() {
        return new Promise((resolve, err) => {
            fs.readFile(`./${this.filename}.json`, 'utf8', (err, file) => {
               if (err) return reject(err)
               const objects = flatted.parse(file)
               resolve(objects.map(this.model.create))
            })
        })
    }

    async insert(object){
        const objects = await this.load()
        this.save(objects.concat(object))
        console.log('success success success')
    }

    remove(index){
        const objects = this.load()
        objects.splice(index, 1);
        this.save(objects)
    }
    async find(id) {
        const objects = await this.load()
        return objects.find(o => o.id == id)
      }
    
    async findBy(property, value) {
        return (await this.load()).find(o => o[property] == value)
    }


}
module.exports = BaseDatabase
 