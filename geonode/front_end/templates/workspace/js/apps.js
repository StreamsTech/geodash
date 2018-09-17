
(function(){
    'use strict';

angular
    .module('workspaceApp', [])
    .config(function($interpolateProvider) {
        // $httpProvider.defaults.withCredentials = true;
        $interpolateProvider.startSymbol('[{');
        $interpolateProvider.endSymbol('}]');

    });


})();