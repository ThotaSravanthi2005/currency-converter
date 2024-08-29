document.getElementById('convertBtn').addEventListener('click', convertCurrency);

async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (amount === '') {
        alert('Please enter an amount.');
        return;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        const rate = data.rates[toCurrency];

        if (!rate) {
            alert('Conversion rate not available.');
            return;
        }

        const convertedAmount = (amount * rate).toFixed(2);

        document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        alert('Error fetching conversion rate. Please try again later.');
        console.error(error);
    }
}
