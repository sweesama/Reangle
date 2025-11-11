"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Camera, ChevronRight, User, LogOut } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";
import AngleSelector from "@/components/AngleSelector";
import ResultGallery from "@/components/ResultGallery";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const t = useTranslations();
  const { user, profile, loading, signOut, refreshProfile } = useAuth();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* 导航栏 - 苹果风格 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-apple-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <Camera className="w-5 h-5 text-apple-gray-800" />
            <span className="text-xl font-semibold text-apple-gray-800 tracking-tight">
              {t('nav.brand')}
            </span>
            <span className="text-xs text-apple-gray-400 mt-1">
              {t('nav.by')}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {user && profile ? (
              <>
                {/* 显示剩余次数 */}
                <div className="text-sm text-apple-gray-600">
                  <span className="font-medium">{profile.credits}</span> {t('auth.credits')}
                </div>
                
                {/* 用户菜单 */}
                <div className="flex items-center space-x-2">
                  <User size={18} className="text-apple-gray-600" />
                  <span className="text-sm text-apple-gray-600">{user.email}</span>
                </div>
                
                {/* 退出按钮 */}
                <button
                  onClick={signOut}
                  className="text-apple-gray-500 hover:text-apple-gray-700 transition-colors"
                  title={t('auth.signOut')}
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="text-apple-blue hover:text-[#0077ed] text-sm font-normal transition-colors"
              >
                {t('nav.login')}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* 主内容区 */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero 区域 - 苹果风格 */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-semibold text-apple-gray-800 mb-4 tracking-tight leading-tight">
            {t('hero.title')}
          </h1>

          <p className="text-xl md:text-2xl text-apple-gray-500 max-w-2xl mx-auto mb-12 font-normal">
            {t('hero.subtitle')}
            <br className="hidden md:block" />
            {t('hero.description')}
          </p>
        </div>

        {/* 主要功能区 */}
        <div className="grid lg:grid-cols-2 gap-6 mb-20">
          {/* 左侧：上传区 */}
          <div>
            <ImageUploader
              onImageUpload={setUploadedImage}
              uploadedImage={uploadedImage}
            />
          </div>

          {/* 右侧：角度选择 */}
          <div>
            <AngleSelector
              disabled={!uploadedImage}
              isGenerating={isGenerating}
              onGenerate={async (prompt) => {
                if (!uploadedImage) return;
                
                // 检查是否登录
                if (!user) {
                  alert(t('auth.loginSubtitle'));
                  setShowAuthModal(true);
                  return;
                }
                
                // 检查剩余次数
                if (profile && profile.credits <= 0) {
                  alert('Credits exhausted. Please purchase more.');
                  return;
                }
                
                setIsGenerating(true);
                try {
                  // 调用 AI API 生成图片
                  const response = await fetch('/api/generate', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      imageUrl: uploadedImage,
                      prompt: prompt,
                      userId: user.id,
                    }),
                  });

                  const data = await response.json();

                  if (data.success) {
                    setGeneratedImages([data.image]);
                    
                    // 扣除1次使用次数
                    if (profile) {
                      await supabase
                        .from('users')
                        .update({ credits: profile.credits - 1 })
                        .eq('id', user.id);
                      
                      // 刷新用户信息
                      refreshProfile();
                    }
                  } else {
                    alert('生成失败: ' + data.error);
                  }
                } catch (error) {
                  console.error('生成错误:', error);
                  alert('生成失败，请检查网络连接');
                } finally {
                  setIsGenerating(false);
                }
              }}
            />
          </div>
        </div>

        {/* 结果展示区 */}
        {generatedImages.length > 0 && (
          <div className="mb-20">
            <ResultGallery images={generatedImages} />
          </div>
        )}

        {/* 功能介绍 - 苹果风格 */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {[
            {
              title: t('features.title1'),
              desc: t('features.desc1'),
            },
            {
              title: t('features.title2'),
              desc: t('features.desc2'),
            },
            {
              title: t('features.title3'),
              desc: t('features.desc3'),
            },
          ].map((feature, i) => (
            <div key={i} className="apple-card p-8">
              <h3 className="text-lg font-semibold text-apple-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-apple-gray-500 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA - 苹果风格 */}
        <div className="text-center">
          <button className="apple-button inline-flex items-center space-x-2">
            <span>{t('cta.button')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <p className="mt-4 text-apple-gray-500 text-sm">
            {t('cta.hint')}
          </p>
        </div>
      </main>

      {/* 页脚 - 苹果风格 */}
      <footer className="mt-32 py-12 text-center border-t border-apple-gray-100">
        <p className="text-apple-gray-500 text-sm">{t('footer.copyright')}</p>
      </footer>

      {/* 认证模态框 */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          refreshProfile();
        }}
      />
    </div>
  );
}
