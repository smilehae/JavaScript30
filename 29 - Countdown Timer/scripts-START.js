const btns = Array.from(document.querySelectorAll("button"));
const leftTime = document.querySelector(".display__time-left");
const finTime = document.querySelector(".display__end-time");
const myform = document.querySelector("#custom");
let timer = 0;

function makeItTwoSpace(numberString) {
  if (Number(numberString) < 10) {
    return (numberString = "0" + numberString);
  } else {
    return numberString;
  }
}

function setCurTime() {
  const today = new Date();
  const isPM = today.getHours() >= 12 ? true : false;
  const [hour, minute] = [
    isPM ? today.getHours() - 12 : today.getHours(),
    today.getMinutes(),
  ];

  finTime.textContent = `
  ${makeItTwoSpace(hour)}:${makeItTwoSpace(minute)} ${isPM ? "PM" : "AM"}`;
}

function getTimeLeap(curTime, secondsToAdd) {
  const curSec = curTime.hour * 3600 + curTime.minute * 60 + curTime.second;
  const totalSec = curSec + Number(secondsToAdd);

  const leapedTime = {
    hour: Math.floor(totalSec / 3600),
    minute: Math.floor((totalSec % 3600) / 60),
    second: totalSec % 60,
    isPM: curTime.isPM,
  };
  //   AM PM 기준이 바뀌는 경우 : hour이 12와 같거나 크면.
  if (curTime.isPM) {
    if (leapedTime.hour >= 12) {
      leapedTime.isPM = !leapedTime.isPM;
      leapedTime.hour -= 12;
    }
  }
  console.log(leapedTime);
  return leapedTime;
}

function changeLeftTime(secondsToAdd) {
  const today = new Date();
  const isPM = today.getHours() >= 12 ? true : false;
  const todayTime = {
    hour: isPM ? today.getHours() - 12 : today.getHours(),
    minute: today.getMinutes(),
    second: today.getSeconds(),
    isPM,
  };
  const leapedTime = getTimeLeap(todayTime, secondsToAdd);
  finTime.textContent = `${makeItTwoSpace(leapedTime.hour)}:${makeItTwoSpace(
    leapedTime.minute
  )} ${leapedTime.isPM ? "PM" : "AM"}`;
}
setCurTime();

btns.forEach((button) => {
  button.addEventListener("click", () => {
    const secondsToAdd = button.dataset.time;
    changeLeftTime(secondsToAdd);
  });
});

myform.addEventListener("submit", (e) => {
  e.preventDefault();
  const minToAdd = parseFloat(myform.querySelector("input").value);
  changeLeftTime(minToAdd * 60);
});
