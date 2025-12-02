import { PrismaClient, type SKU } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Start seeding...');

  // 清空所有資料，確保每次執行環境乾淨（生產環境請勿執行！）
  // 由於數據量少，使用 deleteMany 較快
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.address.deleteMany();
  await prisma.product.deleteMany();
  await prisma.sKU.deleteMany();
  await prisma.user.deleteMany();
  console.log('🗑️ Previous data cleared.');

  // -----------------------------
  // 1. Seed Users and Addresses
  // -----------------------------
  const users = [];

  // 創建 5 個用戶
  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        phone_number: faker.phone.number(),
      },
    });

    // 隨機地址 (1–3 per user, 至少一個)
    const addressCount = faker.number.int({ min: 1, max: 3 });
    for (let j = 0; j < addressCount; j++) {
      const isDefault = j === 0;

      await prisma.address.create({
        data: {
          userId: user.id,
          fullName: faker.person.fullName(),
          phone: faker.phone.number(),
          line1: faker.location.streetAddress(),
          line2: faker.datatype.boolean()
            ? faker.location.secondaryAddress()
            : null,
          city: faker.helpers.arrayElement([
            '台北市',
            '新北市',
            '桃園市',
            '台中市',
            '高雄市',
          ]),
          state: null,
          postal: faker.location.zipCode('#####'),
          country: 'Taiwan',
          isDefault: isDefault,
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
  const allSKUs: SKU[] = [];

  // 創建 50 個產品
  for (let i = 0; i < 50; i++) {
    const imageCount = faker.number.int({ min: 1, max: 5 });

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

    // 每個產品創建 2–6 個 SKU
    const skuCount = faker.number.int({ min: 2, max: 6 });
    for (let k = 0; k < skuCount; k++) {
      const sku = await prisma.sKU.create({
        data: {
          productId: product.id,
          skuCode: faker.string.alphanumeric(10).toUpperCase(),
          price: faker.number.int({ min: 500, max: 50000 }),
          stock: faker.number.int({ min: 0, max: 200 }),
          attributes: {
            size: faker.helpers.arrayElement(['S', 'M', 'L', 'XL']),
            color: faker.color.human(),
          },
        },
      });
      allSKUs.push(sku as SKU);
    }

    products.push(product);
  }

  console.log(`📦 Products created: ${products.length}`);
  console.log(`📦 Total SKUs created: ${allSKUs.length}`);

  // -----------------------------
  // 3. Seed Wishlist (新步驟 - 使用隱式多對多)
  // -----------------------------
  const wishlistItemsToCreate = 60;

  for (let i = 0; i < wishlistItemsToCreate; i++) {
    const user = faker.helpers.arrayElement(users);
    const product = faker.helpers.arrayElement(products); // 關聯到 Product

    try {
      // 使用 connect 語法來建立 User 和 Product 之間的隱式關聯
      await prisma.user.update({
        where: { id: user.id },
        data: {
          wishlist: {
            connect: {
              id: product.id,
            },
          },
        },
      });
    } catch (error) {
      // 如果用戶已經收藏過這個 Product，Prisma 會忽略，但為了健壯性，我們使用 try/catch
    }
  }

  console.log(`💖 Wishlist items created (Products): ${wishlistItemsToCreate}`);

  // -----------------------------
  // 4. Seed Orders + OrderItems
  // -----------------------------
  const ordersToCreate = 40;

  for (let i = 0; i < ordersToCreate; i++) {
    const user = faker.helpers.arrayElement(users);

    const shippingAddresses = await prisma.address.findMany({
      where: { userId: user.id },
    });

    // 確保用戶有地址才能創建訂單
    if (shippingAddresses.length === 0) continue;

    // 建立訂單
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        status: faker.helpers.arrayElement([
          'PENDING',
          'PAID',
          'SHIPPED',
          'COMPLETED',
          'CANCELED',
        ]),
        total: 0,
        shippingAddressId: faker.helpers.arrayElement(shippingAddresses).id,
      },
    });

    // 1–4 訂單商品
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

    // 更新 total
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
