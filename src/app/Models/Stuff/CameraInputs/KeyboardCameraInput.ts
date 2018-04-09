import { FreeCamera, ICameraInput, EventState, KeyboardInfo } from 'babylonjs';

export class KeyboardCameraInput implements ICameraInput<FreeCamera> {
    camera: FreeCamera;


    private pointer: (info: KeyboardInfo, state: EventState) => void;

    private keyWDown = false;
    private keyADown = false;
    private keySDown = false;
    private keyDDown = false;

    constructor(camera: FreeCamera, public speed: number) {
        this.pointer = (A, B) => this.handleKeyboard(A, B);
    }
    getClassName(): string {
        return 'KeyboardCameraInput';
    }
    getSimpleName(): string {
        return 'my-keyboard';
    }
    attachControl(element: HTMLElement, noPreventDefault?: boolean): void {
        this.camera.getScene().onKeyboardObservable.add(this.pointer);
    }
    detachControl(element: HTMLElement): void {
        this.camera.getScene().onKeyboardObservable.removeCallback(this.pointer);
    }
    checkInputs(): void {
        if (this.camera) {
            this.camera.position.z += this.keyWDown ? this.speed
                : this.keySDown ? -this.speed : 0;
            this.camera.position.x += this.keyDDown ? this.speed
                : this.keyADown ? -this.speed : 0;
        }
    }

    private upControl(data: KeyboardEvent): any {
        switch (data.code) {
            case 'KeyW':
                this.keyWDown = false;
                break;
            case 'KeyS':
                this.keySDown = false;
                break;
            case 'KeyD':
                this.keyDDown = false;
                break;
            case 'KeyA':
                this.keyADown = false;
                break;
        }
    }

    private downControl(data: KeyboardEvent): any {
        switch (data.code) {
            case 'KeyW':
                this.keyWDown = true;
                break;
            case 'KeyS':
                this.keySDown = true;
                break;
            case 'KeyD':
                this.keyDDown = true;
                break;
            case 'KeyA':
                this.keyADown = true;
                break;
        }
    }
    private handleKeyboard(info: KeyboardInfo, state: EventState): void {
        switch (info.type) {
            case 1: this.downControl(info.event);
                break;
            case 2: this.upControl(info.event);
                break;
        }
    }
}
