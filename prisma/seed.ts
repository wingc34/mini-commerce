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
          price: faker.number.int({ min: 10, max: 1000 }),
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
