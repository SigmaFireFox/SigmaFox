import { Component } from '@angular/core';

export interface Coordinates {
  x: number;
  y: number;
}

export enum LineDirection {
  Vertical_UpDown_Y,
  Horizontal_SideToSide_X,
}

export interface Line {
  startCanvas: Coordinates;
  endCanvas: Coordinates;
  startScreen?: Coordinates;
  endScreen?: Coordinates;
}

@Component({
  selector: 'assemble-ez-sketcher',
  templateUrl: './sketcher.page.html',
  styleUrls: ['./sketcher.page.scss'],
})
export class SketcherPage {
  // For set up and completion
  canvasUnitsHigh = 1000;
  canvasUnitsWide = 1000;
  isFirstClick: boolean | undefined; // First click
  isFirstLineDrawn: boolean | undefined; // Second click
  isComplete = false;

  // Actual clicks are in screen units
  firstActualX = 0;
  firstActualY = 0;

  // Actual clicks are in canvas units
  previousPlacedX = 0; // From where line is drawn
  previousPlacedY = 0; // From where line is drawn
  currentPlacedX = 0; // To where line is drawn
  currentPlacedY = 0; // To where line is drawn
  firstPlacedClickCanvasX = 0; // Need for screen resize
  firstPlacedClickCanvasY = 0; // Need for screen resize

  lines: Line[] = [];

  // Parameters for calculation
  allowOnlyRightAngles = true;
  lineDirection: LineDirection | undefined;

  onMouseDown(clickEvent: any) {
    if (this.isComplete) return;

    if (this.isFirstClick === undefined) {
      this.isFirstClick = true;
    }

    // For clicks where lines are drawn we need to record the starting point
    // BEFORE we determine the lastest end point
    if (!this.isFirstClick) this.setPreviousPlacedXYtoCurrentXY();

    // Record the end
    // Get the actual actual click in canvas units, set the line direction and then
    // set the current placed XY in canvas units
    const actualClickXYCanvasXY = this.getActualClickCanvasXY(clickEvent);
    this.setLineDirection(actualClickXYCanvasXY);
    this.setCurrentPlacedCanvasXY(actualClickXYCanvasXY);

    if (this.isFirstClick) {
      // Record data for use by the end point button
      this.setInitalClickActualAndPlacedXY(clickEvent);
      // For first time clicks we set the start point AFTER we can determine the end point
      // So that they are the same and a dot is drawn
      this.setPreviousPlacedXYtoCurrentXY();
    }

    // Now we draw the line - once everything is done to we set the isFirstClick to False
    this.drawLine();
    this.isFirstClick = false;
  }

  onLastClick() {
    this.setPreviousPlacedXYtoCurrentXY();
    const actualClickXYCanvasXY = this.getActualClickCanvasXY({
      x: this.firstPlacedClickCanvasX,
      y: this.firstPlacedClickCanvasY,
    });
    this.setLineDirection(actualClickXYCanvasXY);
    this.setCurrentPlacedCanvasXY(actualClickXYCanvasXY);

    if (this.allowOnlyRightAngles) {
      if (this.lineDirection) {
        this.currentPlacedX = this.firstPlacedClickCanvasX;
        this.currentPlacedY = this.previousPlacedY;
      } else {
        this.currentPlacedX = this.previousPlacedX;
        this.currentPlacedY = this.firstPlacedClickCanvasY;
      }
    } else {
      this.currentPlacedX = this.firstPlacedClickCanvasX;
      this.currentPlacedY = this.firstPlacedClickCanvasY;
    }

    this.drawLine();
    this.isComplete = true;
    this.reDrawLinesOnCompletion();
  }

  onResetClicked() {
    this.clearCanvas();

    this.isFirstLineDrawn = undefined;
    this.isFirstClick = undefined;
    this.isComplete = false;
    this.lines = [];
  }

  onBoxChecked() {
    this.allowOnlyRightAngles = !this.allowOnlyRightAngles;
  }

  private setLineDirection(actualClickCanvasXY: Coordinates) {
    // If first click no line is drawn so we set the line direction to undefined and return
    // Also if we allow non right angle - the line direction is also undefined as we don'r use ir
    if (this.isFirstClick || !this.allowOnlyRightAngles) {
      this.lineDirection = undefined;
      return;
    }

    // If this is not the first click but the first line has not yet been drawn then this must be
    // first line being drawn IE thefore the second click - there fore we need to calcualte and
    // estblish the line direction using the the x and y Deltas
    if (!this.isFirstLineDrawn && this.isFirstClick === false) {
      const xDelta = Math.abs(this.previousPlacedX - actualClickCanvasXY.x);
      const yDelta = Math.abs(this.previousPlacedY - actualClickCanvasXY.y);
      // If yDelta (top to bottom) is greater than xDelta (left to right)
      // Then the line is Vertical_UpDown_Y

      this.lineDirection =
        yDelta > xDelta
          ? LineDirection.Vertical_UpDown_Y
          : LineDirection.Horizontal_SideToSide_X;
      return;
    }

    // Else in all other cases
    // Second of greater drawn to right angles
    // Just toggle the Line direction
    this.lineDirection =
      this.lineDirection === LineDirection.Horizontal_SideToSide_X
        ? LineDirection.Vertical_UpDown_Y
        : LineDirection.Horizontal_SideToSide_X;
  }

  private getActualClickCanvasXY(clickedXY: Coordinates): Coordinates {
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');

    // Calculate the X needed --> Focus on wifth and X
    const actualClickPxFromCanvasLeft = clickedXY.x;
    const actualClickPercOfCanvasHeightFromCanvasLeft =
      actualClickPxFromCanvasLeft / canvas.offsetWidth;
    const actualClickXInCanvasUnits =
      actualClickPercOfCanvasHeightFromCanvasLeft * this.canvasUnitsWide;

    // Calculate the Y needed --> Focus on height and Y
    const actualClickPxFromCanvasTop = clickedXY.y - 40; // Adjust for Navbar
    const actualClickPercOfCanvasHeightFromCanvasTop =
      actualClickPxFromCanvasTop / canvas.offsetHeight;
    const actualClickYInCanvasUnits =
      actualClickPercOfCanvasHeightFromCanvasTop * this.canvasUnitsHigh;

    const actualClickCanvasXY = {
      x: actualClickXInCanvasUnits,
      y: actualClickYInCanvasUnits,
    };
    return actualClickCanvasXY;
  }

  private setCurrentPlacedCanvasXY(actualClickCanvasXY: Coordinates) {
    // If it the first click or we allow non-right angle - we can the actual XY
    if (!this.allowOnlyRightAngles || this.isFirstClick) {
      this.currentPlacedX = actualClickCanvasXY.x;
      this.currentPlacedY = actualClickCanvasXY.y;
      return;
    }

    if (!this.lineDirection) {
      // If line is vertical then the xDelta (left to right) of the line needs to
      // be the same - therefore currentPlacedX = currentPlacedX, but the placedY needs
      // to be current actual Y
      this.currentPlacedX = this.previousPlacedX;
      this.currentPlacedY = actualClickCanvasXY.y;
    } else {
      // Inverselt if line is horizontal then the yDelta (top to bottom) of the line needs to
      // be the same - therefor currentPlacedY = currentPlacedY, but the placedX needs
      // to be actualX
      this.currentPlacedX = actualClickCanvasXY.x;
      this.currentPlacedY = this.previousPlacedY;
    }
  }

  private setPreviousPlacedXYtoCurrentXY() {
    this.previousPlacedX = this.currentPlacedX;
    this.previousPlacedY = this.currentPlacedY;
  }

  private drawLine() {
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');

    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;
    // set line stroke and line width
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.previousPlacedX, this.previousPlacedY);
    ctx.lineTo(this.currentPlacedX, this.currentPlacedY);
    ctx.stroke();

    if (this.isComplete) return;

    if (!this.isFirstClick) {
      this.isFirstLineDrawn = true;
      const startCanvas = { x: this.previousPlacedX, y: this.previousPlacedY };
      const endCanvas = { x: this.currentPlacedX, y: this.currentPlacedY };

      this.lines.push({
        startCanvas: startCanvas,
        endCanvas: endCanvas,
        startScreen: this.convertCanvasUnitsToScreenUnits(startCanvas),
        endScreen: this.convertCanvasUnitsToScreenUnits(endCanvas),
      });
    }
  }

  private setInitalClickActualAndPlacedXY(clickedXY: Coordinates) {
    this.firstPlacedClickCanvasX = this.currentPlacedX;
    this.firstPlacedClickCanvasY = this.currentPlacedY;
    this.firstActualX = clickedXY.x;
    this.firstActualY = clickedXY.y;
  }

  private reDrawLinesOnCompletion() {
    if (!this.isComplete) return;

    this.clearCanvas();
    this.lines[0].startCanvas = this.lines[this.lines.length - 1].endCanvas;
    this.lines.forEach((line) => {
      this.previousPlacedX = line.startCanvas.x;
      this.previousPlacedY = line.startCanvas.y;
      this.currentPlacedX = line.endCanvas.x;
      this.currentPlacedY = line.endCanvas.y;
      this.drawLine();
      line.startScreen = this.convertCanvasUnitsToScreenUnits(line.startCanvas);
      line.endScreen = this.convertCanvasUnitsToScreenUnits(line.endCanvas);
    });
  }

  private convertCanvasUnitsToScreenUnits(
    canvasUnits: Coordinates
  ): Coordinates {
    const screenUnits = {
      x: (canvasUnits.x / this.canvasUnitsWide) * (window.innerWidth - 500) - 5,
      y:
        (canvasUnits.y / this.canvasUnitsHigh) * (window.innerHeight - 40) +
        40 -
        5,
    };
    return screenUnits;
  }

  private clearCanvas() {
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
