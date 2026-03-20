import { Controller } from "@hotwired/stimulus"

const CARD_WIDTH = 120
const GAP = 24
const STEP = CARD_WIDTH + GAP

export default class extends Controller {
  static targets = ["card", "message"]

  connect() {
    this.positions = [0, 1, 2]
    this.queenIndex = 0
    this.locked = true
    this.start()
  }

  start() {
    this.locked = true
    this.queenIndex = Math.floor(Math.random() * 3)

    this.cardTargets.forEach((card, i) => {
      card.classList.remove("flipped", "correct", "wrong")
      card.querySelector(".card-front").textContent = i === this.queenIndex ? "\u2655" : "\u2663"
    })

    this.positions = [0, 1, 2]
    this.applyPositions(false)

    this.messageTarget.textContent = "Watch the queen\u2026"
    this.flipAll(true)

    setTimeout(() => {
      this.flipAll(false)
      setTimeout(() => this.doShuffles(0), 400)
    }, 1800)
  }

  doShuffles(round) {
    const totalRounds = 4 + Math.floor(Math.random() * 3)
    if (round >= totalRounds) {
      this.locked = false
      this.messageTarget.textContent = "Where is the queen?"
      return
    }

    const a = Math.floor(Math.random() * 3)
    let b = (a + 1 + Math.floor(Math.random() * 2)) % 3;

    [this.positions[a], this.positions[b]] = [this.positions[b], this.positions[a]]
    this.applyPositions(true)

    setTimeout(() => this.doShuffles(round + 1), 350)
  }

  applyPositions(animate) {
    this.cardTargets.forEach((card, i) => {
      card.style.transition = animate ? "transform 0.3s ease-in-out" : "none"
      card.style.transform = `translateX(${(this.positions[i] - i) * STEP}px)`
    })
  }

  flipAll(show) {
    this.cardTargets.forEach(card => {
      card.classList.toggle("flipped", show)
    })
  }

  pick(event) {
    if (this.locked) return
    this.locked = true

    const picked = this.cardTargets.indexOf(event.currentTarget)

    this.flipAll(true)
    this.cardTargets.forEach((card, i) => {
      if (i === picked) {
        card.classList.add(i === this.queenIndex ? "correct" : "wrong")
      }
    })

    this.messageTarget.textContent = picked === this.queenIndex
      ? "You found her!"
      : "Not this time\u2026"

    setTimeout(() => this.start(), 2500)
  }
}
