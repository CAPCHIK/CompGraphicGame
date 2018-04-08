import { FreeCamera, ICameraInput, PointerInfo, EventState, FreeCameraVirtualJoystickInput } from 'babylonjs';

export class MouseCameraInput implements ICameraInput<FreeCamera> {
    camera: FreeCamera;


    private pointer: (info: PointerInfo, state: EventState) => void;

    private needMove = false;

    constructor() {
        this.pointer = (I, S) => this.handleMouse(I, S);
    }

    getClassName(): string {
        return 'MouseCameraInput';
    }
    getSimpleName(): string {
        return 'my-mouse';
    }
    attachControl(element: HTMLElement, noPreventDefault?: boolean): void {
        this.camera.getScene().onPointerObservable.add(this.pointer);
    }
    detachControl(element: HTMLElement): void {
        this.camera.getScene().onPointerObservable.removeCallback(this.pointer);
    }
    private handleMouse(info: PointerInfo, state: EventState): void {
        if (info.type === 8) {
            const wheel = info.event as WheelEvent;
            const forward = this.camera.getForwardRay(10000);
            const picked = this.camera.getScene().pickWithRay(forward, null);
            const distance = picked.distance;
            console.log(distance);
            let increment = wheel.wheelDelta / 12;
            console.log(increment);
            if (distance - increment <= 13) {
                increment = distance - 13;
                console.log('first ' + increment);
            } else if (distance - increment >= 100) {
                increment = (100 - distance) * -1;
                console.log('second ' + increment);
            }
            this.camera.position = forward.origin.add(forward.direction.normalize().scale(increment));
            return;
        }
        switch (info.type) {
            case 1: this.needMove = true;
                return;
            case 2: this.needMove = false;
                return;
        }
        if (!this.needMove) {
            return;
        }
        this.camera.position.x += - info.event.movementX * 0.0011 * this.camera.position.y;
        this.camera.position.z += info.event.movementY * 0.0011 * this.camera.position.y;
    }


    private minMax(value: number, min: number, max: number): number {
        return value <= min ? min : value >= max ? max : value;
    }
}
