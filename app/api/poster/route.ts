import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";
import os from "os";
import { PassThrough } from "stream";

// Helper to find correct binary path
function getBinaryPath(defaultPath: string | null | undefined, packageName: string, binName: string): string | null {
  // 1. Trust the package (if it exists)
  if (defaultPath && fs.existsSync(defaultPath)) return defaultPath;

  const platform = os.platform();
  const cwd = process.cwd();

  // 2. Check standard node_modules root
  const rootPath = path.join(cwd, "node_modules", packageName, platform === "win32" ? `${binName}.exe` : binName);
  if (fs.existsSync(rootPath)) return rootPath;

  return null;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const videoSrc = searchParams.get("videoSrc");

  if (!videoSrc) {
    return NextResponse.json({ error: "Missing videoSrc" }, { status: 400 });
  }

  // Calculate path INSIDE handler to be safe
  const ffmpegPath = getBinaryPath(ffmpegStatic, "ffmpeg-static", "ffmpeg");

  if (ffmpegPath) {
    ffmpeg.setFfmpegPath(ffmpegPath);
  }

  if (!ffmpegPath) { 
    console.error("[API/poster] FFmpeg binary missing!");
    return NextResponse.json({ error: "Server Configuration Error: binary missing" }, { status: 500 });
  }

  // Resolve absolute path for local files
  const cleanSrc = videoSrc.startsWith("/") ? videoSrc.substring(1) : videoSrc;
  const inputPath = path.join(process.cwd(), "public", cleanSrc);

  if (!fs.existsSync(inputPath)) {
    console.error(`[API/poster] File NOT FOUND at: ${inputPath}`);
    return NextResponse.json({ error: "Input file not found" }, { status: 404 });
  }

  const stream = new PassThrough();

  try {
    // Generate thumbnail using ONLY ffmpeg
    const ffmpegCommand = ffmpeg(inputPath)
      .seekInput(1)
      .frames(1)
      .format("image2")
      .outputOptions("-vframes 1")
      .outputOptions("-f image2pipe")
      .on("start", (cmd) => console.log(`[API/poster] Spawned ffmpeg: ${cmd}`))
      .on("error", (err) => {
        console.error("[API/poster] Processing Error:", err);
        stream.end(); 
      })
      .on("end", () => {
        console.log("[API/poster] Finished processing");
      });

    ffmpegCommand.pipe(stream, { end: true });

    return new NextResponse(stream as any, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });

  } catch (error) {
    console.error("[API/poster] Handler Error:", error);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
