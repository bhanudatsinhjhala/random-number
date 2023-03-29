const listNumberEl = document.querySelector(".list-number");
const randomNumberEl = document.querySelector(".random-number");
const minValEl = document.getElementsByName("minVal");
const maxValEl = document.getElementsByName("maxVal");
class minMax {
  constructor(minVal = 0, maxVal = 0, visitList = new Set()) {
    this.minVal = minVal;
    this.maxVal = maxVal;
    this.visitList = visitList;
    this.getRandomNumber = this.getRandomNumber.bind(this);
    this.setMinMax = this.setMinMax.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }
  setMinMax(object) {
    this.minVal = object.minVal;
    this.maxVal = object.maxVal;
  }
  resetGame(value) {
    if (!value) (this.minVal = 0), (this.maxVal = 0);
    return this.visitList.clear();
  }
  getRandomNumber() {
    const number =
      this.minVal + Math.round(Math.random() * (this.maxVal - this.minVal));
    if (this.visitList.size === this.maxVal - this.minVal + 1)
      return "All numbers are explored!!!!";
    if (!this.visitList.has(number)) {
      this.visitList.add(number);
      return number;
    }
    return this.getRandomNumber();
  }
}

const gameMinMax = new minMax();

function validateForm(e) {
  const inValidValue = ["+", "-", "e"];
  if (inValidValue.includes(e.key))
    return alert("Please enter only numbers only");
}

function handleSubmit(e) {
  e.preventDefault();
  const formEl = e.target;
  const formData = getFormData(e.target);
  if (formData.minVal === formData.maxVal)
    return alert("You can not enter min and max value same");
  else if (formData.minVal > formData.maxVal)
    return alert("You can not enter min value greater than max value same");
  gameMinMax.setMinMax(formData);
  randomNumberEl.innerText = "";
  listNumberEl.innerText = "";
  const actionButtonEl = document.querySelectorAll(".action-button");
  [...actionButtonEl].forEach((button) => button.removeAttribute("disabled"));
}

function getFormData(form) {
  const formData = new FormData(form);
  let result = {};
  for (let data of formData.entries()) {
    result[data[0]] = +data[1];
  }
  return result;
}

function generateNumber() {
  const result = gameMinMax.getRandomNumber();
  randomNumberEl.innerText = result;
  if (typeof result == "number")
    listNumberEl.innerText = JSON.stringify([...gameMinMax.visitList]);
}

function resetGame(value) {
  randomNumberEl.innerText = "";
  listNumberEl.innerText = "";
  if (!value) {
    randomNumberEl.innerText = "Completed Reset Successfully!";
    minValEl[0].value = "";
    maxValEl[0].value = "";
  }
  return gameMinMax.resetGame(value);
}
