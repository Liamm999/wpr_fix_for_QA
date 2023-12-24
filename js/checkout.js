const invoice = document.getElementById("invoice");

const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

const invoiceHtml = cartItems.map((c) => {
  return `
        <tr>
            <td>${c.name}<strong class="mx-2">x</strong> ${c.quantity}</td>
            <td>$${Number(c.price).toFixed(2)}</td>
        </tr>
    `;
});

// Correction here: Use 'cartItems' instead of 'cart'
const subtotal = cartItems.reduce(
  (init, c) => init + Number(c.quantity) * Number(c.price),
  0
);

invoiceHtml.push(`
    <tr>
        <td class="text-black font-weight-bold"><strong>Cart Subtotal</strong></td>
        <td class="text-black">$${subtotal.toFixed(2)}</td>
    </tr>
    <tr>
        <td class="text-black font-weight-bold"><strong>Order Total</strong></td>
        <td class="text-black font-weight-bold"><strong>$${subtotal.toFixed(
          2
        )}</strong></td>
    </tr>
`);

invoice.innerHTML = invoiceHtml.join("");

function submitForm(event) {
  event.preventDefault();
  window.location.replace("thankyou.html");
  localStorage.removeItem("cart");
}
