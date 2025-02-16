export class Spritesheet {
  constructor(src, width, height) {
    this.image = new Image();
    this.image.src = src;
    this.width = width;
    this.height = height;
    this.image.crossOrigin = "anonymous";
    this.loaded = new Promise((resolve, reject) => {
      this.image.onload = () => resolve(this.image);
      this.image.onerror = () => reject("Failed to load spritesheet");
    });
  }

  async extractSprite([row, col]) {
    await this.loaded;
    const sprite = await createImageBitmap(
      this.image,
      col * this.width,
      row * this.height,
      this.width,
      this.height,
    );
    return this.imageBitmapToDataURL(sprite);
  }

  imageBitmapToDataURL(imageBitmap) {
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(imageBitmap, 0, 0, this.width, this.height);
    return canvas.toDataURL(); // Convert to Base64 URL
  }
}
