import { PrismaClient, type SKU } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Start seeding...');

  // -----------------------------
  // 1. Seed Users
  // -----------------------------
  const users = [];
  for (let i = 0; i < 2; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        phone_number: faker.phone.number(),
      },
    });

    // Random addresses (0–3 per user)
    const addressCount = faker.number.int({ min: 0, max: 2 });
    for (let j = 0; j < addressCount; j++) {
      await prisma.address.create({
        data: {
          userId: user.id,
          fullName: faker.person.fullName(),
          phone: faker.phone.number(),
          line1: faker.location.streetAddress(),
          line2: faker.datatype.boolean()
            ? faker.location.secondaryAddress()
            : null,
          city: faker.location.city(),
          state: faker.location.state(),
          postal: faker.location.zipCode(),
          country: faker.location.country(),
        },
      });
    }

    users.push(user);
  }

  console.log(`👤 Users created: ${users.length}`);

  // -----------------------------
  // 2. Seed Products + SKUs
  // -----------------------------
  const products = [];

  for (let i = 0; i < 50; i++) {
    const imageCount = faker.number.int({ min: 0, max: 5 });

    const product = await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
        images: Array.from({ length: imageCount }).map(() =>
          faker.image.urlPicsumPhotos()
        ),
      },
    });

    // Create SKUs (2–6 per product)
    const skuCount = faker.number.int({ min: 2, max: 6 });
    for (let k = 0; k < skuCount; k++) {
      await prisma.sKU.create({
        data: {
          productId: product.id,
          skuCode: faker.string.alphanumeric(10),
          price: faker.number.int({ min: 500, max: 50000 }), // cents
          stock: faker.number.int({ min: 0, max: 200 }),
          attributes: {
            size: faker.helpers.arrayElement(['S', 'M', 'L', 'XL']),
            color: faker.color.human(),
          },
        },
      });
    }

    products.push(product);
  }

  console.log(`📦 Products created: ${products.length}`);
  console.log(`📦 Estimated SKUs created: ~200+`);

  // -----------------------------
  // 3. Seed Orders + OrderItems
  // -----------------------------
  const allSKUs = await prisma.sKU.findMany();
  const ordersToCreate = 40;

  for (let i = 0; i < ordersToCreate; i++) {
    const user = faker.helpers.arrayElement(users);

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        status: faker.helpers.arrayElement([
          'PENDING',
          'PAID',
          'SHIPPED',
          'COMPLETED',
        ]),
        total: 0, // update after creating items
      },
    });

    // 1–4 order items
    const itemCount = faker.number.int({ min: 1, max: 4 });
    let total = 0;

    for (let j = 0; j < itemCount; j++) {
      const sku = faker.helpers.arrayElement(allSKUs) as SKU;
      const quantity = faker.number.int({ min: 1, max: 5 });

      total += sku.price * quantity;

      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          skuId: sku.id,
          quantity,
          price: sku.price,
        },
      });
    }

    // update total
    await prisma.order.update({
      where: { id: order.id },
      data: { total },
    });
  }

  console.log(`🧾 Orders created: ${ordersToCreate}`);
}

main()
  .then(async () => {
    console.log('🌱 Seeding finished!');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
