const secondHand = document.getElementById('second');
const minuteHand = document.getElementById('minute');
const hourHand = document.getElementById('hour');
const dateDisplay = document.getElementById('date-display');
const monthDisplay = document.getElementById('month-display');

const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

let currentSecondDeg = 0;
let currentMinuteDeg = 0;
let currentHourDeg = 0;
let initialized = false;
let lastSecond = -1;

function updateClock() {
  const now = new Date();
  const s = now.getSeconds();
  
  
  if (s !== lastSecond) {
    const m = now.getMinutes();
    const h = now.getHours();

    dateDisplay.innerText = now.getDate();
    monthDisplay.innerText = monthNames[now.getMonth()];

    if (!initialized) {
      currentSecondDeg = s * 6;
      currentMinuteDeg = (m * 6) + (s * 0.1);
      currentHourDeg = ((h % 12) * 30) + (m * 0.5);
      initialized = true;
    } else {
      let secDiff = s - lastSecond;
      
      if (secDiff < 0) secDiff += 60; 
      
      if (secDiff > 0) {
        currentSecondDeg += secDiff * 6;
        currentMinuteDeg += secDiff * 0.1;
        currentHourDeg += secDiff * (0.5 / 60);
      }
    }
    
   
    lastSecond = s;

   
    secondHand.style.transform = `translateX(-50%) rotate(${currentSecondDeg}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${currentMinuteDeg}deg)`;
    hourHand.style.transform = `translateX(-50%) rotate(${currentHourDeg}deg)`;
  }
}

updateClock();


setInterval(updateClock, 100);