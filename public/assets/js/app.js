
$('#add-user').on('click', function (event) {
  event.preventDefault();

  const newAccount = {
    firstName: $('#inputFirst').val().trim(),
    lastName: $('#inputLast').val().trim(),
    email: $('#inputEmail').val().trim(),
    password: $('#inputPassword').val().trim()
  };

  if (newAccount.password.length > 0 && newAccount.email.length > 0 && newAccount.password.length > 0 && newAccount.lastName.length > 0 && newAccount.firstName.length > 0) {
    $.ajax({
      type: 'POST',
      url: '/api/register',
      data: newAccount
    }).then(() => {
      window.location.href = '/';
    });
  } else {
    console.log('**Please fill out entire form**');
    $('#create-err-msg').empty('').text('**Please fill out entire form**');
  }
});

$('#update-user').on('click', function (event) {
  event.preventDefault();

  const id = $(this).data('id');

  // capture All changes
  const changeUser = {
    firstName: $('#inputFirst').val().trim(),
    lastName: $('#inputLast').val().trim(),
    email: $('#inputEmail').val().trim(),
    password: $('#inputPassword').val().trim()
  };
  $('#err-msg').empty('');
  // $('#change-user-modal').modal('show');
  console.log(changeUser);

  if (changeUser.password.length > 0 && changeUser.email.length > 0 && changeUser.password.length > 0 && changeUser.lastName.length > 0 && changeUser.firstName.length > 0) {
    $.ajax({
      type: 'PUT',
      url: `/api/user/${id}`,
      data: changeUser
    }).then((result) => {
      console.log('Updated user:', result);
      // Reload the page to get the updated list
      window.location.href = '/logout';
    });
  } else {
    console.log('**Please fill out entire form**');
    $('#update-err-msg').empty('').text('**Please fill out entire form**');
  }
});

// DELETE   ***************************************************
$('#delete-user').on('click', function (event) {
  event.preventDefault();
  $('#err-msg').empty('');
  $('#delete-user-modal').modal('show');
});

$('#confirm-delete').on('click', function (event) {
  event.preventDefault();

  const id = $(this).data('id');

  const deleteUser = {
    email: $('#userEmail').val().trim(),
    password: $('#userPassword').val().trim()
  };

  if (deleteUser.email.length > 0 && deleteUser.password.length > 0) {
    $.ajax({
      type: 'POST',
      url: '/api/user/confirm',
      data: deleteUser
    }).then((result) => {
      if (result) {
        $.ajax(`/api/user/${id}`, {
          type: 'DELETE'
        }).then(() => {
          console.log('Deleted user', deleteUser);
          // Reload the page to get the updated list
          window.location.href = '/logout';
        });
      } else {
        $('#err-msg').empty('').text('Wrong credentials!');
      }
    });
  } else {
    console.log('fill out entire form');
    $('#err-msg').empty('').text('fill out entire form');
  }
});

$('#register').on('click', function (event) {
  event.preventDefault();
  window.location.href = '/register';
});

$('#login-modal').on('click', function (event) {
  event.preventDefault();
  $('#user-info').modal('show');
});

$('#post-modal').on('click', function (event) {
  event.preventDefault();
  $('#post-info').modal('show');
});

// Increase likes or dislikes of post based on which button is clicked
$('.increaseVal').on('click', function (event) {
  event.preventDefault();
  const id = this.getAttribute('data-like');

  if (this.getAttribute('data-like') !== null) {
    console.log('!LIKES!');
    let thisLikes = this.parentElement.value;
    thisLikes++;
    console.log(JSON.parse(thisLikes));

    fetch(`/Posts/likes/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(thisLikes)
    }).then((response) => {
      if (!response.ok) {
        alert('something went wrong!');
      }
    });
  } else if (this.getAttribute('data-dislike') !== null) {
    console.log('!DISLIKES!');
    let thisDislikes = this.parentElement.value;
    thisDislikes++;
    console.log(thisDislikes);

    fetch(`/Posts/dislikes/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(thisDislikes)
    }).then((response) => {
      if (!response.ok) {
        alert('something went wrong!');
      }
    });
  }
});

$('#go-home').on('click', function (event) {
  event.preventDefault();
  window.location.href = '/';
});

$('#login').on('click', function (event) {
  event.preventDefault();

  const user = {
    email: $('#email').val().trim(),
    password: $('#user_password').val().trim()
  };

  $.post('/api/login', user, (result) => {
    // console.log(result);
    if (result.loggedIn) {
      $(document.location).attr('href', '/home');
    } else {
      $('#login-err-msg').empty('').text(result.error);
      $('#user-info').modal('hide');
    }
  });
});

$('#newPost').on('click', function (event) {
  event.preventDefault();

  const todaysDate = new Date();

  const newPost = {
    title: $('#post-title').val().trim(),
    author: window.userName,
    image: $('#image-link').val().trim(),
    date: todaysDate,
    category: $('#category-post').val().trim(),
    body: $('#post-body').val().trim(),
    UserId: window.userID
  };

  console.log(newPost);

  fetch('/api/post', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newPost)
  }).then((res) => {
    console.log(res);
    // Empty the form
    document.getElementById('post-title').value = '';
    document.getElementById('image-link').value = '';
    document.getElementById('post-body').value = '';

    console.log('Created a new post!');
    location.reload();
  });
});

$('#drinks').on('click', function (event) {
  event.preventDefault();
  window.location.href = '/drinks';
});

$('#food').on('click', function (event) {
  event.preventDefault();
  window.location.href = '/food';
});

$('#diy').on('click', function (event) {
  event.preventDefault();
  window.location.href = '/diy';
});

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
// eslint-disable-next-line no-unused-vars
function openNav () {
  document.getElementById('mySidebar').style.width = '250px';
  document.getElementById('main').style.marginLeft = '250px';
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
// eslint-disable-next-line no-unused-vars
function closeNav () {
  document.getElementById('mySidebar').style.width = '0';
  document.getElementById('main').style.marginLeft = '0';
};
