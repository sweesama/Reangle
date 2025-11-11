import { NextRequest, NextResponse } from 'next/server';
import { generateImage, blobToDataURL } from '@/lib/huggingface';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl, prompt } = body;

    // 验证参数
    if (!imageUrl || !prompt) {
      return NextResponse.json(
        { error: '缺少必要参数：imageUrl 和 prompt' },
        { status: 400 }
      );
    }

    // 调用 Qwen-Image API 生成多角度图片
    const resultBlob = await generateImage({
      imageUrl,
      prompt,
    });

    // 转换为 Base64
    const base64Image = await blobToDataURL(resultBlob);

    return NextResponse.json({
      success: true,
      image: base64Image,
      prompt: prompt,
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: error.message || '图片生成失败',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// 支持 OPTIONS 请求（CORS）
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
