# 🔐 Supabase 用户认证系统设置指南

## ✅ 已完成的工作

### 1. 代码集成完成 ✨
- ✅ Supabase 客户端配置 (`src/lib/supabase.ts`)
- ✅ 认证模态框组件 (`src/components/AuthModal.tsx`)
- ✅ 用户状态管理 Hook (`src/hooks/useAuth.ts`)
- ✅ 主页面集成（登录/注册/退出）
- ✅ 使用次数限制逻辑
- ✅ 多语言支持（英文/中文）

### 2. 功能特性
- 🎉 **注册送3次免费额度**
- 🔒 **邮箱+密码认证**
- 📊 **实时显示剩余次数**
- 🚫 **次数用完自动拦截**
- 👤 **用户信息展示**
- 🔄 **自动状态同步**

---

## 📋 数据库设置步骤

### 步骤1：登录 Supabase Dashboard

1. 访问 https://supabase.com/dashboard
2. 选择你的项目：`wrvwgocmaocqvkzpwsfy`

### 步骤2：运行 SQL 脚本

1. 在左侧菜单点击 **SQL Editor**
2. 点击 **New Query**
3. 复制 `supabase-setup.sql` 文件的全部内容
4. 粘贴到 SQL 编辑器
5. 点击 **Run** 按钮执行

### 步骤3：验证表创建

1. 在左侧菜单点击 **Table Editor**
2. 应该看到两个新表：
   - `users` - 用户信息表
   - `generations` - 生成记录表

---

## 🗄️ 数据库结构

### users 表
```sql
id          UUID (主键，关联 auth.users)
email       TEXT (用户邮箱)
credits     INTEGER (剩余次数，默认3)
created_at  TIMESTAMP (创建时间)
updated_at  TIMESTAMP (更新时间)
```

### generations 表
```sql
id          UUID (主键)
user_id     UUID (用户ID)
prompt      TEXT (生成提示词)
image_url   TEXT (图片URL)
created_at  TIMESTAMP (创建时间)
```

---

## 🔒 安全策略 (RLS)

已启用行级安全策略，确保：
- ✅ 用户只能查看自己的数据
- ✅ 用户只能更新自己的信息
- ✅ 用户只能查看自己的生成记录
- ✅ 防止数据泄露

---

## 🧪 测试步骤

### 1. 启动开发服务器
```bash
npm run dev
```

### 2. 测试注册流程
1. 访问 http://localhost:3000/en
2. 点击右上角 "Sign In"
3. 切换到 "Sign Up"
4. 输入邮箱和密码（至少6位）
5. 点击注册
6. 应该看到成功提示

### 3. 测试登录流程
1. 使用刚注册的账号登录
2. 登录后应该看到：
   - 右上角显示邮箱
   - 显示 "3 Credits"
   - 退出按钮

### 4. 测试生成功能
1. 上传一张图片
2. 选择角度
3. 点击 "Generate Image"
4. 应该成功生成
5. 剩余次数变为 "2 Credits"

### 5. 测试次数限制
1. 连续生成3次
2. 第4次应该提示："Credits exhausted"
3. 无法继续生成

---

## ⚠️ 常见问题

### 问题1：注册后无法创建用户记录
**原因**：SQL脚本未执行或执行失败

**解决**：
1. 检查 Supabase SQL Editor 是否有错误提示
2. 确保 `users` 表已创建
3. 重新运行 SQL 脚本

### 问题2：登录后看不到剩余次数
**原因**：用户记录未创建

**解决**：
1. 在 Table Editor 查看 `users` 表
2. 手动添加用户记录：
   ```sql
   INSERT INTO users (id, email, credits)
   VALUES ('用户ID', '邮箱', 3);
   ```

### 问题3：生成时提示"请登录"
**原因**：认证状态未同步

**解决**：
1. 刷新页面
2. 重新登录
3. 检查浏览器控制台是否有错误

---

## 🎯 下一步功能

### 已完成 ✅
- [x] 用户注册/登录
- [x] 使用次数限制
- [x] 剩余次数显示
- [x] 次数扣除逻辑

### 待开发 ⏳
- [ ] 用户 Dashboard（查看历史记录）
- [ ] 充值功能（Stripe 集成）
- [ ] 邮箱验证
- [ ] 密码重置
- [ ] 社交登录（Google/GitHub）

---

## 📊 当前项目状态

| 功能模块 | 状态 | 说明 |
|---------|------|------|
| UI 设计 | ✅ 完成 | 苹果风格 |
| 多语言 | ✅ 完成 | 英文/中文 |
| AI 生成 | ✅ 完成 | Qwen 模型 |
| 用户认证 | ✅ 完成 | Supabase |
| 次数限制 | ✅ 完成 | 3次免费 |
| 支付系统 | ⏳ 待做 | Stripe |
| 部署 | ⏳ 待做 | Vercel |

---

## 🚀 准备部署

在部署到 Vercel 之前，确保：

1. ✅ 数据库表已创建
2. ✅ 本地测试通过
3. ✅ 环境变量已配置：
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://wrvwgocmaocqvkzpwsfy.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=你的密钥
   ```

---

**用户认证系统已100%完成！现在可以测试或部署了。** 🎉
