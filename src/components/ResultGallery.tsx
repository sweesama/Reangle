"use client";

import { useTranslations } from "next-intl";
import { Download, Share2 } from "lucide-react";

interface ResultGalleryProps {
  images: string[];
}

export default function ResultGallery({ images }: ResultGalleryProps) {
  const t = useTranslations('results');
  
  const handleDownload = (imageUrl: string, index: number) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `reangle-${index + 1}.png`;
    link.click();
  };

  return (
    <div className="apple-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-apple-gray-800">{t('title')}</h2>
          <p className="text-apple-gray-500 text-sm mt-0.5">{t('count', { count: images.length })}</p>
        </div>
        <button className="px-4 py-2 bg-apple-blue rounded-full text-white text-sm font-medium hover:bg-[#0077ed] transition-colors flex items-center space-x-1.5">
          <Share2 className="w-4 h-4" />
          <span>{t('share')}</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="group relative bg-apple-gray-50 rounded-xl overflow-hidden border border-apple-gray-100"
          >
            <img
              src={image}
              alt={`Generated ${index + 1}`}
              className="w-full h-auto"
            />

            {/* 悬停时显示操作按钮 */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
              <button
                onClick={() => handleDownload(image, index)}
                className="p-2.5 bg-white rounded-full hover:bg-apple-gray-50 transition-colors shadow-lg"
                title="下载图片"
              >
                <Download className="w-4 h-4 text-apple-gray-800" />
              </button>
            </div>

            {/* 索引标签 */}
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-apple-gray-800 text-xs font-medium">
              #{index + 1}
            </div>
          </div>
        ))}
      </div>

      {/* 提示信息 */}
      <div className="mt-6 p-3.5 bg-apple-gray-50 border border-apple-gray-100 rounded-lg">
        <p className="text-apple-gray-600 text-sm">
          💡 {t('hint')}
        </p>
      </div>
    </div>
  );
}
