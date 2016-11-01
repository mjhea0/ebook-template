'use strict';
var toInt = module.exports = function(value, radix, defaultValue) {
	return parseInt(value, radix || 10) || defaultValue || 0;
};

toInt.toFloat = function(value, defaultValue) {
	return parseFloat(value) || defaultValue || 0;
};