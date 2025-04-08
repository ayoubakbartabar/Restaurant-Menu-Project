// create variable and get element
let $ = document;
let foodsContainerElem = $.querySelector(".foods-content");
let cartContainerElem = $.querySelector(".cart-container");
let itemContainer = $.querySelector(".item-container");
let orderTotalPriceElem = $.querySelector(".order-total-price");
let foodsCountNumberElem = $.querySelector(".foods-count");
let submitOrderElem = $.querySelector(".submit-order");
let orderConfirmElem = $.querySelector(".order-confirm-container");
let titleElem = $.querySelector(".title");
let foodsContainerStyleElem = $.querySelector(".foods-container");
let boxContentElem = $.querySelector(".box-content");
let confirmOrderTotalElem = $.querySelector(".total");
let newOrderBtn = $.querySelector(".new-order");
let emptyElem = $.querySelector(".empty");

// fetch data
function fetching() {
  fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
      foodListGenerat(data);
    });
}
// call function
fetching();

// Global array to store added foods
let addFoodsArray = [];

// Function to add food to the cart and update the cart
function addFoodFunc(
  foodId,
  foodName,
  foodImage,
  foodCategory,
  foodPrice,
  foodCount
) {
  // create variable for Object
  let newFoodId = foodId;
  let newFoodName = foodName;
  let newFoodImage = foodImage;
  let newFoodCategory = foodCategory;
  let newFoodPrice = foodPrice;
  let foodTotalPrice = foodCount * newFoodPrice;

  // Create the food object
  let foodObj = {
    id: newFoodId,
    name: newFoodName,
    image: newFoodImage,
    category: newFoodCategory,
    price: newFoodPrice,
    count: foodCount,
    totalPrice: foodTotalPrice,
  };

  // Check if the food is already in the array
  const existingFood = addFoodsArray.find((item) => item.id === foodId);

  // If the food exists, update the count and total price
  if (existingFood) {
    existingFood.count = foodCount;
    existingFood.totalPrice = foodCount * existingFood.price;
  } else {
    addFoodsArray.push(foodObj);
  }

  // Update the cart
  orderCartGenerator(addFoodsArray);
  orderCalcu(addFoodsArray);
  setLocalStorage(addFoodsArray);
  emptyVersion(addFoodsArray);
}

function createAddToCartButton(food, buyBtn, foodImgElem) {
  let addToCartBtn = document.createElement("button");
  addToCartBtn.classList.add("add-to-cart");

  let buySvgElem = document.createElement("span");
  buySvgElem.classList.add("cart-icon");
  buySvgElem.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>`;

  let btnText = document.createElement("span");
  btnText.textContent = "Add to Cart";

  addToCartBtn.append(buySvgElem, btnText);
  buyBtn.innerHTML = "";
  buyBtn.append(addToCartBtn);

  // create add Event Listener
  addToCartBtn.addEventListener("click", function () {
    let count = 1;
    addFoodFunc(
      food.id,
      food.name,
      food.image.desktop,
      food.category,
      food.price,
      count
    );

    foodImgElem.style.border = "2px solid hsl(14, 86%, 42%)";

    let quantityBox = document.createElement("div");
    quantityBox.classList.add("quantity-box");

    let minusBtn = document.createElement("button");
    minusBtn.classList.add("minus-btn");
    minusBtn.textContent = "−";

    let countElem = document.createElement("span");
    countElem.classList.add("input-count");
    countElem.textContent = count;

    let plusBtn = document.createElement("button");
    plusBtn.classList.add("plus-btn");
    plusBtn.textContent = "+";

    quantityBox.append(minusBtn, countElem, plusBtn);
    buyBtn.innerHTML = "";
    buyBtn.append(quantityBox);

    buyBtn.innerHTML = "";
    buyBtn.append(quantityBox);
    buyBtn.style.backgroundColor = "hsl(14, 86%, 42%)";

    plusBtn.addEventListener("click", () => {
      count++;
      countElem.textContent = count;
      addFoodFunc(
        food.id,
        food.name,
        food.image.desktop,
        food.category,
        food.price,
        count
      );
    });
//
    minusBtn.addEventListener("click", () => {
      if (count > 0) {
        count--;
        countElem.textContent = count;

        if (count === 0) {

          removeOrderFunc(food.id);


          buyBtn.innerHTML = "";

          let newAddToCartBtn = document.createElement("button");
          newAddToCartBtn.classList.add("add-to-cart");

          let newBuySvgElem = document.createElement("span");
          newBuySvgElem.classList.add("cart-icon");
          newBuySvgElem.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>`;

          let newBtnText = document.createElement("span");
          newBtnText.textContent = "Add to Cart";

          newAddToCartBtn.append(newBuySvgElem, newBtnText);
          buyBtn.append(newAddToCartBtn);
          buyBtn.style.backgroundColor = ""; 

          newAddToCartBtn.addEventListener("click", () => {
            createAddToCartButton(food, buyBtn, foodImgElem);
          });
        } else {
          addFoodFunc(
            food.id,
            food.name,
            food.image.desktop,
            food.category,
            food.price,
            count
          );
        }
      }
    });
  });
}

// Updating the food list generation function to use the above logic
function foodListGenerat(allFoodsArray) {
  // create variable
  let foodBoxElem,
    thumbnailElem,
    foodImgElem,
    buyBtn,
    detaileContainer,
    categoryElem,
    nameElem,
    priceElem;
  // set loop for array
  allFoodsArray.forEach(function (food) {
    foodBoxElem = document.createElement("div");
    foodBoxElem.className = "foods-box";

    thumbnailElem = document.createElement("div");
    thumbnailElem.className = "thumbnail";

    foodImgElem = document.createElement("img");
    foodImgElem.className = "foods-img";
    foodImgElem.src = food.image.desktop;

    buyBtn = document.createElement("button");
    buyBtn.className = "buying";

    // Initially show the Add to Cart button functionality
    createAddToCartButton(food, buyBtn, foodImgElem);

    detaileContainer = document.createElement("div");
    detaileContainer.className = "detaile";

    categoryElem = document.createElement("p");
    categoryElem.className = "short-name";
    categoryElem.innerHTML = food.category;

    nameElem = document.createElement("h5");
    nameElem.className = "long-name";
    nameElem.innerHTML = food.name;

    priceElem = document.createElement("p");
    priceElem.className = "price";
    priceElem.innerHTML = `$ ${food.price}`;

    foodBoxElem.append(thumbnailElem, detaileContainer);
    thumbnailElem.append(foodImgElem, buyBtn);
    detaileContainer.append(categoryElem, nameElem, priceElem);
    foodsContainerElem.append(foodBoxElem);
  });
}

// create function for buy food btn
function addFoodFunc(
  foodId,
  foodName,
  foodImage,
  foodCategory,
  foodPrice,
  foodCount
) {
  let foodTotalPrice = foodCount * foodPrice;

  let foodObj = {
    id: foodId,
    name: foodName,
    image: foodImage,
    category: foodCategory,
    price: foodPrice,
    count: foodCount,
    totalPrice: foodTotalPrice,
  };

  const existingFood = addFoodsArray.find((item) => item.id === foodId);

  if (existingFood) {
    existingFood.count = foodCount; // Update count
    existingFood.totalPrice = foodCount * existingFood.price; // Update price
  } else {
    addFoodsArray.push(foodObj);
  }

  orderCartGenerator(addFoodsArray);
  orderCalcu(addFoodsArray);
  setLocalStorage(addFoodsArray);
  emptyVersion(addFoodsArray);
}

// create order cart generator function
function orderCartGenerator(foodList) {
  itemContainer.innerHTML = "";
  // set loop
  foodList.forEach((food) => {
    // set insertAdjacentHTML
    itemContainer.insertAdjacentHTML(
      "afterbegin",
      `
          <div class="item">
            <div class="cart-detail">
              <h3 class="foods-name">${food.name}</h3>
              <div class="price-detail">
                <span class="count">X${food.count}</span>
                <span class="foods-price">@${food.price}</span>
                <span class="foods-total-price">$ ${(food.totalPrice =
                  food.count * food.price)}</span>
              </div>
            </div>
            <button class="remove" onclick="removeOrderFunc('${
              food.id
            }')"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg></button>
          </div>
        `
    );

    submitOrderElem.addEventListener("click", () => {
      confirmOrderFunc(addFoodsArray);
    });
  });
  foodsCountNumberElem.innerHTML = ` (${foodList.length})`;
}

// create function for remove item in order
function removeOrderFunc(foodId) {
  // set filter method
  addFoodsArray = addFoodsArray.filter((food) => {
    return food.id != foodId;
  });
  // call functions
  emptyVersion(addFoodsArray);
  orderCartGenerator(addFoodsArray);
  orderCalcu(addFoodsArray);
}

// create function for calculator order
function orderCalcu(foodList) {
  let sum = 0;
  // set loop
  foodList.forEach(function (food) {
    sum += food.price * food.count;
  });

  orderTotalPriceElem.innerHTML = "$" + sum;
  confirmOrderTotalElem.innerHTML = "$" + sum;
  // call function
  setLocalStorage(addFoodsArray);
}

// create function for time of order cart is empty
function emptyVersion(array) {
  // set loop
  if (array.length === 0) {
    cartContainerElem.style.display = "none";
    emptyElem.style.display = "flex";
  } else {
    cartContainerElem.style.display = "flex";
    emptyElem.style.display = "none";
  }
}

// create function for get items in local storage
function getLocalStorage() {
  let getItem = JSON.parse(localStorage.getItem("orderList"));
  // set if problem
  if (getItem) {
    addFoodsArray = getItem;
  } else {
    addFoodsArray = [];
  }
  // call functions
  orderCartGenerator(addFoodsArray);
  orderCalcu(addFoodsArray);
  // call empty function
  emptyVersion(addFoodsArray);
}

// create function for set items in local storage
function setLocalStorage(orderList) {
  // set item local storage
  localStorage.setItem("orderList", JSON.stringify(orderList));
}

// create function for confirm order
function confirmOrderFunc(foodList) {
  boxContentElem.innerHTML = "";
  // set loop
  foodList.forEach((food) => {
    // insertadjacntHTML
    boxContentElem.insertAdjacentHTML(
      "afterbegin",
      `
            <div class="confirmed-item">
            <div class="confirmed-detailes-container">
            <img class="form-img" src="${food.image}" alt="${food.name}">
            <div class="confirmed-detailes">
            <h5 class="food-name">${food.name}</h5>
            <p class="food-count">X ${food.count} <span class="food-price">@ $${food.price}</span> </p>
            </div>
            </div>
            <h3 class="food-total-price">$${food.totalPrice}</h3>
            </div>
        `
    );
  });
  // call functions
  elementsStyleFunc(addFoodsArray);
  orderCalcu(addFoodsArray);
}

// create function for set style
function elementsStyleFunc(foodList) {
  // set if problem
  if (foodList.length > 0) {
    titleElem.style.opacity = "0.2";
    foodsContainerStyleElem.style.opacity = "0.2";
    orderConfirmElem.style.display = "flex";
  }
}

// create function for start new order
function newStart() {
  // empty the array and call functions
  addFoodsArray = [];

  orderCartGenerator(addFoodsArray);
  orderCalcu(addFoodsArray);
  confirmOrderFunc(addFoodsArray);
  emptyVersion(addFoodsArray);

  // set new style
  orderConfirmElem.style.display = "none";
  foodsContainerStyleElem.style.opacity = "1";
  titleElem.style.opacity = "1";

  // reloading
  location.reload();
}

// add event listener
window.addEventListener("load", getLocalStorage);
newOrderBtn.addEventListener("click", newStart);
