import { NextRequest, NextResponse } from 'next/server';
import { db } from "@/server/db";
import { adminUsers } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { env } from "@/lib/env";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { authenticated: false, error: 'No token provided' },
        { status: 401 }
      );
    }

    // Verify JWT token
    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string; username: string; role: string };
    
    if (!decoded || !decoded.id) {
      return NextResponse.json(
        { authenticated: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Get user from database
    const users = await db.select().from(adminUsers).where(eq(adminUsers.id, decoded.id));
    const user = users[0];

    if (!user || !user.isActive) {
      return NextResponse.json(
        { authenticated: false, error: 'User not found or inactive' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { authenticated: false, error: 'Invalid token' },
      { status: 401 }
    );
  }
}
