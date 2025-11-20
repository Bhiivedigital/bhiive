export interface BannerConfig {
  title: string;
  image: string;
  breadcrumb: string;
}

export const BannerMap: Record<string, BannerConfig> = {
  '/services': {
    title: 'Our Services',
    image: '../../../assets/images/banner/services.jpg',
    breadcrumb: 'Services',
  },
  '/portfolio': {
    title: 'Our Portfolio',
    image: 'assets/images/banner/portfolio.jpg',
    breadcrumb: 'Portfolio',
  },
  '/blog': {
    title: 'Blog',
    image: 'assets/images/banner/blog.jpg',
    breadcrumb: 'Blog',
  },
  '/contact': {
    title: 'Contact Us',
    image: 'assets/images/banner/contact.jpg',
    breadcrumb: 'Contact',
  },
  '/': {
    title: 'Welcome to Bhive',
    image: 'assets/images/banner/home.jpg',
    breadcrumb: '',
  },
};
