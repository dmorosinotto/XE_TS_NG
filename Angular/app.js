/// <reference path="lib/typings/angularjs/angular.d.ts" />
var myApp;
(function (myApp) {
    var controllers;
    (function (controllers) {
        "use strict";
        var Main = (function () {
            function Main($log, $scope, srv) {
                var _this = this;
                this.$scope = $scope;
                this.srv = srv;
                this.model = { message: "Hello from main" };
                this.count = 0;
                $log.log("ciao da Main");
                srv.readall().success(function (res) {
                    _this.data = res;
                });
            }
            Main.prototype.incr = function () {
                this.count++;
                this.$scope.$broadcast("piu1", this.count);
            };
            Main.$inject = ["$log", "$scope", "ValueData"];
            return Main;
        })();
        controllers.Main = Main;
    })(controllers = myApp.controllers || (myApp.controllers = {}));
})(myApp || (myApp = {}));
var myApp;
(function (myApp) {
    "use strict";
    var controllers;
    (function (controllers) {
        var Primo = (function () {
            function Primo($scope, $rootScope) {
                var _this = this;
                $scope.vm = this;
                this.message = "Hello world 1";
                this.count = 111;
                $scope.$on("piu1", function (e, i) {
                    _this.count = _this.count - i;
                });
                //$scope.$on("notifica", (e, i) => { alert(i); });
                $rootScope.$on("notifica", function (e, i) {
                    _this.message = "Hello root " + i;
                    e.stopPropagation();
                });
            }
            Primo.prototype.incr = function () {
                this.count++;
            };
            Primo.$inject = ["$scope", "$rootScope"];
            return Primo;
        })();
        controllers.Primo = Primo;
    })(controllers = myApp.controllers || (myApp.controllers = {}));
})(myApp || (myApp = {}));
var myApp;
(function (myApp) {
    var controllers;
    (function (controllers) {
        "use strict";
        var Secondo = (function () {
            function Secondo($log, $rootScope) {
                this.$rootScope = $rootScope;
                this.model = { message: "Hello world 2" };
                this.count = 222;
                $log.log("ciao da controller 2");
            }
            Secondo.prototype.incr = function () {
                this.count++;
                this.$rootScope.$emit("notifica", this.count); //visibile solo su rootscope
                //this.$rootScope.$broadcast("notifica", this.count); //propagato a tutti gli scope
            };
            Secondo.$inject = ["$log", "$rootScope"];
            return Secondo;
        })();
        controllers.Secondo = Secondo;
    })(controllers = myApp.controllers || (myApp.controllers = {}));
})(myApp || (myApp = {}));
/// <reference path="../lib/typings/angularjs/angular-route.d.ts" />
var myApp;
(function (myApp) {
    var config;
    (function (config) {
        var Route = (function () {
            function Route($routeProvider) {
                $routeProvider.when("/list", {
                    templateUrl: "app/view/list.html",
                    controller: "ListValue",
                    controllerAs: "ctrlPartial",
                    resolve: { preloadData: dataRead }
                }).otherwise({
                    redirectTo: "/"
                });
            }
            Route.$inject = ["$routeProvider"];
            return Route;
        })();
        config.Route = Route;
        dataRead.$inject = ["ValueData"];
        function dataRead(srv) {
            return srv.readall();
        }
    })(config = myApp.config || (myApp.config = {}));
})(myApp || (myApp = {}));
var myApp;
(function (myApp) {
    var services;
    (function (services) {
        var ValueData = (function () {
            function ValueData($http) {
                this.$http = $http;
                this.baseurl = "http://localhost:3000/mvc/values/api";
            }
            ValueData.prototype.readall = function () {
                return this.$http.get(this.baseurl);
            };
            ValueData.prototype.read = function (id) {
                return this.$http.get(this.baseurl + "/" + id);
            };
            ValueData.$inject = ["$http"];
            return ValueData;
        })();
        services.ValueData = ValueData;
    })(services = myApp.services || (myApp.services = {}));
})(myApp || (myApp = {}));
var Shared;
(function (Shared) {
    var filters;
    (function (filters) {
        Percent.$inject = ["$filter"];
        function Percent($filter) {
            return function (value, ndec) {
                if (angular.isNumber(value)) {
                    return $filter("number")(value * 100, ndec) + "%";
                }
                else {
                    return "--";
                }
            };
        }
        filters.Percent = Percent;
    })(filters = Shared.filters || (Shared.filters = {}));
})(Shared || (Shared = {}));
var Shared;
(function (Shared) {
    var directives;
    (function (directives) {
        function ngSortBy() {
            return {
                name: "ngSortBy",
                restrict: "A",
                transclude: true,
                //scope: {
                //    ngSortBy: "@",
                //    sort: "="
                //},  
                scope: false,
                template: "<a><span ng-transclude></span> <i class='glyphicon glyphicon-sort-by-attributes'></i></a>",
                link: function (scope, element, attrs) {
                    var a = element.find("a");
                    var i = element.find("i");
                    var sortValue = attrs.ngSortBy;
                    //var sortValue = scope.ngSortBy;
                    a.on("click", function () {
                        scope.$apply(function () {
                            scope.sort = ("-" + scope.sort === '-' + sortValue) ? "-" + sortValue : sortValue;
                        });
                    });
                    scope.$watch("sort", function (newValue) {
                        if (newValue === sortValue) {
                            i.addClass("glyphicon").addClass("glyphicon-sort-by-attributes").removeClass("glyphicon-sort-by-attributes-alt");
                        }
                        else if (newValue === "-" + sortValue) {
                            i.addClass("glyphicon").addClass("glyphicon-sort-by-attributes-alt").removeClass("glyphicon-sort-by-attributes");
                        }
                        else {
                            i.removeClass("glyphicon").removeClass("glyphicon-sort-by-attributes").removeClass("glyphicon-sort-by-attributes-alt");
                        }
                    });
                }
            };
        }
        directives.ngSortBy = ngSortBy;
    })(directives = Shared.directives || (Shared.directives = {}));
})(Shared || (Shared = {}));
var myApp;
(function (myApp) {
    var controllers;
    (function (controllers) {
        "use strict";
        var ListValue = (function () {
            function ListValue(preloadData) {
                this.sort = "value";
                this.model = preloadData.data.map(function (s, i) {
                    return { id: ((1 + i) / 100), value: s };
                });
            }
            ListValue.$inject = ["preloadData"];
            return ListValue;
        })();
        controllers.ListValue = ListValue;
    })(controllers = myApp.controllers || (myApp.controllers = {}));
})(myApp || (myApp = {}));
var myApp;
(function (myApp) {
    "use strict";
    angular.module("myApp", ["ngRoute"]).service(myApp.services).controller(myApp.controllers).config(myApp.config.Route).filter(Shared.filters).directive(Shared.directives);
})(myApp || (myApp = {}));
//# sourceMappingURL=app.js.map