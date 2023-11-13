export class CanvasDrawer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private activeTouches: Record<string, boolean>
  
    constructor(
        width: number,
        height: number,
        private handleMouseDown: Function,
        private handleMouseUp: Function
    ) {
      this.canvas = document.createElement('canvas');
      this.canvas.width = width;
      this.canvas.height = height;
      this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;      
      this.ctx.font = '14px Arial'; // Set the font style and size
      this.ctx.textAlign = 'center'; // Center the text horizontally
      this.ctx.textBaseline = 'middle';
      this.activeTouches = {}
      document.body.appendChild(this.canvas);

      this.canvas.addEventListener('mousedown', this._handleMouseDown.bind(this));
      this.canvas.addEventListener('mouseup', this._handleMouseUp.bind(this));

      this.canvas.addEventListener('touchstart', this._handleTouchStart.bind(this));
      this.canvas.addEventListener('touchmove', this._handleTouchStart.bind(this));
      this.canvas.addEventListener('touchcancel', this._handleTouchEnd.bind(this));
      this.canvas.addEventListener('touchend', this._handleTouchEnd.bind(this));
    }

    destroy() {
        this.canvas.removeEventListener('mousedown', this._handleMouseDown.bind(this));
        this.canvas.removeEventListener('mouseup', this._handleMouseUp.bind(this));

        this.canvas.removeEventListener('touchstart', this._handleTouchStart.bind(this));
        this.canvas.removeEventListener('touchmove', this._handleTouchStart.bind(this));
        this.canvas.removeEventListener('touchcancel', this._handleTouchEnd.bind(this));
        this.canvas.removeEventListener('touchend', this._handleTouchEnd.bind(this));
    }
  
    getCanvas(): HTMLCanvasElement {
      return this.canvas;
    }
  
    getContext(): CanvasRenderingContext2D {
      return this.ctx;
    }
  
    clearScreen() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  
    drawCircle(x: number, y: number, radius: number, fillColor: string, strokeColor: string) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, Math.PI * 2);
      this.ctx.fillStyle = fillColor;
      this.ctx.fill();
      this.ctx.strokeStyle = strokeColor;
      this.ctx.stroke();
      this.ctx.closePath();
    }

    drawText(x: number, y: number, text: string, fillStyle = 'black') {
        this.ctx.fillStyle = fillStyle
        this.ctx.fillText(text, x, y); // Draw the text
    }

    drawRectangle(x: number, y: number, width: number, height: number, fillColor: string, strokeColor: string) {
        this.ctx.fillStyle = fillColor;
        this.ctx.strokeStyle = strokeColor;
        this.ctx.fillRect(x, y, width, height);
        this.ctx.strokeRect(x, y, width, height);
    }

    private _handleTouchStart(event: TouchEvent) {
        event.preventDefault()
        const touches = event.changedTouches

        for (const touch of touches) {
            this.handleMouseUp(touch.clientX, touch.clientY, touch.identifier)
        }
    }

    private _handleTouchMove(event: TouchEvent) {}

    // private _handleTouchCancel(event: TouchEvent) {}

    private _handleTouchEnd(event: TouchEvent) {
        event.preventDefault(); // Prevents scrolling and the like
        const touches = event.changedTouches

        for (const touch of touches) {
            this.handleMouseDown(touch.clientX, touch.clientY, touch.identifier)
        }
    }

    private _handleMouseUp(event: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        this.handleMouseDown(x, y);
    }

    private _handleMouseDown(event: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        this.handleMouseUp(x, y);
    }
}
