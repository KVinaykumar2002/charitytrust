import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

// Simple ID generator
const createId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// User table (for better-auth)
export const user = sqliteTable("user", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("emailVerified", { mode: "boolean" }),
  image: text("image"),
  role: text("role").default("user"), // "user" or "admin"
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

// Session table (for better-auth)
export const session = sqliteTable("session", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("createdAt", { mode: "timestamp" }),
  updatedAt: integer("updatedAt", { mode: "timestamp" }),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
});

// Account table (for better-auth)
export const account = sqliteTable("account", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  expiresAt: integer("expiresAt", { mode: "timestamp" }),
  password: text("password"),
  createdAt: integer("createdAt", { mode: "timestamp" }),
  updatedAt: integer("updatedAt", { mode: "timestamp" }),
});

// Verification table (for better-auth)
export const verification = sqliteTable("verification", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }),
  updatedAt: integer("updatedAt", { mode: "timestamp" }),
});

// Programs table
export const programs = sqliteTable("programs", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  image: text("image").notNull(),
  link: text("link"),
  featured: integer("featured", { mode: "boolean" }).default(false),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Projects table
export const projects = sqliteTable("projects", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  category: text("category").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("imageUrl").notNull(),
  href: text("href"),
  featured: integer("featured", { mode: "boolean" }).default(false),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Events table
export const events = sqliteTable("events", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("imageUrl"),
  location: text("location"),
  eventDate: integer("eventDate", { mode: "timestamp" }).notNull(),
  startTime: text("startTime"),
  endTime: text("endTime"),
  registrationLink: text("registrationLink"),
  featured: integer("featured", { mode: "boolean" }).default(false),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Testimonials table
export const testimonials = sqliteTable("testimonials", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  name: text("name").notNull(),
  role: text("role"),
  content: text("content").notNull(),
  imageUrl: text("imageUrl"),
  rating: integer("rating"),
  featured: integer("featured", { mode: "boolean" }).default(false),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Donations table
export const donations = sqliteTable("donations", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  donorName: text("donorName").notNull(),
  email: text("email"),
  phone: text("phone"),
  amount: real("amount").notNull(),
  currency: text("currency").default("INR"),
  paymentMethod: text("paymentMethod"),
  paymentStatus: text("paymentStatus").default("pending"), // pending, completed, failed
  programId: text("programId").references(() => programs.id),
  projectId: text("projectId").references(() => projects.id),
  notes: text("notes"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

