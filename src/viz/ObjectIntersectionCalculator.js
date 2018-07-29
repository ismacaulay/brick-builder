export class ObjectIntersectionCalculator {
  constructor(raycaster) {
    this._raycaster = raycaster;
  }

  calculate(x, y) {
    const intersections = this._raycaster.castThroughPoint(x, y);
    if (intersections.length > 0) {
      const intersection = intersections[0];
      const ret = {
        id: intersection.object.id,
        point: intersection.point,
        normal: intersection.face.normal
      };
      return ret;
    }
    return undefined;
  }
}
