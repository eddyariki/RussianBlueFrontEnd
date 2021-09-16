import p5 from "p5";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { ActionButton } from "../../components/Buttons/Buttons";
import { useReviewDetail } from "../../hooks/ReviewDetailsProvider";
import { useUser } from "../../hooks/UserProvider";
import GenerateProductImage from "./GenerateProductImage";
import { generateQr } from "./GenerateQR";

export default function ImageGeneration() {
  const sketchRef = useRef();
  const [reviewDetails, setReviewDetail] = useReviewDetail();

  let img;
  let qrImg = null;
  let productImg = null;
  let download = false;
  let productPrice = 1000;
  const handleUpload = (e) => {
    readImage(e.target.files[0]);
  };
  const handleClick = (e) => {
    download = true;
  };
  const readImage = (file) => {
    // Check if the file is an image.
    if (file.type && !file.type.startsWith("image/")) {
      console.log("File is not an image.", file.type, file);
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      img = event.target.result;
    });
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    const p5Canvas = new p5(initSketch, sketchRef.current);
    return () => {
      p5Canvas.remove();
    };
  }, []);
  const setProductImage = (dataURL) => {
    productImg = dataURL;
  };
  const setProductPrice = (price) => {
    productPrice = price;
  };
  const initSketch = (p) => {
    let grad1;
    let grad2;
    let gradientScale = 0.3;
    let r;
    let g;
    let b;
    let r2;
    let g2;
    let b2;
    let prevImg = img;
    let prevQrImg = null;
    let prevProductImg = null;
    let image = null;
    let qrImage = null;
    let productImage = null;
    let pg;
    let imgIndex = 0;
    let imgX = 0;
    let imgY = 0;
    let xOff = 0;
    let yOff = 0;
    let scale = 1;
    let px = 0;
    let py = 0;
    let offsetX = 0;
    let offsetY = 0;
    let locked = false;
    let rand1;
    let rand2;
    let rand3;
    const handleInput = () => {
      try {
        image = p.loadImage(img);
        prevImg = img;
      } catch (e) {
        console.log(e);
      }
    };
    const handleQrLoad = () => {
      try {
        qrImage = p.loadImage(qrImg);
        prevQrImg = qrImg;
      } catch (e) {
        console.log(e);
      }
    };

    const handleProductImageLoad = () => {
      try {
        productImage = p.loadImage(productImg[imgIndex]);
        prevProductImg = productImg;
      } catch (e) {
        console.log(e);
      }
    };
    p.setup = async () => {
      p.createCanvas(300, 533);
      pg = p.createGraphics(900, 1600);
      // p.noLoop();
      r = p.random(255 * gradientScale);
      g = p.random(255 * gradientScale);
      b = p.random(255 * gradientScale);
      r2 = r + p.random(40);
      g2 = g + p.random(40);
      b2 = b + p.random(40);
      rand1 = p.random(-50, 50);
      rand2 = p.random(-50, 50);
      rand3 = p.random(-50, 50);
      grad1 = p.color(r, g, b, 0);
      grad2 = p.color(r, g, b, 255);
      pg.textFont("Montserrat");
      pg.imageMode(p.CENTER);
      qrImg = await generateQr(reviewDetails.itemCode, reviewDetails.authorId);
      imgX = pg.width / 2;
      imgY = pg.height / 2;
    };

    const setGradient = (x, y, w, h, c1, c2, axis) => {
      pg.noFill();
      if (axis === pg.Y_AXIS) {
        // Top to bottom gradient
        for (let i = y; i <= y + h; i++) {
          let inter = p.map(i, y, y + h * 0.2, 0, 1);
          let c = p.lerpColor(c1, c2, inter);
          pg.stroke(c);
          pg.line(x, i, x + w, i);
        }
      } else if (axis === p.X_AXIS) {
        // Left to right gradient
        for (let i = x; i <= x + w; i++) {
          let inter = p.map(i, x, x + w, 0, 1);
          let c = p.lerpColor(c1, c2, inter);
          pg.stroke(c);
          pg.line(i, y, i, y + h);
        }
      }
    };
    const invert = (r, g, b, scale) => {
      let rt = 255 - r;
      let gt = 255 - g;
      let bt = 255 - b;
      return p.color(rt * scale, gt * scale, bt * scale);
    };
    p.mouseClicked = () => {
      if (p.mouseY > p.height) {
        return;
      }
      if (productImg !== null) {
        imgIndex++;
        if (imgIndex >= productImg.length) {
          imgIndex = 0;
        }
        productImage = p.loadImage(productImg[imgIndex]);
      }
    };

    p.mousePressed = () => {
      offsetX = p.mouseX - px;
      offsetY = p.mouseY - py;
      locked = true;
    };
    p.mouseReleased = () => {
      locked = false;
    };
    p.mouseDragged = () => {
      if (locked) {
        px = p.mouseX - offsetX;
        py = p.mouseY - offsetY;
      }
      imgX = p.map(px, 0, p.width, 0, pg.width);
      imgY = p.map(py, 0, p.height, 0, pg.height);
    };
    // p.touchStarted = () => {
    //   imgX = p.map(p.mouseX, 0, p.width, 0, pg.width);
    //   imgY = p.map(p.mouseY, 0, p.height, 0, pg.height);
    // };
    p.mouseWheel = (e) => {
      scale = Math.max(Math.min(scale - e.delta / 500, 5), 0.1);
    };
    p.draw = () => {
      p.background(0);
      if (img !== prevImg) {
        handleInput();
      }
      if (qrImg !== prevQrImg) {
        handleQrLoad();
      }

      if (productImg !== prevProductImg) {
        handleProductImageLoad();
      }
      pg.background(255);
      if (image !== null) {
        pg.image(
          image,
          imgX + xOff,
          imgY + yOff,
          (pg.height / image.height) * image.width * scale,
          pg.height * scale
        );
      }
      if (productImage !== null && image === null) {
        pg.image(
          productImage,
          imgX + xOff,
          imgY + yOff,
          (pg.height / productImage.height) * productImage.width * scale,
          pg.height * scale
        );
      }

      setGradient(
        0,
        pg.height / 2,
        pg.width,
        pg.height / 2,
        grad1,
        grad2,
        p.Y_AXIS
      );
      pg.stroke(invert(r, g, b, 1));
      pg.fill(invert(r, g, b, 1));
      pg.textSize(60);
      pg.textFont("Montserrat");
      pg.text(reviewDetails.title.slice(0, 15) + "...", 25, pg.height / 1.7);

      pg.noStroke();
      pg.fill(invert(r2, g2, b2, 1.2));
      pg.textSize(55);
      pg.textFont("Helvetica");
      pg.text(
        reviewDetails.content.slice(0, 120) + "...",
        65,
        pg.height / 1.6,
        pg.width - 65,
        pg.height - pg.height / 1.5
      );
      if (qrImage !== null) {
        pg.image(qrImage, qrImage.width / 2 + 35, pg.height - qrImage.height);
      }
      pg.textSize(65);
      pg.textFont("Helvetica");
      pg.fill(invert(r2 + rand1, g2 + rand2, b2 + rand3, 1.2));
      pg.text(productPrice + "円", pg.width - 310, pg.height / 1.7);
      pg.textSize(45);
      pg.text(
        "<= Read full review",
        qrImage.width / 2 + 150,
        pg.height - qrImage.height / 1.5
      );
      p.image(pg, 0, 0, p.width, p.height);
      if (download === true) {
        console.log(download);
        p.save(pg, `sharible-${p.random(2000)}.jpg`);
        download = false;
      }
    };
  };
  return (
    <>
      <GenerateProductImage
        setProductImage={setProductImage}
        setProductPrice={setProductPrice}
      />
      <SketchContainer>
        <Sketch ref={sketchRef} />
        <FileUpload>
          <Input type="file" onChange={handleUpload} />
        </FileUpload>
        <ActionButtonContainer>
          <ActionButton onClick={handleClick}>Download Image</ActionButton>
        </ActionButtonContainer>
      </SketchContainer>
    </>
  );
}

const SketchContainer = styled.div`
  display: grid;
  width: 100vw;
  justify-items: center;
`;
const Sketch = styled.div`
  display: grid;
  justify-items: center;
  width: 100vw;
  & canvas {
    box-shadow: var(--shadow-m);
  }
`;

const FileUpload = styled.div`
  padding-top: var(--spacing-s);
`;

const Input = styled.input`
  justify-self: center;
  align-self: center;

  &::-webkit-file-upload-button {
    visibility: hidden;
  }
  &::before {
    content: "Upload image";
    display: block;
    background: linear-gradient(top, #f9f9f9, #e3e3e3);
    border: 1px solid var(--action-button-color);
    border-radius: 5px;
    padding: 5px 8px;
    outline: none;
    white-space: nowrap;
    cursor: pointer;
    text-shadow: 1px 1px #fff;
    font-weight: 700;
    font-size: 10pt;
    text-align: center;
  }
  &:hover::before {
    border-color: black;
  }
  &:active::before {
    background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
  }
`;

const ActionButtonContainer = styled.div`
  padding-top: var(--padding-s);
`;
