// utils/getVideoPoster.ts
export async function getVideoPoster(
  src: string,
  timeInSeconds = 1
): Promise<string> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.src = src;
    video.crossOrigin = "anonymous"; // needed if video is from another domain
    video.muted = true; // required for autoplay in some browsers
    video.currentTime = timeInSeconds;

    video.addEventListener("loadeddata", () => {
      video.currentTime = timeInSeconds;
    });

    video.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas not supported");

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL("image/jpeg", 0.8);
      resolve(dataURL);
    });

    video.addEventListener("error", (e) => reject(e));
  });
}
