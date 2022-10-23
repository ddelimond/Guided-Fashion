import { formatPrice } from "./data.js"



export let addToCartDom = ({ id, name, price, amount, image }) => {
    const cartItemsDom = document.querySelector('.item-container');
    let article = document.createElement('article');
    article.classList.add('cart-item');
    article.setAttribute('data-id', id);

    article.innerHTML = `<div class="quick-info">
    <div class="item-img">
        <img src="${image}" alt="${name}">
    </div>
    <div class="item-info">
        <h5 class="item-name">${name}</h5>
        <span class="item-price"><strong>${formatPrice(price)}</strong></span>
        <button class="remove-item remove">remove</button>
    </div>
</div>
<div class="amount-adjuster-container">
    <i class="fa-solid fa-plus increase" data-id="${id}"></i>
    <span class="item-amount" data-id="${id}">${amount}</span>
    <i class="fa-solid fa-minus decrease"data-id="${id}"></i>
</div>`

    cartItemsDom.appendChild(article);

}