let cur1 = document.querySelectorAll(".currency1 button");
let cur2 = document.querySelectorAll(".currency2 button");
document.querySelector(".currency1 button.right-rub").classList.add("selected");
document.querySelector(".currency2 button.left-usd").classList.add("selected");
cur1.forEach(function (button) {
    button.addEventListener("click", function () {
        cur1.forEach(function (btn) {
            btn.classList.remove("selected");
        });
        button.classList.add("selected");
        updateRate2();
    });
});
cur2.forEach(function (button) {
    button.addEventListener("click", function () {
        cur2.forEach(function (btn) {
            btn.classList.remove("selected");
        });
        button.classList.add("selected");
        updateRate();
    });
});
const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
});
document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !burger.contains(e.target)) {
        menu.classList.remove('active');
        burger.classList.remove('active');
    }
});

document.getElementById("amount-one").addEventListener("input", function () {
    document.getElementById("amount-one").addEventListener("keyup", (event) => {
        if (event.target.value.split("")[0] == "." || event.target.value.split("")[0] == "-") {
            let arr = event.target.value.split("");
            arr.shift();
            event.target.value = Number(arr.join(""));
            update(Number(event.target.value, "amount-two", ".currency2 button.selected", ".currency1 button.selected", ".rate"))
        } else {
            update("amount-one", "amount-two", ".currency2 button.selected", ".currency1 button.selected", ".rate");
        };
    })
});
document.getElementById("amount-two").addEventListener("input", function () {
    document.getElementById("amount-two").addEventListener("keyup", (event) => {
        if (event.target.value.split("")[0] == "." || event.target.value.split("")[0] == "-") {
            let arr = event.target.value.split("");
            arr.shift();
            event.target.value = Number(arr.join(""));
            update(Number(event.target.value, "amount-one", ".currency1 button.selected", ".currency2 button.selected", ".rate2"))
        } else {
            update("amount-two", "amount-one", ".currency1 button.selected", ".currency2 button.selected", ".rate2");

        };
    })
});
updateRate();
function updateRate() {
    let toCurrency = document.querySelector(".currency2 button.selected").textContent;
    let fromCurrency = document.querySelector(".currency1 button.selected").textContent;
    let apiKey = 'f0876aa710d339af099cae5e3981e276';
    let apiUrl = `https://open.er-api.com/v6/latest/${fromCurrency}?apikey=${apiKey}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let exchangeRate = data.rates[toCurrency];
            let rateElement = document.querySelector(".rate");
            let rateElement2 = document.querySelector(".rate2");
            rateElement2.textContent = `1 ${toCurrency} = ${exchangeRate} ${fromCurrency}`;
            rateElement.textContent = `1 ${fromCurrency} = ${exchangeRate} ${toCurrency}`;
            update("amount-one", "amount-two", ".currency1 button.selected", ".currency2 button.selected", ".rate2");
            update("amount-one", "amount-two", ".currency2 button.selected", ".currency1 button.selected", ".rate");
        })
        .catch(error => console.error("Error", error));
}
function update(fromInputId, toInputId, fromCurrencySelector, toCurrencySelector, rateElementSelector) {
    let amountFrom = document.getElementById(fromInputId).value;
    let toCurrency = document.querySelector(fromCurrencySelector).textContent;
    let fromCurrency = document.querySelector(toCurrencySelector).textContent;
    let apiKey = 'f0876aa710d339af099cae5e3981e276';
    let apiUrl = `https://open.er-api.com/v6/latest/${fromCurrency}?apikey=${apiKey}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let exchangeRate = data.rates[toCurrency];
            let convertedAmount = (isNaN(amountFrom) ? 0 : amountFrom) * exchangeRate;
            let toInputElement = document.getElementById(toInputId);
            toInputElement.value = convertedAmount.toFixed(2); 
            if (toInputElement.value == "0.00") {
                toInputElement.value = '';
            }
            document.querySelector(rateElementSelector).textContent = `1 ${fromCurrency} = ${exchangeRate.toFixed(4)} ${toCurrency}`;
        })
        .catch(error => console.error("Error", error));
}
function updateRate2() {
    let fromCurrency = document.querySelector(".currency2 button.selected").textContent;
    let toCurrency = document.querySelector(".currency1 button.selected").textContent;
    let apiKey = 'f0876aa710d339af099cae5e3981e276';
    let apiUrl = `https://open.er-api.com/v6/latest/${fromCurrency}?apikey=${apiKey}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let exchangeRate = data.rates[toCurrency];
            let rateElement = document.querySelector(".rate");
            let rateElement2 = document.querySelector(".rate2");
            rateElement2.textContent = `1 ${toCurrency} = ${exchangeRate} ${fromCurrency}`;
            rateElement.textContent = `1 ${fromCurrency} = ${exchangeRate} ${toCurrency}`;
            update2("amount-two", "amount-one", ".currency1 button.selected", ".currency2 button.selected", ".rate");
            update2("amount-two", "amount-one", ".currency2 button.selected", ".currency1 button.selected", ".rate2");
        })
        .catch(error => console.error("Error", error));
}
function update2(fromInputId, toInputId, fromCurrencySelector, toCurrencySelector, rateElementSelector) {
    let amountFrom = document.getElementById(fromInputId).value;
    let fromCurrency = document.querySelector(fromCurrencySelector).textContent;
    let toCurrency = document.querySelector(toCurrencySelector).textContent;
    let apiKey = 'f0876aa710d339af099cae5e3981e276';
    let apiUrl = `https://open.er-api.com/v6/latest/${fromCurrency}?apikey=${apiKey}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let exchangeRate = data.rates[toCurrency];
            let convertedAmount = (isNaN(amountFrom) ? 0 : amountFrom) * exchangeRate;
            let toInputElement = document.getElementById(toInputId);
            toInputElement.value = convertedAmount.toFixed(2); 
            if (toInputElement.value == "0.00") {
                toInputElement.value = '';
            }
            document.querySelector(rateElementSelector).textContent = `1 ${fromCurrency} = ${exchangeRate.toFixed(4)} ${toCurrency}`;
        })
        .catch(error => console.error("Error", error));
}