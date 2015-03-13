module myApp {
    "use strict";
    angular.module("myApp", ["ngRoute"])
        .service(services)
        .controller(controllers)
        .config(config.Route)
        .filter(Shared.filters)
        .directive(Shared.directives);
}
