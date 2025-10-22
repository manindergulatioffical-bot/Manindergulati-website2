import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { adminUsers } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getEnv } from "@/lib/env";

export async function POST(request: NextRequest) {
  try {
    const env = getEnv(); // ✅ runtime-safe

    const { username, password } = await request.json();
    if (!username || !password) return NextResponse.json({ error: "Username and password required" }, { status: 400 });

    const users = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
    const user = users[0];
    if (!user || !user.isActive) return NextResponse.json({ error: "Invalid credentials or deactivated account" }, { status: 401 });

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    await db.update(adminUsers).set({ lastLoginAt: new Date() }).where(eq(adminUsers.id, user.id));

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, env.JWT_SECRET, { expiresIn: "24h" });

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: { id: user.id, username: user.username, role: user.role },
    });

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
