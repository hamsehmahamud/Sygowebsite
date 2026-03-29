import { describe, it, expect, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;
type AdminUser = AuthenticatedUser & { role: "admin" };

function createMockContext(user?: AuthenticatedUser | null): TrpcContext {
  return {
    user: user || null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

function createAdminUser(): AdminUser {
  return {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
}

function createRegularUser(): AuthenticatedUser {
  return {
    id: 2,
    openId: "regular-user",
    email: "user@example.com",
    name: "Regular User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
}

describe("API Routers", () => {
  describe("auth", () => {
    it("should return current user from me query", async () => {
      const user = createRegularUser();
      const ctx = createMockContext(user);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.auth.me();

      expect(result).toEqual(user);
    });

    it("should return null for me query when not authenticated", async () => {
      const ctx = createMockContext(null);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.auth.me();

      expect(result).toBeNull();
    });
  });

  describe("projects", () => {
    it("should list projects publicly", async () => {
      const ctx = createMockContext(null);
      const caller = appRouter.createCaller(ctx);

      // This will return empty array since we're not mocking the DB
      const result = await caller.projects.list();

      expect(Array.isArray(result)).toBe(true);
    });

    it("should reject project creation for non-admin users", async () => {
      const user = createRegularUser();
      const ctx = createMockContext(user);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.projects.create({
          title: "Test Project",
          description: "Test Description",
        });
        expect.fail("Should have thrown FORBIDDEN error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
      }
    });

    it("should reject project creation for unauthenticated users", async () => {
      const ctx = createMockContext(null);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.projects.create({
          title: "Test Project",
          description: "Test Description",
        });
        expect.fail("Should have thrown UNAUTHORIZED error");
      } catch (error: any) {
        expect(error.code).toBe("UNAUTHORIZED");
      }
    });
  });

  describe("interventions", () => {
    it("should list interventions publicly", async () => {
      const ctx = createMockContext(null);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.interventions.list();

      expect(Array.isArray(result)).toBe(true);
    });

    it("should reject intervention creation for non-admin users", async () => {
      const user = createRegularUser();
      const ctx = createMockContext(user);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.interventions.create({
          title: "Test Intervention",
          description: "Test Description",
        });
        expect.fail("Should have thrown FORBIDDEN error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
      }
    });
  });

  describe("milestones", () => {
    it("should list milestones publicly", async () => {
      const ctx = createMockContext(null);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.milestones.list();

      expect(Array.isArray(result)).toBe(true);
    });

    it("should reject milestone creation for non-admin users", async () => {
      const user = createRegularUser();
      const ctx = createMockContext(user);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.milestones.create({
          title: "Test Milestone",
          description: "Test Description",
          date: new Date(),
        });
        expect.fail("Should have thrown FORBIDDEN error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
      }
    });
  });

  describe("donations", () => {
    it("should allow public users to create donations", async () => {
      const ctx = createMockContext(null);
      const caller = appRouter.createCaller(ctx);

      // This will fail due to DB not being available, but it should pass auth checks
      try {
        await caller.donations.create({
          donorEmail: "donor@example.com",
          amount: 100,
        });
      } catch (error: any) {
        // Expected to fail due to DB, not auth
        expect(error.code).not.toBe("UNAUTHORIZED");
        expect(error.code).not.toBe("FORBIDDEN");
      }
    });

    it("should reject donation listing for non-admin users", async () => {
      const user = createRegularUser();
      const ctx = createMockContext(user);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.donations.list();
        expect.fail("Should have thrown FORBIDDEN error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
      }
    });

    it("should allow admin users to list donations", async () => {
      const admin = createAdminUser();
      const ctx = createMockContext(admin);
      const caller = appRouter.createCaller(ctx);

      // This will return empty array since we're not mocking the DB
      const result = await caller.donations.list();

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("newsletter", () => {
    it("should allow public users to subscribe to newsletter", async () => {
      const ctx = createMockContext(null);
      const caller = appRouter.createCaller(ctx);

      try {
        const result = await caller.newsletter.subscribe({
          email: "subscriber@example.com",
        });
        expect(result.success).toBe(true);
      } catch (error: any) {
        // Expected to fail due to DB, not auth
        expect(error.code).not.toBe("UNAUTHORIZED");
        expect(error.code).not.toBe("FORBIDDEN");
      }
    });

    it("should allow public users to unsubscribe from newsletter", async () => {
      const ctx = createMockContext(null);
      const caller = appRouter.createCaller(ctx);

      try {
        const result = await caller.newsletter.unsubscribe({
          email: "subscriber@example.com",
        });
        expect(result.success).toBe(true);
      } catch (error: any) {
        // Expected to fail due to DB, not auth
        expect(error.code).not.toBe("UNAUTHORIZED");
        expect(error.code).not.toBe("FORBIDDEN");
      }
    });

    it("should reject newsletter subscriber listing for non-admin users", async () => {
      const user = createRegularUser();
      const ctx = createMockContext(user);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.newsletter.getSubscribers();
        expect.fail("Should have thrown FORBIDDEN error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
      }
    });
  });

  describe("content", () => {
    it("should allow public users to get content", async () => {
      const ctx = createMockContext(null);
      const caller = appRouter.createCaller(ctx);

      // This will return undefined since we're not mocking the DB
      const result = await caller.content.get({ key: "hero_title" });

      expect(result === undefined || typeof result === "string").toBe(true);
    });

    it("should reject content update for non-admin users", async () => {
      const user = createRegularUser();
      const ctx = createMockContext(user);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.content.update({
          key: "hero_title",
          value: "New Title",
        });
        expect.fail("Should have thrown FORBIDDEN error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
      }
    });

    it("should allow admin users to update content", async () => {
      const admin = createAdminUser();
      const ctx = createMockContext(admin);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.content.update({
          key: "hero_title",
          value: "New Title",
        });
        // Success or DB error is acceptable, not auth error
      } catch (error: any) {
        expect(error.code).not.toBe("UNAUTHORIZED");
        expect(error.code).not.toBe("FORBIDDEN");
      }
    });
  });
});
