export default interface Product {
  id: number;
  name: string;
  tagline: string;
  slug: string;
  thumbnail: {
    image_url: string;
  };
  user: {
    avatar_url: string;
    name: string;
  };
}
