import { eq, isNull } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  projects,
  InsertProject,
  interventions,
  InsertIntervention,
  milestones,
  InsertMilestone,
  donations,
  InsertDonation,
  newsletterSubscribers,
  content,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Projects queries
export async function getAllProjects() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(projects).orderBy(projects.createdAt);
}

export async function getProjectById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return result[0];
}

export async function createProject(project: InsertProject) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(projects).values(project);
  return result;
}

export async function updateProject(id: number, updates: Partial<InsertProject>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(projects).set(updates).where(eq(projects.id, id));
}

export async function deleteProject(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(projects).where(eq(projects.id, id));
}

// Interventions queries
export async function getAllInterventions() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(interventions).orderBy(interventions.createdAt);
}

export async function getInterventionById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(interventions).where(eq(interventions.id, id)).limit(1);
  return result[0];
}

export async function createIntervention(intervention: InsertIntervention) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(interventions).values(intervention);
}

export async function updateIntervention(id: number, updates: Partial<InsertIntervention>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(interventions).set(updates).where(eq(interventions.id, id));
}

export async function deleteIntervention(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(interventions).where(eq(interventions.id, id));
}

// Milestones queries
export async function getAllMilestones() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(milestones).orderBy(milestones.date);
}

export async function getMilestoneById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(milestones).where(eq(milestones.id, id)).limit(1);
  return result[0];
}

export async function createMilestone(milestone: InsertMilestone) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(milestones).values(milestone);
}

export async function updateMilestone(id: number, updates: Partial<InsertMilestone>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(milestones).set(updates).where(eq(milestones.id, id));
}

export async function deleteMilestone(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(milestones).where(eq(milestones.id, id));
}

// Donations queries
export async function getAllDonations() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(donations).orderBy(donations.createdAt);
}

export async function createDonation(donation: InsertDonation) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(donations).values(donation);
}

// Newsletter queries
export async function subscribeToNewsletter(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(newsletterSubscribers).values({ email }).onDuplicateKeyUpdate({
    set: { unsubscribedAt: null },
  });
}

export async function unsubscribeFromNewsletter(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(newsletterSubscribers).set({ unsubscribedAt: new Date() }).where(eq(newsletterSubscribers.email, email));
}

export async function getNewsletterSubscribers() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(newsletterSubscribers).where(isNull(newsletterSubscribers.unsubscribedAt));
}

// Content queries
export async function getContentByKey(key: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(content).where(eq(content.key, key)).limit(1);
  return result[0]?.value;
}

export async function updateContent(key: string, value: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(content).values({ key, value }).onDuplicateKeyUpdate({
    set: { value },
  });
}
