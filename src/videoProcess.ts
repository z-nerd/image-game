import { Mat } from "mirada";

export interface ProcessProps {
  cv: CV;
  srcMat: Mat;
  dstMat: Mat;
  width?: number;
  height?: number;
}

export const process = ({ cv, srcMat, dstMat }: ProcessProps) => {
  const lut = cv.Mat.zeros(256, 1, cv.CV_8UC1);
  for (let i = 0; i < 256; i++) {
    // lut.data[i] = Math.min(255, i + 127); // Increase brightness
    // lut.data[i] = Math.max(0, i - 127); // Decrease brightness
    lut.data[i] = i - 50; // Increase brightness
  }

  cv.LUT(srcMat, lut, dstMat);

  // cv.cvtColor(srcMat, dstMat, cv.COLOR_RGBA2GRAY);

  // Clean up
  lut.delete();
};
