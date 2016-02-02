function emailValidation(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

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
  var signIn = {
    username: $('#username1').val(),
    password: $('#password1').val()
  };
  $.ajax({ contentType: 'application/json',
  data: JSON.toString(signIn)})
}
