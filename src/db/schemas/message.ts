import {
  index,
  json,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'
import { threadTable } from './thread'
import type { InferSelectModel } from 'drizzle-orm'

export const messageRoleEnum = pgEnum('message_role', [
  'user',
  'assistant',
  'system',
])

export const messageTable = pgTable(
  'messages',
  {
    id: uuid('id')
      .default(sql`pg_catalog.gen_random_uuid()`)
      .primaryKey(),
    threadId: uuid('thread_id')
      .notNull()
      .references(() => threadTable.id, { onDelete: 'cascade' }),
    role: messageRoleEnum('role').notNull(),
    parts: json('parts').notNull(),
    metadata: json('metadata'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [index('messages_thread_id_idx').on(table.threadId)],
)

export type DBMessage = InferSelectModel<typeof messageTable>
