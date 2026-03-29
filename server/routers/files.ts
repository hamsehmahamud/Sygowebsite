import { adminProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { storagePut } from "../storage";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";

export const filesRouter = router({
  uploadImage: adminProcedure
    .input(
      z.object({
        base64: z.string().min(1),
        filename: z.string().min(1),
        contentType: z.string().default("image/jpeg"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Convert base64 to buffer
        const buffer = Buffer.from(input.base64, "base64");

        // Validate file size (max 5MB)
        if (buffer.length > 5 * 1024 * 1024) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "File size exceeds 5MB limit",
          });
        }

        // Generate unique filename
        const ext = input.filename.split(".").pop() || "jpg";
        const uniqueFilename = `${nanoid()}.${ext}`;
        const fileKey = `uploads/${uniqueFilename}`;

        // Upload to S3
        const { url } = await storagePut(fileKey, buffer, input.contentType);

        return {
          success: true,
          url,
          filename: uniqueFilename,
        };
      } catch (error) {
        console.error("[File Upload] Error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error.message : "Failed to upload file",
        });
      }
    }),

  deleteImage: adminProcedure
    .input(z.object({ url: z.string().url() }))
    .mutation(async ({ input }) => {
      try {
        // Note: The current storage module doesn't support delete
        // This is a placeholder for future implementation
        console.log("[File Delete] Would delete:", input.url);
        return {
          success: true,
          message: "File deletion not yet implemented",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete file",
        });
      }
    }),
});
