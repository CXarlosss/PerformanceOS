import { PrismaClient, Role } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@performanceos.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "Admin123!";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log("✅ Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.create({
    data: {
      email: adminEmail,
      passwordHash: hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log("🚀 Admin user created successfully");
  console.log("Email:", adminEmail);

  // 🏋 GLOBAL EXERCISE CATALOG SEED
  const exercises = [
    {
      name: "Deadlift",
      category: "STRENGTH",
      muscleGroup: "BACK",
      isCompound: true,
    },
    {
      name: "Back Squat",
      category: "STRENGTH",
      muscleGroup: "LEGS",
      isCompound: true,
    },
    {
      name: "Bench Press",
      category: "STRENGTH",
      muscleGroup: "CHEST",
      isCompound: true,
    },
    {
      name: "Overhead Press",
      category: "STRENGTH",
      muscleGroup: "SHOULDERS",
      isCompound: true,
    },
    {
      name: "Bicep Curl",
      category: "HYPERTROPHY",
      muscleGroup: "ARMS",
      isCompound: false,
    },
    {
      name: "Tricep Extension",
      category: "HYPERTROPHY",
      muscleGroup: "ARMS",
      isCompound: false,
    },
  ];

  for (const ex of exercises) {
    const existing = await prisma.exercise.findFirst({
      where: { name: ex.name },
    });
    if (!existing) {
      await prisma.exercise.create({
        data: {
          name: ex.name,
          category: ex.category,
          muscleGroup: ex.muscleGroup,
          isCompound: ex.isCompound,
        },
      });
    }
  }
  console.log("🏋 Exercises seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
