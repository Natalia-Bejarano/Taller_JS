export default class Pokemon {
  
constructor(id, name, types, sprite, height, weight, abilities, stats, isLegendary, isMythical) {
    this.id = id;
    this.name = name;
    this.types = types;
    this.sprite = sprite;
    this.abilities = abilities;
    this.stats = stats;
    this.height = height;
    this.weight = weight;
    this.isLegendary = isLegendary;
    this.isMythical = isMythical;
  }
}