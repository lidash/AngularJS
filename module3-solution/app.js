(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems',FoundItemsDirective);

function FoundItemsDirective(){
	var ddo={
		templateUrl: 'foundItems.html',
		scope: {
			found: '<',
			onRemove: '&'

		},
		controller: NarrowItDownDirectiveController,
	    controllerAs: 'dirNDCtrl',
	    bindToController: true

	};
	return ddo;
}


function NarrowItDownDirectiveController() {
	var dirNDCtrl = this;
	/*dirNDCtrl.isEmpty = function() {
        return dirNDCtrl.found.length === 0;
      }*/

}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	var NDCtrl = this;
	//NDCtrl.searchTerm = '';
	NDCtrl.foundItems = [];
	
	

	NDCtrl.Menu = function(){

		if((NDCtrl.searchTerm == undefined) ||(NDCtrl.searchTerm == '')){
		console.log('Nothing found');
		NDCtrl.message = "Nothing found";
		NDCtrl.foundItems = [];
		}else{
			var promise = MenuSearchService.getMatchedMenuItems(NDCtrl.searchTerm);
			console.log(promise);
		
			promise.then(function(response){
				NDCtrl.foundItems = response;
				console.log(NDCtrl.foundItems);
				if(NDCtrl.foundItems.length===0){
					console.log('Nothing found');
					NDCtrl.message = "Nothing found";
					NDCtrl.foundItems=[];
				}else{
					
					NDCtrl.message = "Found";
				}
			
			})
		.catch(function(error) {
			console.log('error has occured');
		});
	};

		
	}

	NDCtrl.removeFoundItems = function(itemIndex){
		NDCtrl.foundItems.splice(itemIndex, 1);
	}

}




MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {

	var service = this;

	service.getMatchedMenuItems = function(searchTerm){
		var foundItems = [];
		return $http({
			method: "GET",
			url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
		})
		.then(function (result) {
			
			for(var i=0; i<result.data.menu_items.length; i++){
				var description = result.data.menu_items[i].description;
				
				if (description.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1) {
					foundItems.push(result.data.menu_items[i]);	
				}

			}
			///console.log(foundItems);
		   return foundItems;
		});

	
	}


	}

}());
