import { ProcessProps } from "./type";

export const blur = (process: ProcessProps) => {
  const { cv, srcMat, dstMat } = process;

  cv.GaussianBlur(srcMat, dstMat, { width: 7, height: 7 }, cv.BORDER_DEFAULT);
};
