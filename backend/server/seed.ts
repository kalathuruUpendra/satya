import { db } from "./database";
import { users } from "@shared/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

export async function seedDefaultUsers() {
  try {
    console.log("🌱 Seeding default users...");

    // Check if admin user already exists
    const existingAdmin = await db
      .select()
      .from(users)
      .where(eq(users.username, "admin"))
      .limit(1);

    if (existingAdmin.length === 0) {
      const hashedAdminPassword = await bcrypt.hash("admin123", 10);
      await db.insert(users).values({
        username: "admin",
        password: hashedAdminPassword,
        role: "frontdesk",
        fullName: "System Administrator",
        email: "admin@satyasri.com",
        phone: "9999999999",
      });
      console.log("✅ Admin user created successfully");
    } else {
      console.log("ℹ️  Admin user already exists");
    }

    // Check if tech user already exists
    const existingTech = await db
      .select()
      .from(users)
      .where(eq(users.username, "tech"))
      .limit(1);

    if (existingTech.length === 0) {
      const hashedTechPassword = await bcrypt.hash("tech123", 10);
      await db.insert(users).values({
        username: "tech",
        password: hashedTechPassword,
        role: "technician",
        fullName: "Lead Technician",
        email: "tech@satyasri.com",
        phone: "8888888888",
      });
      console.log("✅ Tech user created successfully");
    } else {
      console.log("ℹ️  Tech user already exists");
    }

    console.log("🎉 Default users seeding completed!");
  } catch (error) {
    console.error("❌ Error seeding default users:", error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDefaultUsers()
    .then(() => {
      console.log("Seeding finished successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Seeding failed:", error);
      process.exit(1);
    });
}