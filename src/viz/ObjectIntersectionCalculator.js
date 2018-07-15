export class ObjectIntersectionCalculator {
  constructor(raycaster) {
    this._raycaster = raycaster;
  }

  calculate(x, y) {
    const objects = this._raycaster.castThroughPoint(x, y);
    if (objects.length > 0) {
      const object = objects[0];
      const ret = {
        point: object.point,
        normal: object.face.normal
      };
      return ret;
    }
    return undefined;
  }
}
