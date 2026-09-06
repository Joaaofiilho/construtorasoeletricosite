export const contact = {
  whatsapp:
    'https://wa.me/5585999350248?text=' +
    encodeURIComponent(
      'Olá! Gostaria de conversar sobre a execução de uma obra com a Soelétrico.',
    ),
  phone: '(85) 99935-0248',
  email: 'soeletrico@gmail.com',
};
export const illustrationCaption =
  'Imagem ilustrativa — não representa obra executada pela Soelétrico.';

const photo = (name: string, alt: string, width: number, height: number) => ({
  src: `/images/${name}-1536.webp`,
  srcSet: `/images/${name}-768.webp 768w, /images/${name}-1536.webp 1536w, /images/${name}-2560.webp 2560w`,
  alt: `Referência ilustrativa: ${alt}`,
  caption: illustrationCaption,
  width,
  height,
});
export const photos = {
  hero: photo(
    'hero',
    'casa contemporânea com fachada em madeira e pedra clara, junto a uma piscina.',
    7334,
    4895,
  ),
  detail: photo(
    'detail',
    'ambiente de estar com acabamentos em madeira e vista para uma piscina.',
    7360,
    4912,
  ),
  project: photo(
    'project',
    'arquitetura contemporânea com piscina e vegetação tropical ao entardecer.',
    7952,
    5304,
  ),
};
