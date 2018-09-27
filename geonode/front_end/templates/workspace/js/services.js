
(function(){
    'use strict';

    angular
        .module('workspaceApp')
        .service('dataListService', function ($http, $q) {

            function get(url) {
                var deferred = $q.defer();
                $http.get(url)
                    .then(function(res) {
                        deferred.resolve(res);
                    },function(error, status) {
                        deferred.reject({ error: error, status: status });
                    });
                return deferred.promise;
            }


            this.getDataList = function (url) {
                return get(url);
            }

            this.deleteLayer = function(url, obj) {
                var deferred = $q.defer();
                $http.post(url, obj, {
                    headers: {
                        "X-CSRFToken": $cookies.get('csrftoken')
                    }
                }).success(function(res) {
                    deferred.resolve(res);
                }).error(function(error, status) {
                    deferred.reject({ error: error, status: status });
                });
                return deferred.promise;
            }


        });

})();