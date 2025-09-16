// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

const FARMING_METHOD = ["Traditional", "Organic Farming", "Rain-fed Farming"];
const WEARTHER_RISK = ["Flood-prone", "Moderate Drought", "Typehoon Prone"];
const ENVIRONMENT = ["Irrigated Lowland", "Rainfed Lowland", "Cool Elevated", "Upland", "Saline"]
const SEASON = ["Dry Season", "Wet Season"]
const CROP_ESTABLISHMENT_TYPE = ["Transplanted", "Direct Wet Seeded", "Direct Dry Seeded"]
const SEED_CLASSIFICATION = ["Inbred", "Hybrid", "Special Rice", "Glutinous"]

async function main() {
  // Example: Create a default farmer
  await seedOneAdmin()
  await seedFarmingMethod();
  await seedWeatherRisk();

  console.log("Seeder Complete!");
}

const seedOneAdmin = async () => {
  await prisma.admin.deleteMany()
  const password =await bcrypt.hash("password", 10)
  await prisma.admin.create({
    data : {
        adminName   : "GEO-AGRI",
        email       : "geoagri@test.com",
        phoneNumber : "09131312233",
        username    : "adminone",
        password  
    }
  })
};

const seedFarmingMethod = async () => {
  const data = await Promise.all(
    FARMING_METHOD.map(
      async (data) =>
        await prisma.farmingMethod.upsert({
          where: {
            name: data,
          },
          create: { name: data },
          update: { name: data },
        }),
    ),
  );
  console.log("Farming Method Seeded!🌱");
  return data;
};

const seedWeatherRisk = async () => {
  const data = await Promise.all(
    WEARTHER_RISK.map(
      async (data) =>
        await prisma.weatherRisk.upsert({
          where: {
            name: data,
          },
          create: { name: data },
          update: { name: data },
        }),
    ),
  );
  console.log("Farming Method Seeded!🌱");
  return data;
};

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
