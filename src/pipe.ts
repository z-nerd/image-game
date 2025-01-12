import { ProcessProps } from "./effects/type";
import { lut } from "./effects/lut";
import { draw } from "./effects/draw";
import { gray } from "./effects/gray";
import { blur } from "./effects/blur";
import { eageCanny } from "./effects/eage-canny";

export const pipe = (ps: ProcessProps) => {
  // draw(ps);
  // lut(ps);
  // gray(ps);
  eageCanny(ps);
};
