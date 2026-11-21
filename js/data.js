/**
 * Muzaffargarh City Hub - Verified Business Directory Data
 * Phase 2 & Dedicated Storefront Edition: Live Verified Registry & Product Catalogs
 * Extensible data structure: to add more businesses, append objects to the array.
 * Real image support:
 *   - Business cover image: specify relative path in `image` (e.g. "images/she-jewelers.jpg") or keep null for luxury fallback.
 *   - Product images: specify relative path in `products[i].image` (e.g. "images/products/chicago-pizza.jpg") or keep null for luxury fallback.
 */

const businesses = [
  {
    id: 1,
    name: "She Jewelers",
    category: "Jewelry",
    icon: "gem",
    image: "images/she-jewelers.jpg",
    contactPerson: null,
    phoneDisplay: "0321-7486566",
    whatsapp: "923217486566",
    address: "Hassan Plaza, Shop #5, 1st Floor, Muzaffargarh",
    priceRange: "Rs. 200 – Rs. 20,000",
    accent: "#f59e0b",
    products: [
      {
        name: "Artificial Jewelry Set",
        price: "Rs. 3,500",
        description: "Complete royal gold-plated artificial set with matching earrings and teeka.",
        image: null // e.g., "images/products/she-jewelry-set.jpg"
      },
      {
        name: "Kundan Bridal Set",
        price: "Rs. 18,500",
        description: "Handcrafted traditional Multani Kundan bridal set with choker and jhumkas.",
        image: null // e.g., "images/products/kundan-bridal-set.jpg"
      },
      {
        name: "Party Wear Choker",
        price: "Rs. 2,800",
        description: "Delicate cubic zirconia pearl choker designed for festive gatherings.",
        image: null // e.g., "images/products/party-choker.jpg"
      },
      {
        name: "Fashion Bangles & Kangans",
        price: "Rs. 1,400",
        description: "Set of 4 micro-gold polished studded designer bangles.",
        image: null // e.g., "images/products/fashion-bangles.jpg"
      },
      {
        name: "Traditional Jhumkas",
        price: "Rs. 950",
        description: "Lightweight antique-finish hanging jhumkas with emerald green beads.",
        image: null // e.g., "images/products/traditional-jhumkas.jpg"
      },
      {
        name: "Bridal Matha Patti",
        price: "Rs. 4,200",
        description: "Elaborate forehead jewelry adorned with crystal pearls and stone work.",
        image: null // e.g., "images/products/bridal-matha-patti.jpg"
      }
    ]
  },
  {
    id: 2,
    name: "Time Book Center",
    category: "Books",
    icon: "book-open",
    image: "images/time-book-center.jpg",
    contactPerson: "Ahmer",
    phoneDisplay: "0332-8064376",
    whatsapp: "923328064376",
    address: "Water Plant, Near Quba Optical Center, Muzaffargarh",
    priceRange: "Rs. 20 – Rs. 20,000",
    accent: "#38bdf8",
    products: [
      {
        name: "Oxford Advanced Learner's Dictionary",
        price: "Rs. 1,850",
        description: "Original latest edition English-Urdu comprehensive reference dictionary.",
        image: null // e.g., "images/products/oxford-dictionary.jpg"
      },
      {
        name: "Matric & Inter Science Textbooks",
        price: "Rs. 1,200",
        description: "Complete Punjab Curriculum & Textbook Board (PCTB) verified course books.",
        image: null // e.g., "images/products/science-textbooks.jpg"
      },
      {
        name: "Premium Executive Diary & Pen Set",
        price: "Rs. 1,500",
        description: "Leatherette ruled notebook with heavy metal matte black rollerball pen.",
        image: null // e.g., "images/products/diary-pen-set.jpg"
      },
      {
        name: "School & College Stationery Kit",
        price: "Rs. 650",
        description: "Complete geometry box, highlighters, scales, eraser and sketching pencils.",
        image: null // e.g., "images/products/stationery-kit.jpg"
      },
      {
        name: "CSS & PMS Competitive Exam Guides",
        price: "Rs. 2,400",
        description: "Up-to-date Pakistan Affairs, Current Affairs & General Knowledge compilations.",
        image: null // e.g., "images/products/css-exam-guides.jpg"
      },
      {
        name: "Islamic History & Urdu Literature Classics",
        price: "Rs. 950",
        description: "Selected literary works and biographies in durable hardbound print.",
        image: null // e.g., "images/products/urdu-literature.jpg"
      }
    ]
  },
  {
    id: 3,
    name: "She Purse House",
    category: "Fashion",
    icon: "shopping-bag",
    image: "images/she-purse-house.jpg",
    contactPerson: null,
    phoneDisplay: "0300-0791699",
    whatsapp: "923000791699",
    address: "Hassan Plaza, Shop #18, Muzaffargarh",
    priceRange: "Best Market Rates",
    accent: "#ec4899",
    products: [
      {
        name: "Luxury Bridal Clutch",
        price: "Rs. 3,800",
        description: "Heavy zardozi and crystal embellished formal bridal evening clutch.",
        image: null // e.g., "images/products/bridal-clutch.jpg"
      },
      {
        name: "Premium Leatherette Tote Bag",
        price: "Rs. 2,900",
        description: "Spacious multi-compartment daily shoulder handbag for working ladies.",
        image: null // e.g., "images/products/leatherette-tote.jpg"
      },
      {
        name: "Sleek Ladies Bifold Wallet",
        price: "Rs. 1,100",
        description: "Compact textured vegan leather wallet with card slots and coin pouch.",
        image: null // e.g., "images/products/ladies-wallet.jpg"
      },
      {
        name: "Crossbody Casual Sling",
        price: "Rs. 1,750",
        description: "Trendy lightweight chain-strap crossbody purse for daily outings.",
        image: null // e.g., "images/products/crossbody-sling.jpg"
      },
      {
        name: "Imported Velvet Vanity Case",
        price: "Rs. 2,200",
        description: "Portable cosmetic organizer with integrated vanity mirror and dividers.",
        image: null // e.g., "images/products/vanity-case.jpg"
      },
      {
        name: "Matte Lip & Face Cosmetics Kit",
        price: "Rs. 1,600",
        description: "Curated long-wear waterproof cosmetic collection for bridal and party use.",
        image: null // e.g., "images/products/cosmetics-kit.jpg"
      }
    ]
  },
  {
    id: 4,
    name: "Flavor Bazar Pizza Shop",
    category: "Food",
    icon: "pizza",
    image: "images/flavor-bazar.jpg",
    contactPerson: "Hassnain",
    phoneDisplay: "0326-0861111",
    whatsapp: "923260861111",
    address: "Alipur Road, Opposite Total Petrol Pump, Muzaffargarh",
    priceRange: "Freshly Made Menu",
    accent: "#ef4444",
    products: [
      {
        name: "All Flavor Supreme Pizza",
        price: "Rs. 1,450",
        description: "Loaded combination of smoked chicken, sausages, olives, mushrooms and mozzarella.",
        image: null // e.g., "images/products/all-flavor-pizza.jpg"
      },
      {
        name: "Crunchy Zinger Burger",
        price: "Rs. 420",
        description: "Crispy fried golden chicken breast fillet with iceberg lettuce and secret sauce.",
        image: null // e.g., "images/products/zinger-burger.jpg"
      },
      {
        name: "Deep Dish Chicago Style Pizza",
        price: "Rs. 1,950",
        description: "Authentic high-crust pizza packed with molten mozzarella, beef pepperoni and crushed tomato sauce.",
        image: null // e.g., "images/products/chicago-style-pizza.jpg"
      },
      {
        name: "Flaming Peri Peri Pizza",
        price: "Rs. 1,350",
        description: "Spicy grilled peri-peri chicken chunks topped with jalapeños and spicy drizzle.",
        image: null // e.g., "images/products/peri-peri-pizza.jpg"
      },
      {
        name: "Original Chicago Pizza",
        price: "Rs. 1,800",
        description: "Signature classic deep crust stuffed with double cheese and seasoned chicken.",
        image: null // e.g., "images/products/original-chicago.jpg"
      },
      {
        name: "Beyond Butter Delight Pizza",
        price: "Rs. 1,400",
        description: "Rich buttery sauce base with herb-marinated chicken and caramelized onions.",
        image: null // e.g., "images/products/beyond-butter-pizza.jpg"
      },
      {
        name: "Greek BBQ Smoked Pizza",
        price: "Rs. 1,350",
        description: "Smoky barbecue chicken, bell peppers, sweet red onions and feta cheese.",
        image: null // e.g., "images/products/greek-bbq-pizza.jpg"
      },
      {
        name: "Authentic Arabic Fatayer",
        price: "Rs. 580",
        description: "Traditional baked pastry boat filled with spiced minced chicken and melted cheese.",
        image: null // e.g., "images/products/arabic-fatayer.jpg"
      },
      {
        name: "Egyptian Herbed Fatayer",
        price: "Rs. 620",
        description: "Flaky layered Middle Eastern pie stuffed with cheese, olives and za'atar herbs.",
        image: null // e.g., "images/products/egyptian-fatayer.jpg"
      },
      {
        name: "Cheese Lover Extreme Pizza",
        price: "Rs. 1,550",
        description: "Four-cheese fusion featuring stretchy mozzarella, sharp cheddar, gouda and parmesan.",
        image: null // e.g., "images/products/cheese-lover-pizza.jpg"
      }
    ]
  },
  {
    id: 5,
    name: "Aliza Cake",
    category: "Bakery",
    icon: "cake",
    image: "images/aliza-cake.jpg",
    contactPerson: null,
    phoneDisplay: "0306-1919029",
    whatsapp: "923061919029",
    address: "Qinwan Chowk, Muzaffargarh",
    priceRange: "Starting Rs. 1,000+",
    accent: "#fb7185",
    products: [
      {
        name: "Custom Fondant Theme Cake (2 Lbs)",
        price: "Rs. 2,800",
        description: "Bespoke handcrafted fondant design tailored for birthdays and anniversaries.",
        image: null // e.g., "images/products/custom-fondant-cake.jpg"
      },
      {
        name: "Belgian Chocolate Fudge Cake",
        price: "Rs. 1,900",
        description: "Decadent moist dark chocolate sponge layered with rich warm fudge ganache.",
        image: null // e.g., "images/products/chocolate-fudge-cake.jpg"
      },
      {
        name: "Royal Red Velvet Cream Cheese Cake",
        price: "Rs. 2,100",
        description: "Classic scarlet cocoa sponge paired with silky imported cream cheese frosting.",
        image: null // e.g., "images/products/red-velvet-cake.jpg"
      },
      {
        name: "Multi-Tier Wedding Celebration Cake",
        price: "Rs. 6,500",
        description: "Majestic tiered floral cake designed to be the centerpiece of wedding receptions.",
        image: null // e.g., "images/products/wedding-celebration-cake.jpg"
      },
      {
        name: "Trendy Korean Bento Cake",
        price: "Rs. 950",
        description: "Cute personal mini celebration cake packed in an eco-friendly bento box.",
        image: null // e.g., "images/products/korean-bento-cake.jpg"
      },
      {
        name: "Assorted Gourmet Cupcakes (Box of 6)",
        price: "Rs. 1,200",
        description: "Mix of lotus biscoff, salted caramel, nutella, and strawberry swirl.",
        image: null // e.g., "images/products/gourmet-cupcakes.jpg"
      }
    ]
  },
  {
    id: 6,
    name: "Anmol Beauty Parlor",
    category: "Beauty",
    icon: "sparkles",
    image: "images/anmol-beauty.jpg",
    contactPerson: null,
    phoneDisplay: "0315-0626698",
    whatsapp: "923150626698",
    address: "Khaki House, Near Model Bazar, Muzaffargarh",
    priceRange: "Appointment Based",
    accent: "#a855f7",
    products: [
      {
        name: "Complete Royal Bridal Makeup Package",
        price: "Rs. 25,000",
        description: "Signature HD bridal makeup with lash extensions, hair styling, dupatta & jewelry setting.",
        image: null // e.g., "images/products/bridal-makeup-package.jpg"
      },
      {
        name: "Glamorous Engagement / Barat Makeup",
        price: "Rs. 12,000",
        description: "Airbrush glowing finish with contoured highlights and elegant hairdo.",
        image: null // e.g., "images/products/engagement-makeup.jpg"
      },
      {
        name: "Party Wear Glow Makeup",
        price: "Rs. 4,500",
        description: "Subtle radiant evening makeup with eye contouring and volume curls.",
        image: null // e.g., "images/products/party-makeup.jpg"
      },
      {
        name: "Hydra-Whitening Herbal Facial",
        price: "Rs. 3,500",
        description: "Deep pore cleansing, steam extraction, vitamin C brightening mask and serum infusion.",
        image: null // e.g., "images/products/hydra-facial.jpg"
      },
      {
        name: "Keratin & Protein Hair Treatment",
        price: "Rs. 8,500",
        description: "Intense frizz control and hair straightening treatment for silky smooth hair.",
        image: null // e.g., "images/products/keratin-treatment.jpg"
      },
      {
        name: "Organic Herbal Manicure & Pedicure",
        price: "Rs. 2,000",
        description: "Relaxing foot soak, cuticle care, scrub exfoliation and nourishing massage.",
        image: null // e.g., "images/products/herbal-mani-pedi.jpg"
      }
    ]
  },
  {
    id: 7,
    name: "Mohsin Lace Center",
    category: "Tailoring",
    icon: "scissors",
    image: "images/mohsin-lace.jpg",
    contactPerson: null,
    phoneDisplay: "0303-4637988",
    whatsapp: "923034637988",
    address: "Main Bazar, Near Water Plant, Muzaffargarh",
    priceRange: "Wholesale & Retail",
    accent: "#14b8a6",
    products: [
      {
        name: "Organza Embroidered Cutwork Lace",
        price: "Rs. 250 / yard",
        description: "Premium thread embroidered organza borders for kameez daman and sleeves.",
        image: null // e.g., "images/products/organza-cutwork-lace.jpg"
      },
      {
        name: "Heavy Zari & Tilla Fancy Lace",
        price: "Rs. 400 / yard",
        description: "Sparkling golden zari trim designed for formal dupattas and bridal lehengas.",
        image: null // e.g., "images/products/zari-tilla-lace.jpg"
      },
      {
        name: "Shutter & Cotton Crochet Lace",
        price: "Rs. 120 / yard",
        description: "Soft breathable pure cotton lace ideal for casual summer lawn suits.",
        image: null // e.g., "images/products/cotton-crochet-lace.jpg"
      },
      {
        name: "Handcrafted Moti & Stone Border",
        price: "Rs. 350 / yard",
        description: "Delicate pearl bead and glass crystal piping for neckline detailing.",
        image: null // e.g., "images/products/moti-stone-border.jpg"
      },
      {
        name: "Designer Metal & Fancy Buttons (Dozen)",
        price: "Rs. 300",
        description: "Antique gold and enameled button set for kurta patti and sherwanis.",
        image: null // e.g., "images/products/designer-buttons.jpg"
      },
      {
        name: "Pico, Interlock & Overlock Services",
        price: "Rs. 150 / dupatta",
        description: "Precision machine edging including double-sided pearl pico and satin piping.",
        image: null // e.g., "images/products/pico-services.jpg"
      }
    ]
  },
  {
    id: 8,
    name: "Posh Baby Garments",
    category: "Kids",
    icon: "shirt",
    image: "images/posh-baby.jpg",
    contactPerson: null,
    phoneDisplay: "0315-5500888",
    whatsapp: "923155500888",
    address: "Hassan Plaza, Shop #15, 1st Floor, Muzaffargarh",
    priceRange: "New Arrivals",
    accent: "#3b82f6",
    products: [
      {
        name: "Newborn 5-Piece Welcome Gift Set",
        price: "Rs. 2,400",
        description: "100% combed cotton bodysuit, bib, cap, mittens and soft swaddle blanket.",
        image: null // e.g., "images/products/newborn-gift-set.jpg"
      },
      {
        name: "Toddler Formal 3-Piece Suit",
        price: "Rs. 3,200",
        description: "Tailored blazer, button-down shirt and trousers with matching bow tie.",
        image: null // e.g., "images/products/toddler-formal-suit.jpg"
      },
      {
        name: "Cozy Quilted Winter Baby Jacket",
        price: "Rs. 2,100",
        description: "Fleece-lined windproof hooded jacket keeping infants warm and snug.",
        image: null // e.g., "images/products/winter-baby-jacket.jpg"
      },
      {
        name: "Baby Girl Princess Net Frock",
        price: "Rs. 2,600",
        description: "Multi-layered tulle dress with satin waistband and delicate flower brooch.",
        image: null // e.g., "images/products/princess-net-frock.jpg"
      },
      {
        name: "Soft Cotton Rompers (Pack of 3)",
        price: "Rs. 1,650",
        description: "Snap-button everyday breathable printed onesies for active toddlers.",
        image: null // e.g., "images/products/cotton-rompers.jpg"
      },
      {
        name: "Anti-Slip Pre-Walker Soft Baby Shoes",
        price: "Rs. 850",
        description: "Flexible sole lightweight first-step booties with cushioned heel support.",
        image: null // e.g., "images/products/soft-baby-shoes.jpg"
      }
    ]
  }
];
