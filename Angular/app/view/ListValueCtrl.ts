module myApp.controllers {
    "use strict";

    export class ListValue {
        public model: { id: number; value: string}[];
        public sort: string;

        static $inject = ["preloadData"];
        constructor(preloadData: string[]) {
            this.sort = "-value";
            this.model = preloadData.map((s, i) => ({ id: ((1 + i) / 100), value: s }));
        }
    }
} 