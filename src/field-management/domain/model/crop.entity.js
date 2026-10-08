
export class Crop {
    #id;
    #plotId;
    #name;
    #variety;
    #plantingDate;
    #expectedHarvest;
    #status;

    constructor({id = null, plotId, name, variety, plantingDate, expectedHarvest = null, status = 'ACTIVE'}) {
        if (plotId === null || plotId === undefined || plotId === '') {
            throw new Error('A plot is required.');
        }
        if (typeof name !== 'string' || !name.trim()) {
            throw new Error('A crop name is required.');
        }
        if (typeof variety !== 'string' || !variety.trim()) {
            throw new Error('A crop variety is required.');
        }
        if (!plantingDate) {
            throw new Error('A planting date is required.');
        }
        if (!['ACTIVE', 'IN_PROGRESS', 'COMPLETED'].includes(status)) {
            throw new Error('The crop status is invalid.');
        }

        this.#id = id;
        this.#plotId = plotId;
        this.#name = name.trim();
        this.#variety = variety.trim();
        this.#plantingDate = plantingDate;
        this.#expectedHarvest = expectedHarvest;
        this.#status = status;
    }

    get id() { return this.#id; }
    get plotId() { return this.#plotId; }
    get name() { return this.#name; }
    get variety() { return this.#variety; }
    get plantingDate() { return this.#plantingDate; }
    get expectedHarvest() { return this.#expectedHarvest; }
    get status() { return this.#status; }
}
