const addToCartButtons = document.querySelectorAll('.product-item button');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function (event) {
        const productItem = this.closest('.col-12');
        const productId = this.getAttribute('data-id');
        const productName = productItem.querySelector('.product-title')?.textContent;
        const productPrice = productItem.querySelector('.product-price')?.textContent;
        const productImageSrc = productItem.querySelector('img.product-thumbnail')?.src;

        if (productId && productName && productPrice && productImageSrc) {
            const product = {
                id: productId,
                name: productName,
                price: productPrice.split('$').at(-1),
                image: productImageSrc,
                quantity: 1
            };

            addToCart(product);
        }
    });
});

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    console.log(cart)
    const existed = cart.filter((c) => {
        return c.id === product.id
    })[ 0 ]

    if (existed) {
        const newCart = cart.map((c) => {
            if (c.id === product.id) {
                return { ...c, quantity: c.quantity + 1 }
            }
            return c
        })
        localStorage.setItem('cart', JSON.stringify(newCart));
    } else {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    const cartQuantity = cart.reduce((init, c) => init + c.quantity, 0)

    document.querySelectorAll('.cart-quantity').forEach((c) => {
        c.textContent = cartQuantity
    })

    showToast('Add to cart succeed!')
}

function showToast(message) {
    const main = document.getElementById('main')

    if (main) {
        if (document.getElementById('toast') !== null) {
            document.getElementById('toast')?.remove()
        }
        main.insertAdjacentHTML('beforeend', `
				<div id="toast" class="d-block align-items-center justify-content-center position-fixed start-50 translate-middle bg-light rounded shadow">
					<div class="toast-body d-flex align-items-center">
						<svg width="20" height="20" class="bi bi-check-circle-fill text-success me-2" viewBox="0 0 16 16" fill="currentColor">
							<path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm4.94 4.94a.53.53 0 0 1 0 .75l-7.5 7.5a.53.53 0 0 1-.75 0L3.06 9.72a.53.53 0 0 1 0-.75l1.41-1.41a.5.5 0 0 1 .75 0L7 10.29l6.18-6.18a.5.5 0 0 1 .75 0l1.41 1.41z"/>
						</svg>
						<span class="whitespace-nowrap">${message}</span>
					</div>
				</div>
			`);
    }
    const toast = document.getElementById('toast')
    if (toast) {
        toast.style.top = '100px'
        setTimeout(() => {
            toast.remove()
        }, 2000)
    }
}