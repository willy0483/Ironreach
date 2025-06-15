import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = Array.from({ length: 10 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    bio: faker.lorem.sentence(),
    avatar: faker.image.avatar(),
  }));

  await prisma.user.createMany({
    data: users,
  });
  console.log('Seeding Completed!');
}

main()
  .then(() => {
    void prisma.$disconnect();
    process.exit(0);
  })
  .catch((e) => {
    void prisma.$disconnect();
    console.error(e);
    process.exit(1);
  });
