"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  RotateCw,
  RotateCcw,
  MoveUp,
  MoveDown,
  ZoomIn,
  ZoomOut,
  Camera,
} from "lucide-react";

const angleOptions = [
  { id: "rotateLeft45", icon: RotateCcw, prompt: "Rotate camera 45° left" },
  { id: "rotateRight45", icon: RotateCw, prompt: "Rotate camera 45° right" },
  { id: "rotateLeft90", icon: RotateCcw, prompt: "Rotate camera 90° left" },
  { id: "rotateRight90", icon: RotateCw, prompt: "Rotate camera 90° right" },
  { id: "topDown", icon: MoveDown, prompt: "Switch to top-down view" },
  { id: "lowAngle", icon: MoveUp, prompt: "Switch to low-angle view" },
  { id: "zoomIn", icon: ZoomIn, prompt: "Switch to close-up lens" },
  { id: "zoomOut", icon: ZoomOut, prompt: "Switch to zoom out lens" },
];

interface AngleSelectorProps {
  disabled: boolean;
  isGenerating: boolean;
  onGenerate: (prompt: string) => void;
}

export default function AngleSelector({
  disabled,
  isGenerating,
  onGenerate,
}: AngleSelectorProps) {
  const t = useTranslations('angleSelector');
  const [selectedAngle, setSelectedAngle] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");

  const handleGenerate = () => {
    if (selectedAngle) {
      const angle = angleOptions.find((a) => a.id === selectedAngle);
      const finalPrompt = customPrompt || angle?.prompt || "";
      onGenerate(finalPrompt);
    }
  };

  return (
    <div className="apple-card p-6">
      <h2 className="text-lg font-semibold text-apple-gray-800 mb-1">{t('title')}</h2>
      <p className="text-apple-gray-500 text-sm mb-6">{t('subtitle')}</p>

      {/* 角度按钮网格 */}
      <div className="grid grid-cols-2 gap-2.5 mb-6">
        {angleOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = selectedAngle === option.id;
          return (
            <button
              key={option.id}
              onClick={() => !disabled && setSelectedAngle(option.id)}
              disabled={disabled}
              className={`
                p-4 rounded-lg text-left transition-all duration-200 border
                ${
                  isSelected
                    ? "bg-apple-blue border-apple-blue"
                    : "bg-white border-apple-gray-200 hover:border-apple-gray-300"
                }
                ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              <Icon className={`w-5 h-5 mb-1.5 ${isSelected ? "text-white" : "text-apple-gray-600"}`} />
              <p className={`text-sm font-medium ${isSelected ? "text-white" : "text-apple-gray-800"}`}>
                {t(`angles.${option.id}`)}
              </p>
            </button>
          );
        })}
      </div>

      {/* 自定义提示词 */}
      <div className="mb-6">
        <label className="block text-sm text-apple-gray-600 mb-2 font-medium">
          {t('customPrompt')}
        </label>
        <input
          type="text"
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          disabled={disabled}
          placeholder={t('customPlaceholder')}
          className="w-full px-4 py-2.5 bg-white border border-apple-gray-200 rounded-lg text-apple-gray-800 placeholder-apple-gray-400 focus:outline-none focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        />
      </div>

      {/* 生成按钮 */}
      <button
        onClick={handleGenerate}
        disabled={disabled || !selectedAngle || isGenerating}
        className={`
          w-full py-3 rounded-lg font-medium flex items-center justify-center space-x-2
          transition-all duration-200
          ${
            disabled || !selectedAngle
              ? "bg-apple-gray-200 text-apple-gray-400 cursor-not-allowed"
              : isGenerating
              ? "bg-apple-blue text-white cursor-wait"
              : "bg-apple-blue text-white hover:bg-[#0077ed]"
          }
        `}
      >
        {isGenerating ? (
          <>
            <Camera className="w-5 h-5 animate-pulse" />
            <span>{t('generating')}</span>
          </>
        ) : (
          <span>{t('generateButton')}</span>
        )}
      </button>

      {disabled && (
        <p className="text-sm text-apple-gray-500 mt-3 text-center">
          {t('uploadFirst')}
        </p>
      )}
    </div>
  );
}
