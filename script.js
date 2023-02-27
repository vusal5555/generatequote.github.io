// https://jacintodesign.github.io/quotes-api/data/quotes.json

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQbtn = document.getElementById('new-Quote');
const loader = document.getElementById('loader');

let data = [];

const showLoadingspinner = function () {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const removeLoadingspinner = function () {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

const newQuote = function () {
  showLoadingspinner();
  const quote = data[Math.floor(Math.random() * data.length)];

  if (!quote.author) {
    quoteAuthor.textContent = 'Unknown';
  } else {
    quoteAuthor.textContent = quote.author;
  }

  if (quoteText.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  quoteText.textContent = quote.text;
  removeLoadingspinner();
};

const getQuote = async function () {
  try {
    showLoadingspinner();
    const res = await fetch(
      `https://jacintodesign.github.io/quotes-api/data/quotes.json`
    );

    data = await res.json();

    newQuote();
  } catch (err) {
    console.log(err);
  }
};

const tweet = function () {
  const tweet = `https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author}`;
  window.open(tweet, '_blank');
};

getQuote();

newQbtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweet);