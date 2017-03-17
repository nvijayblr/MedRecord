'use strict';
medVision.controller('bmiCtrl', ['$scope', 'BaseServices', function(_scope, _services){
	
	_scope.init = function(_ehrId) {
		_scope.chartLoaded = false;
		_services.http.serve({
			method: 'GET',
			url: 'https://dev.medrecord.nl/ehr/'+_ehrId+'/procedure/bmi/omh?authToken=helloletmeinplease'
		}, function(data){
			_scope.bm = {key: "Body Mass", bar: false, values: []};
			angular.forEach(data.data, function(_obj, _i){
				_scope.dt = moment(_obj.body.effective_time_frame.date_time).format('X');
				_scope.bm.values.push({"x": _scope.dt, "y": _obj.body.body_mass_index.value});
			});
			_scope.bm = [_scope.bm];
			_scope.loadChart(_scope.bm);
			_scope.chartLoaded = true;
		});
	}
	_scope.init(452);
	
	_scope.loadChart = function(_chartData) {
		_scope.options = {
            chart: {
                type: 'linePlusBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 40
                },
                duration: 500,
                useInteractiveGuideline: true,
                xAxis: {
                    axisLabel: 'Date',
                    tickFormat: function(d){
                        return moment.unix(d).format("YYYY-MM-DD");
                    },
					showMaxMin: false
                },
                x2Axis: {
                    tickFormat: function(d){
                        return moment.unix(d).format("MMM YYYY");
                    },
					showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'kg/m2',
                    rotateYLabel: false
                }
			}
		};
		_scope.data = _chartData;
	}
	
}]);