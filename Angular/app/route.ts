/// <reference path="../lib/typings/angularjs/angular-route.d.ts" />
module myApp.config {


    export class Route {
        static $inject = ["$routeProvider"];
        constructor($routeProvider: ng.route.IRouteProvider) {
            $routeProvider.when("/list", {
                templateUrl: "app/view/list.html",
                controller: "ListValue",
                controllerAs: "ctrlPartial",
                resolve: { preloadData: dataRead  }
            }).otherwise({
                redirectTo: "/"
            });
        }
    }

    /*
    dataRead.$inject = ["ValueData"];
    function dataRead(srv: services.ValueData) {
        return srv.readall();
    }
    */
    dataRead.$inject = ["$q"];
    function dataRead($q: ng.IQService) {
        var def = $q.defer<string[]>();
        def.resolve(["Pippo", "Pluto", "Paperino", "Zio Paperone", "Topolino", "Gamba di Legno"]);
        return def.promise;
    }


} 