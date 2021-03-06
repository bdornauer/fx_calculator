// const fixerUri = 'https://data.fixer.io/api/latest?base=EUR&symbols=USD,SEK,CHF&access_key=API_KEY';
const fixerUri = "fixer.json";

document.querySelectorAll('select').forEach(element => {
    element.innerHTML = `
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="CHF">CHF</option>
        <option value="SEK">SEK</option>
        <option value="BTC">BTC</option>
    `;
});

async function convert(inputValue, inputCurrency, outputCurrency) {
    const response = await fetch(fixerUri);
    const data = await response.json();
    const rates = data['rates'];
    rates["EUR"] = 1.;
    return inputValue / rates[inputCurrency] * rates[outputCurrency];
}

function round(value, decimals) {
    return (Math.round(value * 100) / 100).toFixed(decimals);
}

document.querySelector('button').addEventListener('click', async () => {
    const inputCurrency = document.querySelector('[name="input-currency"]').value;
    const outputCurrency = document.querySelector('[name="output-currency"]').value;
    const inputValue = document.querySelector('[name="input-value"]').value;
    const outputValue = await convert(inputValue, inputCurrency, outputCurrency);
    document.querySelector('[name="output-value"]').value = round(outputValue, 2);
});


window.addEventListener("beforeinstallprompt", async function (event) {
    event.preventDefault();
    document.querySelector("article").style.display = "block"; // make it visible if browser support

    document.getElementById('acceptButton').addEventListener('click', () => {
        event.prompt();
        document.querySelector("article").style.display = "none"; // make it visible if browser support
    });

    document.getElementById('dontAcceptButton').addEventListener('click', () => {
        document.querySelector("article").style.display = "none"; // make it visible if browser support
    });
});