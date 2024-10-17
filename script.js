const BASE_URL = "https://v6.exchangerate-api.com/v6/53dc0a4496e89d3b63440d9b/latest/";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

//for options
for (let select of dropdowns) {
    for (let currCode in countryList) {
        //so first we will create a variable called newOption and changing it's text and value(these are two predefined properties) to it's corresponding currCode
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected"; //selected bcz it will showed us in the screen
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption); //now adding it 
    }

    //for changing the flag with the changing in options
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

//upadatinf exchange rate
const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value; //the number
    //this if() is for those who will enter amount less than 1 and will not enter anything
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    //fetching the data from our API
    const URL = `${BASE_URL}${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.conversion_rates[toCurr.value];
    if (rate) {
        let finalAmount = (amtVal * rate).toFixed(2);
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    } 
    else {
        msg.innerText = "Exchange rate not found.";
    }
};

//function for updating the flag
const updateFlag = (element) => {
    let currCode = element.value; //getting the value of currency code
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc; //changing the flag
};

//adding events
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});
