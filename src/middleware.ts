import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';

export default createMiddleware({
  // 默认语言是英文
  defaultLocale: 'en',
  locales,
  localePrefix: 'always'
});

export const config = {
  // 匹配所有路径，除了 api、_next、静态文件
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
