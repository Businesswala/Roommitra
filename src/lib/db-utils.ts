import { prisma as db } from "./prisma";

/**
 * Antigravity Database Wrapper
 * 
 * Securely executes database calls, logs connection failures, 
 * and returns human-readable error messages for a "no-fail" developer experience.
 */
export async function dbCall<T>(
  operation: (prisma: typeof db) => Promise<T>,
  context: string = "Database Operation"
): Promise<{ data: T | null; error: string | null }> {
  try {
    const result = await operation(db);
    return { data: result, error: null };
  } catch (err: any) {
    // 1. Log the full error securely (Internal)
    console.error(`[ANTIGRAVITY DB ERROR] ${context}:`, err);

    // 2. Map Common Prisma/Connection Errors
    let userMessage = "Something went wrong with the database connection.";

    if (err.code === 'P2002') {
      userMessage = "Unique constraint failed. This item already exists.";
    } else if (err.code === 'P1001') {
      userMessage = "Unable to reach the database. Check your connection URL.";
    } else if (err.code === 'P1008') {
      userMessage = "Database operation timed out. Please try again.";
    } else if (err.message?.includes("Invalid auth")) {
      userMessage = "Database authentication failed. Check your environment variables.";
    }

    return { data: null, error: userMessage };
  }
}
