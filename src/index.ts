import {CanvasDrawer} from './CanvasDrawer'
import {Piano} from './Piano'
import {Accordion} from './Accordion'

class Main {
    private piano: Piano
    private accordion: Accordion
    private canvasDrawer: CanvasDrawer
    private destroy = false

    constructor() {
        this.piano = new Piano()
        this.accordion = new Accordion()
        this.canvasDrawer = new CanvasDrawer(
            1280,
            800,
            this.checkMouseDown,
            this.checkMouseUp
        )
    }

    destructor() {
        this.destroy = true
    }

    loop = () => {
        this.canvasDrawer.clearScreen()
        this.accordion.drawAccordion(this.canvasDrawer)
        this.piano.drawPiano(this.canvasDrawer)
        if (!this.destroy) {
            requestAnimationFrame(this.loop)
        }
    }

    checkMouseUp = (x: number, y: number, id = null) => {
        this.accordion.checkMouseUp(x, y, id)
        this.piano.checkMouseUp(x, y, id)
    }

    checkMouseDown = (x: number, y: number, id = null) => {
        this.accordion.checkMouseDown(x, y, id)
        this.piano.checkMouseDown(x, y, id)
    }
}

const main = new Main()
main.loop()
  