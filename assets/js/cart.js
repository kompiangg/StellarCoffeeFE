(function() {
  const coll = document.querySelectorAll(".collapse-order");
  
  coll.forEach(element => {
    element.addEventListener('click', function() {
      this.classList.toggle('active-order')
    })
  });

})()