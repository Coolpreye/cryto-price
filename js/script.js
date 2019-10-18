const searchForm = document.querySelector('#search-form'),
        message = document.querySelector('.message'),
        priceDiv = document.querySelector('.price');

const displayBook = e => {
    e.preventDefault();
    removePrice();
    books();
}

books = () => {
    let currency = document.querySelector('#title').value;
    if(currency === '') {
        message.textContent = `Please put in a book title or topic`;
        message.style.display = 'block';
        setTimeout(() => {
            message.style.display = 'none';
        }, 5000);
    } else {
        booksApi()
            .then(res => {
                const currencies = res.res;
                displayPrice(currencies);
            })
    }
}

removePrice = () => {
    priceDiv.innerHTML = '';
}

displayPrice = currencies => {
    let currencyName = document.querySelector('#title').value;
    currencies.forEach(currency => {
        if(currencyName.toLowerCase() === currency.id) {
            const p = document.createElement('p');
            p.classList.add('blue-grey-text', 'text-lighten-3');
            p.textContent = `${currency.id} - $${currency.price_usd}`;
            priceDiv.appendChild(p);
        }
    })
}

booksApi = async () => {
    const url = await fetch('https://api.coinmarketcap.com/v1/ticker/');
    const res = await url.json();
    return {
        res
    }
}





searchForm.addEventListener('submit', displayBook);