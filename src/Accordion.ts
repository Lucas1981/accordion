import {
    root,
    majorThirds,
    majorTriads,
    minorTriads,
    dominantSevenths,
    diminishedSevenths
} from './chords'
import { CanvasDrawer } from './CanvasDrawer';
import { AudioPlayer } from './AudioPlayer';

const circleRadius = 26;
const spacing = 4;
const symbols = ['', '', 'M', 'm', '7', '\xB07']
const values = [
    majorThirds,
    root,
    majorTriads,
    minorTriads,
    dominantSevenths,
    diminishedSevenths
]

interface AccordionKey {
    x: number,
   y: number,
   value: string[],
   text: string,
   radius: number,
   fillColor: string,
   strokeColor: string
}

export class Accordion {
    accordionKeys: AccordionKey[]
    registeredAccordionTouches: Record<string, AccordionKey | null>
    audioPlayer: AudioPlayer

    constructor() {
        this.accordionKeys = this.initiateAccordion()
        this.registeredAccordionTouches = {}
        this.audioPlayer = new AudioPlayer()
    }

    drawAccordion(canvasDrawer: CanvasDrawer) {
        for (const { x, y, text, radius, fillColor, strokeColor} of this.accordionKeys) {
            canvasDrawer.drawCircle(x, y, radius, fillColor, strokeColor);
            canvasDrawer.drawText(x, y, text)
        }
    }

    checkMouseUp(x: number, y: number, id = null) {
        const circle = this.checkClick(x, y);

        if (circle) {
            const isTouchRegistered = id !== null && this.registeredAccordionTouches[id];
            const isDifferentTouch = isTouchRegistered && this.registeredAccordionTouches[id] !== circle;

            if (!isTouchRegistered || isDifferentTouch) {
                if (isDifferentTouch) {
                    this.resetAccordionKeyAndStopAudio(this.registeredAccordionTouches[id] as AccordionKey);
                }

                if (id !== null) {
                    this.registeredAccordionTouches[id] = circle;
                }
                
                this.updateAccordionKeyColorAndPlay(circle, 'lightblue');
            }
        }
    }

    checkMouseDown(x: number, y: number, id = null) {
        const circle = this.checkClick(x, y);

        if (circle) {
            if (id !== null && this.registeredAccordionTouches[id]) {
                this.resetAccordionKeyAndStopAudio(this.registeredAccordionTouches[id] as AccordionKey);
                this.registeredAccordionTouches[id] = null;
            } else {
                this.resetAccordionKeyAndStopAudio(circle);
            }
        }
    }

    private resetAccordionKeyAndStopAudio(accordionKey: AccordionKey) {
        accordionKey.fillColor = 'white';
        this.audioPlayer.stop(accordionKey.value);
    }

    private updateAccordionKeyColorAndPlay(accordionKey: AccordionKey, color: string) {
        accordionKey.fillColor = color;
        this.audioPlayer.play(accordionKey.value);
    }

    private checkClick(x: number, y: number) {
        for (const circle of this.accordionKeys) {
            const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
    
            if (distance <= circle.radius) {
                return circle
            }
        }

        return null
    }

    private initiateAccordion() {
        const circles: AccordionKey[] = []
        const fillColor = 'white';
        const strokeColor = 'black';
        let xOffset = 0
    
        for (let row = 0; row < values.length; row++) {
          for (let col = 0; col < values[row].length; col++) {
            const value = values[row][col]
            const x = col * (2 * circleRadius + spacing) + circleRadius + xOffset;
            const y = row * (Math.sqrt(3) * circleRadius + spacing) + circleRadius;
            const textValue = typeof value === 'string' ?
                value.replace(/[0-9]/g, '') :
                value.map(val => val.replace(/[0-9]/g, ''))
    
            circles.push({
                x,
                y,
                value: typeof value === 'string' ? [value] : value,
                text: (typeof value === 'string' ? textValue : `${textValue[0]}${symbols[row]}`) as string,
                radius: circleRadius,
                fillColor,
                strokeColor
            })
          }
          xOffset += circleRadius + spacing;
        }
    
        return circles
    }
}