const URL_SERVER = 'http://127.0.0.1:5000';
(async function () {
  const validCouponEventsFetch = await fetch(URL_SERVER + '/api/order/events', {
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
                            <div class="col-lg-10 offset-1" style="margin-bottom: 30px; cursor: pointer">
                              <div class="box aos-init aos-animate " data-aos="zoom-in" data-aos-delay="100">
                                <span>${element.coupon_code}</span>
                                <h4>${element.title}</h4>
                                <p>Get Rp${element.disc_amount.slice(4)} Discount</p>
                              </div>
                            </div>`;
    });
    document.querySelector('.container-events').innerHTML = validCouponEvents;
  } else {
    console.log('Cant load events');
  }
})();