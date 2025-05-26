import { Prisma } from '@prisma/client';
import { generateSlug } from '../utils/generators';
import { prisma } from '.';

const productsData: Prisma.ProductCreateInput[] = [
    {
        slug: generateSlug('iPhone 13 Pro Max - Used'),
        name: 'iPhone 13 Pro Max - Used',
        sku: 'APL-IP13PM-USED-256G-GR',
        description: 'Slightly used iPhone 13 Pro Max, 256GB, Graphite. Excellent condition with minor signs of wear. Includes original box and cable.',
        price: new Prisma.Decimal(750.00),
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-graphite-select?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1645552345944',
        stockQuantity: 15,
        minimumOrderQuantity: 1,
        brand: 'Apple',
        condition: 'used-like-new',
    },
    {
        slug: generateSlug('Samsung Galaxy S21 Ultra - Refurbished'),
        name: 'Samsung Galaxy S21 Ultra - Refurbished',
        sku: 'SAM-S21ULT-REF-128G-BLK',
        description: 'Professionally refurbished Samsung Galaxy S21 Ultra, 128GB, Phantom Black. Tested and certified, comes with a 90-day warranty.',
        price: new Prisma.Decimal(550.00),
        imageUrl: 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s21-ultra-5g-1.jpg',
        stockQuantity: 25,
        minimumOrderQuantity: 1,
        brand: 'Samsung',
        condition: 'refurbished',
    },
    {
        slug: generateSlug('Google Pixel 6 - Used Good'),
        name: 'Google Pixel 6 - Used Good',
        sku: 'GOO-PIX6-USED-128G-STM',
        description: 'Used Google Pixel 6, 128GB, Stormy Black. Good condition with some cosmetic scratches. Fully functional.',
        price: new Prisma.Decimal(320.00),
        imageUrl: 'https://www.bhphotovideo.com/images/images2500x2500/google_ga02910_us_pixel_6_dual_sim_128gb_1665072.jpg',
        stockQuantity: 10,
        minimumOrderQuantity: 1,
        brand: 'Google',
        condition: 'used-good',
    },
    {
        slug: generateSlug('OnePlus 9 Pro - Used'),
        name: 'OnePlus 9 Pro - Used',
        sku: 'ONP-9PRO-USED-256G-GRN',
        description: 'Used OnePlus 9 Pro, 256GB, Morning Mist. Excellent condition, includes Warp Charger.',
        price: new Prisma.Decimal(480.00),
        imageUrl: 'https://storage.comprasmartphone.com/smartphones/oneplus-9-pro.png',
        stockQuantity: 8,
        brand: 'OnePlus',
        condition: 'used-like-new',
        minimumOrderQuantity: 1,
    },
    {
        slug: generateSlug('Xiaomi Mi 11 - Refurbished'),
        name: 'Xiaomi Mi 11 - Refurbished',
        sku: 'XIA-MI11-REF-128G-BLU',
        description: 'Refurbished Xiaomi Mi 11, 128GB, Horizon Blue. Full working order, 6-month warranty.',
        price: new Prisma.Decimal(400.00),
        imageUrl: 'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1612767059.44259254.png',
        stockQuantity: 12,
        brand: 'Xiaomi',
        condition: 'refurbished',
        minimumOrderQuantity: 1,

    },
    {
        slug: generateSlug('iPhone 12 - Used'),
        name: 'iPhone 12 - Used',
        sku: 'APL-IP12-USED-128G-BLK',
        description: 'Used iPhone 12, 128GB, Black. Some light scratches on screen, otherwise good.',
        price: new Prisma.Decimal(450.00),
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-black-select-2020?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1604343702000',
        stockQuantity: 20,
        brand: 'Apple',
        condition: 'used-good',
        minimumOrderQuantity: 1,

    },
    {
        slug: generateSlug('Samsung Galaxy Note 20 - Used'),
        name: 'Samsung Galaxy Note 20 - Used',
        sku: 'SAM-N20-USED-256G-BRZ',
        description: 'Used Samsung Galaxy Note 20, 256GB, Mystic Bronze. S-Pen included, minor wear.',
        price: new Prisma.Decimal(420.00),
        imageUrl: 'https://viostore.vn/wp-content/uploads/2021/09/81qmTTzUlfL._AC_SL1500_.jpg',
        stockQuantity: 5,
        brand: 'Samsung',
        condition: 'used-good',
        minimumOrderQuantity: 1,

    },
    {
        slug: generateSlug('Oppo Find X3 Pro - Refurbished'),
        name: 'Oppo Find X3 Pro - Refurbished',
        sku: 'OPP-FX3PRO-REF-256G-BLK',
        description: 'Refurbished Oppo Find X3 Pro, 256GB, Gloss Black. Like new condition.',
        price: new Prisma.Decimal(580.00),
        imageUrl: 'https://image.oppo.com/content/dam/oppo/product-asset-library/find/fussi/2116x1668.png',
        stockQuantity: 7,
        brand: 'Oppo',
        condition: 'refurbished',
        minimumOrderQuantity: 1,

    },
    {
        slug: generateSlug('Realme GT Master Edition - Used'),
        name: 'Realme GT Master Edition - Used',
        sku: 'RME-GTME-USED-128G-GRY',
        description: 'Used Realme GT Master Edition, 128GB, Voyager Grey. Unique suitcase design, great state.',
        price: new Prisma.Decimal(250.00),
        imageUrl: 'https://www.kibotek.com/wp-content/uploads/2021/09/kiboTEK_REALME_GT_MASTER_EDITION_008.png',
        stockQuantity: 11,
        brand: 'Realme',
        condition: 'used-like-new',
        minimumOrderQuantity: 1,

    },
    {
        slug: generateSlug('iPhone SE (2020) - Used'),
        name: 'iPhone SE (2020) - Used',
        sku: 'APL-IPSE2-USED-64G-RED',
        description: 'Used iPhone SE (2nd Gen), 64GB, Product(RED). Compact and powerful, few scuffs.',
        price: new Prisma.Decimal(200.00),
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-red-select-2020?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1586574260392',
        stockQuantity: 18,
        brand: 'Apple',
        condition: 'used-good',
        minimumOrderQuantity: 1,

    }
];

async function main() {
    console.log('Start seeding ...');
    console.log('Using DB URL:', process.env.DATABASE_URL);

    await prisma.product.deleteMany();
    console.log('Deleted existing products.');

    for (const product of productsData) {
        console.log('Seeding product:', product.name);
        try {
            const p = await prisma.product.create({ data: product });
            console.log('Created product with id:', p.id);
        } catch (err) {
            if (err instanceof Error) {
                console.error('Error creating product:', err.message, '\nDetails:', err);
            } else {
                console.error('Unknown error:', err);
            }
        }
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });