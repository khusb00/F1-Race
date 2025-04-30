
document.addEventListener("DOMContentLoaded", function () {
  
    
    const startButton = document.getElementById("start-race") 
    const winnerText = document.getElementById("winner-display") 
    const cars = document.querySelectorAll(".car")
  
    const carNames = [
      "Team Blue Lightning",
      "Team Black Panther",
      "Team Royal Flash",
      "Team Orange Blaze",
    ]
  
    let raceHappening = false 
    startButton.addEventListener("click", startRace)
  
    function startRace() {
      if (raceHappening) return 
  
      raceHappening = true 
      startButton.disabled = true 
      startButton.textContent = "Race in Progress..." 
      winnerText.textContent = "And they're off!" 
      winnerText.style.color = "gold" 
  
      cars.forEach(function (car) {
        gsap.set(car, { left: 50 }) 
      })
  
      const winner = Math.floor(Math.random() * cars.length)
  
      const finishLine = window.innerWidth - 150
  
      const raceTimeline = gsap.timeline({
        onComplete: function () {
          
          raceHappening = false 
          startButton.disabled = false 
          startButton.textContent = "Start New Race" 
          winnerText.textContent = carNames[winner] + " wins the race!" 
          winnerText.style.color = "lightgreen" 
        },
      })
  
      
      cars.forEach(function (car, index) {
        let time = 3 + Math.random() * 2 // 3 to 5 seconds
        if (index === winner) time = 3 // Winner car is fastest
  
        raceTimeline.to(
          car,
          {
            left: finishLine, 
            duration: time,
            ease: "power1.inOut", 
            onStart: function () {
              gsap.to(car, {
                y: "+=3", 
                duration: 0.1,
                repeat: 8, 
                yoyo: true, 
              })
            },
          },
          0
        )
      })
  
      raceTimeline.to(
        ".race-track-container", 
        {
          x: "+=5", 
          duration: 0.1,
          repeat: 5, 
          yoyo: true, 
        },
        3.5
      )
    }
  
    cars.forEach(function (car) {
      car.addEventListener("mouseenter", function () {
        if (!raceHappening) {
          gsap.to(car, { y: -5, duration: 0.3 }) // Move car a little up
        }
      })
  
      car.addEventListener("mouseleave", function () {
        if (!raceHappening) {
          gsap.to(car, { y: 0, duration: 0.3 }) // Move car back down
        }
      })
    })
  
  }) 
  