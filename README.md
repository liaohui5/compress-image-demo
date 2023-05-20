## 前端图片压缩原理

1. 获取图片的 file 对象, 读取 dataURL
2. 使用 canvas 将图片的 dataURL 绘制到 canvas
3. 使用 canvas 的 toDataURL/toBlob 的第三个参数 quality 来压缩

## 使用 webWorker

- [ ] 使用 webWorker 来压缩

## 快速开始

```sh
git clone https://github.com/liaohui5/compress-image-demo

pnpm install
pnpm run dev

# open browser and visit http://localhost:8080
# open http://localhost:8080
```
