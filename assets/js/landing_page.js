const URL_SERVER = 'http://127.0.0.1:5000';
(async function (){
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
})();

(async function (){
  const day = new Date().getDay();
  const listSpecialMenu = document.querySelector('.list-special-menu');
  const pictSpecialMenu = document.querySelector('.pict-special-menu');

  if (day != 0) {
    const todaySpecials = await fetch(URL_SERVER+'/api/order/todaySpecials', {
      headers:{'SC-API-TOKEN': 'KyaanDameNakaWaZettaiDameeDaaa'}
    })
    .then(response => response.json())
    .catch(error => console.log(error))
    
    if (todaySpecials.status === "OK") {
      let todaySpecialsViewList = '';
      let todaySpecialsViewPict = '';
      todaySpecials.item[0][day].reduce((index, currElement) => {
        console.log(currElement);
        if (index == 0) {
          todaySpecialsViewList += `
                                    <li class="nav-item">
                                      <a class="nav-link show active" data-bs-toggle="tab" href="#tab-${index + 1}">${currElement.name}</a>
                                    </li>`;
          todaySpecialsViewPict += `
                                    <div class="tab-pane show active" id="tab-${index + 1}">
                                      <div class="row">
                                        <div class="col-lg-8 text-center order-2 order-lg-1">
                                          <div class="col-lg-7 order-1 order-lg-2 aos-init " data-aos="zoom-in" data-aos-delay="100">
                                            <div class="about-img">
                                              <img src="${currElement.path}" alt="${currElement.name}">
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>`;
        } else {
          todaySpecialsViewList += `
                                    <li class="nav-item">
                                      <a class="nav-link show" data-bs-toggle="tab" href="#tab-${index + 1}">${currElement.name}</a>
                                    </li>`;
          todaySpecialsViewPict += `
                                    <div class="tab-pane show" id="tab-${index + 1}">
                                      <div class="row">
                                        <div class="col-lg-8 text-center order-2 order-lg-1">
                                          <div class="col-lg-7 order-1 order-lg-2 aos-init " data-aos="zoom-in" data-aos-delay="100">
                                            <div class="about-img">
                                              <img src="${currElement.path}" alt="${currElement.name}">
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>`;
        }
        
        return ++index;
      }, 0);
  
      let ulElementSpecial = document.querySelector('.list-navigation');
      ulElementSpecial.innerHTML = todaySpecialsViewList;
  
      const pictElement = document.querySelector('.tab-content');
      pictElement.innerHTML = todaySpecialsViewPict
      
    } else {
      console.log("Cannot load today special menu");
    }
  }
})();

(async function () {
  const validCouponEventsFetch = await fetch(URL_SERVER + '/api/order/events?count=3', {
    headers: {'SC-API-TOKEN': 'KyaanDameNakaWaZettaiDameeDaaa'}
  })
  .then(response => response.json())
  .catch(error => {
    console.log(error);
    console.log('Cant load events');
  })

  if (validCouponEventsFetch.status === 'OK') {
    let validCouponEvents = '';
    validCouponEventsFetch.item.forEach(element => {
      validCouponEvents += `
                            <div class="col-lg-4">
                              <div class="box aos-init event-item" data-aos="zoom-in" data-aos-delay="100">
                                <span>${element.coupon_code}</span>
                                <h4>${element.title}</h4>
                                <p>Get Rp${element.disc_amount.slice(4)} Discount</p>
                              </div>
                            </div>`
    });
    document.querySelector('.container-events').innerHTML = validCouponEvents;
  } else {
    console.log('Cant load events');
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