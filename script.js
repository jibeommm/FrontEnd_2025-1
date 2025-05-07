let debounceTimer;
let selectedRegion = 'All';

document.getElementById('input').addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(search, 300);
});

async function search() {
  const input = document.getElementById('input').value.trim();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';

  let res;

  try {
    if (input === '') {
      res = await fetch('https://restcountries.com/v3.1/all');
    } else {
      res = await fetch(`https://restcountries.com/v3.1/name/${input}`);
    }
    
    let data = await res.json();

    if (selectedRegion !== 'All') {
      data = data.filter(country => country.region === selectedRegion);
    }

    data.forEach(country => {
      const common = country.name.common;
      const flag = country.flags.png;
      const capital = country.capital;
      const population = country.population.toLocaleString();
      const timezones = country.timezones.join(', ');
      const languages = country.languages
        ? Object.values(country.languages).join(', ')
        : '정보 없음';
      const currencies = country.currencies
        ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ')
        : '정보 없음';

      resultDiv.innerHTML += `
        <button class="result_card">
          <div class="result_item">
            <img src="${flag}">
            <p>${common}</p>
          </div>
          <div class="result_item_detail">
            <p><strong>수도:</strong> ${capital}</p>
            <p><strong>인구:</strong> ${population}명</p>
            <p><strong>언어:</strong> ${languages}</p>
            <p><strong>통화:</strong> ${currencies}</p>
            <p><strong>시간대:</strong> ${timezones}</p>
          </div>
        </button>
      `;
    });
  } catch (error) {
    resultDiv.textContent = '찾을 수 없습니다.';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const resultDiv = document.getElementById('result');

  resultDiv.addEventListener('click', function (e) {
    const card = e.target.closest('.result_card');
    if (card) {
      const detail = card.querySelector('.result_item_detail');
      if (detail.style.display === 'none') {
        detail.style.display = 'block';
      } else {
        detail.style.display = 'none';
      }
    }
  });

  document.querySelectorAll('.region-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const region = btn.dataset.region;
      if (selectedRegion === region) {
        selectedRegion = 'All';
        document.querySelectorAll('.region-btn').forEach(b => b.classList.remove('selected'));
      } else {
        selectedRegion = region;
        document.querySelectorAll('.region-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      }
      search();
    });
  });
  search();
});