/* checking if page is fully loaded before implementing javascript */
if (document.readystate == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

/* adding functionality to all the clickable objects*/
function ready() {

    /* add to cart button */
    var addToCartBtn = document.getElementsByClassName('bag-btn');
    for (var i = 0; i < addToCartBtn.length; i++) {
        var shoppingCart = addToCartBtn[i];
        shoppingCart.addEventListener('click', addToCart);
    }

    /* quantity up 1 button */
    var openCartBtn = document.getElementsByClassName('fas fa-cart-plus')[0];
    openCartBtn.addEventListener('click', openCart);

    /* quantity down 1 button */
    var closeCartBtn = document.getElementsByClassName('fas fa-window-close')[0];
    closeCartBtn.addEventListener('click', closeCart);

    /* clear cart button */
    var clearCart = document.getElementsByClassName('clear-cart banner-btn')[0];
    clearCart.addEventListener('click', clearCartItems);

    /* checkout button */
    var checkout = document.getElementsByClassName('checkout-btn banner-btn')[0];
    checkout.addEventListener('click', purchaseItems);


}

/* functions */

/* display toast function */
function displayToast(toastclass) {
    var x = document.getElementById(toastclass); 
    x.classList.add('toastshow');
    setTimeout(function(){x.classList.remove('toastshow')}, 3500);
}

/* start of add to card function */ 
function addToCart(event) {
    var productName = event.target.parentElement.parentElement.getElementsByClassName('product-name')[0].innerText;
    var productPrice = event.target.parentElement.parentElement.getElementsByClassName('product-price')[0].innerText;
    var productImg = event.target.parentElement.parentElement.getElementsByClassName('product-img')[0].src;
    displayInCart(productName, productPrice, productImg);
    updateTotal();
}

    function displayInCart(name, price, image) {
        var indivItem = document.createElement('div');
        indivItem.classList.add('cart-item');
        var cartDisplay = document.getElementsByClassName('cart-content')[0];
        var cartNames = cartDisplay.getElementsByClassName('item-name');
        for (var i = 0; i < cartNames.length; i++) {
            if (cartNames[i].innerHTML == name) {
                displayToast('alreadyincart');
                return
            }
        }
        var itemContents = 
                    `<img src="${image}" alt="${name}"/>    
                    <div>
                        <h4 class="item-name">${name}</h4>
                        <h5 class="item-price">${price}</h5>
                        <span class="remove-item">remove</span>
                    </div>
                    <div>
                        <i class="fas fa-chevron-up"></i>
                        <p class="item-amount">1</p>
                        <i class="fas fa-chevron-down"></i>
                    </div>`;
        indivItem.innerHTML = itemContents;
        cartDisplay.append(indivItem); 

        /*activating remove item from cart */
        var removeCartItemBtn = indivItem.getElementsByClassName('remove-item')[0];
        removeCartItemBtn.addEventListener('click', removeCartItem);

        /*activating add quantity chevron */
        var addCartItemBtn = indivItem.getElementsByClassName('fas fa-chevron-up')[0];
        addCartItemBtn.addEventListener('click', add1);

        /*activating minus quantity chevron */
        var minusCartItemBtn = indivItem.getElementsByClassName('fas fa-chevron-down')[0];
        minusCartItemBtn.addEventListener('click', minus1);
}
/* end of add to cart function */

/* show cart function */
function openCart(event) {
    document.getElementsByClassName('cart-overlay')[0].classList.add('transparentBcg');
    document.getElementsByClassName('cart')[0].classList.add('showCart');
}

/* hide cart function */
function closeCart(event) {
    document.getElementsByClassName('cart-overlay')[0].classList.remove('transparentBcg');
    document.getElementsByClassName('cart')[0].classList.remove('showCart');
}

/* clear cart function */
function clearCartItems(event) {
    var resetCart = event.target;
    if (resetCart.parentElement.parentElement.getElementsByClassName('cart-item').length == 0) {
        displayToast('emptycart');
        return
    } else {
    var clearConfirmation = confirm("Are you sure you want to clear your cart? All progress will be lost.");
    if (clearConfirmation == true) {
        document.getElementsByClassName('cart-content')[0].innerHTML = "";
        updateTotal();
    }
    }
}
/* end of clear cart function */

/* checkout items function */
function purchaseItems(event) {
    if (document.getElementsByClassName('cart-items')[0].innerText == 0) {
        displayToast('purchasenothing');
    } else {
    var subtotalAmount = document.getElementsByClassName('cart-total')[0].innerHTML;
    var totalAmount = Math.round(subtotalAmount * 1.13 * 100) / 100;
    var checkoutConfirmation = confirm("Your subtotal will be $" + subtotalAmount + 
        ". Delivery is on us this time. So after 13% sales taxes, the total is going to add up to $" + totalAmount + ".");
    if (checkoutConfirmation == true) {
        document.getElementsByClassName('cart-content')[0].innerHTML= "";
        updateTotal();
        displayToast('thanks');
    }
    }
}

/* remove item from cart function */
function removeCartItem(event) {
    var removeClicked = event.target;
    removeClicked.parentElement.parentElement.remove();
    updateTotal();
}

/* add quantity 1 from cart function */
function add1(event) {
    var aoriginalAmount = parseInt(event.target.parentElement.parentElement.getElementsByClassName('item-amount')[0].innerText);
    event.target.parentElement.parentElement.getElementsByClassName('item-amount')[0].innerText = aoriginalAmount + 1;
    updateTotal();
}

/* remove quantity 1 from cart function */
function minus1(event) {
    var moriginalAmount = parseInt(event.target.parentElement.parentElement.getElementsByClassName('item-amount')[0].innerText);
    if (moriginalAmount == 1) {
        var removeConfirmation = confirm("Are you sure you want to remove " + 
        event.target.parentElement.parentElement.getElementsByClassName('item-name')[0].innerText + " from your shopping cart?")
        if (removeConfirmation == true) {
            event.target.parentElement.parentElement.remove();
        } else {
            null;
        }
    } else {
        event.target.parentElement.parentElement.getElementsByClassName('item-amount')[0].innerText = moriginalAmount - 1;
    }
    updateTotal();
}

/* display toast function */
function displayToast(toastclass) {
    var x = document.getElementById(toastclass); 
    x.classList.add('toastshow');
    setTimeout(function(){x.classList.remove('toastshow')}, 3500);
}

/* update total function */
function updateTotal() {
    var allCartItems = document.getElementsByClassName('cart-content')[0];
    var cartItems = allCartItems.getElementsByClassName('cart-item')
    var cartTotal = 0;
    var shoppingCartIcon = 0;
    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];
        var priceElement = cartItem.getElementsByClassName('item-price')[0];
        var quantityElement = cartItem.getElementsByClassName('item-amount')[0];
        var price = parseFloat(priceElement.innerHTML.replace('$', ""));
        var quantity = quantityElement.innerHTML;
        cartTotal = cartTotal + (price * quantity);    
        shoppingCartIcon = shoppingCartIcon + parseInt(quantity); 
}
    var roundedTotal = Math.round(cartTotal * 100) / 100;
    document.getElementsByClassName('cart-total')[0].innerText = roundedTotal;
    document.getElementsByClassName('cart-items')[0].innerText = shoppingCartIcon;
}