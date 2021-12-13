const URL_SERVER = 'http://127.0.0.1:5000';
const LANDING_PAGE = 'http://127.0.0.1:5501';
(async function () {
  const loginButton = document.querySelector("#login-button");

  loginButton.addEventListener('click', async () => {
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    const reqPacket = {"username": username.value, "password": password.value};

    const loginFetch = await fetch(URL_SERVER+'/api/auth/login', {
      method: 'POST',
      mode: 'cors',
      headers:{
        'Content-Type': 'application/json',
        'SC-API-TOKEN': 'KyaanDameNakaWaZettaiDameeDaaa',
      },
      body: JSON.stringify(reqPacket),
    })
    .then(response => response.json())
    .catch(error => {
      console.log(`ERROR: ${error.error_msg}`);
      alert('ERROR: Something when wrong while sending request to server');
    })

    if (loginFetch.status === 'OK') {
      localStorage.setItem('username', username.value);
      
      const uidUserFetch = await fetch(URL_SERVER+ '/api/user/' + username.value, {
        headers: {
          'SC-API-TOKEN': 'KyaanDameNakaWaZettaiDameeDaaa',
        },
      })
      .then(response => response.json())
      .catch(error => {
        console.log(`ERROR: ${error.error_msg}`);
        alert('ERROR: Something when wrong while sending request to server');
      })

      if (uidUserFetch.status === 'OK') {
        localStorage.setItem('uid', uidUserFetch.item[0].uid);
        window.location.replace(LANDING_PAGE);
      } else {
        console.log(`ERROR: ${uidUserFetch.error_msg}`);
        alert('ERROR: Something when wrong while sending request to server');
      }
    } else {
      console.log(loginFetch.error_msg);
      alert('Maaf, username atau password tidak diketahui');
    }
  })
})();