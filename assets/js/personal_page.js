const URI_SERVER = 'http://127.0.0.1:5000';

(async function () {
  const realname = document.querySelector('#realname');
  const username = document.querySelector('#username');
  const idUser = document.querySelector('#id-user');
  const point = document.querySelector('#point');
  const rank = document.querySelector('#rank');

  const getUserInfo = await fetch(URI_SERVER + `/api/user/${localStorage.getItem('username')}`, {
    headers: {'SC-API-TOKEN': 'KyaanDameNakaWaZettaiDameeDaaa'}
  })
  .then(response => response.json())
  .catch(error => {
    console.log(`ERROR: ${error.error_msg}`);
    alert('ERROR: Something when wrong while sending request to server');
  })

  if (getUserInfo.status === 'OK') {
    realname.innerHTML = getUserInfo.item[0].first_name + ' ' + getUserInfo.item[0].last_name;
    username.innerHTML = getUserInfo.item[0].username;
    idUser.innerHTML = `#${getUserInfo.item[0].uid}`;
    point.innerHTML = getUserInfo.item[0].point;

    const searchUserRank = await fetch(URI_SERVER + '/api/user/leaderboard/' + localStorage.getItem('username'), {
      headers: {'SC-API-TOKEN': 'KyaanDameNakaWaZettaiDameeDaaa'}
    })
    .then(response => response.json())
    .catch(error => {
      console.log(`ERROR: ${error.error_msg}`);
      alert('ERROR: Something when wrong while sending request to server');
    })

    if (searchUserRank.status === 'OK') {
      rank.innerHTML = searchUserRank.item.userRank;
    } else {
      console.log(`ERROR: ${searchUserRank.error_msg}`);
      alert('ERROR: Something when wrong while sending request to server');
    }
  } else {
    console.log(`ERROR: ${searchUserRank.error_msg}`);
    alert('ERROR: Something when wrong while sending request to server');
  }

  const getUserHistory = await fetch(URI_SERVER + `/api/order/history/${localStorage.getItem('uid')}`, {
    headers: {'SC-API-TOKEN': 'KyaanDameNakaWaZettaiDameeDaaa'}
  })
  .then(response => response.json())
  .catch(error => {
    console.log(`ERROR: ${error.error_msg}`);
    alert('ERROR: Something when wrong while sending request to server');
  })

  if (getUserHistory.status === 'OK') {
    let historyItem = '';
    getUserHistory.item.forEach(element => {
      let status = '';
      if (element.status == true) {
        status = 'Done';
      } else {
        status = 'Proccess';
      }
      historyItem += `
                      <div class="history-item" style="border: #cda45e solid 2px;">
                        <div class="row text-center">
                          <div class="col-7">
                            <h5>Order Id : <br> <span>${element.order_id}</span> </h5>
                            <h5>Date Created : <br> <span>${element.date_created} </span></h5>
                          </div>
                          <div class="col-5">
                            <h5>Grand Total : <br> <span>Rp${element.grand_total} </span> </h5>
                            <h5>Total Item : <br> <span>${element.total_item} </span> </h5>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-12 d-flex justify-content-center align-content-center">
                            <h5 style="margin-bottom: 0px;">Status : <span>${status}</span> </h5>
                          </div>
                        </div>
                      </div>`;
    })
    const containerHistory = document.querySelector('.container-history');
    containerHistory.innerHTML = historyItem;
  } else {
    console.log(`ERROR: ${getUserHistory.error_msg}`);
    alert('ERROR: Something when wrong while sending request to server');
  }
})();