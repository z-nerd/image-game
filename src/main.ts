import "./style.scss";
import { pipe } from "./pipe";

const appRef = document.querySelector<HTMLDivElement>("#app")!;
const openCVRef = document.querySelector<HTMLDivElement>("#openCv")!;
const videoRef = document.querySelector<HTMLVideoElement>("#videoSrc")!;
// const imgRef = document.querySelector<HTMLImageElement>("#imageSrc")!;
// const fileRef = document.querySelector<HTMLInputElement>("#fileInput")!;
const docLog = (value: any) => {
  appRef.innerHTML = `<pre>${value}${JSON.stringify(value, null, "\t")}</pre>`;
};

docLog("loading");

const newCanvas = (id: string) => {
  const canvas = openCVRef.querySelector<HTMLCanvasElement>(`${id}`);
  if (!canvas) {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", id);
    openCVRef.appendChild(canvas);
    return canvas;
  }
  return canvas;
};

const out1Ref = newCanvas("org");
window.addEventListener("load", async () => {
  docLog("done");
  // docLog(cv.getBuildInformation());
  if (window.cv === undefined) return;
  const cvPromis = (window as any).cv as Promise<CV>;

  const playVideo = async (cv: CV) => {
    videoRef.style.display = "none";
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    const { width, height } = stream.getVideoTracks()[0].getSettings();
    videoRef.width = width!;
    videoRef.height = height!;

    videoRef.srcObject = stream;
    videoRef.onloadedmetadata = () => {
      videoRef.play();
    };

    const capCv = new cv.VideoCapture(videoRef);

    let srcMat = new cv.Mat(height, width, cv.CV_8UC4);
    let dstMat = new cv.Mat(height, width, cv.CV_8UC1);

    const FPS = 30;
    function processVideo() {
      try {
        if (!stream) {
          // clean and stop.
          srcMat.delete();
          dstMat.delete();
          return;
        }
        let begin = Date.now();
        // start processing.
        capCv.read(srcMat);

        pipe({ cv, srcMat, dstMat, width, height });

        cv.imshow(out1Ref, dstMat);

        // schedule the next one.
        let delay = 1000 / FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
      } catch (err) {
        console.error(err);
      }
    }

    // schedule the first one.
    setTimeout(processVideo, 0);
  };

  cvPromis.then((cv) => {
    playVideo(cv);

    // fileRef.addEventListener(
    //   "change",
    //   (e: any) => {
    //     imgRef.src = URL.createObjectURL(e.target.files[0]);
    //   },
    //   false,
    // );
    // imgRef.onload = async () => {
    //   try {
    //     const srcMat = cv.imread(imgRef);
    //     const grayMat = new cv.Mat();
    //     const dstMat = new cv.Mat();
    //
    //     cv.cvtColor(srcMat, grayMat, cv.COLOR_RGB2GRAY);
    //
    //     const redMat = new cv.Mat(cv.CV_8UC3, new cv.Scalar(255, 0, 0));
    //     cv.imshow("canvasOutput", redMat); // Display the image on a canvas
    //
    //     const lutMat = cv.Mat.zeros(256, 1, cv.CV_8UC1);
    //     for (let i = 0; i < 256; i++) {
    //       lutMat.data[i] = Math.min(255, i + 127); // Increase brightness
    //       // lut.data[i] = Math.max(0, i - 127); // Decrease brightness
    //     }
    //
    //     cv.LUT(srcMat, lutMat, dstMat);
    //     cv.imshow("canvasOutput", grayMat);
    //
    //     srcMat.delete();
    //     grayMat.delete();
    //     dstMat.delete();
    //     lutMat.delete();
    //   } catch (error) {
    //     console.log(`error: ${error}`);
    //   }
    // };
  });
});
