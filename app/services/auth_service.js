module.exports = function(app) {
  app.factory('AuthService', ['$http', '$window',function($http, $window) {
    var token;
    var url = 'http://localhost:3000'
    var auth = {
      createUser(user, cb) {
        cb || function() {};
        $http.post(url + '/signup', user)
          .then((res) => {
            token = $window.localStorage.token = res.data.token;
            cb(null, res)
          }, (err) => {
            cb(err)
          })
      },
      getToken() {
        return token || $window.localStorage.token;
      },
      signOut(cb) {
        token = null;
        $window.localStorage.token = null;
        if (cb) cb();
      },
      signIn(user, cb) {
        console.log('signIn from auth serv ', user)
        cb || function() {};
        $http.post(url + '/login', {}, {
          headers: {
            authorization: 'Basic ' + btoa(user.username + ':' + user.password)
          }
        }).then((res) => {
          token = $window.localStorage.token = res.data.token;
          console.log('This is token ', token)
          cb(null, res);
        }, (err) => {
          cb(err);
        })
      }
    }
    return auth;
  }])
};
