const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

async function main() {
  const uri = process.env.DATABASE_URL;
  if (!uri) {
    throw new Error("Missing DATABASE_URL");
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas!");

    const db = client.db("roommitra"); // Extracted from URI
    const profiles = db.collection("Profile");
    const listings = db.collection("Listing");

    // Ensure Demo Lister exists
    const listerEmail = "demo-lister-seed@roommitra.in";
    let lister = await profiles.findOne({ email: listerEmail });

    if (!lister) {
      const result = await profiles.insertOne({
        supabaseId: "demo-lister-seed",
        email: listerEmail,
        name: "Demo Lister CEO",
        mobile: "9999999991",
        role: "LISTER",
        status: "ACTIVE",
        createdAt: new Date(),
        updatedAt: new Date()
      });
      lister = await profiles.findOne({ _id: result.insertedId });
      console.log(`Created new Demo Lister profile with _id: ${lister._id}`);
    } else {
      console.log(`Found existing Demo Lister with _id: ${lister._id}`);
    }

    // Clear old listings
    const deleteResult = await listings.deleteMany({ listerId: lister._id });
    console.log(`Removed ${deleteResult.deletedCount} old demo listings.`);

    // Prepare exactly 10 of each category
    const categories = ["PG", "ROOM", "TIFFIN", "LAUNDRY"];
    const documentsToInsert = [];

    for (const cat of categories) {
      // 10 distinct records
      for (let i = 1; i <= 10; i++) {
        // Randomize price uniquely based on category
        let basePrice = cat === "PG" ? 8000 : cat === "ROOM" ? 12000 : cat === "TIFFIN" ? 2500 : 800;
        const price = basePrice + Math.floor(Math.random() * (basePrice * 0.5));
        
        documentsToInsert.push({
          listerId: lister._id, // Important: mapped natively to ObjectId!
          title: `Elite ${cat} Center Alpha-${i}x`,
          type: cat,
          price: parseFloat(price.toFixed(2)),
          description: `Stunning 5-star ${cat} optimized for students and professionals. Equipped with secure, safe perimeters and modern lifestyle utilities.`,
          address: `Sector ${Math.floor(Math.random() * 50) + 1}, MG Road, NCR`,
          latitude: 28.4595 + (Math.random() * 0.1 - 0.05),
          longitude: 77.0266 + (Math.random() * 0.1 - 0.05),
          amenities: JSON.stringify(["Unlimited WiFi", "Climate Control", "24/7 Power Backup", "Dedicated Maintenance"]),
          images: JSON.stringify([
            `https://res.cloudinary.com/demo/image/upload/sample.jpg`,
            `https://res.cloudinary.com/demo/image/upload/c_scale,w_500/v1/samples/landscapes/nature-mountains.jpg`
          ]),
          status: "APPROVED",
          createdAt: new Date()
        });
      }
    }

    // Insert batch
    if (documentsToInsert.length > 0) {
      const insertResult = await listings.insertMany(documentsToInsert);
      console.log(`SUCCESS: Deep injected ${insertResult.insertedCount} realistic demo properties securely into MongoDB.`);
    }

    console.log("Seeding perfectly synchronized with MongoDB!");

  } catch (err) {
    console.error("Seeding failed: ", err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

main();
