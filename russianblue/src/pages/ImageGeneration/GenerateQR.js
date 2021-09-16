import QRCode from "qrcode";

export const generateQr = async (itemCode, referralId) => {
  try {
    const dataURL = await QRCode.toDataURL(
      `https://localhost:3000/#/review?reviewId=${referralId}`
    );
    return dataURL;
  } catch (e) {
    console.log(e);
    return "";
  }
};
