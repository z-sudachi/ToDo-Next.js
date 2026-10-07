'use server';

import { prisma } from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache';

// 1. 新規ToDoの追加処理
export async function addTodo(text: string) {
  if (!text || text.trim() === '') return;

  await prisma.todo.create({
    data: { text: text.trim() },
  });

  revalidatePath('/');
}

// 2. isCompleted（完了状態）の切り替え処理
export async function toggleTodo(id: number, currentStatus: boolean) {
  await prisma.todo.update({
    where: { id },
    data: { isCompleted: !currentStatus },
  });

  revalidatePath('/');
}

// 3. ToDoの削除処理
export async function deleteTodo(id: number) {
  await prisma.todo.delete({
    where: { id },
  });

  revalidatePath('/');
}