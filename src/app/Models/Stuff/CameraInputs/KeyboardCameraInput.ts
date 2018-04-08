import { FreeCamera, ICameraInput } from 'babylonjs';

export class KeyboardCameraInput implements ICameraInput<FreeCamera> {
    camera: FreeCamera;

    private downControlVar: (data: KeyboardEvent) => any;
    private upControlVar: (data: KeyboardEvent) => any;

    private keyWDown = false;
    private keyADown = false;
    private keySDown = false;
    private keyDDown = false;

    constructor(camera: FreeCamera, public speed: number) {
        console.log('constructor');
        this.downControlVar = e => this.downControl(e);
        this.upControlVar = e => this.upControl(e);
    }
    getClassName(): string {
        return 'KeyboardCameraInput';
    }
    getSimpleName(): string {
        return 'my-keyboard';
    }
    attachControl(element: HTMLElement, noPreventDefault?: boolean): void {
        console.log('attach');
        console.log('attach');
        console.log('attach');
        console.log('attach');
        element.onkeydown = this.downControlVar;
        element.onkeyup = this.upControlVar;
    }
    detachControl(element: HTMLElement): void {

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
}
