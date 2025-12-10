// lib/actions/application.actions.ts
'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface ApplicationData {
  name: string;
  email?: string;
  phone: string;
  message: string;
  roomId: string;
  status: string;
}

const SubmitApplication = async (data: ApplicationData) => {
  try {
    const application = await prisma.application.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        roomId: data.roomId,
        status: data.status,
      },
    });

    revalidatePath('/admin/applications');
    return { success: true, application };
  } catch (error) {
    console.error('Error submitting application:', error);
    throw new Error('Failed to submit application');
  }
}

export default SubmitApplication;