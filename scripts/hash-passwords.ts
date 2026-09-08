/**
 * ONE-TIME migration: the old backend stored passwords in plaintext.
 * This hashes every existing user's password in place with bcrypt so
 * actions/auth.ts (which now uses bcrypt.compare) keeps working for
 * pre-existing accounts, without anyone needing to reset a password.
 *
 * Run once against production, then delete this file:
 *   npx tsx scripts/hash-passwords.ts
 */
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

async function main() {
  const users = await prisma.user.findMany({ select: { id: true, password: true } });
  let migrated = 0;

  for (const user of users) {
    // bcrypt hashes always start with $2 — skip anyone already migrated
    // (safe to re-run).
    if (user.password.startsWith("$2")) continue;
    const hashed = await bcrypt.hash(user.password, 10);
    await prisma.user.update({ where: { id: user.id }, data: { password: hashed } });
    migrated++;
  }

  console.log(`Hashed ${migrated} of ${users.length} user password(s).`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
