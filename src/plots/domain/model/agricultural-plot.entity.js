export class AgriculturalPlot {
  #id;
  #name;
  #areaHectares;
  #location;
  #createdAt;
  #status;

  constructor({id = null, name, areaHectares, location, createdAt = null, status = 'ACTIVE'}) {
    if (typeof name !== 'string' || !name.trim()) {
      throw new Error('A plot name is required.');
    }
    if (typeof areaHectares !== 'number' || !Number.isFinite(areaHectares) || areaHectares <= 0) {
      throw new Error('The plot area must be greater than zero.');
    }
    if (typeof location !== 'string' || !location.trim()) {
      throw new Error('A plot location is required.');
    }
    if (!['ACTIVE', 'INACTIVE'].includes(status)) {
      throw new Error('The plot status is invalid.');
    }

    this.#id = id;
    this.#name = name.trim();
    this.#areaHectares = areaHectares;
    this.#location = location.trim();
    this.#createdAt = createdAt;
    this.#status = status;
  }

  get id() { return this.#id; }
  get name() { return this.#name; }
  get areaHectares() { return this.#areaHectares; }
  get location() { return this.#location; }
  get createdAt() { return this.#createdAt; }
  get status() { return this.#status; }
}
