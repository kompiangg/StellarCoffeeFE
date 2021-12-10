const URL_SERVER = 'http://127.0.0.1:5000';

(async function () {
  const sortedUser = await fetch(URL_SERVER+'/api/user/leaderboard?count=100', {
                        headers:{'SC-API-TOKEN': 'KyaanDameNakaWaZettaiDameeDaaa'}
                      }).then(response => response.json());
  
  if(sortedUser.status === 'OK') {
    let rankItem = '';
    sortedUser.item.reduce((index, curr) => {
      if (index <= 3) {
        rankItem += `<div class="col-10 offset-1 leaderboard-item d-flex justify-content-between top-3">
                  <p>${index}</p>
                  <p>${curr.username}</p>
                  <p>${curr.point}</p>
                </div>`;
      } else {
        rankItem += `<div class="col-10 offset-1 leaderboard-item d-flex justify-content-between">
                      <p>${index}</p>
                      <p>${curr.username}</p>
                      <p>${curr.point}</p>
                    </div>`;
      }
      return ++index;
    }, 1)
    const rankContainer = document.querySelector('.leaderboard-container');
    rankContainer.innerHTML = rankItem
  }
})();