module myApp.controllers {
"use strict";
    export class Main {
        public model: { message: string };
        public data: string[]; 
        private count: number;
        
        static $inject = ["$log", "$scope","ValueData"];
        constructor($log: ng.ILogService,private $scope: ng.IScope, private srv: services.ValueData) {
            this.model = { message: "Hello from main" };
            this.count = 0;
            $log.log("ciao da Main");
            srv.readall().success((res) => { this.data = res });
        }

        public incr() {
            this.count++;
            this.$scope.$broadcast("piu1", this.count);
        }

    }
}