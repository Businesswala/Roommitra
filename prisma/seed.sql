-- --- SEEDING ROOMMITRA DATABASE (DIRECT SQL MODE) ---
-- 1. Create/Update Demo Lister
INSERT INTO "Profile" (id, "supabaseId", email, name, mobile, role, status, "businessName", "profilePhoto", "createdAt", "updatedAt")
VALUES (
  'demo-lister-id-999', 
  'demo-lister-uuid-12345', 
  'lister@roommitra.in', 
  'Rajesh Kumar', 
  '9876543210', 
  'LISTER', 
  'ACTIVE', 
  'Kumar Properties & Services', 
  'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&h=400&fit=crop',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO UPDATE SET "businessName" = EXCLUDED."businessName", status = 'ACTIVE';

-- 2. Bulk Insert 16 Properties
INSERT INTO "Listing" (id, "listerId", title, type, price, description, address, status, amenities, images, "createdAt")
VALUES
-- ROOMS
('l1', 'demo-lister-id-999', 'Cozy Single Room near MG Road', 'ROOM', 12000, 'Well-ventilated single room with balcony.', 'MG Road, Victoria Layout, Bangalore', 'APPROVED', '["WiFi", "Attached Washroom", "Power Backup"]', '["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"]', NOW()),
('l2', 'demo-lister-id-999', 'Premium Couple Room in Koramangala', 'ROOM', 18000, 'Spacious room with modular wardrobe.', 'Koramangala 4th Block, Bangalore', 'APPROVED', '["AC", "Geyser", "WiFi"]', '["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"]', NOW()),
('l3', 'demo-lister-id-999', 'Budget Room for Students - Indiranagar', 'ROOM', 8500, 'Affordable room with essential furniture.', 'Indiranagar 100ft Road, Bangalore', 'APPROVED', '["Bed", "Study Table"]', '["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800"]', NOW()),
('l4', 'demo-lister-id-999', 'Luxury Suite - Whitefield', 'ROOM', 25000, 'Hotel-style luxury room with housekeeping.', 'Whitefield ITPL Main Rd, Bangalore', 'APPROVED', '["Gym Access", "Pool"]', '["https://images.unsplash.com/photo-1598928506311-c55dd1b311fc?w=800"]', NOW()),
-- PGs
('l5', 'demo-lister-id-999', 'Zolo Stays - Men''s Luxury PG', 'PG', 14000, 'Fully managed coliving space.', 'HSR Layout Sector 2, Bangalore', 'APPROVED', '["Mess", "Laundry"]', '["https://images.unsplash.com/photo-1555854817-5b2260d1bd63?w=800"]', NOW()),
('l6', 'demo-lister-id-999', 'Safe Haven - Women''s PG', 'PG', 11000, 'Secure and hygienic PG for women.', 'BTM Layout 2nd Stage, Bangalore', 'APPROVED', '["High Security", "Veg Food"]', '["https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800"]', NOW()),
('l7', 'demo-lister-id-999', 'Campus Living - Shared PG', 'PG', 7000, 'Ideal for students on a budget.', 'Bannerghatta Road, Bangalore', 'APPROVED', '["Shared Kitchen", "Drinking Water"]', '["https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800"]', NOW()),
('l8', 'demo-lister-id-999', 'Executive Coliving - Electronic City', 'PG', 16000, 'Private pods for tech professionals.', 'Electronic City Phase 1, Bangalore', 'APPROVED', '["Workpods", "Terrace"]', '["https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800"]', NOW()),
-- ROOMMATES
('l9', 'demo-lister-id-999', 'Looking for Roommate in 2BHK Flat', 'ROOMMATE', 14500, 'Chill roommate needed.', 'Bellandur, Bangalore', 'APPROVED', '["Kitchen", "Fridge"]', '["https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800"]', NOW()),
('l10', 'demo-lister-id-999', 'Female Replacement - 3BHK', 'ROOMMATE', 10000, 'Single occupancy room.', 'Jayanagar, Bangalore', 'APPROVED', '["Gym", "Security"]', '["https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=800"]', NOW()),
('l11', 'demo-lister-id-999', 'Roommate for Penthouse - Sarjapur', 'ROOMMATE', 22000, 'Penthouse share.', 'Sarjapur Road, Bangalore', 'APPROVED', '["Parking", "AC"]', '["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"]', NOW()),
('l12', 'demo-lister-id-999', 'Shared Occupancy in 1BHK', 'ROOMMATE', 6000, 'Shared living.', 'Majestic, Bangalore', 'APPROVED', '["Central Location"]', '["https://images.unsplash.com/photo-1505691938895-1758d7eaa511?w=800"]', NOW()),
-- TIFFINS
('l13', 'demo-lister-id-999', 'Ghar Ki Rasoi - North Indian Tiffin', 'TIFFIN', 3500, 'Healthy tiffin.', 'HSR Layout, Bangalore', 'APPROVED', '["Veg", "Delivery"]', '["https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800"]', NOW()),
('l14', 'demo-lister-id-999', 'Spicy South - Executive Meals', 'TIFFIN', 4500, 'South Indian thali.', 'Koramangala, Bangalore', 'APPROVED', '["Varied Menu"]', '["https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800"]', NOW()),
('l15', 'demo-lister-id-999', 'Healthy Bites - Custom Nutrients', 'TIFFIN', 6000, 'Diet focused.', 'Whitefield, Bangalore', 'APPROVED', '["Protein Low Carb"]', '["https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800"]', NOW()),
('l16', 'demo-lister-id-999', 'Homely Tiffins - Budget Choice', 'TIFFIN', 2800, 'Home cooked tiffin.', 'AECS Layout, Bangalore', 'APPROVED', '["Student Discount"]', '["https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800"]', NOW())
ON CONFLICT (id) DO NOTHING;
