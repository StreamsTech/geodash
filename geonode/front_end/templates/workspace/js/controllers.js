
(function(){
    'use strict';

angular
    .module('workspaceApp')
    .controller('MemberLayerController', function ($scope, $http, $timeout) {

    $scope.printme = "please convert me to angular js";

    $scope.items = [
        {
            sl: 1,
            title: 'layer 1',
            org: 'org 1',
            date: 'july 1',
            message: 'Please complete metadata information.',

        },
        {
            sl: 2,
            title: 'layer 2',
            org: 'org 2',
            date: 'july 2',
            message: 'Please complete metadata information.',
        },
        {
            sl: 3,
            title: 'layer 3',
            org: 'org 3',
            date: 'july 3',
            message: 'Please complete metadata information.',

        },
        {
            sl: 4,
            title: 'layer 4',
            org: 'org 4',
            date: 'july 4',
            message: 'Please complete metadata information.',

        },
        {
            sl: 5,
            title: 'layer 5',
            org: 'org 5',
            date: 'july 5',
            message: 'Please complete metadata information.',

        },
        {
            sl: 6,
            title: 'layer 6',
            org: 'org 6',
            date: 'july 6',
            message: 'Please complete metadata information.',

        },
        {
            sl: 7,
            title: 'layer 7',
            org: 'org 7',
            date: 'july 7',
            message: 'Please complete metadata information.',

        }
    ];

})


})();