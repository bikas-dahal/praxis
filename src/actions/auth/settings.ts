'use server'

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { editMemberSchema, EditMemberType } from "@/schemas/authSchema";

export const updateUserProfile = async (data: EditMemberType) => {
  // Get the current authenticated user
  const session = await auth();

  if (!session?.user) {
    return {
      status: 'error',
      error: 'Not authenticated'
    };
  }

  try {
    // Validate input
    const validatedFields = editMemberSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        status: 'error',
        error: 'Invalid fields',
        details: validatedFields.error.flatten()
      };
    }

    // Update user profile using the authenticated user's ID
    const { name, image } = validatedFields.data;
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id }, // Use ID, not email
      data: {
        name,
        image
      },
    });


    return {
      status: 'success',
      data: updatedUser
    };
  } catch (error) {
    console.error('Profile update error:', error);
    return {
      status: 'error',
      error: 'Failed to update profile'
    };
  }
};



export async function getUserImage(userId: string | null) {
    if (!userId) {
      throw new Error("User ID is required");
    }
  
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { image: true },
    });
  
    if (!user) {
      throw new Error("User not found");
    }
  
    return user.image;
  }