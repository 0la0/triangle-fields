import Color from '../util/Color';

class ColorManager {
  constructor(colors) {
    this.colors = [];
  }

  setFromHexList(hexList) {
    this.colors = hexList.map(Color.fromHex);
  }

  setGenerationMethod(generationMethod) {
    this.generationMethod = generationMethod;
  }

  getRandomColorIndex() {
    return Math.floor(this.colors.length * Math.random());
  }

  generateColorFromContinuousSpace() {
    if (this.colors.length < 2) {
      return this.colors[0];
    }
    const index1 = this.getRandomColorIndex();
    let index2 = this.getRandomColorIndex();
    while(index1 === index2) {
      index2 = this.getRandomColorIndex();
    }
    return this.colors[index1].interpolateWith(this.colors[index2]);
  }

  generateColorFromDiscreteSpace() {
    return this.colors[this.getRandomColorIndex()];
  }

  getRandomColor() {
    return this.generationMethod === 'continuous' ?
      this.generateColorFromContinuousSpace() :
      this.generateColorFromDiscreteSpace();
  }
}

const instance = new ColorManager();
export default instance;
