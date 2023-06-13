let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");

let search = document.getElementById("search");

let mood = "create";
let tmp;

// Total

function strTotal() {
  if (price.value != "") {
    let totals = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = totals;
    total.style.backgroundColor = "#1abc9c";
    total.style.color = "#201e28";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#332569";
    total.style.color = "#ddd";
  }
}

let arrproduct;

if (localStorage.product != null) {
  arrproduct = JSON.parse(localStorage.product);
} else {
  arrproduct = [];
}

create.onclick = function () {
  let data = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (
    title.value != "" &&
    price.value != "" &&
    taxes.value != "" &&
    ads.value != "" &&
    count.value < 100 &&
    category.value != ""
  ) {
    if (mood == "create") {
      if (data.count > 1) {
        for (let i = 1; i <= data.count; i++) {
          arrproduct.push(data);
        }
      } else {
        arrproduct.push(data);
      }
    } else {
      arrproduct[tmp] = data;
      mood = "create";
      create.innerHTML = "Create";
    }
    clearData();
  }

  count.style.display = "block";
  localStorage.setItem("product", JSON.stringify(arrproduct));
  showData();
};

// clearData

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// showData

function showData() {
  strTotal();

  let table = "";

  for (let i = 0; i < arrproduct.length; i++) {
    table += `
     <tr>
     <td>${i + 1}</td>
     <td>${arrproduct[i].title}</td>
     <td>${arrproduct[i].price}</td>
     <td>${arrproduct[i].taxes}</td>
     <td>${arrproduct[i].ads}</td>
     <td>${arrproduct[i].discount}</td>
     <td>${arrproduct[i].total}</td>
     <td>${arrproduct[i].category}</td>
     <td><button onclick = "updateData(${i})" id="update">update</button></td>
     <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
   </tr>
     `;
  }

  document.getElementById("tbody").innerHTML = table;

  let deleteAll = document.getElementById("deleteAll");

  if (arrproduct.length > 0) {
    deleteAll.innerHTML = `
        <button onclick = "deleteAll()">deleteAll (${arrproduct.length})</button>
        `;
  } else {
    deleteAll.innerHTML = "";
  }
}
showData();

// delete

function deleteData(i) {
  arrproduct.splice(i, 1);
  localStorage.product = JSON.stringify(arrproduct);
  showData();
}

// update

function updateData(i) {
  title.value = arrproduct[i].title;
  price.value = arrproduct[i].price;
  taxes.value = arrproduct[i].taxes;
  ads.value = arrproduct[i].ads;
  discount.value = arrproduct[i].discount;
  total.innerHTML = arrproduct[i].total;
  count.value = arrproduct[i].count;
  category.value = arrproduct[i].category;
  strTotal();
  title.focus();
  count.style.display = "none";
  create.innerHTML = "Update";
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  mood = "update";
  tmp = i;
}

// deleteAll

function deleteAll() {
  arrproduct.splice(0);
  localStorage.clear();
  showData();
}

// Search

let searchMode = "title";

function getSearchMood(id) {
  if (id === "searchTitle") {
    searchMode = "title";
  } else {
    searchMode = "category";
  }
  search.placeholder = "Search By " + searchMode;
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";

  for (let i = 0; i < arrproduct.length; i++) {
    if (searchMode == "title") {
      if (arrproduct[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${arrproduct[i].title}</td>
        <td>${arrproduct[i].price}</td>
        <td>${arrproduct[i].taxes}</td>
        <td>${arrproduct[i].ads}</td>
        <td>${arrproduct[i].discount}</td>
        <td>${arrproduct[i].total}</td>
        <td>${arrproduct[i].category}</td>
        <td><button onclick = "updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `;
      }
    } else {
      if (arrproduct[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${arrproduct[i].title}</td>
        <td>${arrproduct[i].price}</td>
        <td>${arrproduct[i].taxes}</td>
        <td>${arrproduct[i].ads}</td>
        <td>${arrproduct[i].discount}</td>
        <td>${arrproduct[i].total}</td>
        <td>${arrproduct[i].category}</td>
        <td><button onclick = "updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
