localStorage.getItem("productsInCart");
let productsDom = document.querySelector(".products");
let badgeDom = document.querySelector(".badge");
let ShoppingCartIcon = document.querySelector(".shopping-cart");
let cartProductMenu = document.querySelector(".carts-products");
let emptyContainer = document.querySelector(".empty-container");
let cartLength = JSON.parse(localStorage.getItem("cartLength")) || 0;

function initializeCart() {
  const cartItems = JSON.parse(localStorage.getItem("productsInCart"));

  if (cartItems) {
    const uniqueItems = new Set();

    const uniqueCartItems = cartItems.filter((item) => {
      if (!uniqueItems.has(item.id)) {
        uniqueItems.add(item.id);
        return true;
      }
      return false;
    });

    badgeDom.style.display = cartLength > 0 ? "block" : "none";
    badgeDom.textContent = cartLength;

    drawCartProductUI(uniqueCartItems);
  }
}

initializeCart();

function drawCartProductUI(products) {
  let productUI = products.map((item) => {
    return `<div class="product-item">
        <img src="${item.imageUrl}" alt="image" class="product-item-img"/>
        <div class="product-item-desc">
          <a onclick="saveItemData(${item.id})">${item.title}</a>
          <p>${item.desc}</p>
          <span>Size: ${item.size}</span><br>
        <span>Quantity:<span class="cartBadge">${item.qty}</span></span>
        </div><!-- product item desc -->
        <div class="product-item-actions">
          <button class="add-to-cart" onclick="removeFromCart(${item.id})">Remove From Cart</button>
        </div><!-- product item actions -->
      </div><!-- product-item -->`;
  });

  productsDom.innerHTML = productUI.join("");
  if (productUI == "") {
    emptyContainer.innerHTML = `<div class="empty">There are no products selected</div>`;
  }
}

function removeFromCart(itemId) {
  const cartItems = JSON.parse(localStorage.getItem("productsInCart"));
  const findItem = cartItems.findIndex((item) => item.id === itemId);

  if (findItem !== -1) {
    cartItems.splice(findItem, 1);
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

    cartLength = cartItems.length;
    localStorage.setItem("cartLength", cartLength);
    badgeDom.style.display = cartLength > 0 ? "block" : "none";
    badgeDom.textContent = cartLength;

    initializeCart();
  }
}

ShoppingCartIcon.addEventListener("click", viewProducts);

function viewProducts() {
  if (badgeDom.textContent > 0) {
    if (cartProductMenu.style.display === "none") {
      cartProductMenu.style.display = "block";
    } else {
      cartProductMenu.style.display = "none";
    }
  } else {
    cartProductMenu.style.display = "none";
  }
}

function saveItemData(id) {
  localStorage.setItem("productId", id);
  window.location = "cartDetails.html";
}
