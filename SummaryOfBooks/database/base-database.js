

const fs = require('fs')
const flatted = require('flatted')

class BaseDatabase{
    constructor(model) {
        this.model = model;
        this.filename = model.name.toLowerCase();
       
    }

    // save(objects){
    //     return new Promise((resolve, reject) => {
    //         fs.writeFile(`./${this.filename}.json`, flatted.stringify(objects))
            
    //     }, err => {
    //         if (err) return reject(err)
    //         resolve()
    //     })
    // }

    save(objects) {
        return new Promise((resolve, reject) => {
            fs.writeFile(`./${this.filename}.json`, flatted.stringify(objects, null, 2), (err) => {
            if (err) return reject(err)
            resolve()
          })
        })
      }

    // load(){
    //     const file = fs.readFileSync(`./${this.filename}.json`, 'utf8')
    //     const objects = flatted.parse(file)
       
    //     return objects.map(this.model.create)
    // }

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
    }

    remove(index){
        const objects = this.load()
        objects.splice(index, 1);
        this.save(objects)
    }


}
module.exports = BaseDatabase
 