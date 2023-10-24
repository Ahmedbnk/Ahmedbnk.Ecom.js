// variables
let productName = document.getElementById("product-name");
let productDesc = document.getElementById("product-desc");
let productLongDesc = document.getElementById("product-long-desc"); // Corrected the id
let productSizeSelect = document.getElementById("product-size");
let createForm = document.querySelector(".create-form");
let productSizeValue;

// events
productSizeSelect.addEventListener("change", getProductSizeValue);
createForm.addEventListener("submit", creatProductFun);

// functions
function getProductSizeValue(e) {
  productSizeValue = e.target.value;
}

function creatProductFun(e) {
  e.preventDefault();
  let allProducts =
    JSON.parse(localStorage.getItem("productsData")) || products;
  let nameValue = productName.value;
  let descValue = productDesc.value;
  let longDescValue = productLongDesc.value;
  let obj = {
    id: allProducts ? allProducts.length + 1 : 1,
    qty: 1,
    size: productSizeValue,
    title: nameValue,
    desc: descValue,
    longDesc: longDescValue,
  };
  let newProducts = allProducts ? [...allProducts, obj] : [obj];
  localStorage.setItem("productsData", JSON.stringify(newProducts));
}
