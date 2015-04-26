module Shared.directives {
    "use strict";
    export function ngSort(): ng.IDirective {
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

    class ngSortCtrl {
        public sort: string;
        private cols: any; // map key=fieldName, value=JQuery element
        private icon: string;
        private iconAsc: string;
        private iconDesc: string;
        constructor() {
            this.icon = this.icon || "glyphicon";
            this.iconAsc = this.iconAsc || "glyphicon-sort-by-attributes";
            this.iconDesc = this.iconDesc || "glyphicon-sort-by-attributes-alt";
            this.cols = {};
        }

        public register(fieldName: string, colElem: ng.IAugmentedJQuery) {
            this.cols[fieldName] = colElem;
            if (fieldName === this.sort || "-" + fieldName === this.sort)
                colElem.addClass(this.icon).addClass(this.sort === fieldName ? this.iconAsc : this.iconDesc);
        }

        public sortBy(newSortFieldName: string) {
            this.sort = ("-" + this.sort === "-" + newSortFieldName) ? "-" + newSortFieldName : newSortFieldName;
            for (var k in this.cols) this.cols[k].removeClass(this.icon).removeClass(this.iconAsc).removeClass(this.iconDesc);
            (<ng.IAugmentedJQuery> this.cols[newSortFieldName]).addClass(this.icon).addClass(this.sort === newSortFieldName ? this.iconAsc : this.iconDesc);
        }
    }

    interface ISortbyScope extends ng.IScope {
        sortFieldName: string;
        toggleSort: (s: string) => void
    }

    export function ngSortby(): ng.IDirective {
        return {
            restrict: "A",
            require: "^ngSort",
            scope: { sortFieldName: "@ngSortby" },
            transclude: true,
            template: "<span ng-click='toggleSort(sortFieldName)'><span ng-transclude></span> <i></i></span>",
            link: (scope: ISortbyScope, element: ng.IAugmentedJQuery, attrs, ctrlParent: ngSortCtrl) => {
                var i = element.find("i");
                ctrlParent.register(scope.sortFieldName, i);
                scope.toggleSort = (fieldName) => ctrlParent.sortBy(fieldName);
            }
        };
    }

} 