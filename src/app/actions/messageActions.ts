'use server';

import { MessageSchema, messageSchema } from '@/lib/schemas/message-schema';
import { ActionResult } from '@/types';
import { getCurrentUserId } from './authActions';
import { prisma } from '@/lib/prisma';
import { Message } from '@prisma/client';

export async function createMessage(
  recipientId: string,
  data: MessageSchema
): Promise<ActionResult<Message>> {
  try {
    const validated = messageSchema.safeParse(data);
    if (!validated.success) {
      return { status: 'error', error: validated.error.errors };
    }

    const userId = await getCurrentUserId();
    const { text } = validated.data;

    const message = await prisma.message.create({
      data: {
        text,
        recipientId,
        senderId: userId,
      },
    });

    return { status: 'success', data: message };
  } catch (error) {
    console.log(error);
    return { status: 'error', error: 'Something went wrong' };
  }
}
