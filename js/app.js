function ObjectStore(){function e(){var e=JSON.parse(localStorage.collection);return e.forEach(function(e){r.push(User(e))}),r}var r=[];localStorage.collection&&(r=e());var t={exists:function(e){return r.some(function(r){return e.equal(r)})},add:function(e){return t.exists(e)?!1:(r.push(e),localStorage.collection=JSON.stringify(r),!0)},query:function(){return r},remove:function(e){r=r.filter(function(r){return!e.equal(r)}),localStorage.collection=JSON.stringify(r)}};return t}function addUser(e){e.stopPropagation(),e.preventDefault();var r=newUserForm.querySelector('input[name="firstName"]'),t=newUserForm.querySelector('input[name="lastName"]'),s=newUserForm.querySelector('input[name="email"]'),a={firstName:r.value,lastName:t.value,email:s.value};try{user=User(a)}catch(e){return showUserError(e),void r.focus()}userTools.add(user);var o=userTools.query();showUsers(o),r.value="",t.value="",s.value="",r.focus()}function showUsers(e){userListElement.innerHTML="";for(var r=0;r<e.length;++r){var t=document.createElement("li"),s=document.createElement("span");s.className="user-name user-data",s.innerText=e[r].firstName+" "+e[r].lastName;var a=document.createElement("span");a.className="user-email",a.innerText=e[r].email,t.appendChild(s),t.appendChild(a),t=makeButtons(t,r),userListElement.appendChild(t)}}function makeButtons(e,r){usersList=userTools.query();var t=document.createElement("span");t.className="user-data";var s=document.createElement("button");s.className="user-list-button",s.innerText="e";var a=document.createElement("span");a.className="user-data";var o=document.createElement("button");return o.className="user-list-button",o.innerText="t",o.addEventListener("click",function(e){userListElement.removeChild(e.target.parentNode.parentNode),userTools.remove(usersList[r]),usersList=userTools.query(),showUsers(usersList)}),s.addEventListener("click",function(e){e.stopPropagation(),e.preventDefault(),editFirstName.value=usersList[r].firstName,editLastName.value=usersList[r].lastName,editEmail.value=usersList[r].email,modal.style.display="block"}),t.appendChild(s),a.appendChild(o),e.appendChild(t),e.appendChild(a),e}function sortUserList(e){var r=e.target.value,t=userTools.query();t=t.sort(function(e,r){return e.name>r.name?1:e.name<r.name?-1:0}),"Z-A"===r&&(t=t.reverse()),showUsers(t)}function searchUserList(e){var r=e.target.value.toLowerCase(),t=userTools.query();""!==r&&(t=t.filter(function(e){var t=e.name.toLowerCase();return t.indexOf(r)>=0})),showUsers(t)}function showUserError(e){userError.innerText=e,userError.style.bottom="-3em",setTimeout(function(){userError.style.bottom="1em"},3e3),set}function editUser(e){e.stopPropagation(),e.preventDefault(),modal.style.display="none";var r={firstName:editFirstName.value,lastName:editLastName.value,email:editEmail.value};try{user=User(r)}catch(e){return showUserError(e),void newFirstName.focus()}userTools.remove(user),userTools.add(user);var t=userTools.query();showUsers(t)}function User(e){if(!e.firstName||""===e.firstName.trim())throw"First name is required";if(!e.lastName||""===e.lastName.trim())throw"Last name is required";if(!e.email||""===e.email.trim())throw"Email is required";var r={firstName:e.firstName.trim(),lastName:e.lastName.trim(),email:e.email.trim(),name:e.firstName.trim()+" "+e.lastName.trim(),equal:function(e){return r.email===e.email}};return r}var newUserForm=document.querySelector(".add-user-form"),editUserForm=document.querySelector(".edit-user-form"),modal=document.querySelector(".modal-edit-user"),userListElement=document.querySelector(".user-list"),userListSort=document.querySelector(".user-list-sort"),userListSearch=document.querySelector(".user-list-search"),userError=document.querySelector(".user-error"),editFirstName=editUserForm.querySelector('input[name="firstName"]'),editLastName=editUserForm.querySelector('input[name="lastName"]'),editEmail=editUserForm.querySelector('input[name="email"]'),user={},userTools=ObjectStore();newUserForm.addEventListener("submit",addUser),editUserForm.addEventListener("submit",editUser),userListSort.addEventListener("change",sortUserList),userListSearch.addEventListener("keyup",searchUserList);var usersList=userTools.query();showUsers(usersList);
//# sourceMappingURL=app.js.map