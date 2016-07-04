const context = require('audio-context')
const Octavian = require('octavian')
const Note = Octavian.Note

function thirdAndFifth (note) {
  const baseNote = new Note(note)
  const thirdNote = baseNote.third()
  const fifthNote = baseNote.fifth()

  return [
    baseNote.frequency,
    thirdNote.frequency,
    fifthNote.frequency
  ]
}

function playThirdAndFifth (note) {
  const notes = thirdAndFifth(note)
  let time = 0

  notes.forEach((freq) => {
    const oscillator = context.createOscillator()
    const gain = context.createGain()

    oscillator.connect(gain)
    gain.connect(context.destination)

    oscillator.start(time)
    oscillator.frequency.setValueAtTime(freq, time)
    oscillator.stop(time + 5)
    time += 5
  })
}

playThirdAndFifth('A4')
