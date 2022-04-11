const main = document.querySelector(".main");

const addUserbtn = document.querySelector(".add-user");
const doubleMoneybtn = document.querySelector(".double");
const showmillionariesbtn = document.querySelector(".show-millionaries");
const sortbtn = document.querySelector(".sort");
const calculateWealthbtn = document.querySelector(".calculate-wealth");

// Setting initial data value to empty array
let data = [];

// Get Random user data from API
const getRandomUser = async function () {
  const res = await fetch(`https://randomuser.me/api/`);
  const data = await res.json();

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
};

// Adding random user info in data array
const addData = function (obj) {
  data.push(obj);
  updateDOM(data);
};

// update DOM
const updateDOM = function (data) {
  // Clear main div
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  data.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");

    element.innerHTML = `<strong> ${item.name}></strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
};

// Formating number in money format
const formatMoney = function (item) {
  return "$" + item.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

getRandomUser();

// double Money
const doubleMoney = function () {
  data = data.map((item) => {
    return { ...item, money: item.money * 2 };
  });
  updateDOM(data);
};

// show millionaries
const showmillionaries = function () {
  data = data.filter((item) => {
    if (item.money > 1000000) {
      return { ...item };
    }
  });
  updateDOM(data);
};

// Sort the money in richest order
const sort = function () {
  data = data.sort((a, b) => {
    return b.money - a.money;
  });
  updateDOM(data);
};

// Calculate total Wealth
const calculateWealth = function () {
  const wealth = data.reduce((acc, num) => (acc += num.money), 0);

  const element = document.createElement("div");
  element.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;

  main.appendChild(element);
};

// Event handlers
addUserbtn.addEventListener("click", getRandomUser);
doubleMoneybtn.addEventListener("click", doubleMoney);
showmillionariesbtn.addEventListener("click", showmillionaries);
sortbtn.addEventListener("click", sort);
calculateWealthbtn.addEventListener("click", calculateWealth);
