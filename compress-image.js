function file2base64(file) {
  return new Promise((resolve, reject) => {
    if (!(file && Object.prototype.toString.call(file) === "[object File]")) {
      reject("[file2base64] paramter must be instanceof File");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => {
      console.log("[file2base64.onerror]", e);
      reject(e);
    };
    reader.readAsDataURL(file);
  });
}

function createImage(dataURL) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = dataURL;
    image.onload = () => resolve(image);
    image.onerror = (e) => reject("[createImage]:", e);
  });
}

function compressImage(file, quality = 0.1) {
  return new Promise(async (resolve, reject) => {
    if (!(typeof quality === "number" && quality > 0 && quality < 1)) {
      reject("[compressImage]'quality' must be between 0 and 1");
      return;
    }

    const base64 = await file2base64(file);
    const image = await createImage(base64);
    const { width, height } = image;
    const { name: fileName, type: fileType } = file;

    // create canvas, draw image, comopress
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, width, height);
    canvas.toBlob(
      (blob) => resolve(new File([blob], fileName, { type: fileType })),
      fileType,
      quality
    );
  });
}

export default compressImage;
