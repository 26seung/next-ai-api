// https://orm.drizzle.team/docs/sql-schema-declaration
// npx drizzle-kit push:pg

import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  primaryKey,
  timestamp,
  varchar,
  uuid,
} from "drizzle-orm/pg-core";

import type { AdapterAccount } from "@auth/core/adapters";

// nextAuth
export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
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
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);
export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

//  chat
export type DrizzleChat = typeof chats.$inferSelect;
export type NewChat = typeof chats.$inferInsert;
export type InMessage = typeof messages.$inferInsert;

export const messagesRoleEnum = pgEnum("user_role_enum", ["system", "user"]);
export const chatsRoleEnum = pgEnum("chat_type_enum", ["chat", "image", "pdf"]);

export const chats = pgTable("chats", {
  id: text("id").notNull().primaryKey(),
  type: chatsRoleEnum("chat_type").notNull(),
  content: text("content").notNull(),
  // chat: text("chat_type").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  chatId: text("chat_id")
    .references(() => chats.id, { onDelete: "cascade" })
    .notNull(),
  content: text("content").notNull(),
  role: messagesRoleEnum("role").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const pdf = pgTable("pdf", {
  id: serial("id").primaryKey(),
  pdfName: text("pdf_name").notNull(),
  pdfUrl: text("pdf_url").notNull(),
  chatId: text("chat_id")
    .references(() => chats.id, { onDelete: "cascade" })
    .notNull(),
  fileKey: text("file_key").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
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
