'use strict';
var medVision = angular.module('medVision', ['ui.router', 'angular-loading-bar', 'nvd3']);

medVision
.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/bloodpressure');
    
    $stateProvider
		.state('bloodpressure', {
				url: '/bloodpressure',
				templateUrl: 'templates/bloodpressure.html',
				controller: 'bloodpressureCtrl'
		})
		.state('bmi', {
				url: '/bmi',
				templateUrl: 'templates/bmi.html',
				controller: 'bmiCtrl'
		})
		.state('acq', {
				url: '/acq',
				templateUrl: 'templates/acq.html',
				controller: 'acqCtrl'
		})
		;
});
