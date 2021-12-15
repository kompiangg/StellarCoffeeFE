const URL_SERVER = 'http://127.0.0.1:5000';
(function() {
  const coll = document.querySelectorAll(".collapse-order");
  
  coll.forEach(element => {
    element.addEventListener('click', function() {
      this.classList.toggle('active-order')
    })
  });
})();

// Cart Feature
(function() {
  const selectedItems = {};
  const btnCart = document.querySelectorAll('.btn-cart');
  const quantityAllItems = document.querySelector('.quantity-all-items');
  const semiTotal = document.querySelector('.semi-total');
  const grandTotal = document.querySelector('.grand-total');
  const checkoutButton = document.querySelector('.checkout-btn');
  const clearBtn = document.querySelector('.clear-cart-btn');
  let couponApplyButton = document.querySelector('.apply-btn');
  const discount = document.querySelector('.discount-invoice');

  btnCart.forEach(element => {
    element.addEventListener('click', function() {
      const menuId = parseInt(this.dataset.menuid);
      let currentTotalQuantity = parseInt(quantityAllItems.children[1].innerHTML);
      let currentGrandTotal = parseInt(grandTotal.children[1].innerHTML.slice(2));
      let semiTotalValue = parseInt(semiTotal.children[1].innerHTML.slice(2)) 
      
      if (selectedItems[menuId]) {
        const cartContainer = document.querySelector('.container-cart-item');
        const allItemsCart = cartContainer.querySelector(`[data-menuid="${menuId}"]`);
        
        selectedItems[menuId].totalPrice += selectedItems[menuId].hargaMenu;
        allItemsCart.children[0].children[1].children[2].children[0].children[1].innerHTML = ++selectedItems[menuId].quantity;
        allItemsCart.children[0].children[1].children[3].children[0].children[1].innerHTML = `Rp${selectedItems[menuId].totalPrice}`;
      } else {
        const currentItem = {};
        
        currentItem.menuId = menuId;
        currentItem.namaMenu = this.parentElement.children[0].innerText;
        
        let hargaMenuString = this.children[1].innerText.slice(2);
        const indexTitik = hargaMenuString.indexOf('.');
        hargaMenuString = hargaMenuString.slice(0,indexTitik);
        currentItem.hargaMenu = parseInt(hargaMenuString)*1000;
        currentItem.totalPrice = currentItem.hargaMenu;
        currentItem.quantity = 1;
        
        let fullPathGambar = this.parentElement.parentElement.children[0].src;
        const indexTitikGambar = fullPathGambar.indexOf('/assets');
        fullPathGambar = fullPathGambar.slice(indexTitikGambar);
        currentItem.pathGambar = fullPathGambar;
        
        selectedItems[currentItem.menuId] = currentItem;
        
        
        const cartItem = document.createElement('div');
        cartItem.classList.add("item-cart");
        cartItem.style.marginBottom = "30px";
        cartItem.dataset.menuid = currentItem.menuId;
        cartItem.innerHTML = 
        `<div class="row text-center">
          <div class="col-md-2 offset-md-2">
            <img src="${currentItem.pathGambar}" class="cart-img" style="width: 180px;">
          </div>
          <div class="col-md-6">
            <div class="row">
              <div class="d-flex justify-content-between">
                <h5>Product Name : </h5>
                <p>${currentItem.namaMenu}</p>
              </div>
            </div>
            <div class="row">
              <div class="d-flex justify-content-between">
                <h5>Price : </h5>
                <p>Rp${currentItem.hargaMenu}</p>
              </div>
            </div>
            <div class="row">
              <div class="d-flex justify-content-between">
                <h5>Quantity : </h5>
                <p>${currentItem.quantity}</p>
              </div>
            </div>
            <div class="row">
              <div class="d-flex justify-content-between">
                <h5>Total Price : </h5>
                <p>Rp${currentItem.totalPrice}</p>
              </div>
            </div>
          </div>
        </div>`
                                  
        const containerCartItem = document.querySelector('.container-cart-item');
        const horizontalDivider = document.querySelector('.horizontal-cart-divider');
        
        containerCartItem.insertBefore(cartItem, horizontalDivider);
      }
      quantityAllItems.children[1].innerHTML = ++currentTotalQuantity;
      currentGrandTotal += selectedItems[menuId].hargaMenu;
      semiTotalValue += selectedItems[menuId].hargaMenu;
      semiTotal.children[1].innerHTML = `Rp${semiTotalValue}`;
      grandTotal.children[1].innerHTML = `Rp${currentGrandTotal}`;
    });
  });

  
  // TODO: Create apply feature
  
  const couponInputText = document.querySelector('#coupon');
  let event_id = 0
  couponApplyButton.addEventListener('click', async () => {
    if (Object.keys(selectedItems) != 0) {
      
      const validTodayEvent = await fetch(URL_SERVER + '/api/order/todayEvents', {
        headers: {'SC-API-TOKEN': 'KyaanDameNakaWaZettaiDameeDaaa'}
      })
      .then(response => response.json())
      .catch(error => {
        console.log(`ERROR: ${error.error_msg}`);
        alert('ERROR: Something when wrong while sending request to server');
      })
  
      if (validTodayEvent.status === 'OK') {
        const duplicationOfItem = validTodayEvent.item.slice(0);
        duplicationOfItem.reduce((index, element) => {
          if (element.coupon_code === couponInputText.value) {
            event_id = index;
            const discountCoupon = parseInt(element.disc_amount.slice(4));
            discount.children[1].innerHTML = `-Rp${discountCoupon}`;
            
            let currentGrandTotalAfterDiscount = parseInt(grandTotal.children[1].innerHTML.slice(2));
            currentGrandTotalAfterDiscount -= discountCoupon;
            grandTotal.children[1].innerHTML = `Rp${currentGrandTotalAfterDiscount}`;
            couponApplyButton.remove();
            document.querySelector('.container-apply-button').innerHTML = `<div class="d-flex justify-content-center align-content-center">
                                                                              <a class="book-a-table-btn apply-btn-after" style="margin: 10px 0;">Apply</a>
                                                                            </div>`
            couponInputText.readOnly = true;
            duplicationOfItem.splice(1);
          } else  if (element.coupon_code !== couponInputText.value && index == validTodayEvent.count) {
            alert('Kupon tidak valid');
          }
          return ++index
        }, 1);
      }
    } else {
      alert('Silakan memilih menu terlebih dahulu');
    }
  });

  checkoutButton.addEventListener('click', function() {
    const allCartItems = document.querySelectorAll('.item-cart');
    console.log(selectedItems);
    if(Object.keys(selectedItems).length == 0) {
      alert("Anda belum memesan makanan");
    } else {
      const willPOST = {};

      willPOST.allItems = [];
      Object.keys(selectedItems).forEach(element => { willPOST.allItems.push(selectedItems[String(element)]) });
      willPOST.quantity = parseInt(quantityAllItems.children[1].innerHTML);
      willPOST.grandTotal = parseInt(grandTotal.children[1].innerHTML.slice(2));
      willPOST.done = false;
      willPOST.event_id = event_id;
      willPOST.idUser = localStorage.getItem('uid');
      willPOST.created = Date.now();
      console.log(willPOST);
      fetch(URL_SERVER+`/api/order/${localStorage.getItem('uid')}/checkout`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'SC-API-TOKEN': 'KyaanDameNakaWaZettaiDameeDaaa',
        },
        body: JSON.stringify(willPOST),
      })
        .then(response => response.json())
        .then(response => {
          if (response.status == "OK") {
            alert("Terima kasih terlah berbelanja, silahkan tunggu pesanan anda");
            deleteCartItems(allCartItems);
          } else {
            alert(`ERROR: Something went wrong (${response})`);
          }
        })
        .catch(error => alert(`ERROR: ${error}`));
      
    }
  });

  clearBtn.addEventListener('click', function () {
    const allCartItems = document.querySelectorAll('.item-cart');
    deleteCartItems(allCartItems);
  });
  
  function deleteCartItems() {
    window.location.reload();
    Object.keys(selectedItems).forEach(e => {
      delete selectedItems[`${e}`];
    });
  }
})();

(function () {

})();