// /script.js
async function search() {
    const input = document.getElementById('input').value.trim();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
  
    try {
        const RestAPI = await fetch(`https://restcountries.com/v3.1/name/${input}`);
        const data = await RestAPI.json();
        const country = data[0];
        const capital = country.capital;
        const flag = country.flags.png;
        resultDiv.innerHTML = `
            <h2>나라 : ${input}</h2>
            <p>수도 : ${capital}</p>
            <img src="${flag}">
        `;
    } catch (error) {
      resultDiv.textContent = '...';
    }
}
  