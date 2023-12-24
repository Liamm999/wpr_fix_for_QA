const cartContainer = document.getElementById("cart-container");

const updateInvoice = (cart) => {
  const subtotal = cart.reduce((init, c) => {
    return init + Number(c.quantity) * Number(c.price);
  }, 0);
  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("total").textContent = subtotal.toFixed(2);
};

const innerCartItems = () => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const cartItemsHtml = cartItems
    .map((c, index) => {
      return `
        <tr class="cart-table">
        <td class="product-thumbnail">
        <img src="${c.image}" alt="Image"
        class="img-fluid img-cart w-2">
            </td>
            <td class="product-name">
                <div class="h5 text-black">${c.name}</div>
            </td>
            <td>$${c.price}</td>
            <td>
                <div
                    class="input-group d-flex align-items-center quantity-container"
                    style="max-width: 120px;">
                    <div class="input-group-prepend">
                    <button onclick="decrease('${
                      c.id
                    }')" class="btn btn-outline-black"
                    type="button">&minus;</button>
                    </div>
                    <input type="text" class="form-control text-center quantity-amount"
                    value="${
                      c.quantity
                    }" placeholder aria-label="Example text with button addon"
                    aria-describedby="button-addon1">
                    <div class="input-group-append">
                        <button onclick="increase('${
                          c.id
                        }')" class="btn btn-outline-black"
                            type="button">&plus;</button>
                    </div>
                </div>
            </td>
            <td>$${(Number(c.price) * Number(c.quantity)).toFixed(2)}</td>
            <td><button type="button" onclick="removeCartItem('${
              c.id
            }')" class="btn btn-danger">Remove</button></td>
        </tr>
    `;
    })
    .join("");

  cartContainer.innerHTML = cartItemsHtml;
  updateInvoice(cartItems);
};

innerCartItems();

const removeCartItem = (id) => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const newCartItems = cartItems.filter((c) => c.id !== id);
  localStorage.setItem("cart", JSON.stringify(newCartItems));
  innerCartItems();
  showToast("Remove cart item succeed!");
};

const increase = (id) => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const newCartItems = cartItems.map((c) => {
    if (c.id === id) {
      return { ...c, quantity: c.quantity + 1 };
    }
    return c;
  });
  localStorage.setItem("cart", JSON.stringify(newCartItems));
  innerCartItems();
  updateCartQuantity();
};

const decrease = (id) => {
  let isRemove = false;
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const newCartItems = cartItems.map((c) => {
    if (c.id === id) {
      if (c.quantity === 1) {
        isRemove = true;
        return c;
      } else {
        return { ...c, quantity: c.quantity - 1 };
      }
    }
    return c;
  });
  if (isRemove) {
    removeCartItem(id);
    return;
  }
  localStorage.setItem("cart", JSON.stringify(newCartItems));
  innerCartItems();
  updateCartQuantity();
};

function showToast(message) {
  const main = document.getElementById("main");

  if (main) {
    if (document.getElementById("toast") !== null) {
      document.getElementById("toast")?.remove();
    }
    main.insertAdjacentHTML(
      "beforeend",
      `
				<div id="toast" class="d-block align-items-center justify-content-center position-fixed start-50 translate-middle bg-light rounded shadow">
					<div class="toast-body d-flex align-items-center">
						<svg width="20" height="20" class="bi bi-check-circle-fill text-success me-2" viewBox="0 0 16 16" fill="currentColor">
							<path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm4.94 4.94a.53.53 0 0 1 0 .75l-7.5 7.5a.53.53 0 0 1-.75 0L3.06 9.72a.53.53 0 0 1 0-.75l1.41-1.41a.5.5 0 0 1 .75 0L7 10.29l6.18-6.18a.5.5 0 0 1 .75 0l1.41 1.41z"/>
						</svg>
						<span class="whitespace-nowrap">${message}</span>
					</div>
				</div>
			`
    );
  }
  const toast = document.getElementById("toast");
  if (toast) {
    toast.style.top = "100px";
    setTimeout(() => {
      toast.remove();
    }, 2000);
  }
}

function updateCartQuantity() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartQuantity = cart.reduce((init, c) => init + c.quantity, 0);
  document.querySelectorAll(".cart-quantity").forEach((c) => {
    c.textContent = cartQuantity;
  });
}
