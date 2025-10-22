import { NextRequest, NextResponse } from 'next/server';
import { db } from "@/server/db";
import { adminUsers } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "@/lib/env";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify JWT token
    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string; username: string; role: string };
    
    if (!decoded || !decoded.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { currentPassword, newUsername, newPassword } = await request.json();

    // Validate input
    if (!currentPassword) {
      return NextResponse.json(
        { error: 'Current password is required' },
        { status: 400 }
      );
    }

    // Get user from database
    const users = await db.select().from(adminUsers).where(eq(adminUsers.id, decoded.id));
    const user = users[0];

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: 'User not found or inactive' },
        { status: 401 }
      );
    }

    // Verify current password
    const isValidCurrentPassword = await bcrypt.compare(currentPassword, user.passwordHash);
    
    if (!isValidCurrentPassword) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData: {
      updatedAt: Date;
      username?: string;
      passwordHash?: string;
    } = {
      updatedAt: new Date()
    };

    // Check if username is being changed
    if (newUsername && newUsername !== user.username) {
      // Check if new username already exists
      const existingUser = await db.select().from(adminUsers).where(eq(adminUsers.username, newUsername));
      if (existingUser.length > 0) {
        return NextResponse.json(
          { error: 'Username already exists' },
          { status: 400 }
        );
      }
      updateData.username = newUsername;
    }

    // Check if password is being changed
    if (newPassword) {
      if (newPassword.length < 6) {
        return NextResponse.json(
          { error: 'New password must be at least 6 characters long' },
          { status: 400 }
        );
      }
      const saltRounds = 12;
      updateData.passwordHash = await bcrypt.hash(newPassword, saltRounds);
    }

    // Update user
    await db.update(adminUsers)
      .set(updateData)
      .where(eq(adminUsers.id, user.id));

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully"
    });

  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
