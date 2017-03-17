'use strict';
medVision
.service('BaseServices', ['HttpServices', function(_httpServices){
	this.http = _httpServices;
}]);