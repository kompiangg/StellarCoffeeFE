(function() {
  let navbarButton = '';
  const header = document.querySelector('#navbar-button');
  const username = localStorage.getItem('username');
  if(username) {
    navbarButton = `
                    <a href="personal-page.html" class="book-a-table-btn scrollto d-none d-lg-flex login-button"> <i class="bi bi-person-fill" style="padding-right:10px;padding-left:0px" ></i> ${username}</a>
                    <a class="book-a-table-btn scrollto d-none d-lg-flex logout-button">Logout</a>`;
  } else {
    navbarButton = `
                    <a href="login.html" class="book-a-table-btn scrollto d-none d-lg-flex login-button">Login</a>
                    <a href="sign-up.html" class="book-a-table-btn scrollto d-none d-lg-flex sign-up-button"> Sign-Up</strong> </a>`;
  }
  header.innerHTML = navbarButton;
})();

(function() {
  document.addEventListener('click', element => {
    if (element.target.classList.contains('logout-button')) {
      localStorage.clear();
      window.location.replace('index.html');
    }
  })
})();