import { BLOCK_WIDTH } from "./Constants";
import { Vector3 } from "three";

export class BlockPositionCalculator {
  calculate(point, normal) {
    const position = new Vector3();
    position.copy(point).add(normal);
    position
      .divideScalar(BLOCK_WIDTH)
      .floor()
      .multiplyScalar(BLOCK_WIDTH)
      .addScalar(BLOCK_WIDTH / 2.0);
    if (position.y < 0) {
      position.y = 0;
    }
    return position;
  }
}
