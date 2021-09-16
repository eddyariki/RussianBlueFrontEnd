import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { rakutenApiInstance } from "../../axios";
import { rakutenItemSearchApiURL, rakutenApiAppID } from "../../constants";
import ReviewDetailProvider, {
  useReviewDetail,
} from "../../hooks/ReviewDetailsProvider";

export default function GenerateProductImage(props) {
  const [reviewDetails, setReviewDetail] = useReviewDetail();

  useEffect(() => {
    const fetchProduct = async () => {
      console.log("test");
      try {
        const res = await rakutenApiInstance.get(rakutenItemSearchApiURL, {
          params: {
            format: "json",
            itemCode: reviewDetails.itemCode,
            applicationId: rakutenApiAppID,
          },
        });
        const images = [];
        for (
          let i = 0;
          i < res.data.Items[0].Item.mediumImageUrls.length;
          i++
        ) {
          console.log(
            res.data.Items[0].Item.mediumImageUrls[i].imageUrl.replace(
              "128x128",
              "1024x1024"
            )
          );
          const res2 = await fetch(
            res.data.Items[0].Item.mediumImageUrls[i].imageUrl.replace(
              "128x128",
              "1024x1024"
            )
          );
          const blob = await res2.blob();
          const dataUrl = await new Promise((resolve) => {
            let reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(blob);
          });
          images.push(dataUrl);
        }
        props.setProductPrice(res.data.Items[0].Item.itemPrice);
        props.setProductImage(images);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProduct();
  }, []);

  return <></>;
}
