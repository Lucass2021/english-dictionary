const input = document.querySelector(".input");
const infoText = document.querySelector(".info-text");
const meaningContainer = document.querySelector(".meaning-container");
const titleElement = document.querySelector(".title");
const meaningElement = document.querySelector(".meaning");
const audioElement = document.querySelector("#audio");
const containerElement = document.querySelector(".container");
const loader = document.querySelector(".loader");

async function fetchAPI(word) {
  try {
    infoText.style.display = "block";
    meaningContainer.style.display = "none";
    infoText.innerHTML = `<img src="./spinner.svg" alt="Loading"/>`;

    loader.style.display = "block";

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());

    loader.style.display = "none";

    if (result.title) {
      meaningContainer.style.display = "block";
      infoText.style.display = "none";
      titleElement.innerText = word;
      meaningElement.innerText = "Not available";
      audioElement.style.display = "none";
    } else {
      infoText.style.display = "none";
      meaningContainer.style.display = "block";
      titleElement.innerText = result[0].word;
      meaningElement.innerText =
        result[0].meanings[0].definitions[0].definition;
      audioElement.style.display = "inline-flex";
      audioElement.src = result[0].phonetics[0].audio;
    }
  } catch (error) {
    infoText.innerText = `An error happened, try again later"`;
  }
}

input.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});
