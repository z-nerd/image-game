import { ProcessProps } from "./type";

export const draw = (process: ProcessProps) => {
  const { cv, srcMat, dstMat } = process;

  srcMat.copyTo(dstMat);

  cv.rectangle(
    dstMat,
    { x: 20, y: 10 },
    { x: 240, y: 300 },
    [255, 255, 0, 255],
    10,
    3,
  );

  cv.line(
    dstMat,
    { x: 0, y: 0 },
    { x: 300, y: 300 },
    [244, 0, 0, 255],
    4,
    cv.LINE_AA,
  );

  cv.putText(
    dstMat,
    "Zero",
    { x: 10, y: 300 },
    cv.FONT_HERSHEY_PLAIN,
    4,
    [234, 0, 234, 255],
  );
};
