import { AudioPlayer } from './AudioPlayer'
import {CanvasDrawer} from './CanvasDrawer'

const step = 50
const octaves = 3.4
const halfStep = step * .6
const offsetY = 400

const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
const blackKeys = ['Db', 'Eb', null, 'Gb', 'Ab', 'Bb', null]
const registeredPianoTouches: Record<string, PianoKey | null> = {}

interface PianoKey {
    x: number,
    y: number,
    width: number,
    height: number,
    value: string,
    fillColor: string
    strokeColor: string,
    type: 'white' | 'black'
}

export class Piano {
    pianoKeys: PianoKey[]
    audioPlayer: AudioPlayer

    constructor() {
        this.pianoKeys = this.initiatePiano()
        this.audioPlayer = new AudioPlayer()
    }

    drawPiano(canvasDrawer: CanvasDrawer) {
        for (const {x, y, width, height, strokeColor, fillColor} of this.pianoKeys) {
            canvasDrawer.drawRectangle(x, y, width, height, fillColor, strokeColor)
        }
    }

    checkPianoKeys(x: number, y: number) {
        const markedPianoKeys: PianoKey[] = []
        const reversedOrder = [...this.pianoKeys].reverse()
    
        for (let pianoKey of reversedOrder) {
            if (
                x >= pianoKey.x &&
                x <= pianoKey.x + pianoKey.width &&
                y >= pianoKey.y &&
                y <= pianoKey.y + pianoKey.height &&
                !this.isOverlapping(pianoKey, markedPianoKeys)
            ) {
                markedPianoKeys.push(pianoKey)
            }
        }
    
        return markedPianoKeys
    }

    checkMouseDown(x: number, y: number, id = null) {
        const pianoKeys = this.checkPianoKeys(x, y)

        for (const pianoKey of pianoKeys) {
            if (id !== null && !!registeredPianoTouches[id]) {
                (registeredPianoTouches[id] as PianoKey).fillColor = (registeredPianoTouches[id] as PianoKey).type
                this.audioPlayer.stop([(registeredPianoTouches[id] as PianoKey).value])
                registeredPianoTouches[id] = null
            } else {
                pianoKey.fillColor = pianoKey.type
                this.audioPlayer.stop([pianoKey.value])    
            }
        }
    }

    checkMouseUp(x: number, y: number, id = null) {
        const pianoKeys = this.checkPianoKeys(x, y)

        for (const pianoKey of pianoKeys) {
            if (id !== null) {
                if (!registeredPianoTouches[id]) {
                    registeredPianoTouches[id] = pianoKey
                    pianoKey.fillColor = pianoKey.type === 'black' ? 'pink' : 'lightblue'
                    this.audioPlayer.play([pianoKey.value])    
                } else if (registeredPianoTouches[id] !== pianoKey) {
                    (registeredPianoTouches[id] as PianoKey).fillColor = (registeredPianoTouches[id] as PianoKey).type
                    this.audioPlayer.stop([(registeredPianoTouches[id] as PianoKey).value])
                    registeredPianoTouches[id] = pianoKey
                    
                    pianoKey.fillColor = pianoKey.type === 'black' ? 'pink' : 'lightblue'
                    this.audioPlayer.play([pianoKey.value])
                }
            } else {
                pianoKey.fillColor = pianoKey.type === 'black' ? 'pink' : 'lightblue'
                this.audioPlayer.play([pianoKey.value])    
            }
        }
    }

    private isOverlapping(pianoKey: PianoKey, markedPianoKeys: PianoKey[]): boolean {
        for (const markedPianoKey of markedPianoKeys) {
            if (!(
                pianoKey.x + pianoKey.width < markedPianoKey.x ||
                markedPianoKey.x + markedPianoKey.width < pianoKey.x ||
                pianoKey.y + pianoKey.height < markedPianoKey.y ||
                markedPianoKey.y + markedPianoKey.height < pianoKey.y
            )) {
                return true
            }
        }
    
        return false
    }

    private initiatePiano(): PianoKey[] {
        const pianoKeys: PianoKey[] = []
    
        // White keys
        for (let i = 0; i < (7 * octaves); i++) {
            pianoKeys.push({
                x: i * step,
                y: offsetY,
                width: step,
                height: 3 * step,
                value: `${whiteKeys[i % 7]}${Math.ceil((i + 3) / 7) + 1}`,
                fillColor: 'white',
                strokeColor: 'black',
                type: 'white'
            })
        }
    
        // Black keys
        for (let i = 0; i < 7 * octaves; i++) {
            if ((i % 7) === 2 || (i % 7) === 6) continue
            pianoKeys.push({
                x: i * step + step * .7,
                y: offsetY,
                width: halfStep,
                height: 2 * step,
                value: `${blackKeys[i % 7]}${Math.ceil((i + 3) / 7) + 1}`,
                fillColor: 'black',
                strokeColor: 'black',
                type: 'black'
            })
        }
    
        return pianoKeys
    }
}