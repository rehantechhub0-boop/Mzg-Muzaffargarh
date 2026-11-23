/**
 * Muzaffargarh City Hub - Verified Business Directory Data
 * Phase 2 & Dedicated Storefront Edition: Live Verified Registry & Product Catalogs
 * Extensible data structure: to add more businesses, append objects to the array.
 * Real image support:
 *   - Business cover image: specify relative path in `image` (e.g. "images/she-jewelers.webp") or keep null for luxury fallback.
 *   - Product images: specify relative path in `products[i].image` or keep null for luxury fallback.
 */

const businesses = [
  {
    "id": 1,
    "name": "She Jewelers",
    "category": "Jewelry",
    "icon": "gem",
    "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.12.06 PM (1).webp",
    "contactPerson": null,
    "phoneDisplay": "0321-7486566",
    "whatsapp": "923217486566",
    "address": "Hassan Plaza, Shop #5, 1st Floor, Muzaffargarh",
    "priceRange": "Rs. 200 \u2013 Rs. 20,000",
    "accent": "#f59e0b",
    "products": [
      {
        "name": "Royal Kundan & Zircon Bridal Set",
        "price": "Rs. 18,500",
        "description": "Handcrafted traditional Multani Kundan bridal set with choker, heavy jhumkas, and matching teeka.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.11.55 PM.webp"
      },
      {
        "name": "Grand Artificial Jewelry Showcase Set",
        "price": "Rs. 4,500 \u2013 Rs. 22,000",
        "description": "Complete royal gold-plated artificial set with multilayer necklace, earrings, and matching forehead ornaments.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.11.55 PM (1).webp"
      },
      {
        "name": "Luxury Gold-Plated Designer Rings",
        "price": "Rs. 850 \u2013 Rs. 2,500",
        "description": "Cubic zirconia, gemstone, and traditional filigree adjustable party wear rings.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.11.57 PM.webp"
      },
      {
        "name": "Designer Bangles & Chooriyan Collection",
        "price": "Rs. 1,400 \u2013 Rs. 4,500",
        "description": "Micro-gold polished studded designer bangles, kangans, and velvet chooriyan.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.11.58 PM.webp"
      },
      {
        "name": "Designer Hair Accessories & Bow Clips",
        "price": "Rs. 250 \u2013 Rs. 950",
        "description": "Velvet hair bows, crystal butterfly barrettes, floral pins, and embellished headbands.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.12.00 PM (1).webp"
      },
      {
        "name": "Traditional Jhumkas & Chandbalis",
        "price": "Rs. 950 \u2013 Rs. 3,500",
        "description": "Lightweight antique-finish hanging jhumkas with colorful pearls, beads, and stone work.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.12.00 PM.webp"
      },
      {
        "name": "Heavy Bridal Choker & Pearl Mala",
        "price": "Rs. 12,000",
        "description": "Exquisite ruby and emerald studded bridal choker paired with multi-layer pearl mala.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.12.01 PM.webp"
      },
      {
        "name": "Multani Kundan & Semi-Precious Mala Collection",
        "price": "Rs. 3,200 \u2013 Rs. 8,500",
        "description": "Hand-strung multi-tier bead malas, antique coin necklaces, and regal emerald pendant sets.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.12.02 PM.webp"
      },
      {
        "name": "Mannequin Bridal Exhibition Sets",
        "price": "Rs. 15,000 \u2013 Rs. 35,000",
        "description": "Premium gold-polished bridal necklace sets with ear cuffs, nath, and matha patti.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.12.05 PM.webp"
      },
      {
        "name": "Complete She Jewelers Showroom Collection",
        "price": "Rs. 500 \u2013 Rs. 35,000",
        "description": "Exclusive showcase featuring thousands of bridal sets, bangles, rings, and formal jewelry.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.12.06 PM (1).webp"
      },
      {
        "name": "Bridal Ear Cuffs, Nath & Matha Patti Showcase",
        "price": "Rs. 1,200 \u2013 Rs. 6,500",
        "description": "Complete bridal embellishments including gold-finish pearl matha patti, traditional naths, and jhumki cuffs.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.12.06 PM.webp"
      }
    ]
  },
  {
    "id": 2,
    "name": "Time Book Center",
    "category": "Books",
    "icon": "book-open",
    "image": "images/time-book-center.webp",
    "contactPerson": "Ahmer",
    "phoneDisplay": "0332-8064376",
    "whatsapp": "923328064376",
    "address": "Water Plant, Near Quba Optical Center, Muzaffargarh",
    "priceRange": "Rs. 20 \u2013 Rs. 20,000",
    "accent": "#38bdf8",
    "products": [
      {
        "name": "Oxford Advanced Learner's Dictionary",
        "price": "Rs. 1,850",
        "description": "Original latest edition English-Urdu comprehensive reference dictionary.",
        "image": null
      },
      {
        "name": "Matric & Inter Science Textbooks",
        "price": "Rs. 1,200",
        "description": "Complete Punjab Curriculum & Textbook Board (PCTB) verified course books.",
        "image": null
      },
      {
        "name": "Premium Executive Diary & Pen Set",
        "price": "Rs. 1,500",
        "description": "Leatherette ruled notebook with heavy metal matte black rollerball pen.",
        "image": null
      },
      {
        "name": "School & College Stationery Kit",
        "price": "Rs. 650",
        "description": "Complete geometry box, highlighters, scales, eraser and sketching pencils.",
        "image": null
      },
      {
        "name": "CSS & PMS Competitive Exam Guides",
        "price": "Rs. 2,400",
        "description": "Up-to-date Pakistan Affairs, Current Affairs & General Knowledge compilations.",
        "image": null
      },
      {
        "name": "Islamic History & Urdu Literature Classics",
        "price": "Rs. 950",
        "description": "Selected literary works and biographies in durable hardbound print.",
        "image": null
      }
    ]
  },
  {
    "id": 3,
    "name": "She Purse House",
    "category": "Fashion",
    "icon": "shopping-bag",
    "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.14.04 PM.webp",
    "contactPerson": null,
    "phoneDisplay": "0300-0791699",
    "whatsapp": "923000791699",
    "address": "Hassan Plaza, Shop #18, Muzaffargarh",
    "priceRange": "Best Market Rates",
    "accent": "#ec4899",
    "products": [
      {
        "name": "Luxury Crystal Rhinestone Bridal Clutch",
        "price": "Rs. 3,800",
        "description": "Heavy silver rhinestone and crystal evening bridal clutch with metallic twist chain.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.14.12 PM.webp"
      },
      {
        "name": "Traditional Embellished Potli Bag with Pearl Handle",
        "price": "Rs. 2,800",
        "description": "Cylinder crystal potli pouch with drawstring closure and royal pearl beaded wrist strap.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.14.10 PM.webp"
      },
      {
        "name": "Golden Shimmer Bridal Evening Clutch with Chain",
        "price": "Rs. 3,200",
        "description": "Textured metallic gold evening clutch with top jewel clasp and detachable chain strap.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.14.13 PM.webp"
      },
      {
        "name": "Premium Designer Leatherette Shoulder Tote",
        "price": "Rs. 2,900 \u2013 Rs. 4,500",
        "description": "Spacious multi-compartment daily shoulder handbag for college and office.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.14.13 PM (1).webp"
      },
      {
        "name": "Designer Party & Formal Handbags Rack",
        "price": "Rs. 2,200 \u2013 Rs. 5,000",
        "description": "Wide variety of pastel, tan, and formal handbags with matching gold hardware.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.14.14 PM (1).webp"
      },
      {
        "name": "Multi-Tier Leatherette Handbags & Crossbody Bags",
        "price": "Rs. 2,500 \u2013 Rs. 4,800",
        "description": "Structured top-handle satchels, quilted shoulder bags, and luxury chain strap crossbodies.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.14.14 PM.webp"
      },
      {
        "name": "Grand Handbag & Pastel Satchels Display Wall",
        "price": "Rs. 2,400 \u2013 Rs. 5,200",
        "description": "Extensive collection of modern totes, pastel office bags, satchels, and daypacks.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.14.15 PM (1).webp"
      },
      {
        "name": "Luxury Structured Top-Handle Purses",
        "price": "Rs. 1,800 \u2013 Rs. 4,200",
        "description": "Structured top-handle bags, crossbody flap purses, and stylish daily bags.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.14.15 PM.webp"
      },
      {
        "name": "Colored Crystal & Velvet Bridal Clutches",
        "price": "Rs. 3,500 \u2013 Rs. 5,500",
        "description": "Exquisite jewel-tone bridal clutches in emerald green, ruby red, champagne gold, and silver.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.14.16 PM (1).webp"
      },
      {
        "name": "Stacked Daily Leatherette & Pastel Wallets",
        "price": "Rs. 850 \u2013 Rs. 1,950",
        "description": "Large variety of tri-fold, bi-fold, and zipper card wallets in multiple pastel shades.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.14.16 PM.webp"
      },
      {
        "name": "Glitter Evening Clutches & Pearl Minaudi\u00e8res",
        "price": "Rs. 2,800 \u2013 Rs. 4,800",
        "description": "Multi-tier glass showcase featuring glitter hard-case clutches and pearl-beaded purses.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.14.17 PM.webp"
      },
      {
        "name": "Trendy School & College Backpacks Wall",
        "price": "Rs. 1,600 \u2013 Rs. 2,800",
        "description": "Durable waterproof printed backpacks with padded straps and multi-pocket organizer.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.14.04 PM.webp"
      },
      {
        "name": "Designer Shoulder Bags & Bridal Showcase Gallery",
        "price": "Rs. 2,200 \u2013 Rs. 5,500",
        "description": "Full store view with extensive displays of branded tote bags, school bags, and bridal evening wear.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.14.02 PM.webp"
      },
      {
        "name": "Executive Bifold Wallets & Cosmetic Cases",
        "price": "Rs. 1,100 \u2013 Rs. 2,200",
        "description": "Textured vegan leather wallets, party clutches, and portable cosmetics vanity cases.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.14.01 PM.webp"
      }
    ]
  },
  {
    "id": 4,
    "name": "Flavor Bazar Pizza Shop",
    "category": "Food",
    "icon": "pizza",
    "image": "images/flavor-bazar.webp",
    "contactPerson": "Hassnain",
    "phoneDisplay": "0326-0861111",
    "whatsapp": "923260861111",
    "address": "Alipur Road, Opposite Total Petrol Pump, Muzaffargarh",
    "priceRange": "Freshly Made Menu",
    "accent": "#ef4444",
    "products": [
      {
        "name": "All Flavor Supreme Pizza",
        "price": "Rs. 1,450",
        "description": "Loaded combination of smoked chicken, sausages, olives, mushrooms and mozzarella.",
        "image": null
      },
      {
        "name": "Crunchy Zinger Burger",
        "price": "Rs. 420",
        "description": "Crispy fried golden chicken breast fillet with iceberg lettuce and secret sauce.",
        "image": null
      },
      {
        "name": "Deep Dish Chicago Style Pizza",
        "price": "Rs. 1,950",
        "description": "Authentic high-crust pizza packed with molten mozzarella, beef pepperoni and crushed tomato sauce.",
        "image": null
      },
      {
        "name": "Flaming Peri Peri Pizza",
        "price": "Rs. 1,350",
        "description": "Spicy grilled peri-peri chicken chunks topped with jalape\u00f1os and spicy drizzle.",
        "image": null
      },
      {
        "name": "Original Chicago Pizza",
        "price": "Rs. 1,800",
        "description": "Signature classic deep crust stuffed with double cheese and seasoned chicken.",
        "image": null
      },
      {
        "name": "Beyond Butter Delight Pizza",
        "price": "Rs. 1,400",
        "description": "Rich buttery sauce base with herb-marinated chicken and caramelized onions.",
        "image": null
      },
      {
        "name": "Greek BBQ Smoked Pizza",
        "price": "Rs. 1,350",
        "description": "Smoky barbecue chicken, bell peppers, sweet red onions and feta cheese.",
        "image": null
      },
      {
        "name": "Authentic Arabic Fatayer",
        "price": "Rs. 580",
        "description": "Traditional baked pastry boat filled with spiced minced chicken and melted cheese.",
        "image": null
      },
      {
        "name": "Egyptian Herbed Fatayer",
        "price": "Rs. 620",
        "description": "Flaky layered Middle Eastern pie stuffed with cheese, olives and za'atar herbs.",
        "image": null
      },
      {
        "name": "Cheese Lover Extreme Pizza",
        "price": "Rs. 1,550",
        "description": "Four-cheese fusion featuring stretchy mozzarella, sharp cheddar, gouda and parmesan.",
        "image": null
      }
    ]
  },
  {
    "id": 5,
    "name": "Aliza Cake",
    "category": "Bakery",
    "icon": "cake",
    "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.52 PM (1).webp",
    "contactPerson": null,
    "phoneDisplay": "0306-1919029",
    "whatsapp": "923061919029",
    "address": "Qinwan Chowk, Muzaffargarh",
    "priceRange": "Starting Rs. 950+",
    "accent": "#fb7185",
    "products": [
      {
        "name": "Floral Garden Birthday Bento Cake",
        "price": "Rs. 950",
        "description": "Artisan mini bento cake decorated with hand-piped floral wildflowers and lavender motifs.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.47 PM (1).webp"
      },
      {
        "name": "School Achievement & Graduation Theme Cake",
        "price": "Rs. 2,400",
        "description": "School logo crest cake with 3D graduation cap books and star piping for student milestones.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.47 PM (2).webp"
      },
      {
        "name": "Pink Ribbon Birthday Bento Cake",
        "price": "Rs. 950",
        "description": "Cute pastel pink mini bento cake with black ribbon bows and custom birthday piping.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.47 PM.webp"
      },
      {
        "name": "Sidra Pink & White Birthday Bento Cake",
        "price": "Rs. 950",
        "description": "Delicate two-tone pink and white buttercream bento cake with pearl sprinkles and ribbon bow piping.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.48 PM (1).webp"
      },
      {
        "name": "Retro Cherry Birthday Bento Cake",
        "price": "Rs. 950",
        "description": "Classic vintage white and hot pink birthday cake with adorable hand-piped red cherries.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.48 PM (2).webp"
      },
      {
        "name": "gl\u00f2 STUDIO Cosmetics & Makeup Theme Cake",
        "price": "Rs. 2,600",
        "description": "Trendy beauty studio cake with 3D fondant lipstick, blush palette, makeup brush, and black ribbon bow.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.48 PM (3).webp"
      },
      {
        "name": "Starry Crown 'Ladla' Royal Blue Bento Cake",
        "price": "Rs. 950",
        "description": "Vibrant royal blue frosted bento cake with piped crown, edible pearls, and golden stars.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.48 PM.webp"
      },
      {
        "name": "Dual Theme Butterfly & Galaxy Cake",
        "price": "Rs. 2,200",
        "description": "Split half-and-half cake featuring pink butterflies on white frosting and starry blue galaxy.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.49 PM (1).webp"
      },
      {
        "name": "Father's Rosette Birthday Cake (Abo Jee)",
        "price": "Rs. 2,200",
        "description": "Pure white frosted cake with blue buttercream rosette crescent and Urdu calligraphy 'Salgirah Mubarak Abo Jee'.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.49 PM (2).webp"
      },
      {
        "name": "Lavender Birthday Cake with Fresh Flower Wreath",
        "price": "Rs. 1,950",
        "description": "Soft lilac buttercream cake accented with fresh red gajra wreath and custom calendar date.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.49 PM.webp"
      },
      {
        "name": "M Essa Little Boy's Car Theme Birthday Cake",
        "price": "Rs. 2,800",
        "description": "Sky blue textured cake with handcrafted 3D fondant cars, metallic balls, and name lettering.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.50 PM (1).webp"
      },
      {
        "name": "Gohar Khan 1st Birthday Cartoon Car Cake",
        "price": "Rs. 2,900",
        "description": "Whimsical baby blue cloud cake with yellow fondant car, clouds, colorful side cars, and #1 candle.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.50 PM (2).webp"
      },
      {
        "name": "Loaded Multi-Chocolate Drip Cake",
        "price": "Rs. 3,200",
        "description": "Decadent chocolate cake topped with KitKat bars, white chocolate drops, Snickers, and Lotus Biscoff.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.50 PM.webp"
      },
      {
        "name": "Dr. Mustafa Medical Stethoscope Birthday Cake",
        "price": "Rs. 2,800",
        "description": "White doctor cake with black stethoscope, 3D fondant medicine bottle, capsule pills, and blister pack.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.51 PM (1).webp"
      },
      {
        "name": "Roza Kushai Celebration Theme Cake",
        "price": "Rs. 2,600",
        "description": "Peach frosted cake topped with fondant crescent moon, prayer mat, tasbeeh, and dates.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.51 PM (2).webp"
      },
      {
        "name": "Black & White Police Vigo 3D Truck Cake",
        "price": "Rs. 3,200",
        "description": "Custom monochrome cake with handcrafted 3D fondant double-cabin Hilux Vigo truck for car lovers.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.51 PM (3).webp"
      },
      {
        "name": "Dr. Sabahat Lady Surgeon Figurine Theme Cake",
        "price": "Rs. 3,500",
        "description": "Handcrafted 3D female doctor figurine in lab coat with mask, hearts, bandage, and colorful medical pills.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.51 PM.webp"
      },
      {
        "name": "Nikkah Mubarak White & Rose Gold Cake",
        "price": "Rs. 3,500",
        "description": "Elegant wedding cake featuring rose gold leaf brushstrokes, fresh white blooms, and acrylic topper.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.52 PM (1).webp"
      },
      {
        "name": "Birthday Bento Cake & Dairy Milk Rose Bouquet Combo",
        "price": "Rs. 3,200",
        "description": "Lavender birthday bento cake paired with a luxurious fresh red rose & Cadbury chocolate bouquet.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.52 PM (2).webp"
      },
      {
        "name": "Twin Bento Celebration Cakes (Pack of 2)",
        "price": "Rs. 1,850",
        "description": "Pair of custom mini celebration cakes presented together for multi-occasion celebrations.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.52 PM.webp"
      },
      {
        "name": "Bride To Be Princess Gown Bridal Shower Cake",
        "price": "Rs. 2,800",
        "description": "Stunning bridal shower cake with draped baby blue sweetheart gown, pearl flowers, and sprinkles.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.53 PM (1).webp"
      },
      {
        "name": "Custom Edible Photo Strip & Golden Bubbles Cake",
        "price": "Rs. 3,400",
        "description": "Personalized celebration cake with edible sugar photo film strip, golden sphere bubbles, and gold leaf trim.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.53 PM (2).webp"
      },
      {
        "name": "Doctor To Be Medical Lab Coat & Syringe Cake",
        "price": "Rs. 2,900",
        "description": "Medical student milestone cake with fondant doctor coat collar, stethoscope, syringe, and heartbeat line.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.53 PM.webp"
      },
      {
        "name": "Disney Frozen Elsa 5th Birthday Tall Cake",
        "price": "Rs. 3,600",
        "description": "Ice blue textured tall cake featuring Princess Elsa, sparkling white & blue snowflakes, and #5 topper.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.54 PM (1).webp"
      },
      {
        "name": "Medical Stethoscope Doctor Theme Cake",
        "price": "Rs. 2,800",
        "description": "Doctor birthday cake with edible fondant stethoscope, medicine bottle, and blister pill strips.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.54 PM (2).webp"
      },
      {
        "name": "Dr. Abiha Rx Prescription Birthday Cake",
        "price": "Rs. 2,800",
        "description": "Medical graduation cake with edible doctor prescription pad, stethoscope, band-aids, and colorful pills.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.54 PM.webp"
      },
      {
        "name": "Boss Baby 1st Birthday Theme Cake",
        "price": "Rs. 3,200",
        "description": "Vibrant blue cake with Boss Baby cutouts, 100-dollar bills, baby bottle, and 3D #1 candle.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.55 PM (1).webp"
      },
      {
        "name": "Cocomelon JJ & Rainbow 2nd Birthday Cake",
        "price": "Rs. 3,200",
        "description": "Pastel pink piped celebration cake with Cocomelon baby JJ topper, bright rainbow, and family cutouts.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.55 PM (2).webp"
      },
      {
        "name": "Astronaut & Space Rocket 1st Birthday Cake",
        "price": "Rs. 3,600",
        "description": "Galactic blue tall cake with 3D fondant spaceman astronaut, rocket ship, moon crater, and solar planets.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.55 PM.webp"
      },
      {
        "name": "Bon Voyage Airplane Bento Cake",
        "price": "Rs. 1,250",
        "description": "Travel celebration cake with edible fondant Qatar airplane and heartfelt bon voyage message.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.56 PM (1).webp"
      },
      {
        "name": "Fresh Classic Glazed Donuts (Box of 9)",
        "price": "Rs. 1,350",
        "description": "Fluffy melt-in-the-mouth golden fried donuts coated in sweet vanilla glaze.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.56 PM (2).webp"
      },
      {
        "name": "Oreo Swirl Frosting Cupcakes (Set of 6)",
        "price": "Rs. 1,100",
        "description": "Chocolate cupcakes topped with cookies-and-cream swirl buttercream and whole crisp Oreo biscuits.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.56 PM (3).webp"
      },
      {
        "name": "Oreo Chocolate Ganache Drip Cake",
        "price": "Rs. 2,600",
        "description": "Layers of moist chocolate sponge with vanilla cream, dark chocolate drip, and ring of Oreo biscuits.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.56 PM.webp"
      },
      {
        "name": "Chocolate Chip Cupcake Box (16 Pcs)",
        "price": "Rs. 1,600",
        "description": "Freshly baked moist chocolate muffins packed with semi-sweet chocolate chips.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.57 PM (1).webp"
      },
      {
        "name": "Chocolate Glazed Donuts with White Drizzle (Box of 11)",
        "price": "Rs. 1,650",
        "description": "Rich cocoa-glazed golden donuts drizzled with sweet white sugar icing streaks.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.57 PM (2).webp"
      },
      {
        "name": "White Rosette Swirl Vanilla Cupcakes (Set of 6)",
        "price": "Rs. 950",
        "description": "Classic fluffy golden vanilla cupcakes decorated with handcrafted elegant white rose piping.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.57 PM.webp"
      },
      {
        "name": "Fudge Chocolate Brownies Box (6 Pcs)",
        "price": "Rs. 1,200",
        "description": "Rich fudgy dark chocolate brownies with crackly tops baked to perfection.",
        "image": "images/New folder/WhatsApp Image 2026-11-19 at 5.08.58 PM.webp"
      }
    ]
  },
  {
    "id": 6,
    "name": "Anmol Beauty Parlor",
    "category": "Beauty",
    "icon": "sparkles",
    "image": "images/anmol-beauty.webp",
    "contactPerson": null,
    "phoneDisplay": "0315-0626698",
    "whatsapp": "923150626698",
    "address": "Khaki House, Near Model Bazar, Muzaffargarh",
    "priceRange": "Appointment Based",
    "accent": "#a855f7",
    "products": [
      {
        "name": "Complete Royal Bridal Makeup Package",
        "price": "Rs. 25,000",
        "description": "Signature HD bridal makeup with lash extensions, hair styling, dupatta & jewelry setting.",
        "image": null
      },
      {
        "name": "Glamorous Engagement / Barat Makeup",
        "price": "Rs. 12,000",
        "description": "Airbrush glowing finish with contoured highlights and elegant hairdo.",
        "image": null
      },
      {
        "name": "Party Wear Glow Makeup",
        "price": "Rs. 4,500",
        "description": "Subtle radiant evening makeup with eye contouring and volume curls.",
        "image": null
      },
      {
        "name": "Hydra-Whitening Herbal Facial",
        "price": "Rs. 3,500",
        "description": "Deep pore cleansing, steam extraction, vitamin C brightening mask and serum infusion.",
        "image": null
      },
      {
        "name": "Keratin & Protein Hair Treatment",
        "price": "Rs. 8,500",
        "description": "Intense frizz control and hair straightening treatment for silky smooth hair.",
        "image": null
      },
      {
        "name": "Organic Herbal Manicure & Pedicure",
        "price": "Rs. 2,000",
        "description": "Relaxing foot soak, cuticle care, scrub exfoliation and nourishing massage.",
        "image": null
      }
    ]
  },
  {
    "id": 7,
    "name": "Mohsin Lace Center",
    "category": "Tailoring",
    "icon": "scissors",
    "image": "images/mohsin-lace.webp",
    "contactPerson": null,
    "phoneDisplay": "0303-4637988",
    "whatsapp": "923034637988",
    "address": "Main Bazar, Near Water Plant, Muzaffargarh",
    "priceRange": "Wholesale & Retail",
    "accent": "#14b8a6",
    "products": [
      {
        "name": "Organza Embroidered Cutwork Lace",
        "price": "Rs. 250 / yard",
        "description": "Premium thread embroidered organza borders for kameez daman and sleeves.",
        "image": null
      },
      {
        "name": "Heavy Zari & Tilla Fancy Lace",
        "price": "Rs. 400 / yard",
        "description": "Sparkling golden zari trim designed for formal dupattas and bridal lehengas.",
        "image": null
      },
      {
        "name": "Shutter & Cotton Crochet Lace",
        "price": "Rs. 120 / yard",
        "description": "Soft breathable pure cotton lace ideal for casual summer lawn suits.",
        "image": null
      },
      {
        "name": "Handcrafted Moti & Stone Border",
        "price": "Rs. 350 / yard",
        "description": "Delicate pearl bead and glass crystal piping for neckline detailing.",
        "image": null
      },
      {
        "name": "Designer Metal & Fancy Buttons (Dozen)",
        "price": "Rs. 300",
        "description": "Antique gold and enameled button set for kurta patti and sherwanis.",
        "image": null
      },
      {
        "name": "Pico, Interlock & Overlock Services",
        "price": "Rs. 150 / dupatta",
        "description": "Precision machine edging including double-sided pearl pico and satin piping.",
        "image": null
      }
    ]
  },
  {
    "id": 8,
    "name": "Posh Baby Garments",
    "category": "Kids",
    "icon": "shirt",
    "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.13.57 PM.webp",
    "contactPerson": null,
    "phoneDisplay": "0315-5500888",
    "whatsapp": "923155500888",
    "address": "Hassan Plaza, Shop #15, 1st Floor, Muzaffargarh",
    "priceRange": "New Arrivals",
    "accent": "#3b82f6",
    "products": [
      {
        "name": "Toddler Formal 3-Piece Waistcoat Suit",
        "price": "Rs. 3,200",
        "description": "Designer textured waistcoat, kurta pajama, and tailored formal trousers for boys.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.13.34 PM.webp"
      },
      {
        "name": "Girl's Embroidered Velvet Sharara & Frock",
        "price": "Rs. 3,800",
        "description": "Heavy zari embroidered velvet party wear with matching dupatta for weddings and Eid.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.13.43 PM.webp"
      },
      {
        "name": "Princess Net & Fur Party Frock",
        "price": "Rs. 2,600 \u2013 Rs. 3,400",
        "description": "Multi-layered tulle skirt frock with plush fur jacket and flower brooches.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.13.36 PM.webp"
      },
      {
        "name": "Royal Velvet & Fur Kids Party Wear Dresses",
        "price": "Rs. 2,800 \u2013 Rs. 4,500",
        "description": "Showcase of luxury fur coats, party frocks, and embroidered velvet outfits on boutique display.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.13.43 PM (1).webp"
      },
      {
        "name": "Baby Boy Velvet Kurta & Jacket Set",
        "price": "Rs. 2,500 \u2013 Rs. 3,500",
        "description": "Plush embroidered winter velvet suit for infants and toddlers with matching warm socks.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.13.44 PM.webp"
      },
      {
        "name": "Infant Knitted Sweaters & Boutique Window Collection",
        "price": "Rs. 1,400 \u2013 Rs. 2,900",
        "description": "Pastel baby sweaters, cozy winter coats, baby kits, and formal toddler dresses on glass display.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.13.46 PM.webp"
      },
      {
        "name": "Baby Girl Formal Collection & Boutique Wear",
        "price": "Rs. 2,200 \u2013 Rs. 4,200",
        "description": "Party dresses, net frocks, velvet festive suits, and matching mini clutches.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.13.28 PM.webp"
      },
      {
        "name": "Newborn Winter Warm Sweaters & Baby Bag Set",
        "price": "Rs. 1,800 \u2013 Rs. 2,800",
        "description": "Soft knitted pastel sweaters, fleece baby jackets, and quilted travel bag.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.13.57 PM.webp"
      },
      {
        "name": "Kids Printed Travel & School Day Backpacks",
        "price": "Rs. 1,200 \u2013 Rs. 2,200",
        "description": "Cute cartoon and character printed school backpacks with multiple compartments for toddlers.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.13.58 PM.webp"
      }
    ]
  },
  {
    "id": 9,
    "name": "Modern Steel House",
    "category": "Home & Kitchen",
    "icon": "utensils",
    "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.12.57 PM.webp",
    "contactPerson": "Faisal Kareem",
    "phoneDisplay": "0304-6861520",
    "whatsapp": "923046861520",
    "address": "Near Hassan Plaza, Main Bazar, Muzaffargarh",
    "priceRange": "Rs. 250 \u2013 Rs. 35,000",
    "accent": "#f97316",
    "products": [
      {
        "name": "Complete Melamine Dinner Set (72 Pcs)",
        "price": "Rs. 14,500",
        "description": "Royal floral printed unbreakable melamine tableware set with serving platters, soup bowls, and curry dishes.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.12.57 PM.webp"
      },
      {
        "name": "Faisal Kareem Cash Counter & Giftware Display",
        "price": "Rs. 850 \u2013 Rs. 18,000",
        "description": "Modern Steel House main reception counter featuring Artec & Spring gift sets, blenders, and dinnerware.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.12.32 PM.webp"
      },
      {
        "name": "Complete Dinnerware & Kitchen Gift Packs Collection",
        "price": "Rs. 2,500 \u2013 Rs. 16,500",
        "description": "Showcase of boxed tea sets, imported glassware, Artec gift packs, juicer blenders, and household essentials.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.12.37 PM.webp"
      },
      {
        "name": "Household Plasticware & Storage Baskets",
        "price": "Rs. 350 \u2013 Rs. 1,600",
        "description": "Durable laundry baskets, pedal dustbins, dish drainers, and food storage tubs.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.12.38 PM.webp"
      },
      {
        "name": "Stainless Steel Cooking Pots & Thali Set",
        "price": "Rs. 6,500",
        "description": "Heavy gauge pure stainless steel cooking degchis, tiffin carriers, and serving trays.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.12.39 PM.webp"
      },
      {
        "name": "Kitchen Appliances & Insulated Water Coolers",
        "price": "Rs. 3,200 \u2013 Rs. 8,500",
        "description": "Sandwich toasters, juicer blenders, electric kettles, and high-capacity water coolers.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.12.40 PM.webp"
      },
      {
        "name": "Glassware Jug & Tumbler Drinkware Set",
        "price": "Rs. 2,200",
        "description": "Imported crystal embossed water set with 1 large jug and 6 matching drinking glasses.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.12.42 PM.webp"
      },
      {
        "name": "Royal Insulated Hot Pot Gift Set (4 Pcs)",
        "price": "Rs. 4,800",
        "description": "Stainless steel interior thermal insulated casseroles keeping rotis and curries steaming hot for hours.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.12.44 PM.webp"
      },
      {
        "name": "Heavy Gauge Stainless Steel Degchis & Milk Pots",
        "price": "Rs. 4,200 \u2013 Rs. 14,000",
        "description": "Pure stainless steel cooking pots, Ajwa and Noman milk containers, stainless serving thalis, and food storage canisters.",
        "image": "images/New folder (2)/WhatsApp Image 2026-11-21 at 8.12.45 PM.webp"
      }
    ]
  }
];
