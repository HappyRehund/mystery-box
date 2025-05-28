// prisma/seed.ts
import { PrismaClient, OrderStatus, PaymentStatus } from "../src/generated/client";
import { Decimal } from "../src/generated/client/runtime/library";

const prisma = new PrismaClient();

async function main() {
  // Bersihkan database jika diperlukan
  await prisma.mysteryBox.deleteMany();
  await prisma.category.deleteMany();
  console.log("Database cleared!");

  // Buat categories
  const techCategory = await prisma.category.create({
    data: {
      name: "Technology",
      description: "Mystery boxes containing tech gadgets and accessories",
    },
  });

  const fashionCategory = await prisma.category.create({
    data: {
      name: "Fashion",
      description: "Mystery boxes with clothing and fashion accessories",
    },
  });

  const healthCategory = await prisma.category.create({
    data: {
      name: "Health and Wellness",
      description: "Mystery boxes with health and wellness products",
    },
  });

  const artCategory = await prisma.category.create({
    data: {
      name: "Art and Craft",
      description: "Mystery boxes with art and craft supplies",
    },
  });

  const culinaryCategory = await prisma.category.create({
    data: {
      name: "Culinary",
      description: "Mystery boxes with culinary tools and ingredients",
    },
  });

  const petCategory = await prisma.category.create({
    data: {
      name: "Pet",
      description: "Mystery boxes with pet supplies and toys",
    },
  });

  const gamingCategory = await prisma.category.create({
    data: {
      name: "Gaming",
      description: "Mystery boxes with gaming accessories and items",
    },
  });

  const mangaCategory = await prisma.category.create({
    data: {
      name: "Manga",
      description: "Mystery boxes with manga and related items",
    },
  });

  const actionFigureCategory = await prisma.category.create({
    data: {
      name: "Action Figure",
      description: "Mystery boxes with action figures and collectibles",
    },
  });

  const beautyCategory = await prisma.category.create({
    data: {
      name: "Beauty",
      description: "Mystery boxes with beauty products and accessories",
    },
  });

  const foodCategory = await prisma.category.create({
    data: {
      name: "Food and Snacks",
      description: "Mystery boxes with various food and snack items",
    },
  });

  const kidsCategory = await prisma.category.create({
    data: {
      name: "Kids",
      description: "Mystery boxes with toys and items for kids",
    },
  });

  const sportsCategory = await prisma.category.create({
    data: {
      name: "Sports",
      description: "Mystery boxes with sports equipment and accessories",
    },
  });

  // Buat mystery boxes
  const techBox = await prisma.mysteryBox.create({
    data: {
      name: "Tech Surprise",
      description: "A mystery box full of tech gadgets",
      price: new Decimal(99.99),
      imageUrl: "/images/mystery-headphones.webp",
      categoryId: techCategory.id,
    },
  });

  const fashionBox = await prisma.mysteryBox.create({
    data: {
      name: "Fashion Finds",
      description: "Trendy fashion items in a mystery box",
      price: new Decimal(79.99),
      imageUrl: "/images/luxury-sofa.webp",
      categoryId: fashionCategory.id,
    },
  });

  const premiumTechBox = await prisma.mysteryBox.create({
    data: {
      name: "Premium Tech Box",
      description: "High-end tech gadgets and accessories",
      price: new Decimal(199.99),
      imageUrl: "/images/smartphone-box.webp",
      categoryId: techCategory.id,
    },
  });

  const wellnessBox = await prisma.mysteryBox.create({
    data: {
      name: "Wellness Essentials",
      description: "A box of health and wellness items",
      price: new Decimal(69.99),
      imageUrl: "/images/wellness.webp",
      categoryId: healthCategory.id,
    },
  });

  const artBox = await prisma.mysteryBox.create({
    data: {
      name: "Artistic Creations",
      description: "Art and craft supplies for creative minds",
      price: new Decimal(59.99),
      imageUrl: "/images/art.webp",
      categoryId: artCategory.id,
    },
  });

  const culinaryBox = await prisma.mysteryBox.create({
    data: {
      name: "Culinary Delights",
      description: "Tools and ingredients for cooking enthusiasts",
      price: new Decimal(89.99),
      imageUrl: "/images/culinary.webp",
      categoryId: culinaryCategory.id,
    },
  });

  const petBox = await prisma.mysteryBox.create({
    data: {
      name: "Pet Pampering",
      description: "Items for your furry friends",
      price: new Decimal(49.99),
      imageUrl: "/images/pet.webp",
      categoryId: petCategory.id,
    },
  });

  const gamingBox = await prisma.mysteryBox.create({
    data: {
      name: "Gamer Gear",
      description: "Gaming accessories and collectibles",
      price: new Decimal(129.99),
      imageUrl: "/images/gaming.webp",
      categoryId: gamingCategory.id,
    },
  });

  const mangaBox = await prisma.mysteryBox.create({
    data: {
      name: "Manga Mania",
      description: "Manga and related merchandise",
      price: new Decimal(39.99),
      imageUrl: "/images/manga.webp",
      categoryId: mangaCategory.id,
    },
  });

  const actionFigureBox = await prisma.mysteryBox.create({
    data: {
      name: "Action Figure Frenzy",
      description: "Collectible action figures",
      price: new Decimal(149.99),
      imageUrl: "/images/action-figure.webp",
      categoryId: actionFigureCategory.id,
    },
  });

  const beautyBox = await prisma.mysteryBox.create({
    data: {
      name: "Beauty Bliss",
      description: "Beauty products and accessories",
      price: new Decimal(74.99),
      imageUrl: "/images/beauty.webp",
      categoryId: beautyCategory.id,
    },
  });

  const snackBox = await prisma.mysteryBox.create({
    data: {
      name: "Snack Attack",
      description: "A variety of delicious snacks",
      price: new Decimal(29.99),
      imageUrl: "/images/snacks.webp",
      categoryId: foodCategory.id,
    },
  });

  const kidsBox = await prisma.mysteryBox.create({
    data: {
      name: "Kids Fun",
      description: "Toys and items for children",
      price: new Decimal(64.99),
      imageUrl: "/images/kids-toy.webp",
      categoryId: kidsCategory.id,
    },
  });

  const sportsBox = await prisma.mysteryBox.create({
    data: {
      name: "Sports Surprise",
      description: "Sports equipment and accessories",
      price: new Decimal(109.99),
      imageUrl: "/images/sports.webp",
      categoryId: sportsCategory.id,
    },
  });

  const techBox2 = await prisma.mysteryBox.create({
    data: {
      name: "Tech Gadgets",
      description: "More tech gadgets",
      price: new Decimal(119.99),
      imageUrl: "/images/mystery-headphones.webp",
      categoryId: techCategory.id,
    },
  });

  const fashionBox2 = await prisma.mysteryBox.create({
    data: {
      name: "Fashion Style",
      description: "More fashion items",
      price: new Decimal(84.99),
      imageUrl: "/images/tablet-box.webp",
      categoryId: fashionCategory.id,
    },
  });

  const healthBox2 = await prisma.mysteryBox.create({
    data: {
      name: "Health Boost",
      description: "More health essentials",
      price: new Decimal(79.99),
      imageUrl: "/images/beauty.webp",
      categoryId: healthCategory.id,
    },
  });

  const artBox2 = await prisma.mysteryBox.create({
    data: {
      name: "Art Supplies",
      description: "More art supplies",
      price: new Decimal(69.99),
      imageUrl: "/images/art.webp",
      categoryId: artCategory.id,
    },
  });

  const culinaryBox2 = await prisma.mysteryBox.create({
    data: {
      name: "Cooking Tools",
      description: "Additional cooking tools",
      price: new Decimal(94.99),
      imageUrl: "/images/tablet-box.webp",
      categoryId: culinaryCategory.id,
    },
  });

  const petBox2 = await prisma.mysteryBox.create({
    data: {
      name: "Pet Toys",
      description: "More pet toys",
      price: new Decimal(54.99),
      imageUrl: "/images/tablet-box.webp",
      categoryId: petCategory.id,
    },
  });

  const gamingBox2 = await prisma.mysteryBox.create({
    data: {
      name: "Gaming Gear 2",
      description: "More gaming accessories",
      price: new Decimal(134.99),
      imageUrl: "/images/tablet-box.webp",
      categoryId: gamingCategory.id,
    },
  });

  const mangaBox2 = await prisma.mysteryBox.create({
    data: {
      name: "Manga Collection",
      description: "More manga items",
      price: new Decimal(44.99),
      imageUrl: "/images/tablet-box.webp",
      categoryId: mangaCategory.id,
    },
  });

  const actionFigureBox2 = await prisma.mysteryBox.create({
    data: {
      name: "Action Figures 2",
      description: "More collectible figures",
      price: new Decimal(154.99),
      imageUrl: "/images/tablet-box.webp",
      categoryId: actionFigureCategory.id,
    },
  });

  const beautyBox2 = await prisma.mysteryBox.create({
    data: {
      name: "Beauty Products",
      description: "More beauty items",
      price: new Decimal(79.99),
      imageUrl: "/images/tablet-box.webp",
      categoryId: beautyCategory.id,
    },
  });

  const snackBox2 = await prisma.mysteryBox.create({
    data: {
      name: "Snack Box 2",
      description: "More snacks",
      price: new Decimal(34.99),
      imageUrl: "/images/tablet-box.webp",
      categoryId: foodCategory.id,
    },
  });

  const kidsBox2 = await prisma.mysteryBox.create({
    data: {
      name: "Kids Toys",
      description: "More toys for kids",
      price: new Decimal(69.99),
      imageUrl: "/images/kids-toy.webp",
      categoryId: kidsCategory.id,
    },
  });

  const sportsBox2 = await prisma.mysteryBox.create({
    data: {
      name: "Sports Gear",
      description: "More sports gear",
      price: new Decimal(114.99),
      imageUrl: "/images/tablet-box.webp",
      categoryId: sportsCategory.id,
    },
  });

  const techBox3 = await prisma.mysteryBox.create({
    data: {
      name: "Tech Essentials",
      description: "More tech tools",
      price: new Decimal(124.99),
      imageUrl: "/images/tablet-box.webp",
      categoryId: techCategory.id,
    },
  });

  const fashionBox3 = await prisma.mysteryBox.create({
    data: {
      name: "Fashion Accessories",
      description: "More fashion accessories",
      price: new Decimal(89.99),
      imageUrl: "/images/tablet-box.webp",
      categoryId: fashionCategory.id,
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
