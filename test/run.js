var assert = require("assert");

var { describe, test} = require('mocha');

var btcPaymentsConfig = require('./config');
console.log("BTCPayments config: \n",btcPaymentsConfig);
var BTCPayments = null;
var paymentW = null;

describe('BTCPayments run app', function() {

	test('BTCPayments its created', function(done) {
		BTCPayments = new require('../lib/index')(btcPaymentsConfig,[],[],[],[]);
		done();
	});

	test('BTCPayments onCreate Test function', function(done) {
		var funcToAdd = function(payment,callback){
			console.log('BTC Payment tx created');
			callback(null,payment);
		};
		BTCPayments.addOnCreate('Test', funcToAdd);
		BTCPayments.addOnCreate('ToDelete', funcToAdd);
		BTCPayments.removeOnCreate('ToDelete');
		BTCPayments.changeOnCreate('Test', function(payment,callback){
			console.log('BTC Payment tx created, using edited function');
			callback(null,payment);
		});
		done();
	});

	test('BTCPayments onComplete Test function', function(done) {
		var funcToAdd = function(payment,callback){
			console.log('BTC Payment tx completed');
			console.log(payment);
			callback(null,payment);
		};
		BTCPayments.addOnComplete('Test', funcToAdd);
		BTCPayments.addOnComplete('ToDelete', funcToAdd);
		BTCPayments.removeOnComplete('ToDelete');
		BTCPayments.changeOnComplete('Test', function(payment,callback){
			console.log('BTC Payment tx completed, using edited function');
			console.log(payment);
			callback(null,payment);
		});
		done();
	});

	test('BTCPayments onWarning Test function', function(done) {
		var funcToAdd = function(payment,callback){
			console.log('BTC Payment tx warned');
			console.log(payment);
			callback(null,payment);
		};
		BTCPayments.addOnWarning('Test', funcToAdd);
		BTCPayments.addOnWarning('ToDelete',funcToAdd);
		BTCPayments.removeOnWarning('ToDelete');
		BTCPayments.changeOnWarning('Test', function(payment,callback){
			console.log('BTC Payment tx warned, using edited function');
			console.log(payment);
			callback(null,payment);
		});
		done();
	});

	test('BTCPayments onCancel Test function', function(done) {
		var funcToAdd = function(payment,callback){
			console.log('BTC Payment tx canceled');
			console.log(payment);
			callback(null,payment);
		};
		BTCPayments.addOnCancel('Test', funcToAdd);
		BTCPayments.addOnCancel('ToDelete', funcToAdd);
		BTCPayments.removeOnCancel('ToDelete');
		BTCPayments.changeOnCancel('Test', function(payment,callback){
			console.log('BTC Payment tx canceled, using edited function');
			console.log(payment);
			callback(null,payment);
		});
		done();
	});

  	test('BTCPayments update with new waitingTX', function(done) {
		BTCPayments.start();
	});

});


