const data = [
  {
    title:
      "BULLMER Black Trendy Front and Back Printed Oversized Round Neck-Shirt for Men",
    price: 1499,
    image: "https://m.media-amazon.com/images/I/612Rl6GKHoL._AC_UL320_.jpg",
    category: "topwear",
  },
  {
    title: "Men T-Shirt || Regular Fit T-Shirt for Men || Plain T Shirt",
    price: 349,
    image: "https://m.media-amazon.com/images/I/71r3W2+d-vL._AC_UL320_.jpg",
    category: "topwear",
  },
  {
    title: "Shirt for Men | Tropical Leaf Printed Rayon Shirts for Men",
    price: 289,
    image: "https://m.media-amazon.com/images/I/61SmsCyfZOL._AC_UL320_.jpg",
    category: "topwear",
  },
  {
    title: "Pre & Post Pregnancy Pants for Women",
    price: 999,
    image: "https://m.media-amazon.com/images/I/61n-6NqbfgL._AC_UL320_.jpg",
    category: "bottomwear",
  },
  {
    title: "Dennis Lingo Men Slim Fit Cargo Trousers ",
    price: 799,
    image: "https://m.media-amazon.com/images/I/51sGZkbabiL._AC_UL320_.jpg",
    category: "bottomwear",
  },
  {
    title: "DMS Military Shoe Hand Mate Full Leather Black",
    price: 899,
    image: "https://m.media-amazon.com/images/I/21EzQ5JMmcL._AC_UL320_.jpg",
    category: "footwear",
  },
  {
    title: "unisex-adut AS002 White/Indigo Blue Slide Sandal",
    price: 1199,
    image: "https://m.media-amazon.com/images/I/5184YvefNML._AC_UL320_.jpg",
    category: "footwear",
  },
  {
    title: "Men's Watches Luxury Fashion Casual Dress Chronograph",
    price: 2690,
    image: "https://m.media-amazon.com/images/I/71tZYe9HVpL._AC_UL320_.jpg",
    category: "accessories",
  },
  {
    title: "Analog White Dial Women's Watch-FCN00037",
    price: 1891,
    image: "https://m.media-amazon.com/images/I/51fdT66lCuL._AC_UL320_.jpg",
    category: "accessories",
  },
];

const container = document.getElementById("content-box");
const filterBox = document.querySelector(".filter-box");
const searchIcon = document.querySelector(".search-icon");
const searchItem = document.getElementById("search-input");
const sortType = document.getElementById("sortType");

let newData = data;
let searchData = newData;

window.onload = filterData(newData);

filterBox.addEventListener("click", function (e) {
  const buttons = document.querySelectorAll(".filter-box button");

  if (e.target.matches("button")) {
    buttons.forEach((button) => button.classList.remove("active"));
    e.target.classList.add("active");

    if (e.target.value !== "all") {
      newData = data.filter((item) => item.category === e.target.value);
    } else {
      newData = data;
    }

    filterData(newData);
  }
});

searchItem.addEventListener("input", function (e) {
  if (searchItem.value === "") {
    searchData = newData;
  } else {
    searchData = newData.filter((check, i) => {
      let head = check.title.toLowerCase();
      if (head.includes(searchItem.value.toLowerCase())) return check;
    });
  }
  filterData(searchData);
});

sortType.addEventListener("change", function (e) {
  let [type, dir] = e.target.value.split("-");
  switch (type) {
    case "price":
      if (dir == "asc") {
        let sortedData = newData.sort((a, b) => a.price - b.price);
      } else {
        sortedData = newData.sort((a, b) => b.price - a.price);
      }
      break;
  }
  filterData(sortedData);
});

function filterData(newData) {
  container.innerHTML = "";
  newData.map((item, i) => {
    const details = document.createElement("div");
    details.classList.add("details");

    const image = document.createElement("div");
    image.classList.add("card-image");

    const title = document.createElement("h4");
    title.classList.add("card-title");

    const price = document.createElement("p");
    price.classList.add("card-price");

    const card = document.createElement("div");
    card.classList.add("card");

    card.appendChild(image);
    image.style.backgroundImage = `url("${item.image}")`;

    card.appendChild(details);

    details.appendChild(title);
    title.innerText = item.title;

    details.appendChild(price);
    price.innerText = "$" + item.price;

    container.appendChild(card);
  });
}
