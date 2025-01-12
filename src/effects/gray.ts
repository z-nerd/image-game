import { ProcessProps } from "./type";

export const gray = (process: ProcessProps) => {
  const { cv, srcMat, dstMat } = process;

  cv.cvtColor(srcMat, dstMat, cv.COLOR_RGBA2GRAY);
};
