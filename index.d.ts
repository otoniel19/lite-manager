export class lite {
    constructor(dir: string, opts: object);
    dir: string;
    opts: object;
    all: Query | undefined;
    connect(name: string, columms: object): {
        getAll: (cb: any) => Promise<any> | {
            rows: any[];
            size: number;
            schema: string;
        } | undefined;
        getById: (value: any, cb: any) => Promise<any> | {
            rows: any;
            size: any;
            schema: any;
        } | undefined;
        getOne: (where: any, cb: any) => Promise<any> | {
            rows: any;
            size: any;
            schema: any;
        } | undefined;
        create: (columms: object) => void;
        update: (columms: object, where: object) => void;
        delete: (where: object) => void;
    } | undefined;
}
import Query = require("./build/sqlite-query-generator");
export declare const types: typeof import("./lib/types");
export declare const sync: any;
export declare const run: typeof import("./lib/run");
