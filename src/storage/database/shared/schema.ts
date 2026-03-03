import { pgTable, bigint, text, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"



export const image = pgTable("image", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
	imageUrl: text("image_url"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
})

// Zod schemas for validation
export const insertImageSchema = createInsertSchema(image, {
  imageUrl: z.string().url().min(1, "Image URL is required")
})

// TypeScript types
export type Image = typeof image.$inferSelect
export type InsertImage = z.infer<typeof insertImageSchema>

