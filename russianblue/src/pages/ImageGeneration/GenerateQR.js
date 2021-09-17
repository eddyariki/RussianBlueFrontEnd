import QRCode from "qrcode";
import { siteURL } from "../../constants";

export const generateQr = async (itemCode, referralId) => {
  const a = siteURL;
  try {
    const dataURL = await QRCode.toDataURL(
      `${a}/#/review?reviewId=${referralId}`
    );
    return dataURL;
  } catch (e) {
    console.log(e);
    return "";
  }
};
