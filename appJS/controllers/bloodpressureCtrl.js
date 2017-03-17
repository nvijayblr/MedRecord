'use strict';
medVision.controller('bloodpressureCtrl', ['$scope', 'BaseServices', '$timeout', function(_scope, _services, _timeout){

	_scope.activeView = 'bloodpressure';
	_scope.init = function(_ehrId) {
		_scope.chartLoaded = false;
		_services.http.serve({
			method: 'GET',
			url: 'https://dev.medrecord.nl/ehr/'+_ehrId+'/procedure/bloodpressure/omh?authToken=helloletmeinplease'
		}, function(data){
			_scope.db = {key: "Diastolic BP", values: []};
			_scope.sb = {key: "Systolic BP", values: []};
			
			angular.forEach(data.data, function(_obj, _i){
				_scope.dt = moment(_obj.body.effective_time_frame.date_time).format('X');
				_scope.db.values.push({"date": _scope.dt, "mmHg": _obj.body.diastolic_blood_pressure.value})
				_scope.sb.values.push({"date": _scope.dt, "mmHg": _obj.body.systolic_blood_pressure.value})
			});
			_scope.db = [_scope.db];
			_scope.db.push(_scope.sb)
			_scope.loadChart(_scope.db);
			_scope.chartLoaded = true;
		});
	}
	_scope.init(452);
	
	_scope.loadChart = function(_chartData) {
		_scope.options = {
			chart: {
				type: 'lineWithFocusChart',
				height: 400,
				margin : {
					top: 20,
					right: 20,
					bottom: 40,
					left: 60
				},
				x: function(d){ return d['date']; },
				y: function(d){
					return d['mmHg']; 
				},
                color: d3.scale.category10().range(),
                duration: 500,
                useInteractiveGuideline: true,
                clipVoronoi: false,

				xAxis: {
					axisLabel: 'Date',
					tickFormat: function(d) {
						return moment.unix(d).format("YYYY-MM-DD");
					},
					showMaxMin: false
				},
                x2Axis: {
                    tickFormat: function(d){
                        return moment.unix(d).format("MMM YYYY");
                    }
                },

				yAxis: {
					axisLabel: 'mmHg',
					showMaxMin: false
				},

				zoom: {
					enabled: true,
					scaleExtent: [1, 5],
					useFixedDomain: false,
					useNiceScale: true,
					horizontalOff: false,
					verticalOff: true,
					unzoomEventType: 'dblclick.zoom'
				}
			}
		};
		_scope.data = _chartData;
	}
	
	
}]);

