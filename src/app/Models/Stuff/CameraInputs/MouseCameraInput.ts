import { FreeCamera, ICameraInput, PointerInfo, EventState } from 'babylonjs';

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
        switch (info.type) {
            case 1: this.needMove = true;
                break;
            case 2: this.needMove = false;
                break;
        }
        if (!this.needMove) {
            return;
        }
        this.camera.position.x += - info.event.movementX * 0.03;
        this.camera.position.z += info.event.movementY * 0.03;
    }
}
