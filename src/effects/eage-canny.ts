import { ProcessProps } from "./type";

export const eageCanny = (process: ProcessProps) => {
  const { cv, srcMat, dstMat } = process;

  cv.Canny(srcMat, dstMat, 125, 175);
};
