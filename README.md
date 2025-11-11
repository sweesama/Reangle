# Reangle - AI Multi-Angle Image Generator

> By Mzu | Redefine Your Image Perspective

## 🎯 Project Overview

Reangle is an AI-powered multi-angle image generation tool. Upload one image, get infinite perspectives while maintaining perfect consistency in subject, lighting, and style.

## ✨ Core Features

- 🎨 **8 Preset Angles**: Rotate 45°/90° left/right, top-down, low-angle, zoom in/out
- ⚡ **Fast Generation**: AI-powered image-to-image transformation
- 🎯 **Smart Consistency**: Maintains subject, lighting, and style
- 🌐 **Multi-language**: Full English and Chinese support with SEO-friendly URLs
- 📱 **Responsive Design**: Apple-style minimalist UI
- 🔒 **Type-Safe**: Built with TypeScript

## 🛠️ Tech Stack

```
Framework: Next.js 15 (App Router) + React 18 + TypeScript
Styling: TailwindCSS (Apple-style design system)
Icons: Lucide React
I18n: next-intl (with /en and /zh routes)
AI API: Qwen-Image-2509-MultipleAngles (Gradio API, FREE!)
Deployment: Vercel + Cloudflare CDN
```

## 📦 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

**✨ No API token required!** The Qwen-Image-2509-MultipleAngles model is completely FREE and doesn't need authentication!

## 🌐 Access URLs

```
English: http://localhost:3000/en
Chinese: http://localhost:3000/zh
Root (redirects to /en): http://localhost:3000
```

## 📁 Project Structure

```
reangle/
├── messages/              # Translations
│   ├── en.json           # English
│   └── zh.json           # Chinese
├── src/
│   ├── app/
│   │   ├── [locale]/     # Multi-language routes
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   └── generate/ # AI generation API
│   │   ├── layout.tsx    # Root layout
│   │   └── globals.css   # Apple-style CSS
│   ├── components/
│   │   ├── ImageUploader.tsx
│   │   ├── AngleSelector.tsx
│   │   └── ResultGallery.tsx
│   ├── lib/
│   │   ├── huggingface.ts # HF API client
│   │   └── utils.ts
│   ├── i18n/
│   │   └── request.ts    # i18n config
│   └── middleware.ts     # Route middleware
├── tailwind.config.ts    # Apple design system
└── next.config.js        # next-intl plugin
```

## 🎨 Design Features

### Apple-Style Minimalism
- ✅ Pure white background (#ffffff)
- ✅ Apple gray color system (50-800)
- ✅ Apple blue (#0071e3)
- ✅ SF Pro font family
- ✅ Subtle shadows and borders
- ✅ Frosted glass navigation

### User Experience
- Drag-and-drop image upload
- 8 intuitive angle presets
- Real-time loading states
- One-click download
- Responsive on all devices

### SEO & I18n
- Multi-language routes (/en, /zh)
- Complete meta tags
- Semantic HTML
- Open Graph support

## 📋 Development Roadmap

### ✅ Completed
- [x] Next.js 15 + TypeScript setup
- [x] Apple-style UI design
- [x] Multi-language system (en/zh)
- [x] Image upload component
- [x] 8 angle presets
- [x] AI API integration (Hugging Face)
- [x] API route (/api/generate)
- [x] Error handling

### ⏳ In Progress
- [ ] Local testing with HF token
- [ ] Deploy to Vercel

### 🔜 Future Plans
- [ ] User authentication (Supabase)
- [ ] Usage limits & credits
- [ ] Payment integration (Stripe)
- [ ] Upgrade to Replicate API (faster)

## 💰 Business Model

### Pricing Strategy
- **Free Tier**: 3 free credits on signup
- **$5 Plan**: 50 images ($0.10/image)
- **$20 Plan**: 250 images ($0.08/image)
- **$50 Plan**: 1000 images ($0.05/image)

### Cost & Profit
- API Cost: ~$0.02/image (Replicate)
- Profit Margin: 60-80%
- Monthly Operating Cost: ~$0 (Vercel + Supabase free tiers)

## 🚀 How It Works

```
1. User uploads image → Base64 encoding
   ↓
2. Select angle → Convert to AI prompt
   ↓
3. Click Generate → POST /api/generate
   ↓
4. Backend calls HF API → AI processing
   ↓
5. Return generated image → Base64
   ↓
6. Display result → Download/Share
```

## ⚙️ Configuration

### Environment Variables (Optional)

For future features, create `.env.local`:

```bash
# Optional - for user authentication
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Optional - for payment
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

**Note:** No API keys needed for basic AI generation!

## 🐛 Troubleshooting

### Issue: 404 on localhost
**Solution**: Deploy to Vercel for testing, or skip local dev and test in production

### Issue: API Error  
**Solution**: 
- Qwen-Image model is FREE and doesn't require token!
- Check network connection
- Verify image is in correct format (Base64 data URL)

### Issue: Slow generation
**Solution**: Free Gradio API may queue requests. Typically 10-30 seconds.

## 📖 Documentation

See `项目分析-多角度图片生成商业化方案.md` for:
- Detailed cost analysis
- Technical architecture
- Business model breakdown
- 4-week implementation plan
- SEO & marketing strategies

## 🚢 Deployment

```bash
# Build for production
npm run build

# Deploy to Vercel (recommended)
# 1. Push to GitHub
# 2. Import to Vercel
# 3. Add environment variables
# 4. Deploy
```

---

**© 2024 Mzu. All rights reserved.**
