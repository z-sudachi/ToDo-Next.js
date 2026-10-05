import { prisma } from "@/app/lib/prisma";

export default async function Home() {
  // データベースから Todo 一覧を取得
  const todos = await prisma.todo.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>ToDo リスト（動作確認）</h1>
      {todos.length === 0 ? (
        <p>Todo がありません。</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} style={{ marginBottom: "0.5rem" }}>
              <input type="checkbox" checked={todo.isCompleted} readOnly />
              <span
                style={{
                  marginLeft: "0.5rem",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.text}
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}