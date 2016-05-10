module.exports = function(app) {
  app.factory('AuthService', ['$http', '$window',function($http, $window) {
    var token;
    var userId;
    // var url = 'http://localhost:3000'
    var auth = {
      createUser(user, cb) {
        cb || function() {};
        $http.post('/signup', user)
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
      getId(){
        return userId || $window.localStorage.user;
      },
      signOut(cb) {
        token = null;
        $window.localStorage.token = null;
        $window.localStorage.scoreId = $window.localStorage.user = null;
        if (cb) cb();
      },
      signIn(user, cb) {
        console.log('signIn from auth serv ', user)
        cb || function() {};
        $http.post('/login', {}, {
          headers: {
            authorization: 'Basic ' + btoa(user.username + ':' + user.password)
          }
        }).then((res) => {
          console.log(res)
          token = $window.localStorage.token = res.data.token;
          userId = $window.localStorage.user = res.data.data._id;
          console.log('This is token ', token)
          console.log('this is userId ', userId)
          cb(null, res);
        }, (err) => {
          cb(err);
        })
      }
    }
    return auth;
  }])
};
