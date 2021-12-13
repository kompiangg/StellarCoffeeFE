const URL_SERVER = 'http://127.0.0.1:5000';
const LANDING_PAGE = 'http://127.0.0.1:5501';

(async function () {
  const username = document.querySelector('#username');
  const firstname = document.querySelector('#firstname');
  const lastname = document.querySelector('#lastname');
  const password = document.querySelector('#password');
  
  
  // Create add event listener and fetching
  const signUpButton = document.querySelector('#signup-button');
  signUpButton.addEventListener('click', async () => {
    const reqPacket = {
      "username": username.value,
      "password": password.value,
      "first_name": firstname.value,
      "last_name": lastname.value,
    }
    
    const signUpFetch = await fetch(URL_SERVER + '/api/auth/register', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-TOKEN': 'KyaanDameNakaWaZettaiDameeDaaa',
      },
      body: JSON.stringify(reqPacket),
    })
    .then(respons => respons.json())
    .catch(error => {
      console.log('ERROR:', error);
      alert('ERROR: Something when wrong while sending request to server');
    })

    if (signUpFetch.status === 'OK') {
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
      console.log(signUpFetch.error_msg);
      alert('Maaf, username atau password tidak diketahui');
    }
  });
})();