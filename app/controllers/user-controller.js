module.exports = function(app) {
  app.controller('UserController',['AuthService', 'ErrorService', '$http', '$location',
  function(AuthService, ErrorService, $http, $location){
    let url = 'http://localhost:3000'
    const vm = this;
    vm.user = [];
    vm.user = ['user'];
    vm.uae = false; //uae = user already exists
    vm.ip = false; //ip = invalid password

    vm.createUser = function(user) {
      $http.post(url + '/signup', user, {
        headers: {
          token: AuthService.getToken()
        }
      })
      .then(function(res){
        if(res.data.message !== "User Already Exists"){
          console.log(res);
          vm.user.push(res.data);
          vm.newUser = null;
          $location.path('/category');
        } else {
          vm.uae = true;
        }
      });
    };

    vm.signIn = function(user) {
      console.log(user);
      AuthService.signIn(user, (err, res) => {
        if (err) {
          vm.ip = true;
          return console.log('Problem Signing In ', err);
        } else {
          vm.error = ErrorService(null);
          $location.path('/category');
        }
      })
    }

  }])
}


// app.controller('PeopleController', ['AuthService','$http', '$location', 'ErrorService',
//     function(AuthService, $http, $location, ErrorService) {
//     const mainRoute = 'http://localhost:3000/people';
//     const vm = this;
//     vm.people = [];
//     vm.error = ErrorService();
//     console.log(vm.error);
//     vm.people = ['person'];
//     vm.getPeople = function() {
//       $http.get(mainRoute, {
//         headers: {
//           token: AuthService.getToken()
//         }
//       })
//         .then(function (result) {
//             vm.error = ErrorService(null);
//             vm.people = result.data;
//           }, (err) => {
//             vm.error = ErrorService('Please Sign In');
//             $location.path('/signup');
//           });
//     };
//
//
//
//
//
// vm.removePerson = function(person) {
//   $http.delete(mainRoute + '/' + person._id, {
//     headers: {
//       token: AuthService.getToken()
//     }
//   })
//     .then(function(res){
//       vm.people = vm.people.filter((p) => p._id != person._id);
//     });
// };
//
// vm.updatePerson = function(person) {
//   $http.put(mainRoute + '/' + person._id, person, {
//     headers: {
//       token: AuthService.getToken()
//     }
//   })
//     .then((res) => {
//       person.editing = false;
//     }, (err) => console.log(err))
// };
//
// vm.toggleForm = function(person) {
//   if (!person.editing) {
//     person.backupName = person.name;
//     person.editing = true;
//   } else {
//     person.name = person.backupName;
//     person.editing = false;
//   }
// }
//
// vm.signUp = function(user) {
//   AuthService.createUser(user, function(err, res) {
//     if (err) return vm.error = ErrorService('Problem Creating User');
//     vm.error = ErrorService(null);
//     $location.path('/home');
//   });
// }
//
// vm.signOut = function() {
//   AuthService.signOut(() => {
//     $location.path('/signup');
//   });
// }
// vm.signIn = function(user) {
//   AuthService.signIn(user, (err, res) => {
//     if (err) return vm.error = ErrorService('Problem Signing In');
//     vm.error = ErrorService(null);
//     $location.path('/home');
//   })
// }
//
// }]);
