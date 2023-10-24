let favoriteItems = JSON.parse(localStorage.getItem("productsFavorite"));
let favoriteItemsContainer = document.querySelector(".products");

function initializeFavoriteItems() {
  if (favoriteItems && favoriteItems.length > 0) {
    drawFavoriteItemsUI(favoriteItems);
  } else {
    favoriteItemsContainer.innerHTML = `<p class="no-favorite">No favorite items</p>`;
  }
}

initializeFavoriteItems();

function drawFavoriteItemsUI(items) {
  favoriteItemsContainer.innerHTML = "";

  items.forEach((item) => {
    const favoriteItem = document.createElement("div");
    favoriteItem.classList.add("favorite-item");

    favoriteItem.innerHTML = `
      <div class="favorite-item-details product-item">
        <img src="${item.imageUrl}" alt="${item.title}" class="favorite-item-image product-item-img">
        <div class="favorite-item-info">
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
          <p>Size: ${item.size}</p>
          Description:<p class="longDesc"> ${item.longDesc}</p>
        </div>
      </div>
      <button class="remove-favorite" data-id="${item.id}">Remove</button>
    `;

    favoriteItemsContainer.appendChild(favoriteItem);
  });

  const removeButtons = document.querySelectorAll(".remove-favorite");
  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const itemId = this.getAttribute("data-id");
      removeItemFromFavorite(itemId);
    });
  });
}

function removeItemFromFavorite(id) {
  favoriteItems = favoriteItems.filter((item) => item.id != id);
  localStorage.setItem("productsFavorite", JSON.stringify(favoriteItems));
  drawFavoriteItemsUI(favoriteItems);
}
