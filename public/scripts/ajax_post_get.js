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
    comfrimpassword: $('#confirmpassword').val()
  };
  $.ajax({ contentType: 'application/json',
  data: JSON.stringify(signup),
  dataType: 'json',
  success: function() { console.log('device control succeeded'); },
  error: function() { console.log('Device control failed'); },
  processData: false,
  type: 'POST',
  url: '/signup'
  });

  if (!(signup.email || '').length) return $('#response').text('Please enter a email');

  if (!emailValidation(signup.email)) return $('#response').text('Please enter a valid email');

  if (!(signup.username || '').length) return $('#response').text('Please enter a user name');

  if (!((signup.password || '').length > 7)) return $('#response').text('Please enter password of length more than 7');

  if (!(signup.password === signup.comfirmpassword)) return $('#response').text('Passwords are not same');
  if (true) return $('#response').text('success!');


});
