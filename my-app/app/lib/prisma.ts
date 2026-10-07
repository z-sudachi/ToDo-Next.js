import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import mariadb from 'mariadb';

// グローバル空間に prisma と pool を保持するための型定義
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: ReturnType<typeof mariadb.createPool> | undefined;
};

// mysql: を mariadb: にプロトコル変換
const databaseUrl = process.env.DATABASE_URL?.replace(/^mysql:/, 'mariadb:');

// すでに作成済みの pool があれば使い回し、無ければ新しく作成
const pool =
  globalForPrisma.pool ?? mariadb.createPool(databaseUrl!);

// (pool as any) とすることで、TypeScript の型のミスマッチによる波線を解消します
const adapter = new PrismaMariaDb(pool as any);

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

// 開発環境（dev）の場合はグローバル変数に保存して再利用する
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
  globalForPrisma.pool = pool;
}