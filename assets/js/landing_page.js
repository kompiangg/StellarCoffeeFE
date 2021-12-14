(async function (){
  const URL_SERVER = 'http://127.0.0.1:5000';
  const topFiveSortedUser = await fetch(URL_SERVER+'/api/user/leaderboard?count=5', {
    headers:{'SC-API-TOKEN': 'KyaanDameNakaWaZettaiDameeDaaa'}
  }).then(response => response.json());

  if(topFiveSortedUser.status === 'OK') {
    let rankItem = '';
    topFiveSortedUser.item.reduce((index, curr) => {
      rankItem += `
                    <tr>
                      <td class="Ranking">${index}</td>
                      <td class="Name">${curr.username} </td>
                      <td class="Poin">${curr.point}</td>
                    </tr>`
      return ++index;
    }, 1)
    const rankContainer = document.querySelector('.leaderboard-container');
    rankContainer.innerHTML = rankItem
  } else {
    console.log("Cannot load leaderboard");
  }

  const todaySpecials = await fetch(URL_SERVER+'/api/order/todaySpecials', {
    headers:{'SC-API-TOKEN': 'KyaanDameNakaWaZettaiDameeDaaa'}
  })
  .then(response => response.json())
  .catch(error => console.log(error))

  if (todaySpecials.status === "OK") {
    let todaySpecialsViewList = '';
    let todaySpecialsViewPict = '';

    todaySpecials.item.reduce((index, curr) => {
      todaySpecialsViewList += `
                                <li class="nav-item">
                                  <a class="nav-link show" data-bs-toggle="tab" href="#tab-${index}">${curr.name}</a>
                                </li>`;
      todaySpecialsViewPict += `
                                <div class="tab-pane show" id="tab-${index}">
                                  <div class="row">
                                    <div class="col-lg-8 text-center order-2 order-lg-1">
                                      <div class="col-lg-7 order-1 order-lg-2 aos-init " data-aos="zoom-in" data-aos-delay="100">
                                        <div class="about-img">
                                          <img src="${curr.path}" alt="${curr.name}">
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>`;
      return ++index;
    }, 1);

    let ulElementSpecial = document.createElement('ul');
    ulElementSpecial.classList.add('nav', 'nav-tabs', 'flex-column');
    ulElementSpecial.innerHTML = todaySpecialsViewList;

    const listNavigation = document.querySelector('.list-navigation');
    listNavigation.innerHTML=ulElementSpecial;

    const pictElement = document.querySelector('.tab-content');
    pictElement.innerHTML - todaySpecialsViewPict
    
  } else {
    console.log("Cannot load today special menu");
  }
})();

(function () {
  const orderNowButton = document.querySelectorAll('.order-now');
  orderNowButton.forEach(element => {
    element.style.cursor = "pointer";
    element.addEventListener('click', () => {
      localStorage.getItem('username') ? window.location.replace('order-cart.html') : alert("Login dulu, sob");
    })
  })
})();