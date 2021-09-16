import p5 from "p5";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useReviewDetail } from "../../hooks/ReviewDetailsProvider";
import { useUser } from "../../hooks/UserProvider";
import { generateQr } from "./GenerateQR";

export default function ImageGeneration() {
  const sketchRef = useRef();
  const [user, setUser] = useUser();
  const [reviewDetails, setReviewDetail] = useReviewDetail();

  let img;
  let qrImg = null;
  const handleUpload = (e) => {
    readImage(e.target.files[0]);
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
    let image = null;
    let qrImage = null;
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
    p.setup = async () => {
      p.createCanvas(900, 1600);
      // p.noLoop();
      r = p.random(255 * gradientScale);
      g = p.random(255 * gradientScale);
      b = p.random(255 * gradientScale);
      r2 = r + p.random(40);
      g2 = g + p.random(40);
      b2 = b + p.random(40);
      grad1 = p.color(r, g, b, 0);
      grad2 = p.color(r, g, b, 255);
      p.textFont("Montserrat");
      p.imageMode(p.CENTER);
      qrImg = await generateQr(reviewDetails.itemCode, user.userId);
    };

    const setGradient = (x, y, w, h, c1, c2, axis) => {
      p.noFill();
      if (axis === p.Y_AXIS) {
        // Top to bottom gradient
        for (let i = y; i <= y + h; i++) {
          let inter = p.map(i, y, y + h * 0.2, 0, 1);
          let c = p.lerpColor(c1, c2, inter);
          p.stroke(c);
          p.line(x, i, x + w, i);
        }
      } else if (axis === p.X_AXIS) {
        // Left to right gradient
        for (let i = x; i <= x + w; i++) {
          let inter = p.map(i, x, x + w, 0, 1);
          let c = p.lerpColor(c1, c2, inter);
          p.stroke(c);
          p.line(i, y, i, y + h);
        }
      }
    };
    const invert = (r, g, b, scale) => {
      let rt = 255 - r;
      let gt = 255 - g;
      let bt = 255 - b;
      return p.color(rt * scale, gt * scale, bt * scale);
    };
    p.draw = () => {
      if (img !== prevImg) {
        handleInput();
      }
      if (qrImg !== prevQrImg) {
        handleQrLoad();
      }
      p.background(255);
      if (image !== null) {
        p.image(
          image,
          p.width / 2,
          p.height / 2,
          (p.height / image.height) * image.width,
          p.height
        );
      }

      setGradient(
        0,
        p.height / 2,
        p.width,
        p.height / 2,
        grad1,
        grad2,
        p.Y_AXIS
      );
      p.stroke(invert(r, g, b, 1));
      p.fill(invert(r, g, b, 1));
      p.textSize(100);
      p.textFont("Montserrat");
      p.text(reviewDetails.title, 25, p.height / 1.7);

      p.noStroke();
      p.fill(invert(r2, g2, b2, 1.2));
      p.textSize(55);
      p.textFont("Helvetica");
      p.text(
        reviewDetails.caption,
        65,
        p.height / 1.6,
        p.width - 65,
        p.height - p.height / 1.5
      );
      if (qrImage !== null) {
        p.image(qrImage, qrImage.width / 2 + 35, p.height - qrImage.height);
      }
      p.textSize(45);
      p.text(
        "<= Read full review",
        qrImage.width / 2 + 150,
        p.height - qrImage.height / 1.5
      );
    };
  };
  return (
    <SketchContainer>
      <Sketch ref={sketchRef} />
      <Input type="file" onChange={handleUpload} />
    </SketchContainer>
  );
}

const SketchContainer = styled.div`
  height: 100vh;
`;
const Sketch = styled.div`
  height: 100vh;
`;

const Input = styled.input``;
