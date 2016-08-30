//function timer(){
module.exports = function() {
	var start,
		end,
		time;
	
	return {
		start: function(){
			start = new Date().getTime();
		},
		stop: function(){
			end = new Date().getTime();
		},
		getTime: function(){
			time = end - start;
			return time;
		}
	};
};



//module.exports = timer;