export default class Pokemon {
    //esto tambien estaba desorganizado
    constructor (id, name, types, sprite,height, weight, abilities, stats){
        this.id = id;
        this.name = name;
        this.types = types;
        this.sprite = sprite;
        this.abilities = abilities;
        this.stats = stats;
        this.height = height;
        this.weight = weight;
    }
}
