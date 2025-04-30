// /script.js
async function searchCountry() {
    const input = document.getElementById('countryInput').value.trim();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
  
    if (!input) {
      resultDiv.textContent = '나라명을 입력해주세요!';
      return;
    }
  
    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${input}`);
      if (!res.ok) throw new Error('찾을 수 없음');
  
      const data = await res.json();
      const country = data[0];
  
      const flag = country.flags?.png || '';
      const capital = country.capital?.[0] || '정보 없음';
  
      resultDiv.innerHTML = `
        <h2>${country.name.common}</h2>
        <p><strong>수도:</strong> ${capital}</p>
        <img src="${flag}" alt="국기">
      `;
    } catch (error) {
      resultDiv.textContent = '국가 정보를 찾을 수 없습니다 🥲';
    }
}
  