import { createClient } from '@supabase/supabase-js';

// Supabase 配置
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wrvwgocmaocqvkzpwsfy.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indydndnb2NtYW9jcXZrenB3c2Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4Mjg4MDQsImV4cCI6MjA3ODQwNDgwNH0.nlOK9we6-J-tFGMEkdxoxbFtSqkXQ9UAfV_NdDkmsSY';

// 创建 Supabase 客户端
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 用户类型定义
export interface User {
  id: string;
  email: string;
  created_at: string;
  credits: number; // 剩余次数
}

// 生成记录类型
export interface GenerationRecord {
  id: string;
  user_id: string;
  prompt: string;
  image_url: string;
  created_at: string;
}
