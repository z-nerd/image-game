import { Mat } from "mirada";

export interface ProcessProps {
  cv: CV;
  srcMat: Mat;
  dstMat: Mat;
  width?: number;
  height?: number;
}
