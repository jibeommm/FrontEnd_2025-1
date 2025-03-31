function LottoNumber() {
  const numbers = new Set();
  while (numbers.size < 6) {
    const rand = Math.floor(Math.random() * 45) + 1; // 1~45
    numbers.add(rand);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

const lottoNumbers = LottoNumber();
console.log(lottoNumbers);
