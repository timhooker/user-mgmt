// User constructs a new user object. For more details, see
// https://github.com/tiy-durham-fe-2015/curriculum/tree/master/assignments/user_mgmt
function User(spec) {
  // TODO: implement the user class, and get user unit tests passing
  if (!spec.firstName || spec.firstName.trim() === '') {
    throw 'First name is required';
  } else if (!spec.lastName || spec.lastName.trim() === '') {
    throw 'Last name is required';
  } else if (!spec.email || spec.email.trim() === '') {
    throw 'Email is required';
  }
  var self = {
    firstName: spec.firstName.trim(),
    lastName: spec.lastName.trim(),
    email: spec.email.trim(),
    name: spec.firstName.trim() + ' ' + spec.lastName.trim(),
    equal: function (otherUser) {
      return self.email === otherUser.email;
    }
  };

  return self;
}
