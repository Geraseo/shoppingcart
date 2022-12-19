//ivedimo laukai
const enterID = document.getElementById("enterID");
const enterName = document.getElementById("enterName");
const enterQuantity = document.getElementById("enterQuantity");

// ivedimo laukas, prekes ieskojimui
const findID = document.getElementById("findID");

//vieta resultatu spausdinimui
const placeForResult = document.getElementById("findData");

//gaunu mygtukus
const insertButton = document.getElementById("insert");
const removeButton = document.getElementById("remove");
const findButton = document.getElementById("find");

//************** 1 ********************/
// create
const insertData = (e) => {
  e.preventDefault();

  //padaryti validacijas, kad formos uzpildymui
  //   if (enterID.value.length < 3) {
  //     alert("Product code minimum 3 characters");
  //     return;
  //   }
  //   if (enterName.value.length < 1) {
  //     alert("Name min 1 characters");
  //     return;
  //   }
  //   if (enterQuantity.value.length < 1) {
  //     alert("quantity minimum 1");
  //     return;
  //   }

  //1.patikrinti ar yra prekiu krepselis, jei ne tai sukurti tuscia masyva
  const krepselis = JSON.parse(localStorage.getItem("cart")) || [];

  //1.2
  let codes = [];
  for (let i = 0; i < krepselis.length; i++) {
    codes.push(krepselis[i].ID);
  }
  if (codes.includes(enterID.value)) {
    alert("Preke jau yra");
  } else {
    //   2.i krepseli idedu nauja preke
    krepselis.push({
      ID: enterID.value,
      name: enterName.value,
      quant: enterQuantity.value,
    });
  }

  //   3.idedu i local storage
  localStorage.setItem("cart", JSON.stringify(krepselis));

  //   4. tikrinu
  //   console.log(JSON.parse(localStorage.getItem("cart")));

  /*   ivalyti input lauka */
  enterID.value = "";
  enterName.value = "";
  enterQuantity.value = "";
};
//******************* 2 *********************/
// duomenu gavimas
const getDataFromLocalStorage = (e) => {
  e.preventDefault();
  if (findID.value.length < 3) {
    alert("Product id minimum 3 characters");
    return;
  }

  //1. gauti prekiu masyva
  const productList = JSON.parse(localStorage.getItem("cart"));

  //   console.log(productList);
  //   console.log("getDataFromLocalStorage");
  //   console.log(findID.value);

  productList.map((item) => {
    // console.log(item);
    if (item.ID == findID.value) {
      //1.sukurti row elementa
      let row = document.createElement("tr");

      //2. sukurti name elementa td
      let tdName = document.createElement("td");
      tdName.textContent = item.name;
      tdName.className = "table-secondary";
      row.appendChild(tdName);

      //   3. sukurti id elementa
      let tdId = document.createElement("td");
      tdId.textContent = item.ID;
      row.appendChild(tdId);

      // 4. sukurti quantity elementa
      let tdQuant = document.createElement("td");
      tdQuant.textContent = item.quant;

      row.appendChild(tdQuant);

      //5. appendinti row
      placeForResult.appendChild(row);
    }
  });
  findID.value = "";
};

//******************* 3 *********************/
// delete
const deleteDataFromLocalStorage = (e) => {
  e.preventDefault();
  if (enterID.value.length < 3) {
    alert("Product code minimum 3 characters");
    return;
  }
  //   1. gauti prekiu masyva is LS
  let retrievedData = JSON.parse(localStorage.getItem("cart"));
  //   console.log(retrievedData);

  //   2.randam index ieskomos prekes su filter (galima ir kitais)
  // 3.salinam, trinam rasta Elemenmenta tuo indeksui
  const naujasMasyvas = retrievedData.filter(
    (item) => item.ID !== enterID.value
  );

  //4. irasyti nauja info i local storage
  localStorage.setItem("cart", JSON.stringify(naujasMasyvas));

  // removeparentnode
  //...
  enterID.value = "";
};

//funkcijos iskvietimas
insertButton.addEventListener("click", insertData);
findButton.addEventListener("click", getDataFromLocalStorage);
removeButton.addEventListener("click", deleteDataFromLocalStorage);
