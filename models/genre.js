class Genre{
    constructor(name) {
        this.name = name
  
    }
    static create({name}) {
        return new Genre(name)
    }
}
module.exports = Genre