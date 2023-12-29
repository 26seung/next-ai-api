// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  primaryKey,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import type { AdapterAccount } from "@auth/core/adapters";

export const userRoleEnum = pgEnum("user_role_enum", ["system", "user"]);

// nextAuth
export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: userRoleEnum("role").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);
export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);

//  chat

export const chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  pdfName: text("pdf_name").notNull(),
  pdfUrl: text("pdf_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  fileKey: text("file_key").notNull(),
});

export type DrizzleChat = typeof chats.$inferSelect;

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  chatId: integer("chat_id")
    .references(() => chats.id)
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  role: userRoleEnum("role").notNull(),
});

// export const userSubscriptions = pgTable("user_subscriptions", {
//   id: serial("id").primaryKey(),
//   userId: varchar("user_id", { length: 256 }).notNull().unique(),
//   stripeCustomerId: varchar("stripe_customer_id", { length: 256 })
//     .notNull()
//     .unique(),
//   stripeSubscriptionId: varchar("stripe_subscription_id", {
//     length: 256,
//   }).unique(),
//   stripePriceId: varchar("stripe_price_id", { length: 256 }),
//   stripeCurrentPeriodEnd: timestamp("stripe_current_period_ended_at"),
// });

// drizzle-orm
// drizzle-kit
