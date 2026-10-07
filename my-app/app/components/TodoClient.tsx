'use client';

import { useState } from 'react';
import { addTodo, toggleTodo, deleteTodo } from '@/app/actions';

// データベースから受け取るToDoの型定義
type Todo = {
  id: number;
  text: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt?: Date;
};

export default function TodoClient({ todos }: { todos: Todo[] }) {
  const [text, setText] = useState('');

  // 効果音を再生する共通関数 (音量を0.2に設定)
  const playSound = (soundPath: string) => {
    const audio = new Audio(soundPath);
    audio.volume = 0.2; // 音量を20%に下げる (0.0 〜 1.0 で調整可能)
    audio.play().catch(() => {
      // ブラウザの自動再生ブロックなどを安全に回避
    });
  };

  // [add] ボタンが押された時の処理
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    // 追加音を再生
    playSound('/add.mp3');

    // DBに追加
    await addTodo(text);
    setText('');
  };

  // is_completed ( [false] / [true] ) が押された時の処理
  const handleToggle = async (id: number, isCompleted: boolean) => {
    if (!isCompleted) {
      // 未達成 -> 達成 (mico.mp3)
      playSound('/mico.mp3');
    } else {
      // 達成 -> 未達成 (add.mp3)
      playSound('/add.mp3');
    }

    // DBの状態を反転
    await toggleTodo(id, isCompleted);
  };

  // [delete] が押された時の処理
  const handleDelete = async (id: number) => {
    // 削除音を再生
    playSound('/add.mp3');

    // DBから削除
    await deleteTodo(id);
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'monospace' }}>
      {/* <ToDo_title> (入力フォーム) */}
      <section style={{ marginBottom: '2rem' }}>
        <p style={{ marginBottom: '1rem' }}>&lt;ToDo_title&gt;</p>
        <form onSubmit={handleAdd} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="新しいタスクを入力..."
            style={{
              border: '1px dashed #000',
              height: '40px',
              width: '400px',
              padding: '0.5rem',
              fontSize: '1rem',
              boxSizing: 'border-box',
              fontFamily: 'monospace',
            }}
          />
          <button
            type="submit"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'monospace',
              fontSize: '1rem',
            }}
          >
            [add]
          </button>
        </form>
      </section>

      {/* <all_ToDo> (一覧テーブル) */}
      <section>
        <p style={{ margin: '0 0 0.5rem 0' }}>&lt;all_ToDo&gt;</p>
        <table style={{ borderCollapse: 'collapse', border: '1px dashed #000' }}>
          <thead>
            <tr style={{ borderBottom: '1px dashed #000' }}>
              <th style={{ borderRight: '1px dashed #000', padding: '0.5rem 1rem', textAlign: 'left' }}>id</th>
              <th style={{ borderRight: '1px dashed #000', padding: '0.5rem 1rem', textAlign: 'left' }}>title</th>
              <th style={{ borderRight: '1px dashed #000', padding: '0.5rem 1rem', textAlign: 'left' }}>is_completed</th>
              <th style={{ borderRight: '1px dashed #000', padding: '0.5rem 1rem', textAlign: 'left' }}>create_at</th>
              <th style={{ borderRight: '1px dashed #000', padding: '0.5rem 1rem', textAlign: 'left' }}>updated_at</th>
              <th style={{ padding: '0.5rem 1rem' }}></th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id} style={{ borderBottom: '1px dashed #000' }}>
                {/* IDを5桁に揃えて表示 (例: 00007) */}
                <td style={{ borderRight: '1px dashed #000', padding: '0.5rem 1rem' }}>
                  {String(todo.id).padStart(5, '0')}
                </td>
                <td style={{ borderRight: '1px dashed #000', padding: '0.5rem 1rem' }}>{todo.text}</td>
                {/* is_completed クリックで切り替え ＆ 効果音 (下線を削除) */}
                <td style={{ borderRight: '1px dashed #000', padding: '0.5rem 1rem' }}>
                  <button
                    onClick={() => handleToggle(todo.id, todo.isCompleted)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'monospace',
                      fontSize: '1rem',
                      padding: 0,
                    }}
                  >
                    [{todo.isCompleted ? 'true' : 'false'}]
                  </button>
                </td>
                {/* Hydration Warningを防止する属性を追加 */}
                <td suppressHydrationWarning style={{ borderRight: '1px dashed #000', padding: '0.5rem 1rem' }}>
                  {new Date(todo.createdAt).toLocaleString('ja-JP')}
                </td>
                <td suppressHydrationWarning style={{ borderRight: '1px dashed #000', padding: '0.5rem 1rem' }}>
                  {todo.updatedAt ? new Date(todo.updatedAt).toLocaleString('ja-JP') : '-'}
                </td>
                {/* [delete] ボタン */}
                <td style={{ padding: '0.5rem 1rem' }}>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'monospace',
                      fontSize: '1rem',
                      padding: 0,
                    }}
                  >
                    [delete]
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}