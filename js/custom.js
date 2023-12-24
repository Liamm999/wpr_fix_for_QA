(function () {
  "use strict";

  var tinyslider = function () {
    var el = document.querySelectorAll(".testimonial-slider");

    if (el.length > 0) {
      var slider = tns({
        container: ".testimonial-slider",
        items: 1,
        axis: "horizontal",
        controlsContainer: "#testimonial-nav",
        swipeAngle: false,
        speed: 700,
        nav: false,
        controls: false,
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 3000,
        autoplayButtonOutput: false,
      });
    }
  };
  tinyslider();

  var sitePlusMinus = function () {
    var value,
      quantity = document.getElementsByClassName("quantity-container");

    function createBindings(quantityContainer) {
      var quantityAmount =
        quantityContainer.getElementsByClassName("quantity-amount")[0];
      var increase = quantityContainer.getElementsByClassName("increase")[0];
      var decrease = quantityContainer.getElementsByClassName("decrease")[0];
      increase.addEventListener("click", function (e) {
        increaseValue(e, quantityAmount);
      });
      decrease.addEventListener("click", function (e) {
        decreaseValue(e, quantityAmount);
      });
    }

    function init() {
      for (var i = 0; i < quantity.length; i++) {
        createBindings(quantity[i]);
      }
    }

    function increaseValue(event, quantityAmount) {
      value = parseInt(quantityAmount.value, 10);

      console.log(quantityAmount, quantityAmount.value);

      value = isNaN(value) ? 0 : value;
      value++;
      quantityAmount.value = value;
    }

    function decreaseValue(event, quantityAmount) {
      value = parseInt(quantityAmount.value, 10);

      value = isNaN(value) ? 0 : value;
      if (value > 0) value--;

      quantityAmount.value = value;
    }

    init();
  };
  sitePlusMinus();

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartQuantity = cart.reduce((init, c) => init + c.quantity, 0);
  document.querySelectorAll(".cart-quantity").forEach((c) => {
    c.textContent = cartQuantity;
  });

  const authStatus = document.getElementById("auth-status");
  if (localStorage.getItem("user")) {
    authStatus.textContent = "Logout";
  } else {
    authStatus.textContent = "Login";
  }

  document.getElementById("auth-btn").addEventListener("click", () => {
    if (authStatus.textContent === "Logout") {
      localStorage.removeItem("user");
      window.location.replace("index.html");
    } else {
      window.location.replace("login.html");
    }
  });
})();
