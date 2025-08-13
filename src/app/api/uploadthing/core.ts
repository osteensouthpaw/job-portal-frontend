import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import jwt from "jsonwebtoken";

const f = createUploadthing();

function getUserIdFromRequest(req: Request): string {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) throw new UploadThingError("Unauthorized");

  const cookies = Object.fromEntries(
    cookieHeader.split(";").map((c) => {
      const [key, ...v] = c.trim().split("=");
      return [key, v.join("=")];
    })
  );
  const token = cookies["refreshToken"];
  if (!token) throw new UploadThingError("Unauthorized");

  const payload = jwt.decode(token);
  if (!payload || typeof payload !== "object" || !("userId" in payload)) {
    throw new UploadThingError("Unauthorized");
  }

  return (payload as any).userId;
}

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "128KB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const userId = getUserIdFromRequest(req);
      // You can return any metadata you want to use later
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("file url", file.ufsUrl);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId, fileUrl: file.ufsUrl };
    }),

  resumeUploader: f({
    pdf: {
      maxFileCount: 1,
      maxFileSize: "128KB",
    },
  })
    .middleware(async ({ req }) => {
      const userId = getUserIdFromRequest(req);
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("file url", file.ufsUrl);
      return { uploadedBy: metadata.userId, fileUrl: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
