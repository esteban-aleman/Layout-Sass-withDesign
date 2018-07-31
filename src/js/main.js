'use strict';
var subm = document.getElementById('next-btn');
var logmail = document.getElementById('logmail');
var logpass = document.getElementById('logpass');
var failedmsj = document.getElementById('failedlogin');

failedmsj.style.display = 'none';

var users = {
  "root":"root",
  "e.alemarz@gmail.com": "1234Q"
};

subm.addEventListener('click', function() {
  login.validate();
})

logmail.addEventListener('focus',function() {
  login.resetFail();
});

logpass.addEventListener('focus', function() {
  login.resetFail();
});

var login = (function validateCredentials() {

  var _validMail = function validateMail() {
    return users[logmail.value] !== undefined;
  };

  var _validPass = function validatePass() {
    return logpass.value === users[logmail.value];
  };

  var resetFail = function () {
    failedmsj.style.display = 'none';
  }

  var validate = function () {
    if(_validMail() && _validPass()){
      window.location.href = 'dashboard.html';
    }else{
      failedmsj.style.display = 'block';
    }
  };

  return {
    validate: validate,
    resetFail: resetFail
  };

})();
