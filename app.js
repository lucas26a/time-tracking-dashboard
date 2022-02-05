const contentGroup = document.querySelectorAll(".content")
const buttonGroup = document.querySelectorAll(".btn")
let cardInfo = []
let filter = "weekly"


const getData = () => {
  fetch("./data.json")
  .then(res => {
    return res.json()
  })
  .then(data => {
    cardInfo = data
    doSomething()
  })
  .catch(err => {
    console.log(err)
  })
}
getData()

buttonGroup.forEach(btn => {
  btn.addEventListener("click", (e) => {
    filter = e.target.innerText
    doSomething()
    buttonGroup.forEach(btn => {
      if(btn === e.target) {
        btn.classList.add("selected")
      }
      else {
        btn.classList.remove("selected")
      }
    })
  })
})
const doSomething = () => {
  let content = []
  switch(filter) {

    case "daily": {
      content = cardInfo.map(card => (
        {
          title: card.title,
          period: "Day",
          current: card.timeframes.daily.current, 
          previous: card.timeframes.daily.previous
        }
      ))
      break;
    }
    case "weekly": {
      content = cardInfo.map(card => (
        {
          title: card.title,
          period: "Week", 
          current: card.timeframes.weekly.current, 
          previous: card.timeframes.weekly.previous
        }
      ))
      break;
    }
    case "monthly": {
      content = cardInfo.map(card => (
        {
          title: card.title, 
          period: "Month",
          current: card.timeframes.monthly.current, 
          previous: card.timeframes.monthly.previous
        }
      ))
      break;
    }
  }
  contentGroup.forEach((card, index) => (
    card.innerHTML = `
      <div class="content__block">
        <div class="title-block">
          <p class="title">${content[index].title}</p>
          <p class="icon" style="cursor: pointer;"> <img src="./images/icon-ellipsis.svg" /> </p>
        </div>
        <div class="time-block">
          <p class="curr-time">${content[index].current}hrs</p>
          <p class="prev-time">Last ${content[index].period} - ${content[index].previous}hrs</p>
        </div>
      </div>
    `
  ))
}