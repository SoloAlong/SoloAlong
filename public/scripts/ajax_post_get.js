$('#register-submit').click(() => {
  console.log($('#email').val());
  console.log($('#username').val());
  console.log($('#password').val());
  console.log($('#confirmpassword').val());
  var signup = {
    email: $('#email').val(),
    username: $('#username').val(),
    password: $('#password').val(),
    confirmpassword: $('#confirmpassword').val()
  };
  $.ajax({ contentType: 'application/json',
  data: JSON.stringify(signup),
  dataType: 'json',
  success: function(data) { console.log(data.msg); $('#response').text(data.msg);},
  error: function(data) { console.log(data); },
  processData: false,
  type: 'POST',
  url: '/signup'
  });
});

$('#login-submit').click(() => {
  console.log($('#email1').val());
  console.log($('#password1').val());
  var email1 = $('#email1').val();
  var password1 = $('#password1').val();
  console.log(typeof email1);
  console.log(password1);
  var headauth = email1 + ':' + password1;
  console.log(headauth);
  var headauthbase64 = window.btoa(headauth);

  $.ajax({
  headers: { 'Authorization': 'Basic ' + headauthbase64 },
  success: function(data) {
    console.log(data);
    console.log(data.msg);
    $('#response').text(data.msg);
    var token = 'token';
    $.cookie(token, data.token);
    window.location.href = "/profiles";
  },
  error: function(data) {
     var msg = JSON.parse(data.responseText).msg;
     $('#response').text(msg);
     var token = 'token';
    $.cookie(token, "");
  },
  processData: false,
  type: 'GET',
  url: '/signin'
  });
});
