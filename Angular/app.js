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
        /*
        dataRead.$inject = ["ValueData"];
        function dataRead(srv: services.ValueData) {
            return srv.readall();
        }
        */
        dataRead.$inject = ["$q"];
        function dataRead($q) {
            var def = $q.defer();
            def.resolve(["Pippo", "Pluto", "Paperino", "Zio Paperone", "Topolino", "Gamba di Legno"]);
            return def.promise;
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
        "use strict";
        function ngSort() {
            return {
                restrict: "A",
                scope: {
                    sort: "=ngSort",
                    icon: "@",
                    iconAsc: "@",
                    iconDesc: "@"
                },
                controllerAs: "just-2Use-bindToController",
                bindToController: true,
                controller: ngSortCtrl
            };
        }
        directives.ngSort = ngSort;
        var ngSortCtrl = (function () {
            function ngSortCtrl() {
                this.icon = this.icon || "glyphicon";
                this.iconAsc = this.iconAsc || "glyphicon-sort-by-attributes";
                this.iconDesc = this.iconDesc || "glyphicon-sort-by-attributes-alt";
                this.cols = {};
            }
            ngSortCtrl.prototype.register = function (fieldName, colElem) {
                this.cols[fieldName] = colElem;
                if (fieldName === this.sort || "-" + fieldName === this.sort)
                    colElem.addClass(this.icon).addClass(this.sort === fieldName ? this.iconAsc : this.iconDesc);
            };
            ngSortCtrl.prototype.sortBy = function (newSortFieldName) {
                this.sort = ("-" + this.sort === "-" + newSortFieldName) ? "-" + newSortFieldName : newSortFieldName;
                for (var k in this.cols)
                    this.cols[k].removeClass(this.icon).removeClass(this.iconAsc).removeClass(this.iconDesc);
                this.cols[newSortFieldName].addClass(this.icon).addClass(this.sort === newSortFieldName ? this.iconAsc : this.iconDesc);
            };
            return ngSortCtrl;
        })();
        function ngSortby() {
            return {
                restrict: "A",
                require: "^ngSort",
                scope: { sortFieldName: "@ngSortby" },
                transclude: true,
                template: "<span ng-click='toggleSort(sortFieldName)'><span ng-transclude></span> <i></i></span>",
                link: function (scope, element, attrs, ctrlParent) {
                    var i = element.find("i");
                    ctrlParent.register(scope.sortFieldName, i);
                    scope.toggleSort = function (fieldName) { return ctrlParent.sortBy(fieldName); };
                }
            };
        }
        directives.ngSortby = ngSortby;
    })(directives = Shared.directives || (Shared.directives = {}));
})(Shared || (Shared = {}));
var myApp;
(function (myApp) {
    var controllers;
    (function (controllers) {
        "use strict";
        var ListValue = (function () {
            function ListValue(preloadData) {
                this.sort = "-value";
                this.model = preloadData.map(function (s, i) { return ({ id: ((1 + i) / 100), value: s }); });
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