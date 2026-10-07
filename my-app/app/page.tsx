  import { prisma } from "@/app/lib/prisma";
  import { revalidatePath } from "next/cache";

  export default async function Home() {
    const todos = await prisma.todo.findMany({ orderBy: { createdAt: "desc" } });
    return (
      <main style={{ padding:"2rem",fontFamily:"monospace"}}>
        {/*ToDo_title*/}
        <section style={{marginBottom:"2rem",fontFamily:"monospace"}}>
          <p style={{marginBottom:"2rem"}}>&lt;ToDo_title&gt;</p>
          <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
            <input
              type="text"
              style={{
                border:"1px dashed #000",
                height:"60px",
                width:"400px",
                padding:"0.5rem",
                fontSize:"1rem",
                boxSizing:"border-box",
              }}  
            /> 
            <span>[add]</span>
          </div>
        </section>

        {/*all-ToDo*/}
        <section>
          <p style={{margin:"0 0 0.5rem 0"}}>&lt;all_ToDo&gt;</p>
          <table style={{borderCollapse:"collapse",border:"1px dashed #000"}}>
            <thead>
              <tr style={{borderBottom:"1px dashed #000"}}>
                <th style={{borderRight:"1px dashed #000",padding:"0.5rem 1rem",textAlign:"left"}}>id</th>
                <th style={{borderRight:"1px dashed #000",padding:"0.5rem 1rem",textAlign:"left"}}>title</th>
                <th style={{borderRight:"1px dashed #000",padding:"0.5rem 1rem",textAlign:"left"}}>is_completed</th>
                <th style={{borderRight:"1px dashed #000",padding:"0.5rem 1rem",textAlign:"left"}}>create_at</th>
                <th style={{borderRight:"1px dashed #000",padding:"0.5rem 1rem",textAlign:"left"}}>updated_at</th>
                <th style={{padding:"0.5rem 1rem"}}></th>
              </tr>
            </thead>
            <tbody>
              {/*DBD用*/}
              {todos.map((todo) => (
                <tr key={todo.id} style={{ borderBottom: "1px dashed #000" }}>
                  <td style={{ borderRight: "1px dashed #000", padding: "0.5rem 1rem" }}>{todo.id}</td>
                  <td style={{ borderRight: "1px dashed #000", padding: "0.5rem 1rem" }}>{todo.text}</td>
                  <td style={{ borderRight: "1px dashed #000", padding: "0.5rem 1rem" }}>{todo.isCompleted ? "true" : "false"}</td>
                  <td style={{ borderRight: "1px dashed #000", padding: "0.5rem 1rem" }}>{new Date(todo.createdAt).toLocaleString("ja-JP")}</td>
                  <td style={{ borderRight: "1px dashed #000", padding: "0.5rem 1rem" }}>{new Date(todo.updatedAt).toLocaleString("ja-JP")}</td>
                  <td style={{ padding: "0.5rem 1rem" }}>[delete]</td>
                </tr>
                ))}
            </tbody>
          </table>
        </section>
      </main>
    );
  }