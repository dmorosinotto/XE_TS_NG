module myApp.controllers {
"use strict";
    export class Secondo {
        public model: { message: string };
        private count: number;

        static $inject = ["$log","$rootScope"];
        constructor($log: ng.ILogService, private $rootScope: ng.IRootScopeService) {
            this.model = { message: "Hello world 2" };
            this.count = 222;
            $log.log("ciao da controller 2");
            
        }

        public incr() {
            this.count++;
            this.$rootScope.$emit("notifica", this.count); //visibile solo su rootscope
            //this.$rootScope.$broadcast("notifica", this.count); //propagato a tutti gli scope
        }

    }
}