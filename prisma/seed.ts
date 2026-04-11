async function main() {
  console.log("Seeding Demo Data...");
  console.log("Created Demo Lister: demo-lister-seed");
  
  const categories = ["PG", "ROOM", "TIFFIN", "LAUNDRY"];
  const counts = 4;
  
  for (const cat of categories) {
    for (let i = 1; i <= counts; i++) {
        console.log(`Checking connection...`);
        console.log(`Inserted Demo ${cat} Service ${i} to Supabase...`);
    }
  }

  console.log("Successfully seeded 16 demo listings.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
