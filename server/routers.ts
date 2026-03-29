import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { filesRouter } from "./routers/files";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  sendDonationConfirmationEmail,
  sendNewDonationAlertEmail,
  sendNewsletterConfirmationEmail,
} from "./_core/emailService";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getAllInterventions,
  getInterventionById,
  createIntervention,
  updateIntervention,
  deleteIntervention,
  getAllMilestones,
  getMilestoneById,
  createMilestone,
  updateMilestone,
  deleteMilestone,
  getAllDonations,
  createDonation,
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
  getNewsletterSubscribers,
  getContentByKey,
  updateContent,
} from "./db";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const appRouter = router({
    system: systemRouter,
    files: filesRouter,
    auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Projects API
  projects: router({
    list: publicProcedure.query(async () => {
      return getAllProjects();
    }),
    get: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
      return getProjectById(input.id);
    }),
    create: adminProcedure
      .input(
        z.object({
          title: z.string().min(1),
          description: z.string().optional(),
          imageUrl: z.string().optional(),
          category: z.string().optional(),
          status: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return createProject(input);
      }),
    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().optional(),
          description: z.string().optional(),
          imageUrl: z.string().optional(),
          category: z.string().optional(),
          status: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...updates } = input;
        return updateProject(id, updates);
      }),
    delete: adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      return deleteProject(input.id);
    }),
  }),

  // Interventions API
  interventions: router({
    list: publicProcedure.query(async () => {
      return getAllInterventions();
    }),
    get: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
      return getInterventionById(input.id);
    }),
    create: adminProcedure
      .input(
        z.object({
          title: z.string().min(1),
          description: z.string().optional(),
          imageUrl: z.string().optional(),
          category: z.string().optional(),
          partners: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return createIntervention(input);
      }),
    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().optional(),
          description: z.string().optional(),
          imageUrl: z.string().optional(),
          category: z.string().optional(),
          partners: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...updates } = input;
        return updateIntervention(id, updates);
      }),
    delete: adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      return deleteIntervention(input.id);
    }),
  }),

  // Milestones API
  milestones: router({
    list: publicProcedure.query(async () => {
      return getAllMilestones();
    }),
    get: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
      return getMilestoneById(input.id);
    }),
    create: adminProcedure
      .input(
        z.object({
          title: z.string().min(1),
          description: z.string().optional(),
          date: z.date().optional(),
          category: z.string().optional(),
          featured: z.number().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return createMilestone(input);
      }),
    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().optional(),
          description: z.string().optional(),
          date: z.date().optional(),
          category: z.string().optional(),
          featured: z.number().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...updates } = input;
        return updateMilestone(id, updates);
      }),
    delete: adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      return deleteMilestone(input.id);
    }),
  }),

  // Donations API
  donations: router({
    list: adminProcedure.query(async () => {
      return getAllDonations();
    }),
    create: publicProcedure
      .input(
        z.object({
          donorName: z.string().optional(),
          donorEmail: z.string().email(),
          amount: z.number().min(1),
          message: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const result = await createDonation(input);
        await sendDonationConfirmationEmail(input.donorEmail, input.donorName, input.amount);
        const adminEmail = process.env.OWNER_NAME || "admin@sygo.org";
        if (adminEmail) {
          await sendNewDonationAlertEmail(adminEmail, input.donorName, input.donorEmail, input.amount, input.message);
        }
        return result;
      }),
  }),

  // Newsletter API
  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        try {
          await subscribeToNewsletter(input.email);
          await sendNewsletterConfirmationEmail(input.email);
          return { success: true, message: "Successfully subscribed to newsletter" };
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to subscribe to newsletter",
          });
        }
      }),
    unsubscribe: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        try {
          await unsubscribeFromNewsletter(input.email);
          return { success: true, message: "Successfully unsubscribed from newsletter" };
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to unsubscribe from newsletter",
          });
        }
      }),
    getSubscribers: adminProcedure.query(async () => {
      return getNewsletterSubscribers();
    }),
  }),

  // Content API
  content: router({
    get: publicProcedure
      .input(z.object({ key: z.string() }))
      .query(async ({ input }) => {
        return getContentByKey(input.key);
      }),
    update: adminProcedure
      .input(z.object({ key: z.string(), value: z.string() }))
      .mutation(async ({ input }) => {
        return updateContent(input.key, input.value);
      }),
  }),
});

export type AppRouter = typeof appRouter;
