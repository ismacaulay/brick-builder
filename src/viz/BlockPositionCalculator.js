import { BLOCK_WIDTH } from "./constants";

export class BlockPositionCalculator {
  calculate(initialPosition, point, normal) {
    const position = initialPosition.clone();
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
