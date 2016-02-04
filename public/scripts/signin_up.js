$('#register-submit').click(() => {
  var signup = {
    email: $('#email').val(),
    username: $('#username').val(),
    password: $('#password').val(),
    comfirmpassword: $('#comfirmpassword').val()
  };
  $.ajax({ contentType: 'application/json',
  data: JSON.stringify(signup),
  dataType: 'json',
  success: function(data) {
     var token = 'token';
     $.cookie(token, data.token);
     window.location.href = '/profiles';
   },
  error: function(data) {
    var msg = JSON.parse(data.responseText).msg;
     $('#response').text(msg);
   },
  processData: false,
  type: 'POST',
  url: '/signup'
  });
});

$('#login-submit').click(() => {
  var email1 = $('#email1').val();
  var password1 = $('#password1').val();
  var headauth = email1 + ':' + password1;
  var headauthbase64 = window.btoa(headauth);

  $.ajax({
  headers: { 'Authorization': 'Basic ' + headauthbase64 },
  success: function(data) {
    var token = 'token';
    $.cookie(token, data.token);
    window.location.href = '/profiles';
  },
  error: function(data) {
     var msg = JSON.parse(data.responseText).msg;
     $('#response').text(msg);
     var token = 'token';
    $.cookie(token, '');
  },
  processData: false,
  type: 'GET',
  url: '/signin'
  });
});
