
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
            url += "&title__icontains=" + self.searchString;
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
            self.deleteLayerId = layerID;
            var element = angular.element('#_delete_layer');
            element.modal('show');
        };

        self.deleteDraftLayer = function() {

            $('#Layer_Del').attr('action', '../../layers/'+ self.deleteLayerId +'/delete');

        };




        self.layerDraftList();

})
    .controller('MemberMapController', function ($scope, $q, $window, $http, $timeout, dataListService) {
        var self = $scope;
    self.printme = "please convert me to angular jssdfds";
    self.searchString = null;
    self.currentTab = 0;

    self.draftMapListUrl = "../../api/workspace_map_api/?limit=25&resource_state=draft_list&user_type=member";
    self.pendingMapListUrl = "../../api/workspace_map_api/?limit=25&resource_state=pending_list&user_type=member";
    self.deniedMapListUrl = "../../api/workspace_map_api/?limit=25&resource_state=denied_list&user_type=member";
    self.activeMapListUrl = "../../api/workspace_map_api/?limit=25&resource_state=active_list&user_type=member";



    self.setItems = function(url){

        if(self.searchString){
            url += "&title__icontains=" + self.searchString;
        }
        self.items = [];
        dataListService.getDataList(url).then(function (datalist) {
            self.items = datalist.data.objects;
            self.nextUrl = datalist.data.meta.next;
            self.previousUrl = datalist.data.meta.previous;
            self.counter = datalist.data.meta.offset;
        });

    };


        self.mapDraftList = function (){
            self.currentTab = 0;
            self.searchString = null;
            self.setItems(self.draftMapListUrl);
        };
        self.mapPendingList = function (){
            self.currentTab = 1;
            self.searchString = null;
            self.setItems(self.pendingMapListUrl);
        };
        self.mapDeniedList = function (){
            self.currentTab = 2;
            self.searchString = null;
            self.setItems(self.deniedMapListUrl);
        };
        self.mapActiveList = function (){
            self.currentTab = 3;
            self.searchString = null;
            self.setItems(self.activeMapListUrl);
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
               self.setItems(self.draftMapListUrl);
            }
            else if (self.currentTab === 1){
                self.setItems(self.pendingMapListUrl);
            }
            else if (self.currentTab === 2){
                self.setItems(self.deniedMapListUrl);
            }
            else if (self.currentTab === 3){
                self.setItems(self.activeMapListUrl);
            }

        };


        self.processMessage = function(msg){
            console.log(msg);
        };


        self.deleteMapModal = function(mapID){
            $scope.deleteMapId = mapID;
            var element = angular.element('#_delete_map');
            element.modal('show');
        };

        self.deleteDraftMap = function() {

            $('#Map_Del').attr('action', '../../maps/'+ $scope.deleteMapId +'/delete');

        };



        self.mapDraftList();

})
    .controller('MemberDocumentController', function ($scope, $q, $window, $http, $timeout, dataListService) {
        var self = $scope;
    self.printme = "please convert me to angular jssdfds";
    self.searchString = null;
    self.currentTab = 0;

    self.draftDocumentListUrl = "../../api/workspace_document_api/?limit=25&resource_state=draft_list&user_type=member";
    self.pendingDocumentListUrl = "../../api/workspace_document_api/?limit=25&resource_state=pending_list&user_type=member";
    self.deniedDocumentListUrl = "../../api/workspace_document_api/?limit=25&resource_state=denied_list&user_type=member";
    self.activeDocumentListUrl = "../../api/workspace_document_api/?limit=25&resource_state=active_list&user_type=member";



    self.setItems = function(url){

        if(self.searchString){
            url += "&title__icontains=" + self.searchString;
        }
        self.items = [];
        dataListService.getDataList(url).then(function (datalist) {
            self.items = datalist.data.objects;
            self.nextUrl = datalist.data.meta.next;
            self.previousUrl = datalist.data.meta.previous;
            self.counter = datalist.data.meta.offset;
        });

    };


        self.documentDraftList = function (){
            self.currentTab = 0;
            self.searchString = null;
            self.setItems(self.draftDocumentListUrl);
        };
        self.documentPendingList = function (){
            self.currentTab = 1;
            self.searchString = null;
            self.setItems(self.pendingDocumentListUrl);
        };
        self.documentDeniedList = function (){
            self.currentTab = 2;
            self.searchString = null;
            self.setItems(self.deniedDocumentListUrl);
        };
        self.documentActiveList = function (){
            self.currentTab = 3;
            self.searchString = null;
            self.setItems(self.activeDocumentListUrl);
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
               self.setItems(self.draftDocumentListUrl);
            }
            else if (self.currentTab === 1){
                self.setItems(self.pendingDocumentListUrl);
            }
            else if (self.currentTab === 2){
                self.setItems(self.deniedDocumentListUrl);
            }
            else if (self.currentTab === 3){
                self.setItems(self.activeDocumentListUrl);
            }

        };


        self.processMessage = function(msg){
            console.log(msg);
        };


        self.deleteDocumentModal = function(documentID){
            self.deleteDocumentId = documentID;
            var element = angular.element('#_delete_document');
            element.modal('show');
        };

        self.deleteDraftDocument = function() {

            $('#Document_Del').attr('action', '../../documents/'+ self.deleteDocumentId +'/delete');

        };



        self.documentDraftList();

})



})();