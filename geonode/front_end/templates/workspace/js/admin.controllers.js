(function(){
    'use strict';

angular
    .module('workspaceApp')
    .controller('AdminLayerController', function ($scope, $q, $window, $http, $timeout, dataListService) {
        var self = $scope;
    self.printme = "please convert me to angular js";
    self.searchString = null;
    self.currentTab = 0;

    self.userApprovalRequestLayerListUrl = "../../api/workspace_layer_api?limit=25&resource_state=user_approval_request_list&user_type=admin";
    self.approvedLayerListUrl = "../../api/workspace_layer_api?limit=25&resource_state=approved_list&user_type=admin";
    self.userDraftsLayerListUrl = "../../api/workspace_layer_api?limit=25&resource_state=user_draft_list&user_type=admin";
    self.deniedLayerListUrl = "../../api/workspace_layer_api?limit=25&resource_state=denied_list&user_type=admin";



    self.setItems = function(url){

        if(self.searchString){
            url += "&title__icontains=" + self.searchString;
        }
        self.items = [];
        self.checkAll = false;
        self.selectedItems = [];

        dataListService.getDataList(url).then(function (datalist) {
            self.items = datalist.data.objects;
            self.nextUrl = datalist.data.meta.next;
            self.previousUrl = datalist.data.meta.previous;
            self.counter = datalist.data.meta.offset;

        });

    };


        self.userApprovalRequestList = function (){
            self.currentTab = 0;
            self.searchString = null;
            self.setItems(self.userApprovalRequestLayerListUrl);

            // set an extra boolean variable to all the items
            angular.forEach(self.items, function(item, key){
                item.checked = false;
            });

        };
        self.approvedList = function (){
            self.currentTab = 1;
            self.searchString = null;
            self.setItems(self.approvedLayerListUrl);
        };
        self.userDraftsList = function (){
            self.currentTab = 2;
            self.searchString = null;
            self.setItems(self.userDraftsLayerListUrl);
        };
        self.deniedList = function (){
            self.currentTab = 3;
            self.searchString = null;
            self.setItems(self.deniedLayerListUrl);
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
               self.setItems(self.userApprovalRequestLayerListUrl);
            }
            else if (self.currentTab === 1){
                self.setItems(self.approvedLayerListUrl);
            }
            else if (self.currentTab === 2){
                self.setItems(self.userDraftsLayerListUrl);
            }
            else if (self.currentTab === 3){
                self.setItems(self.deniedLayerListUrl);
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

        self.toggleAll = function(event){
            if(event.target.checked){
                self.checkAll = true;
                angular.forEach(self.items, function(item, key){
                    self.selectedItems.push(item.id);
                });
            }
            else {
                self.checkAll = false;
                angular.forEach(self.items, function(item, key){
                    self.selectedItems.pop(item.id);
                });
            }



        };

        self.toggleSelection = function(event, id){
            if (event.target.checked)
            {
                self.selectedItems.push(id);
            }
            else
            {
                self.selectedItems.pop(id);
            }

        };

        self.approveSelectedItems = function()
        {
          dataListService.approveLayers(Object.assign({},
              {
                  layer_ids: self.selectedItems
              })).then(function(res){
                  $window.location.href = '/workspace/manager/layer';
                    surfToastr.success('Layers approved successfully', 'Success');

                });
        };


        self.userApprovalRequestList();

})
    .controller('AdminMapController', function ($scope, $q, $window, $http, $timeout, dataListService) {
        var self = $scope;
    self.printme = "please convert me to angular js";
    self.searchString = null;
    self.currentTab = 0;

    self.userApprovalRequestMapListUrl = "../../api/workspace_map_api?limit=25&resource_state=user_approval_request_list&user_type=admin";
    self.approvedMapListUrl = "../../api/workspace_map_api?limit=25&resource_state=approved_list&user_type=admin";
    self.userDraftsMapListUrl = "../../api/workspace_map_api?limit=25&resource_state=user_draft_list&user_type=admin";
    self.deniedMapListUrl = "../../api/workspace_map_api?limit=25&resource_state=denied_list&user_type=admin";



    self.setItems = function(url){

        if(self.searchString){
            url += "&title__icontains=" + self.searchString;
        }
        self.items = [];
        self.checkAll = false;
        self.selectedItems = [];
        dataListService.getDataList(url).then(function (datalist) {
            self.items = datalist.data.objects;
            self.nextUrl = datalist.data.meta.next;
            self.previousUrl = datalist.data.meta.previous;
            self.counter = datalist.data.meta.offset;
        });

    };


        self.userApprovalRequestList = function (){
            self.currentTab = 0;
            self.searchString = null;
            self.setItems(self.userApprovalRequestMapListUrl);
        };
        self.approvedList = function (){
            self.currentTab = 1;
            self.searchString = null;
            self.setItems(self.approvedMapListUrl);
        };
        self.userDraftsList = function (){
            self.currentTab = 2;
            self.searchString = null;
            self.setItems(self.userDraftsMapListUrl);
        };
        self.deniedList = function (){
            self.currentTab = 3;
            self.searchString = null;
            self.setItems(self.deniedMapListUrl);
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
               self.setItems(self.userApprovalRequestMapListUrl);
            }
            else if (self.currentTab === 1){
                self.setItems(self.approvedMapListUrl);
            }
            else if (self.currentTab === 2){
                self.setItems(self.userDraftsMapListUrl);
            }
            else if (self.currentTab === 3){
                self.setItems(self.deniedMapListUrl);
            }

        };


        self.processMessage = function(msg){
            console.log(msg);
        };


        self.deleteMapModal = function(mapID){
            self.deleteMapId = mapID;
            var element = angular.element('#_delete_map');
            element.modal('show');
        };

        self.deleteDraftMap = function() {

            $('#Map_Del').attr('action', '../../maps/'+ self.deleteMapId +'/delete');

        };

        self.toggleAll = function(event){
            if(event.target.checked){
                self.checkAll = true;
                angular.forEach(self.items, function(item, key){
                    self.selectedItems.push(item.id);
                });
            }
            else {
                self.checkAll = false;
                angular.forEach(self.items, function(item, key){
                    self.selectedItems.pop(item.id);
                });
            }



        };

        self.toggleSelection = function(event, id){
            if (event.target.checked)
            {
                self.selectedItems.push(id);
            }
            else
            {
                self.selectedItems.pop(id);
            }

        };

        self.approveSelectedItems = function()
        {
          dataListService.approveMaps(Object.assign({},
              {
                  map_ids: self.selectedItems
              })).then(function(res){
                  $window.location.href = '/workspace/manager/map';
                    surfToastr.success('Maps approved successfully', 'Success');

                });
        };


        self.userApprovalRequestList();

})
.controller('AdminDocumentController', function ($scope, $q, $window, $http, $timeout, dataListService) {
        var self = $scope;
    self.printme = "please convert me to angular js";
    self.searchString = null;
    self.currentTab = 0;

    self.userApprovalRequestDocumentListUrl = "../../api/workspace_document_api?limit=25&resource_state=user_approval_request_list&user_type=admin";
    self.approvedDocumentListUrl = "../../api/workspace_document_api?limit=25&resource_state=approved_list&user_type=admin";
    self.userDraftsDocumentListUrl = "../../api/workspace_document_api?limit=25&resource_state=user_draft_list&user_type=admin";
    self.deniedDocumentListUrl = "../../api/workspace_document_api?limit=25&resource_state=denied_list&user_type=admin";



    self.setItems = function(url){

        if(self.searchString){
            url += "&title__icontains=" + self.searchString;
        }
        self.items = [];
        self.checkAll = false;
        self.selectedItems = [];
        dataListService.getDataList(url).then(function (datalist) {
            self.items = datalist.data.objects;
            self.nextUrl = datalist.data.meta.next;
            self.previousUrl = datalist.data.meta.previous;
            self.counter = datalist.data.meta.offset;
        });

    };


        self.userApprovalRequestList = function (){
            self.currentTab = 0;
            self.searchString = null;
            self.setItems(self.userApprovalRequestDocumentListUrl);
        };
        self.approvedList = function (){
            self.currentTab = 1;
            self.searchString = null;
            self.setItems(self.approvedDocumentListUrl);
        };
        self.userDraftsList = function (){
            self.currentTab = 2;
            self.searchString = null;
            self.setItems(self.userDraftsDocumentListUrl);
        };
        self.deniedList = function (){
            self.currentTab = 3;
            self.searchString = null;
            self.setItems(self.deniedDocumentListUrl);
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
               self.setItems(self.userApprovalRequestDocumentListUrl);
            }
            else if (self.currentTab === 1){
                self.setItems(self.approvedDocumentListUrl);
            }
            else if (self.currentTab === 2){
                self.setItems(self.userDraftsDocumentListUrl);
            }
            else if (self.currentTab === 3){
                self.setItems(self.deniedDocumentListUrl);
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

        self.toggleAll = function(event){
            if(event.target.checked){
                self.checkAll = true;
                angular.forEach(self.items, function(item, key){
                    self.selectedItems.push(item.id);
                });
            }
            else {
                self.checkAll = false;
                angular.forEach(self.items, function(item, key){
                    self.selectedItems.pop(item.id);
                });
            }



        };

        self.toggleSelection = function(event, id){
            if (event.target.checked)
            {
                self.selectedItems.push(id);
            }
            else
            {
                self.selectedItems.pop(id);
            }

        };

        self.approveSelectedItems = function()
        {
          dataListService.approveDocuments(Object.assign({},
              {
                  document_ids: self.selectedItems
              })).then(function(res){
                  $window.location.href = '/workspace/manager/document';
                    surfToastr.success('Documents approved successfully', 'Success');

                });
        };


        self.userApprovalRequestList();

})

})();