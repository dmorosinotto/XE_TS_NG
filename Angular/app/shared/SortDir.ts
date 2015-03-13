module Shared.directives {

    interface ISortByScope extends ng.IScope {
        sort: string;
        //ngSortBy: string;
    }

    interface ISortByAttributes extends ng.IAttributes {
        ngSortBy: string
    }

    export function ngSortBy(): ng.IDirective {
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
            link: (scope: ISortByScope, element: ng.IAugmentedJQuery, attrs: ISortByAttributes) => {
                var a = element.find("a");
                var i = element.find("i");
                var sortValue = attrs.ngSortBy;
                //var sortValue = scope.ngSortBy;
                a.on("click", () => {
                    scope.$apply(() => {
                        scope.sort = ("-" + scope.sort === '-' + sortValue) ? "-" + sortValue : sortValue;
                    });
                });
                scope.$watch("sort", (newValue: any) => {
                    if (newValue === sortValue) {
                        i.addClass("glyphicon").addClass("glyphicon-sort-by-attributes").removeClass("glyphicon-sort-by-attributes-alt");
                    } else if (newValue === "-" + sortValue) {
                        i.addClass("glyphicon").addClass("glyphicon-sort-by-attributes-alt").removeClass("glyphicon-sort-by-attributes");
                    } else {
                        i.removeClass("glyphicon").removeClass("glyphicon-sort-by-attributes").removeClass("glyphicon-sort-by-attributes-alt");
                    }
                });
            }
        };
    }
} 