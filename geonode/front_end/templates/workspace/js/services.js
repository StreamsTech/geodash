
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



        });

})();