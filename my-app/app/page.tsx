import { PrismaClient } from "@prisma/client";

// PrismaClient のインスタンスを作成
const prisma = new PrismaClient();

export default async function Home() {
  // DBから todos の全データを取得（新しい順）
  const todos = await prisma.todos.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return (
    <main style={{ padding: "32px", fontFamily: "sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
        Todo 一覧
      </h1>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              padding: "12px",
              marginBottom: "8px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <input
              type="checkbox"
              defaultChecked={todo.is_completed}
              readOnly
            />
            <span style={{ textDecoration: todo.is_completed ? "line-through" : "none" }}>
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}