const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "input.txt"); // твой исходный txt
const outputPath = path.join(__dirname, "output.json");

const START_NUMBER = 3001; // 👈 начальный номер

// читаем файл
const text = fs.readFileSync(inputPath, "utf-8");

// функция разбивки строки на слова и пунктуацию
function tokenize(line) {
  const tokens = [];

  const regex = /[А-Яа-яЁёA-Za-z0-9]+(?:-[А-Яа-яЁёA-Za-z0-9]+)*|[.,!?;:–—-]/g;

  const matches = line.match(regex) || [];

  for (const match of matches) {
    const isWord = /[А-Яа-яЁёA-Za-z0-9]/.test(match);
    tokens.push({
      word: match,
      type: isWord ? "word" : "punctuation"
    });
  }

  return tokens;
}

// основной парсинг
const result = text
  .split(/\r?\n/)
  .map(line => line.trim())
  .filter(Boolean)
  .map((line, index) => {
    return {
      id: START_NUMBER + index,
      content: tokenize(line)
    };
  });

// записываем JSON
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), "utf-8");

console.log(`✅ Готово! JSON создан. Нумерация с ${START_NUMBER}`);
