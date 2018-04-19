import { Color4, Color3 } from 'babylonjs';

export class ColorsFuncs {
    public static average(a: Color4, b: Color4): Color4 {
        return new Color4(
            this.averageNums(a.r, b.r),
            this.averageNums(a.g, b.g),
            this.averageNums(a.b, b.b),
            this.averageNums(a.a, b.a)
        );
    }


    public static toColor3(color: Color4): Color3 {
        return new Color3(color.r, color.g, color.b);
    }

    private static averageNums(a: number, b: number) {
        return (a + b) / 2;
    }
}
