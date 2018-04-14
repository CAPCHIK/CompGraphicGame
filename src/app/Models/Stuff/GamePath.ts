import { Vector3, Mesh, MeshBuilder, Scene, ShaderMaterial, StandardMaterial, Color3, Material, Curve3, LinesMesh } from 'babylonjs';
import { GameUnit } from '../Units/UnitTypes/GameUnit';

export class GamePath {
    private time = 0;
    private debugMeshes: Array<Mesh> = [];
    private lines: LinesMesh = null;
    private material: StandardMaterial;
    private distances: Array<number> = [];

    constructor(
        private points: Array<Vector3>,
        private speed: number,
        private scene: Scene) {
        this.material = new StandardMaterial('', scene);
        this.material.diffuseColor = Color3.Red();

        const curve = Curve3.CreateCatmullRomSpline(this.points, 6);
        this.points = curve.getPoints();
        this.drawDebug(this.points);
        this.distances.push(0);
        for (let i = 1; i < this.points.length; i++) {
            this.distances.push(Vector3.Distance(this.points[i], this.points[i - 1]) + this.distances[this.distances.length - 1]);
        }
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
    private drawDebug(points: Array<Vector3>) {
        let i = 0;
        for (; i < points.length; i++) {
            if (this.debugMeshes[i]) {
                this.debugMeshes[i].position = points[i].clone();
            } else {
                const box = MeshBuilder.CreateBox('DEBUG BOX', { size: 0.2 }, this.scene);
                box.material = this.material;
                box.position = points[i].clone();
                this.debugMeshes.push(box);
            }
        }

        while (i < this.debugMeshes.length) {
            this.debugMeshes.pop().dispose();
        }
        if (this.lines) {
            this.lines.dispose();
        }

        this.lines = MeshBuilder.CreateLines('debug path', { points: points, updatable: true, instance: null }, this.scene);
        this.lines.color = Color3.Blue();

    }
}
