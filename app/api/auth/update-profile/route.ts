import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { adminUsers } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getEnv } from "@/lib/env"; // ✅ use getEnv

export async function POST(request: NextRequest) {
  try {
    const env = getEnv(); // ✅ runtime-safe

    const { userId, newPassword } = await request.json();

    if (!userId || !newPassword) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.update(adminUsers)
      .set({ passwordHash: hashedPassword })
      .where(eq(adminUsers.id, userId));

    const token = jwt.sign({ id: userId }, env.JWT_SECRET, { expiresIn: "24h" });

    return NextResponse.json({ success: true, message: "Profile updated", token });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
