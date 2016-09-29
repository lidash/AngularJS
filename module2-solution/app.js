(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
	var TBCtrl = this;
	TBCtrl.tobuys = ShoppingListCheckOffService.getTobuys();
	TBCtrl.removeBuy = function(tobuyIndex,tobuyName,tobuyQuantity){
		ShoppingListCheckOffService.removeBuy(tobuyIndex,tobuyName,tobuyQuantity);
	} 
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
	var ABCtrl = this;

	ABCtrl.boughts = ShoppingListCheckOffService.getBought();

	

}

function ShoppingListCheckOffService() {
	var service = this;

	var tobuys = [
		{	name: "cookie1",
			quantity: 10
		},
		{	name: "cookie2",
			quantity: 20
		},
		{	name: "cookie3",
			quantity: 30
		},
		{	name: "cookie4",
			quantity: 40
		},
		{	name: "cookie5",
			quantity: 50
		}
	];

	var boughts = [];

	 
	 service.getBought = function() {
	 	return boughts;
	 };

	 service.removeBuy = function(tobuyIndex,tobuyName,tobuyQuantity){
	 		tobuys.splice(tobuyIndex,1);
	 			var bought = {
	      name: tobuyName,
	      quantity: tobuyQuantity
    	};
    	boughts.push(bought);
	 };
	 service.getTobuys = function() {
	 	return tobuys;
	 };

}


})();