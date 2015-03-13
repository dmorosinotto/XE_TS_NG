module myApp {
    "use strict";
    export module controllers {
        export class Primo {
            public message: string;
            private count: number;

            static $inject = ["$scope","$rootScope"];
            constructor($scope: ng.IScope, $rootScope: ng.IRootScopeService) {
                $scope.vm = this;

                
                this.message = "Hello world 1";
                this.count = 111;

                $scope.$on("piu1", (e:ng.IAngularEvent,i:number) => {
                    this.count = this.count - i;
                });

                //$scope.$on("notifica", (e, i) => { alert(i); });
                
                $rootScope.$on("notifica", (e: ng.IAngularEvent, i: number) => {
                    this.message = "Hello root " + i;
                    e.stopPropagation();
                });
            }

            public incr() {
                this.count++;
            }

        }
    }
} 