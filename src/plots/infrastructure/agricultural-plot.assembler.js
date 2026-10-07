import {AgriculturalPlot} from '../domain/model/agricultural-plot.entity.js';

export class AgriculturalPlotAssembler {
  static toEntityFromResource(resource) {
    return new AgriculturalPlot(resource);
  }

  static toResourceFromEntity(entity) {
    const resource = {
      name: entity.name,
      areaHectares: entity.areaHectares,
      location: entity.location,
      createdAt: entity.createdAt,
      status: entity.status
    };
    if (entity.id !== null) resource.id = entity.id;
    return resource;
  }

  static toEntitiesFromResponse(response) {
    return response.data.map(resource => this.toEntityFromResource(resource));
  }
}
