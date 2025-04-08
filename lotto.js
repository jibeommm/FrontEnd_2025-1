let winningNumbers = [];
let buyCount = 0;

function LottoNumber() {
  const numbers = new Set();
  while (numbers.size < 6) {
    const rand = Math.floor(Math.random() * 45) + 1;
    numbers.add(rand);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

function WinningNumbers() {
  const result_list = document.querySelector(".result");
  const resultNumbers = LottoNumber();
  const old_result_list = document.querySelector(".result .balls");
  if (old_result_list) old_result_list.remove();
  result_list.innerHTML += `
    <div class="balls">
      <div class="ball" id="yellow">${resultNumbers[0]}</div>
      <div class="ball" id="blue">${resultNumbers[1]}</div>
      <div class="ball" id="red">${resultNumbers[2]}</div>
      <div class="ball" id="gray">${resultNumbers[3]}</div>
      <div class="ball" id="green">${resultNumbers[4]}</div>
      <div class="ball" id="yellow">${resultNumbers[5]}</div>
    </div>
  `;
}

document.getElementById("buy_count").addEventListener("input", () => {
  const count = document.getElementById("buy_count").value;
  const totalPrice = count * 1000;
  document.getElementById("total_price").textContent = totalPrice.toLocaleString();
});

document.getElementById("buy_btn").addEventListener("click", () => {
  const countInput = document.getElementById("buy_count").value;
  buyCount = countInput;
});

document.getElementById("create_number_btn").addEventListener("click", () => {
  const resultSection = document.querySelector(".result_section");
  winningNumbers = LottoNumber();
  WinningNumbers();

  const oldList = document.querySelector(".my_result_list");
  if (oldList) oldList.remove();

  resultSection.innerHTML += `
    <div class="my_result_list">
      <p>내가 구매한 번호 :</p>
    </div>
  `;

  for (let i=0; i < buyCount; i++) {
    const my_result_list = document.querySelector(".my_result_list");
    const myNumbers = LottoNumber();

    let matched = 0;
    for (let i = 0; i < myNumbers.length; i++) {
      for (let j = 0; j < winningNumbers.length; j++) {
        if (myNumbers[i] === winningNumbers[j]) {
          matched++;
        }
      }
    }


    if(matched === 6){
      my_result_list.innerHTML += `
      <div class="balls">
        <div class="ball" id="yellow">${myNumbers[0]}</div>
        <div class="ball" id="blue">${myNumbers[1]}</div>
        <div class="ball" id="red">${myNumbers[2]}</div>
        <div class="ball" id="gray">${myNumbers[3]}</div>
        <div class="ball" id="green">${myNumbers[4]}</div>
        <div class="ball" id="yellow">${myNumbers[5]}</div>
      </div>
      <div class="my_result">결과 : 6개 일치 - 당첨</div>
    `;
    }
    else{
      my_result_list.innerHTML += `
      <div class="result">
        <div class="balls">
          <div class="ball" id="yellow">${myNumbers[0]}</div>
          <div class="ball" id="blue">${myNumbers[1]}</div>
          <div class="ball" id="red">${myNumbers[2]}</div>
          <div class="ball" id="gray">${myNumbers[3]}</div>
          <div class="ball" id="green">${myNumbers[4]}</div>
          <div class="ball" id="yellow">${myNumbers[5]}</div>
        </div>
        <div class="my_result">결과 : ${matched}개 일치</div>
      </div>
    `;
    }
  }
});
