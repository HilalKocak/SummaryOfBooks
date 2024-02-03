

const fs = require('fs')
const flatted = require('flatted')

class BaseDatabase{
    constructor(model) {
        this.model = model;
        this.filename = model.name.toLowerCase();
        console.log(this.filename)
    }

    save(objects){
        // fs.writeFileSync(`./${filename}.json`, JSON.stringify(objects))
        fs.writeFileSync(`./${this.filename}.json`, flatted.stringify(objects))
    }

    load(){
        const file = fs.readFileSync(`./${this.filename}.json`, 'utf8')
        const objects = flatted.parse(file)
        console.log('problem burada mı?', objects)
 
        return objects.map(this.model.create)
    }

    insert(object){
        const objects = this.load()
        save(objects.concat(object))
    }

    remove(index){
        const objects = this.load()
        objects.splice(index, 1);
        save(objects)
    }


}
module.exports = BaseDatabase
 