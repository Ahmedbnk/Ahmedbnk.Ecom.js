let userInfo = document.querySelector("#user_info");
let userDom = document.querySelector("#user");
let logoutBtn = document.querySelector("#logout");
let links = document.querySelector("#links");

let username = localStorage.getItem("username");
let cartLength = JSON.parse(localStorage.getItem("cartLength")) || 0;

if (username) {
  links.remove();
  userInfo.style.display = "flex";
  userDom.textContent = username;
}

logoutBtn.addEventListener("click", function () {
  localStorage.clear();
  setTimeout(() => {
    window.location = "register.html";
  }, 1500);
});

let productsDom = document.querySelector(".products");
let cartProductMenu = document.querySelector(".carts-products");
let cartProductDivDom = document.querySelector(".carts-products div");
let badgeDom = document.querySelector(".badge");
let ShoppingCartIcon = document.querySelector(".shopping-cart");

let products = [
  {
    id: 1,
    title: "headphone item",
    desc: "lorem ipsum, dolor sit amte constesctor.",
    size: "large",
    imageUrl: "images/headphone.jpg",
    qty: 1,
    longDesc:
      "In the bustling city, amidst the noise of traffic and conversations, a pair of high-end headphones sits on a cafe table. These headphones are a true embodiment of modern style and sound engineering. With their premium leather ear cushions and brushed aluminum accents, they exude a sense of luxury and comfort. As you put them on, the cacophony of the world fades away, replaced by the rich and immersive audio experience that these headphones deliver. Whether you're an audiophile seeking pristine sound quality or a traveler yearning for an escape, these headphones are your portal to a world of music, storytelling, and tranquility, all wrapped in a beautifully designed package.",
  },
  {
    id: 2,
    title: "laptop item",
    desc: "lorem ipsum, dolor sit amte constesctor.",
    size: "small",
    imageUrl: "images/laptop.jpg",
    qty: 1,
    longDesc:
      "Amidst a cluttered desk, a sleek and powerful laptop takes center stage. Its metallic chassis, adorned with minimalist elegance, reflects the ambient light in a way that underscores its technological sophistication. When opened, the laptop's high-resolution display comes to life, revealing a world of possibilities. With its cutting-edge hardware and lightning-fast performance, it's not just a tool but a gateway to innovation and connectivity. Whether used for work, creativity, or entertainment, this laptop is a versatile companion, faithfully carrying the weight of ideas, projects, and dreams. It is the embodiment of the digital age, where endless horizons meet the touch of a keyboard and the click of a mouse.",
  },
  {
    id: 3,
    title: "watch item",
    desc: "lorem ipsum, dolor sit amte constesctor.",
    size: "medium",
    imageUrl: "images/watch.jpg",
    qty: 1,
    longDesc:
      "Resting on the polished wooden surface, a timeless wristwatch tells more than just the time; it tells a story. Its classic design, featuring a gleaming stainless steel case and an elegant leather strap, transcends passing fashions. With each tick of its precise movement, it signifies not only the minutes and hours but also the moments, both big and small, that make up a life. This watch is more than an accessory; it's a companion, a keeper of memories. It has witnessed journeys, milestones, and the ebb and flow of time itself. In its timeless design, it encapsulates the eternal charm of nostalgia and the promise of what's yet to come.",
  },
  {
    id: 4,
    title: "glasses item",
    desc: "lorem ipsum, dolor sit amte constesctor.",
    size: "large",
    imageUrl: "images/glasses.jpg",
    qty: 1,
    longDesc:
      "On the edge of the antique wooden desk, a pair of stylish eyeglasses awaits its owner. These glasses are more than a mere accessory; they are a window to a clearer world. The frames, meticulously crafted from fine materials, are not just functional but also a fashion statement. When worn, they transform the world, bringing even the tiniest details into sharp focus. From intricate art to the fine print of a book, these glasses are the key to unlocking hidden beauty and knowledge. They serve as a reminder that sometimes, the most profound insights come through the simplest of lenses, bridging the gap between the seen and the unseen.",
  },
];

let drawProductUI;
(drawProductUI = function (products = []) {
  let productUI = products.map((item) => {
    return ` <div class="products">
                <div class="product-item">
                    <img src="${item.imageUrl}" alt="image" class="product-item-img"/>
                    <div class="product-item-desc">
                      <a onclick="saveItemData(${item.id})">${item.title}</a>
                      <p> ${item.desc}</p>
                      <span>Size: ${item.size}</span>
                    </div><!-- product item desc -->
                    <div class="product-item-actions">
                      <button class="add-to-cart" onclick="addedToCart(${item.id})">Add To Cart</button>
                      <i class="far fa-heart favorite" data-id="${item.id}" onclick="addToFavorite(${item.id})"></i>
                    </div><!-- product item actions -->
                  </div><!-- product-item -->
              </div><!-- products -->`;
  });

  productsDom.innerHTML = productUI.join("");
})(JSON.parse(localStorage.getItem("productsData")) || products);

let addedItem = localStorage.getItem("productsInCart")
  ? JSON.parse(localStorage.getItem("productsInCart"))
  : [];

let allItems = [];

function addedToCart(id) {
  if (localStorage.getItem("username")) {
    var choosenItem = products.find((item) => item.id === id);
    let item = allItems.find((i) => i.id === choosenItem.id);
    if (item) {
      choosenItem.qty += 1;
    } else {
      allItems.push(choosenItem);
    }
    cartProductDivDom.innerHTML = "";
    allItems.forEach((item) => {
      cartProductDivDom.innerHTML += `<p>${item.title}  <span class="cartBadge">${item.qty}</span></p>`;
    });

    addedItem = [...addedItem, choosenItem];
    localStorage.setItem("productsInCart", JSON.stringify(addedItem));
    var cartProductLength = document.querySelectorAll(".carts-products div p");
    cartLength = addedItem.length;
    localStorage.setItem("cartLength", cartLength);
    badgeDom.style.display = "block";
    badgeDom.innerHTML = cartLength;
  } else {
    window.location = "login.html";
  }
}

ShoppingCartIcon.addEventListener("click", viewProducts);

function viewProducts() {
  if (badgeDom.innerHTML !== "") {
    if (cartProductMenu.style.display === "none") {
      cartProductMenu.style.display = "block";
    } else {
      cartProductMenu.style.display = "none";
    }
  }
}

function saveItemData(id) {
  localStorage.setItem("productId", id);
  window.location = "cartDetails.html";
}

localStorage.setItem("productsData", JSON.stringify(products));

// Search
let input = document.getElementById("search");
input.addEventListener("keyup", function (e) {
  search(e.target.value, products);

  if (e.target.value.trim() === "") {
    drawProductUI(products);
  }
});

function search(title, myArray) {
  let lowercaseTitle = title.toLowerCase();
  let arr = myArray.filter((item) =>
    item.title.toLowerCase().includes(lowercaseTitle)
  );
  drawProductUI(arr);
}

// Add to favorite

function addToFavorite(id) {
  if (localStorage.getItem("username")) {
    var chosenItem = products.find((item) => item.id === id);
    let favorites = JSON.parse(localStorage.getItem("productsFavorite")) || [];

    const existingIndex = favorites.findIndex(
      (item) => item.id === chosenItem.id
    );

    if (existingIndex !== -1) {
      favorites.splice(existingIndex, 1);
      document.querySelector(`.favorite[data-id="${id}"]`).style.color = "#000";
    } else {
      favorites.push(chosenItem);
      document.querySelector(`.favorite[data-id="${id}"]`).style.color = "red";
    }

    localStorage.setItem("productsFavorite", JSON.stringify(favorites));
  } else {
    window.location = "login.html";
  }
}

function initializeLikedItems() {
  if (localStorage.getItem("username")) {
    let favorites = JSON.parse(localStorage.getItem("productsFavorite")) || [];
    for (const favorite of favorites) {
      document.querySelector(
        `.favorite[data-id="${favorite.id}"]`
      ).style.color = "red";
    }
  }
}

initializeLikedItems();
