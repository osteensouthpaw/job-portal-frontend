import authService from "@/services/auth-service";
import { cookies } from "next/headers";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "128KB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const cookieString = req.cookies.toString();
      const user = await authService.getSession(cookieString);

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id };
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
    .middleware(async () => {
      const cookieString = (await cookies()).toString();
      const user = await authService.getSession(cookieString);
      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("file url", file.ufsUrl);
      return { uploadedBy: metadata.userId, fileUrl: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
