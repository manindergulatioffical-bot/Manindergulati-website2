import bcrypt from 'bcryptjs';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { adminUsers } from '../server/db/schema';

async function seedAdmin() {
  try {
    // Database connection
    const sql = neon(process.env.DATABASE_URL!);
    const db = drizzle(sql);

    const username = process.argv[2] || 'admin';
    const password = process.argv[3] || 'admin123';
    const email = process.argv[4] || 'admin@example.com';

    // Check if admin user already exists
    const existingUsers = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
    
    if (existingUsers.length > 0) {
      console.log('✅ Admin user already exists!');
      return;
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create admin user
    const [newUser] = await db.insert(adminUsers).values({
      username,
      passwordHash,
      email,
      role: "admin",
      isActive: true
    }).returning();

    console.log('✅ Admin user created successfully!');
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('ID:', newUser.id);
    console.log('\nYou can now login with these credentials.');

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  }
}

seedAdmin();
