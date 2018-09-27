
(function(){
    'use strict';

angular
    .module('workspaceApp')
    .controller('MemberLayerController', function ($scope, $q, $window, $http, $timeout, dataListService) {
        var self = $scope;
    self.printme = "please convert me to angular js";
    self.searchString = null;
    self.currentTab = 0;

    self.draftLayerListUrl = "../../api/workspace_layer_api/?limit=25&resource_state=draft_list&user_type=member";
    self.pendingLayerListUrl = "../../api/workspace_layer_api/?limit=25&resource_state=pending_list&user_type=member";
    self.deniedLayerListUrl = "../../api/workspace_layer_api/?limit=25&resource_state=denied_list&user_type=member";
    self.activeLayerListUrl = "../../api/workspace_layer_api/?limit=25&resource_state=active_list&user_type=member";



    self.setItems = function(url){

        if(self.searchString){
            url += "&title__contains=" + self.searchString;
        }
        self.items = [];
        dataListService.getDataList(url).then(function (datalist) {
            self.items = datalist.data.objects;
            self.nextUrl = datalist.data.meta.next;
            self.previousUrl = datalist.data.meta.previous;
            self.counter = datalist.data.meta.offset;
        });

    };


        self.layerDraftList = function (){
            self.currentTab = 0;
            self.searchString = null;
            self.setItems(self.draftLayerListUrl);
        };
        self.layerPendingList = function (){
            self.currentTab = 1;
            self.searchString = null;
            self.setItems(self.pendingLayerListUrl);
        };
        self.layerDeniedList = function (){
            self.currentTab = 2;
            self.searchString = null;
            self.setItems(self.deniedLayerListUrl);
        };
        self.layerActiveList = function (){
            self.currentTab = 3;
            self.searchString = null;
            self.setItems(self.activeLayerListUrl);
        };


        self.nextItems = function(){
            self.setItems(self.nextUrl);
        };
        self.previousItems = function(){
            self.setItems(self.previousUrl);
        };

        self.redirectTo = function(url, queryString){
            $window.location.href = url+queryString;
        };


        self.backendSearch = function(){
            if (self.currentTab === 0){
               self.setItems(self.draftLayerListUrl);
            }
            else if (self.currentTab === 1){
                self.setItems(self.pendingLayerListUrl);
            }
            else if (self.currentTab === 2){
                self.setItems(self.deniedLayerListUrl);
            }
            else if (self.currentTab === 3){
                self.setItems(self.activeLayerListUrl);
            }

        };


        self.processMessage = function(msg){
            console.log(msg);
        };


        self.deleteLayerModal = function(layerID){
            $scope.deleteLayerId = layerID;
            var element = angular.element('#_delete_layer');
            element.modal('show');
        };

        self.deleteDraftLayer = function() {

            var url = '../../layers/' + $scope.deleteLayerId + '/delete'
            dataListService.deleteLayer(url).then(function (datalist) {
                // self.items = datalist.data.objects;
                // self.nextUrl = datalist.data.meta.next;
                // self.previousUrl = datalist.data.meta.previous;
                // self.counter = datalist.data.meta.offset;
                console.log(datalist)
            });

        }




        self.layerDraftList();

})


})();