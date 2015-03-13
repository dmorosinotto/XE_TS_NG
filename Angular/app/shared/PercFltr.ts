module Shared {
    export module filters {
        Percent.$inject = ["$filter"];
        export function Percent($filter: ng.IFilterService) {
            return (value: number, ndec: number) => {
                if (angular.isNumber(value)) {
                    return $filter("number")(value * 100, ndec) + "%";
                } else {
                    return "--";
                }
            }
        }
    }
} 