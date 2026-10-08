
import {Crop} from '../domain/model/crop.entity.js';

export class CropAssembler {
    static toEntityFromResource(resource) {
        return new Crop(resource);
    }

    static toResourceFromEntity(entity) {
        const resource = {
            plotId: entity.plotId,
            name: entity.name,
            variety: entity.variety,
            plantingDate: entity.plantingDate,
            expectedHarvest: entity.expectedHarvest,
            status: entity.status
        };
        if (entity.id !== null) resource.id = entity.id;
        return resource;
    }

    static toEntitiesFromResponse(response) {
        return response.data.map(resource => this.toEntityFromResource(resource));
    }
}
