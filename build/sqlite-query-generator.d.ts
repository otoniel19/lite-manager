export = Query;
declare class Query {
    constructor(path: string);
    path: string;
    run(type: string, args: string): any;
}
