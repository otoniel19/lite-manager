export = Run;
declare class Run {
    constructor(dir: any);
    conn: any;
    dir: string;
    run(q: string, cb: any): any;
}
