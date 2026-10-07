import { prisma } from "@/app/lib/prisma";
import TodoClient from "@/app/components/TodoClient";

export default async function Home() {
  // 1. データベースから最新のToDoデータを取り出す
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });

  // 2. 取り出したデータを、音やクリックを担当する TodoClient に引き渡して表示する
  return <TodoClient todos={todos} />;
}