# Angular Twilio Verification Module
Angular module for verifying phone numbers with Twilio's SMSs

Do phone number verification by sending an one-time code in an SMS via Twilio to user's phone.
The verification code is stored locally, so this shouldn't be used where security is absolutely vital.

## Installation
This module depends on [Angular Twilio Module](https://github.com/mcwebb/angular-twilio).

### Install with Bower
```bash
# from the terminal at the root of your project
bower install angular-twilio-verification --save
```
### Add to your module deps
```js
angular.module('xxxx', ['mcwebb.twilio', 'mcwebb.twilio-verification'])
```

## Example Use
### Set up
```js
angular.module('xxxx')
.config(function (TwilioVerificationProvider) {
	// the number Twilio number that SMSs should be sent from
	TwilioVerificationProvider.setFromNumber('+12402926537');
});
```

### Use
```js
angular.module('xxxx')
.controller('ExampleController', function ExampleController($scope, TwilioVerification) {
	$scope.submit = function (toNumber) {
		// toNumber formatted with international code e.g. '+12402926537'
		TwilioVerification.sendCode(toNumber)
		.then(function () {
			// SUCCESSFULY SENT - move to next step
		}, function (response) {
			// FAILED TO SEND - tell the user
		})
	};

	$scope.verify = function (verificationCode) {
		// returns boolean
		var verified = TwilioVerification.verifyCode(verificationCode);
		if (verified) {
			// ALL GOOD
		} else {
			// NOPE
		}
	}
});
```
