window.onload = function () {
  // Your extension code goes here
  let newDiv = document.createElement("div");
  newDiv.style = `
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  `;

  let columnContainer = document
    .querySelectorAll("article")
    .item(1)
    .querySelector(".row").children;

  //For browser compatibilty
  for (let i = 0; i < columnContainer.length; i++) {
    columnContainer[i].style.flex = "1";
  }

  document
    .querySelectorAll("article")
    .item(1)
    .querySelector(".row")
    .appendChild(newDiv);

  const nutritionTable = document.querySelector(
    ".product-info-nutrition_table__Q3m80"
  );
  console.log(nutritionTable);
  const rows = nutritionTable.querySelectorAll("tbody > tr");

  // Helper function to extract numeric value from text
  function extractValue(text) {
    return parseFloat(text.replace(/[^\d.]/g, ""));
  }

  // Extract values from table and store in variables
  let energy,
    fat,
    saturatedFat,
    unsaturatedFat,
    carbohydrates,
    sugars,
    dietaryFiber,
    protein,
    salty;

  rows.forEach((row) => {
    const key = row
      .querySelector("td:first-child")
      .textContent.trim()
      .toLowerCase();
    const value = extractValue(row.querySelector("td:last-child").textContent);

    switch (key) {
      case "energie":
        energy = value;
        break;
      case "vet":
        fat = value;
        break;
      case "waarvan verzadigd":
        saturatedFat = value;
        break;
      case "waarvan onverzadigd":
        unsaturatedFat = value;
        break;
      case "koolhydraten":
        carbohydrates = value;
        break;
      case "waarvan suikers":
        sugars = value;
        break;
      case "voedingsvezel":
        dietaryFiber = value;
        break;
      case "eiwitten":
        protein = value;
        break;
      case "zout":
        salty = value;
        break;
    }
  });

  // Log the extracted values
  console.log("Energy:", energy);
  console.log("Fat:", fat);
  console.log("Saturated Fat:", saturatedFat);
  console.log("Unsaturated Fat:", unsaturatedFat);
  console.log("Carbohydrates:", carbohydrates);
  console.log("Sugars:", sugars);
  console.log("Dietary Fiber:", dietaryFiber);
  console.log("Protein:", protein);
  console.log("Salty:", salty);

  // Create table elements
  const sliderContainer = document.createElement("div");
  sliderContainer.style = `display:flex; gap: 12px`;
  const amountSlider = document.createElement("input");
  amountSlider.style.flex = "1";
  const amountValue = document.createElement("span");
  const adjustedTable = document.createElement("table");
  const adjustedThead = document.createElement("thead");
  const adjustedTbody = document.createElement("tbody");

  // Set table styles
  const tableStyle = `
  border-spacing: 12px;
  width: 100%;
`;
  adjustedTable.style = tableStyle;

  // Configure the slider
  amountSlider.setAttribute("type", "range");
  amountSlider.setAttribute("min", "1");
  amountSlider.setAttribute("max", "500");
  amountSlider.setAttribute("value", "100");
  amountSlider.classList.add("slider");

  // Helper function to create a table row
  function createTableCell(text, style) {
    const cell = document.createElement("td");

    if (style) {
        console.log("wtf")
      Object.keys(style).forEach((key) => {
        cell.style[key] = style[key];
      });
    }
    cell.textContent = text;
    return cell;
  }
  
  
  function createRow(label, value) {
    const row = document.createElement("tr");
    row.appendChild(createTableCell(label));
    row.appendChild(createTableCell(value));
    return row;
  }
  
  function createCustomRow(label, value, style) {
    const row = document.createElement("tr");
    row.appendChild(createTableCell(label, style));
    row.appendChild(createTableCell(value));
    return row;
  }

  // Update the adjusted table with the new values
  function updateAdjustedTable(amount) {
    adjustedTbody.innerHTML = "";
    adjustedTbody.appendChild(
      createRow("Energy", ((energy * amount) / 100).toFixed(1) + "kJ")
    );
    adjustedTbody.appendChild(
      createRow("Fat", ((fat * amount) / 100).toFixed(1) + "g")
    );
    adjustedTbody.appendChild(
        createCustomRow(
        "Saturated Fat",
        ((saturatedFat * amount) / 100).toFixed(1) + "g",{ textIndent: "12px"}
      )
    );
    adjustedTbody.appendChild(
        createCustomRow(
        "Unsaturated Fat",
        ((unsaturatedFat * amount) / 100).toFixed(1) + "g",{ textIndent: "12px"}
      )
    );
    adjustedTbody.appendChild(
      createRow(
        "Carbohydrates",
        ((carbohydrates * amount) / 100).toFixed(1) + "g"
      )
    );
    adjustedTbody.appendChild(
        createCustomRow("Sugars", ((sugars * amount) / 100).toFixed(1) + "g",  { textIndent: "12px"})
    );
    adjustedTbody.appendChild(
      createRow(
        "Dietary Fiber",
        ((dietaryFiber * amount) / 100).toFixed(1) + "g"
      )
    );
    adjustedTbody.appendChild(
      createRow("Protein", ((protein * amount) / 100).toFixed(1) + "g")
    );
    adjustedTbody.appendChild(
      createRow("Salty", ((salty * amount) / 100).toFixed(1) + "g")
    );
  }

  // Add the table header
  const headerRow = document.createElement("tr");
  headerRow.innerHTML = `
  <th style="
  text-align: start;
">Kind</th>
  <th style="text-align:start
">Per <span id="adjusted-amount">100</span> grams</th>
`;
  adjustedThead.appendChild(headerRow);
  adjustedTable.appendChild(adjustedThead);
  adjustedTable.appendChild(adjustedTbody);

  // Update the table with the initial values
  updateAdjustedTable(amountSlider.value);

  // Add the slider and table to the page
  sliderContainer.appendChild(amountSlider);
  sliderContainer.appendChild(amountValue);
  sliderContainer.appendChild(document.createTextNode(" grams"));
  newDiv.appendChild(sliderContainer);
  newDiv.appendChild(adjustedTable);

  // Update the amount value and the table when the slider changes
  amountSlider.addEventListener("input", () => {
    amountValue.textContent = amountSlider.value;
    updateAdjustedTable(amountSlider.value);
  });

  // Set the initial amount value
  amountValue.textContent = amountSlider.value;
};
