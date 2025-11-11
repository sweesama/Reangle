// Hugging Face Gradio Client for Qwen-Image MultipleAngles
// 完全免费，无需 API Token！

export interface GenerateImageOptions {
  imageUrl: string;
  prompt: string;
  customText?: string;
}

/**
 * 使用 Qwen-Image-2509-MultipleAngles 模型生成多角度图片
 * 模型地址：https://huggingface.co/spaces/tori29umai/Qwen-Image-2509-MultipleAngles
 * 
 * 使用Gradio API调用
 */
export async function generateImage(options: GenerateImageOptions): Promise<Blob> {
  const { imageUrl, prompt, customText = '' } = options;

  try {
    const API_URL = 'https://tori29umai-qwen-image-2509-multipleangles.hf.space';
    
    // 步骤1: 提交任务
    const submitResponse = await fetch(`${API_URL}/api/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [
          imageUrl,        // 输入图片 (data URL或URL)
          prompt,          // extra: 相机控制指令（如 "Rotate camera 45° left"）
          customText,      // custom_text: 自定义文本（可选）
        ]
      })
    });

    if (!submitResponse.ok) {
      throw new Error(`API request failed: ${submitResponse.statusText}`);
    }

    const result = await submitResponse.json();
    
    // Gradio返回的结果格式：{ data: [imageUrl, ...] }
    if (!result.data || !result.data[0]) {
      throw new Error('No image returned from API');
    }
    
    // 获取生成的图片URL
    const resultImageUrl = result.data[0];
    
    // 如果是相对路径，补全为绝对路径
    const fullImageUrl = resultImageUrl.startsWith('http') 
      ? resultImageUrl 
      : `${API_URL}/file=${resultImageUrl}`;
    
    // 下载生成的图片
    const imageResponse = await fetch(fullImageUrl);
    if (!imageResponse.ok) {
      throw new Error('Failed to download generated image');
    }
    
    const imageBlob = await imageResponse.blob();
    return imageBlob;
    
  } catch (error) {
    console.error('Hugging Face API Error:', error);
    throw new Error('图片生成失败，请稍后重试: ' + (error as Error).message);
  }
}

/**
 * 将 Blob 转换为 Base64 Data URL
 */
export function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
