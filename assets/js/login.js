const URL_SERVER = 'http://127.0.0.1:5000';
const LANDING_PAGE = 'http://127.0.0.1:5501';
(function () {
  const loginButton = document.querySelector("#login-button");

  loginButton.addEventListener('click', async () => {
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    const reqPacket = {"username": username.value, "password": password.value};

    fetch(URL_SERVER+'/api/auth/login', {
      method: 'POST',
      mode: 'cors',
      headers:{
        'Content-Type': 'application/json',
        'SC-API-TOKEN': 'KyaanDameNakaWaZettaiDameeDaaa',
      },
      body: JSON.stringify(reqPacket),
    })
    .then(response => response.json())
    .then(response => {
      if (response.status === 'OK') {
        localStorage.setItem('username', username.value);
        
        fetch(URL_SERVER+'/api/user/'+username.value, {
          headers: {
            'SC-API-TOKEN': 'KyaanDameNakaWaZettaiDameeDaaa',
          },
        })
        .then(response => response.json())
        .then(response => {
          if (response.status === 'OK') {
            localStorage.setItem('uid', response.item[0].uid);
            window.location.replace(LANDING_PAGE);
          } else {
            alert(`ERROR1: hello 1${response.error_msg}`);
          }
        })
        .catch(error => alert(`ERROR0: hello ${error.error_msg}`))
      } else {
        alert(`ERROR2: hello 2 ${response.error_msg}`);
      }
    })
    .catch(error => alert(`ERROR3: ${error.error_msg}`))
  })
})();