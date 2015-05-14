/*
 * Part of mcwebb/angular-twilio-verification
 * Coypyright 2015 Matthew Webb <matthewowebb@gmail.com>
 * MIT License
 */
angular.module('mcwebb.twilio-verification', ['mcwebb.twilio'])
.provider('TwilioVerification', function () {
	var opts = {};

	this.setFromNumber = function (number) {
		opts.fromNumber = number;
	};

	this.$get = function ($q, Twilio) {
		var attempts = [],
			internal = {};

		internal.generateCode = function () {
			return Math.floor(Math.random() * 100000);
		};

		internal.sendCode = function (to, body) {
			var deferred = $q.defer(),
				code = internal.generateCode();

			if (body && body.length > 0)
				body = body + ' ' + code;
			else body = code;

			Twilio.create('Messages', {
				From: opts.fromNumber,
				To: to,
				Body: body
			})
			.success(function () {
				attempts.push(code);
				deferred.resolve(code);
			})
			.error(function () {
				deferred.reject('communication with Twilio failed');
			});

			return deferred.promise;
		};

		internal.verifyCode = function (code) {
			var correct = attempts.pop();
			if (code == correct) return true;
			else {
				attempts.push(correct);
				return false;
			}
		};

		return {
			sendCode: internal.sendCode,
			verifyCode: internal.verifyCode
		};
	};
});
