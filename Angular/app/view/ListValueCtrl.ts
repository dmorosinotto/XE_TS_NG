module myApp.controllers {
    "use strict";

    export class ListValue {
        public model: { id: number; value: string}[];
        public sort: string;

        static $inject = ["preloadData"];
        constructor(preloadData: ng.IHttpPromiseCallbackArg<string[]>) {
            this.sort = "value";
            this.model = preloadData.data.map((s, i) => { return { id: ((1+i)/100), value: s }; });
        }
    }
} 