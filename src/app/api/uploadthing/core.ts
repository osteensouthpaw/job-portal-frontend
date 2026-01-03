import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import jwt from "jsonwebtoken";

const f = createUploadthing();

function getUserIdFromRequest(req: Request): string {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) throw new UploadThingError("Unauthorized");
  const token = authHeader?.split(" ")[1];
  const decodedToken = jwt.decode(token) as jwt.JwtPayload | null;
  if (!decodedToken) throw new UploadThingError("Invalid token");

  return decodedToken.userId;
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
