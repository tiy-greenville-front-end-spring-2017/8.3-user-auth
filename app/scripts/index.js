var $ = require('jquery');

function setupAjax(loggedInUser){
  $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader("X-Parse-Application-Id", "tiygvl");
        xhr.setRequestHeader("X-Parse-REST-API-Key", "slumber");
        if(loggedInUser){
          xhr.setRequestHeader("X-Parse-Session-Token", loggedInUser.sessionToken);
        }
      }
  });
}

setupAjax();

var apiUrl = 'https://tiny-parse-server.herokuapp.com';

// $.get(apiUrl + '/Puppy').then(function(data){
//   console.log(data);
// });
//
// $.post(apiUrl + '/Puppy', {'name': 'Kepler'}).then(function(data){
//   console.log(data);
// });

$('#signup').on('submit', function(e){
  e.preventDefault();

  var username = $('#signup-email').val();
  var password = $('#signup-password').val();
  var user = {
    username: username,
    password: password
  };

  $.post(apiUrl + '/users', user).then(function(data){
    console.log(data);
  });

});

$('#login').on('submit', function(e){
  e.preventDefault();

  var username = $('#email-login').val();
  var password = $('#password-login').val();
  console.log(username);
  console.log(password);

  var url = apiUrl + '/login?username=' +
            encodeURIComponent(username) + '&' +
            'password=' + encodeURIComponent(password);

  console.log(url);

  $.get(url).then(function(data){
    console.log(data);
    var userData = JSON.stringify(data);
    localStorage.setItem('user', userData);
  });
});

var loggedInUser = localStorage.getItem('user');

if(loggedInUser){
  loggedInUser = JSON.parse(loggedInUser);
  loggedInUser.sessionToken;
  setupAjax(loggedInUser);

  $.get(apiUrl + '/users/me').then(function(data){
    console.log(data);
  })
}










// https://puppyhipster.com
//
// URL (endpoint) where I can get a listing of puppies:
// /puppies [GET]
//
// Response:
// [
//   {id: 1, name: "Kepler", rating: 10},
//   {id: 2, name: "Gunner", rating: 9}
// ]
//
// What URL and method would I use to create a new puppy:
// /puppies [POST]
//
// {name: "Raffi"}
//
// What URL and method would I use to get a single puppy:
// /puppies/1 [GET]
//
// Response:
// {id: 1, name: "Kepler"}
//
// What URL and method would I use to update a single puppy:
// /puppies/1 [PATCH]
//
// {name: "Kepler Boltzman Longfellow"}
//
// /puppies/1 [PUT]
//
// {name: "Kepler Boltzman Longfellow", rating: 10}
//
// /puppies/1 [POST]
//
// {name: "Kepler Boltzman Longfellow", rating: 10}

// var apiUrl = 'http://tiny-lasagna-server.herokuapp.com/collections';
// $.get(apiUrl + '/todo').then(function(data){
//   console.log(data);
// });
//
// $.get(apiUrl + '/todo/58adc32ebe34ec00041f4340').then(function(data){
//   console.log(data);
// });
//
// $.post(apiUrl + '/todo', {title: 'REST'}).then(function(data){
//   console.log(data);
// });
