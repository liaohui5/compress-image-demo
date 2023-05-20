import compressImage from "./compress-image";

// 获取DOM
const fileInput = document.querySelector("#file");
const originDOM = document.querySelector("#app .original");
const previewDOM = document.querySelector("#app .compressed");

// 渲染图片
function renderImage(dom, url) {
  const image = new Image();
  image.src = url;
  dom.append(image);
}

fileInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  console.log("file:", file);
  const originURL = URL.createObjectURL(file);
  renderImage(originDOM, originURL);

  // 压缩后渲染
  const compressedFile = await compressImage(file);
  console.log("compressedFile:", compressedFile);
  const compressedURL = URL.createObjectURL(compressedFile);
  renderImage(previewDOM, compressedURL);
});
