class Shape {
  constructor(type, alignment, character, rows, columns, outputElement) {
    this.type = type;
    this.alignment = alignment;
    this.character = character;
    this.rows = rows;
    this.columns = columns;
    this.outputElement = outputElement;
  }

  validate() {
    const correctShape = ["triangle", "square", "rectangle"];
    const alignments = ["left", "right", "center"];

    if (!correctShape.includes(this.type.toLowerCase())) {
      throw new Error("Invalid shape type.");
    }

    if (!alignments.includes(this.alignment.toLowerCase())) {
      throw new Error(
        "Invalid alignment. Valid alignments are: left, right, center."
      );
    }

    if (typeof this.character !== "string" || this.character.length !== 1) {
      throw new Error("Character must be a single character string.");
    }

    if (!Number.isInteger(this.rows) || this.rows <= 0) {
      throw new Error("Rows must be a positive integer.");
    }

    if (!Number.isInteger(this.columns) || this.columns <= 0) {
      throw new Error("Columns must be a positive integer.");
    }

    if (this.type === "triangle" && this.rows > this.columns) {
      throw new Error(
        "For triangle, rows should be less than or equal to columns."
      );
    }
    if (this.type === "square" && this.rows !== this.columns) {
      throw new Error("For Square, rows should be equal to columns.");
    }
    if (this.type === "rectangle" && (this.rows <= 1 || this.columns <= 1)) {
      throw new Error(
        "For Rectangle, rows and columns should be greater than 1."
      );
    }
  }

  printTriangle() {
    for (let i = 1; i <= this.rows; i++) {
      let line = this.character.repeat(i);
      this.printLine(line, i);
    }
  }

  printSquare() {
    for (let i = 0; i < this.rows; i++) {
      let line = this.character.repeat(this.columns);
      this.printLine(line, this.columns);
    }
  }

  printRectangle() {
    for (let i = 0; i < this.rows; i++) {
      let line = this.character.repeat(this.columns);
      this.printLine(line, this.columns);
    }
  }

  draw() {
    this.validate();
    this.outputElement.textContent = "";
    switch (this.type.toLowerCase()) {
      case "triangle":
        this.printTriangle();
        break;
      case "square":
        this.printSquare();
        break;
      case "rectangle":
        this.printRectangle();
        break;
    }
  }

  printLine(line, currentWidth) {
    switch (this.alignment.toLowerCase()) {
      case "left":
        this.outputElement.textContent += line + "\n";
        break;
      case "right":
        this.outputElement.textContent += line.padStart(this.columns) + "\n";
        break;
      case "center":
        const totalWidth = this.columns;
        const padding = Math.floor((totalWidth - currentWidth) / 2);
        this.outputElement.textContent +=
          " ".repeat(padding) +
          line +
          " ".repeat(totalWidth - currentWidth - padding) +
          "\n";
        break;
    }
  }
}

const form = document.getElementById("shapeForm");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const type = document.getElementById("shapeType").value;
  const alignment = document.getElementById("alignment").value;
  const character = document.getElementById("drawChar").value;
  const rows = parseInt(document.getElementById("rows").value);
  const columns = parseInt(document.getElementById("columns").value);
  const outputElement = document.getElementById("output");

  try {
    const shapePrinter = new Shape(
      type,
      alignment,
      character,
      rows,
      columns,
      outputElement
    );
    shapePrinter.draw();
  } catch (error) {
    outputElement.textContent = error.message;
  }
});
