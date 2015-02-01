  var newUserForm = document.querySelector('.add-user-form'),
      editUserForm = document.querySelector('.edit-user-form'),
      modal = document.querySelector('.modal-edit-user'),
      userListElement = document.querySelector('.user-list'),
      userListSort = document.querySelector('.user-list-sort'),
      userListSearch = document.querySelector('.user-list-search'),
      userError = document.querySelector('.user-error'),
      editFirstName = editUserForm.querySelector('input[name="firstName"]'),
      editLastName = editUserForm.querySelector('input[name="lastName"]'),
      editEmail = editUserForm.querySelector('input[name="email"]'),
      user = {},
      userTools = ObjectStore();

  // MVP
  newUserForm.addEventListener('submit', addUser);
  editUserForm.addEventListener('submit', editUser);
  userListSort.addEventListener('change', sortUserList);
  userListSearch.addEventListener('keyup', searchUserList);

  // Stretch
    // modal popup
    // persist values
  var usersList = userTools.query();
  showUsers(usersList);


  function addUser(e){
    e.stopPropagation();
    e.preventDefault();
    // capture input from the form and assign it to the object
    var newFirstName = newUserForm.querySelector('input[name="firstName"]');
    var newLastName = newUserForm.querySelector('input[name="lastName"]');
    var newEmail = newUserForm.querySelector('input[name="email"]');
    var newUser = {
      firstName: newFirstName.value,
      lastName: newLastName.value,
      email: newEmail.value
    };

    try {
      user = User(newUser);
    }
    catch( e ) {
      showUserError(e);
      newFirstName.focus();
      return;
    }
    userTools.add(user);
    // add catch

    var usersList = userTools.query();
    showUsers(usersList);
    // clear inputs
    newFirstName.value = '';
    newLastName.value = '';
    newEmail.value = '';
    // return focus to the first name
    newFirstName.focus();
  }

  function showUsers(usersList) {
    // get a list of users and clear the element
    userListElement.innerHTML = '';

    // push them out to the page
    for(var i = 0; i < usersList.length; ++i) {
      // an li for every item
      var userListItem = document.createElement('li');

      //create name
      var userNameElement = document.createElement('span');
      userNameElement.className = 'user-name user-data';
      userNameElement.innerText = usersList[i].firstName + ' ' + usersList[i].lastName;

      // create email
      var userEmailElement = document.createElement('span');
      userEmailElement.className = 'user-email';
      userEmailElement.innerText = usersList[i].email;

      // add name & email
      userListItem.appendChild(userNameElement);
      userListItem.appendChild(userEmailElement);

      // add buttons
      userListItem = makeButtons(userListItem, i);

      // put it all together
      userListElement.appendChild(userListItem);
    }
  }

  function makeButtons(parentElement, index) {
    usersList = userTools.query();

    // Make Edit Button
    var userEditCont = document.createElement('span');
    userEditCont.className = 'user-data';
    var userEdit = document.createElement('button');
    userEdit.className = 'user-list-button';
    userEdit.innerText = 'e';

    // Make Delete Button
    var userDeleteCont = document.createElement('span');
    userDeleteCont.className = 'user-data';
    var userDelete = document.createElement('button');
    userDelete.className = 'user-list-button';
    userDelete.innerText = 't';

    // wire them up
    userDelete.addEventListener('click', function(e){
      userListElement.removeChild(e.target.parentNode.parentNode);
      userTools.remove(usersList[index]);
      usersList = userTools.query();
      showUsers(usersList);
    });

    userEdit.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();

      // set values
      editFirstName.value = usersList[index].firstName;
      editLastName.value = usersList[index].lastName;
      editEmail.value = usersList[index].email;
      modal.style.display = 'block';

    });

    // add buttons to span containers
    userEditCont.appendChild(userEdit);
    userDeleteCont.appendChild(userDelete);

    // put it all together
    parentElement.appendChild(userEditCont);
    parentElement.appendChild(userDeleteCont);

    // give it back
    return parentElement;
  };

  function sortUserList(e) {
    var sort = e.target.value;
    var usersList = userTools.query();
    usersList = usersList.sort(function(a, b){
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
    if (sort === 'Z-A'){
      usersList = usersList.reverse();
    }
    showUsers(usersList);
  };

  function searchUserList(e){
    var sort = e.target.value.toLowerCase();
    var usersList = userTools.query();
    if (sort !== '') {
      usersList = usersList.filter(function(user) {
        var username = user.name.toLowerCase();
        return username.indexOf( sort ) >= 0;
      });
    }
    showUsers(usersList);
  };

  function showUserError(msg) {
    userError.innerText = msg;
    userError.style.bottom = '-3em';
    setTimeout(function(){
      userError.style.bottom = '1em';
    }, 3000);
    set
  };

  function editUser(e) {
    e.stopPropagation();
    e.preventDefault();

    modal.style.display = 'none';

    var editedUser = {
      firstName: editFirstName.value,
      lastName: editLastName.value,
      email: editEmail.value
    };


    try {
      user = User(editedUser);
    }
    catch( e ) {
      showUserError(e);
      newFirstName.focus();
      return;
    }
    userTools.remove(user);
    userTools.add(user);
    // add catch

    var usersList = userTools.query();
    showUsers(usersList);


    // add edited(new) user to the array

    // regenerate array

    //  refresh page

  }
