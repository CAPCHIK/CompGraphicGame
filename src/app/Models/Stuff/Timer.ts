export class Timer {
    private now = 0;
    private isStarted = true;
    constructor(
        private period: number,
        private func: () => void,
    ) {
    }

    public start(): void {
        this.isStarted = true;
    }
    public pause(): void {
        this.isStarted = false;
    }

    public update(frameTime): void {
        if (!this.isStarted) { return; }
        this.now += frameTime;
        if (this.now >= this.period) {
            this.now = 0;
            this.func();
        }
    }
}
