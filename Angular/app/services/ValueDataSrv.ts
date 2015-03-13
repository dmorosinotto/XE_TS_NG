module myApp {
    

    export module services {
        export interface MyDTO {
            value: string;
        }

        export class ValueData {
            private baseurl: string;
            static $inject = ["$http"];
            constructor(private $http: ng.IHttpService) {
                this.baseurl = "http://localhost:3000/mvc/values/api";
            }

            public readall() {
                return this.$http.get<string[]>(this.baseurl);
            }

            public read(id: number) {
                return this.$http.get<string>(this.baseurl + "/" + id);
            }
        }
    }
}