const apiUrl = "https://open.er-api.com/v6/latest";
const apiKey = "f0876aa710d339af099cae5e3981e276";
let selectedCurrencies = {
    from: "RUB",
    to: "USD"
};

const checkOnlineStatus = () => {
    return navigator.onLine;
};

const fetchRates = async (baseCurrency) => {
    if (!checkOnlineStatus()) {
        showOfflineNotification();
        const cachedData = localStorage.getItem(`rates_${baseCurrency}`);
        const currentTime = new Date().getTime();
        if (cachedData && currentTime - JSON.parse(cachedData).timestamp < 3600000) {
            return JSON.parse(cachedData).data;
        } else {
            return null;
        }
    }
    try {
        const response = await fetch(`${apiUrl}/${baseCurrency}?apikey=${apiKey}`);
        if (!response.ok) throw new Error("Failed to fetch exchange rates");
        const data = await response.json();
        localStorage.setItem(
            `rates_${baseCurrency}`,
            JSON.stringify({ data: data, timestamp: new Date().getTime() })
        );
        return data;
    } catch (error) {
        console.error("Error fetching rates:", error);
        return null;
    }
};

const showOfflineNotification = () => {
    const notification = document.createElement("div");
    notification.classList.add("offline-notification");
    notification.textContent = "The site has gone offline.";
    document.body.appendChild(notification);
    notification.style.visibility = 'visible';
    notification.style.opacity = 1;

    setTimeout(() => {
        notification.remove();
    }, 5000);
};

const updateExchangeRateDisplay = async () => {
    const { from, to } = selectedCurrencies;
    const data = await fetchRates(from);
    if (data && data.rates) {
        const exchangeRate = data.rates[to];
        document.querySelector(".rate").textContent = `1 ${from} = ${exchangeRate.toFixed(4)} ${to}`;
        document.querySelector(".rate2").textContent = `1 ${to} = ${(1 / exchangeRate).toFixed(4)} ${from}`;
        updateAmounts("amount-one", "amount-two", exchangeRate);
    }
};

const updateAmounts = (fromInputId, toInputId, rate) => {
    const amountFrom = parseFloat(document.getElementById(fromInputId).value) || 0;
    const convertedAmount = (amountFrom * rate).toFixed(2);
    document.getElementById(toInputId).value = convertedAmount > 0 ? convertedAmount : "";
};

// Устанавливаем значение 5000 в левое поле на старте
const setInitialAmount = () => {
    document.getElementById("amount-one").value = 5000;  // Устанавливаем 5000 в левое поле
};

const addEventListeners = () => {
    document.querySelectorAll(".currency1 button").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".currency1 button").forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
            selectedCurrencies.from = button.textContent;
            updateExchangeRateDisplay();
        });
    });
    document.querySelectorAll(".currency2 button").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".currency2 button").forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
            selectedCurrencies.to = button.textContent;
            updateExchangeRateDisplay();
        });
    });
    document.getElementById("amount-one").addEventListener("input", () => {
        const rate = parseFloat(document.querySelector(".rate").textContent.split("=")[1]) || 1;
        updateAmounts("amount-one", "amount-two", rate);
    });
    document.getElementById("amount-two").addEventListener("input", () => {
        const rate = parseFloat(document.querySelector(".rate2").textContent.split("=")[1]) || 1;
        updateAmounts("amount-two", "amount-one", rate);
    });

    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.menu');
    burger.addEventListener('click', () => menu.classList.toggle('active'));
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !burger.contains(e.target)) menu.classList.remove('active');
    });
};

const init = () => {
    document.querySelector(".currency1 button.right-rub").classList.add("selected");
    document.querySelector(".currency2 button.left-usd").classList.add("selected");
    setInitialAmount();  
    updateExchangeRateDisplay();
    addEventListeners();
};
init();