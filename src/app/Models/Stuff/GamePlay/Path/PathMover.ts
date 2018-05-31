import { Vector3 } from 'babylonjs';

export class PathMover {
    private time = 0;
    constructor(
        public speed,
        private distances: Array<number>,
        private points: Array<Vector3>) {
    }
    public move(frameTime: number): Vector3 {
        this.time += frameTime;
        const position = (this.time * this.speed) % this.distances[this.distances.length - 1];
        let index = Math.round(this.distances.length / 2);
        let step = index;
        while (true) {
            if (this.between(position, index - 1, index)) {
                if (index === 0) {
                    index++;
                }
                if (index === this.points.length) {
                    index--;
                }
                const need = position - this.distances[index - 1];
                const direction = this.points[index].subtract(this.points[index - 1]).normalize().scale(need);
                return this.points[index - 1].add(direction);
            }
            step = Math.round(step / 2);
            if (position < this.distances[index]) {
                index -= step;
            } else {
                index += step;
            }
        }
    }

    private between(value: number, leftIndex: number, rightIndex): boolean {
        leftIndex = leftIndex % this.distances.length;
        rightIndex = rightIndex % this.distances.length;
        if (this.distances[rightIndex] === 0) {
            return true;
        }
        return value >= this.distances[leftIndex] && value <= this.distances[rightIndex];

    }
}
