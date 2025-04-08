// prisma/seed.ts
import { PrismaClient, OrderStatus, PaymentStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

async function main() {
  // Bersihkan database jika diperlukan
  // Hapus komentar bagian ini jika Anda ingin menghapus data yang ada
  
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.mysteryBox.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  console.log('Database cleared!');

  // Buat users
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      name: 'User One',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      name: 'User Two',
    },
  });

  // Buat categories
  const techCategory = await prisma.category.create({
    data: {
      name: 'Technology',
      description: 'Mystery boxes containing tech gadgets and accessories',
    },
  });

  const fashionCategory = await prisma.category.create({
    data: {
      name: 'Fashion',
      description: 'Mystery boxes with clothing and fashion accessories',
    },
  });

  // Buat mystery boxes
  const techBox = await prisma.mysteryBox.create({
    data: {
      name: 'Tech Surprise',
      description: 'A mystery box full of tech gadgets',
      price: new Decimal(99.99),
      imageUrl: '/images/mystery-headphones.webp',
      categoryId: techCategory.id,
    },
  });

  const fashionBox = await prisma.mysteryBox.create({
    data: {
      name: 'Fashion Finds',
      description: 'Trendy fashion items in a mystery box',
      price: new Decimal(79.99),
      imageUrl: '/images/luxury-sofa.webp',
      categoryId: fashionCategory.id,
    },
  });

  const premiumTechBox = await prisma.mysteryBox.create({
    data: {
      name: 'Premium Tech Box',
      description: 'High-end tech gadgets and accessories',
      price: new Decimal(199.99),
      imageUrl: '/images/smartphone-box.webp',
      categoryId: techCategory.id,
    },
  });

  // Buat order untuk user1
  const order1 = await prisma.order.create({
    data: {
      userId: user1.id,
      status: OrderStatus.PAID,
      totalPrice: new Decimal(99.99),
    },
  });

  // Tambahkan order item ke order1
  await prisma.orderItem.create({
    data: {
      orderId: order1.id,
      mysteryBoxId: techBox.id,
      quantity: 1,
      price: techBox.price,
    },
  });

  // Buat payment untuk order1
  await prisma.payment.create({
    data: {
      orderId: order1.id,
      amount: new Decimal(99.99),
      status: PaymentStatus.COMPLETED,
      method: 'Credit Card',
    },
  });

  // Buat order untuk user2 dengan multiple items
  const order2 = await prisma.order.create({
    data: {
      userId: user2.id,
      status: OrderStatus.PENDING,
      totalPrice: new Decimal(279.98), // 199.99 + 79.99
    },
  });

  // Tambahkan order items ke order2
  await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      mysteryBoxId: premiumTechBox.id,
      quantity: 1,
      price: premiumTechBox.price,
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      mysteryBoxId: fashionBox.id,
      quantity: 1,
      price: fashionBox.price,
    },
  });

  // Buat payment untuk order2
  await prisma.payment.create({
    data: {
      orderId: order2.id,
      amount: new Decimal(279.98),
      status: PaymentStatus.PENDING,
      method: 'PayPal',
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });