const btns = Array.from(document.querySelectorAll("button"));
const leftTime = document.querySelector(".display__time-left");
const finTime = document.querySelector(".display__end-time");
const myform = document.querySelector("#custom");
let mainTimer;

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

function secondsToHMS(seconds) {
  const HMS = {
    hour: Math.floor(seconds / 3600),
    minute: Math.floor((seconds % 3600) / 60),
    second: seconds % 60,
  };
  return HMS;
}

function changeTimer(seconds) {
  let leftSeconds = seconds;
  mainTimer = setInterval(() => {
    const HMSTime = secondsToHMS(leftSeconds);
    leftTime.textContent = `
    ${HMSTime.hour == 0 ? "" : makeItTwoSpace(HMSTime.hour)}${
      HMSTime.hour == 0 ? "" : ":"
    }${makeItTwoSpace(HMSTime.minute)}:${makeItTwoSpace(HMSTime.second)}`;
    leftSeconds--;
    if (leftSeconds < 0) clearInterval(mainTimer);
  }, 1000);
}
setCurTime();

btns.forEach((button) => {
  button.addEventListener("click", () => {
    clearInterval(mainTimer);
    const secondsToAdd = button.dataset.time;
    changeLeftTime(secondsToAdd);
    changeTimer(secondsToAdd);
  });
});

myform.addEventListener("submit", (e) => {
  e.preventDefault();
  clearInterval(mainTimer);
  const minToAdd = parseFloat(myform.querySelector("input").value);
  changeLeftTime(minToAdd * 60);
  changeTimer(minToAdd * 60);
});
