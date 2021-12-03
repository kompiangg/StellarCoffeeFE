(function() {
  const coll = document.querySelectorAll(".collapse-order");
  
  coll.forEach(element => {
    element.addEventListener('click', function() {
      this.classList.toggle('active-order')
    })
  });

})();

(function() {
  const btnCart = document.querySelectorAll('.btn-cart');
  btnCart.forEach(element => {
    element.addEventListener('click', function() {

      const dataItem = {};
      
      dataItem.menuId = this.dataset.menuid;
      
      dataItem.namaMenu = this.parentElement.children[0].innerText;
      
      let hargaMenuString = this.children[1].innerText.slice(2);
      const indexTitik = hargaMenuString.indexOf('.');
      hargaMenuString = hargaMenuString.slice(0,indexTitik);
      dataItem.hargaMenu = parseInt(hargaMenuString)*1000;
      
      let fullPathGambar = this.parentElement.parentElement.children[0].src;
      const indexTitikGambar = fullPathGambar.indexOf('/assets');
      fullPathGambar = fullPathGambar.slice(indexTitikGambar);
      dataItem.pathGambar = fullPathGambar;
      
      const cartItem = document.createElement('div');
      cartItem.classList.add("item-cart");
      cartItem.style.marginBottom = "30px";
      cartItem.innerHTML = `<div class="row">
                              <div class="col-md-3 offset-2 text-center">
                                <img src="${dataItem.pathGambar}" style="width: 180px;">
                              </div>
                              <div class="col-md-5">
                                <div class="row">
                                  <div class="d-flex justify-content-between">
                                      <h5>Product Name : </h5>
                                      <p>${dataItem.namaMenu}</p>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="d-flex justify-content-between">
                                      <h5>Price : </h5>
                                      <p>Rp${dataItem.hargaMenu}</p>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="d-flex justify-content-between">
                                      <h5>Quantity : </h5>
                                      <p>1</p>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="d-flex justify-content-between">
                                      <h5>Total Price : </h5>
                                      <p>Rp${dataItem.hargaMenu}</p>
                                  </div>
                                </div>
                              </div>
                            </div>`
      
      const containerCartItem = document.querySelector('.container-cart-item');
      const quantityAllItem = document.querySelector('.quantity-all-items');
      containerCartItem.insertBefore(cartItem, quantityAllItem);
      console.log(dataItem);
    });
  });
})();