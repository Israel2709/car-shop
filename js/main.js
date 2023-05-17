/*
    {
        brand:"Seat",
        model:"Ibiza",
        year:2017,
        picture:"some url"
    }
*/

const BASE_URL = `https://javascript-25g-default-rtdb.firebaseio.com`;

let carObject = {};

document.querySelectorAll("#car-form input").forEach((field) => {
  field.addEventListener("keyup", (event) => {
    let property = event.target.name;
    let value = event.target.value;
    carObject[property] = value;
    console.log(carObject);
  });
});

const saveCar = async (car) => {
  let response = await fetch(`${BASE_URL}/cars/.json`, {
    method: "POST",
    body: JSON.stringify(car),
  });
  let data = await response.json();
  return data;
};

document.getElementById("save-car").addEventListener("click", async (event) => {
  event.preventDefault();
  let response = await saveCar(carObject);
  console.log(response);
  if (response) {
    printAllCars("car-list");
  }
});

const createCarCard = (carData, carKey) => {
  let { brand, model, year, picture } = carData;
  let cardCol = document.createElement("div");
  cardCol.classList.add("col");

  let cardWrapper = document.createElement("div");
  cardWrapper.classList.add("car-card", "card", "mb-3");

  let cardRow = document.createElement("div");
  cardRow.classList.add("row", "g-0");

  let imageCol = document.createElement("div");
  imageCol.classList.add("col-md-4");

  let cardPicture = document.createElement("img");
  cardPicture.classList.add("card-picture");
  cardPicture.setAttribute("src", picture);

  let contentCol = document.createElement("div");
  contentCol.classList.add("col-md-4");

  let cardBody = document.createElement("div");
  cardBody.classList.add(
    "card-body",
    "h-100",
    "d-flex",
    "flex-column",
    "justify-content-between"
  );

  let cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  let cardTitleText = document.createTextNode(`${brand} ${model}`);
  cardTitle.append(cardTitleText);

  let cardYear = document.createElement("p");
  cardYear.classList.add("card-text");
  let yearText = document.createTextNode(year);
  cardYear.append(yearText);

  let buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add(
    "d-flex",
    "justify-content-between",
    "flex-column",
    "flex-md-row",
    "gap-3"
  );

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "btn-danger");
  let deleteText = document.createTextNode("Borrar");
  deleteButton.append(deleteText);
  deleteButton.addEventListener("click", () => {
    console.log("borrando auto");
    deleteCar(carKey);
  });

  let detailButton = document.createElement("button");
  detailButton.classList.add("btn", "btn-primary");
  let detailText = document.createTextNode("Ver detalle");
  detailButton.append(detailText);

  buttonWrapper.append(deleteButton, detailButton);

  cardBody.append(cardTitle, cardYear, buttonWrapper);

  contentCol.append(cardBody);

  imageCol.append(cardPicture);

  cardRow.append(imageCol, contentCol);

  cardWrapper.append(cardRow);

  cardCol.append(cardWrapper);

  return cardCol;
};

const getAllCars = async () => {
  let response = await fetch(`${BASE_URL}/cars/.json`);
  let data = await response.json();
  return data;
};

const printAllCars = async (listId) => {
  let cars = await getAllCars();
  console.log(cars);
  let listWrapper = document.getElementById(listId);
  while (listWrapper.firstChild) {
    listWrapper.removeChild(listWrapper.firstChild);
  }
  for (key in cars) {
    let carData = cars[key];
    let card = createCarCard(carData, key);
    listWrapper.appendChild(card);
  }
};

printAllCars("car-list");

const deleteCar = async (carKey) => {
  let response = await fetch(`${BASE_URL}/cars/${carKey}/.json`, {
    method: "DELETE",
  });
  let data = await response.json();
  console.log(data);
  printAllCars("car-list");
};
