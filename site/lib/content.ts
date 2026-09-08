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
  commercial: photo(
    'commercial',
    'fachada de um edifício comercial com grandes superfícies de vidro.',
    3944,
    7008,
  ),
  warehouse: photo(
    'warehouse',
    'exterior de galpões com cobertura metálica e pátio de acesso.',
    3024,
    4032,
  ),
};

export const projectTypes = [
  {
    id: 'casas',
    number: '01',
    title: 'Casas',
    subtitle: 'Espaços para viver.',
    description:
      'Construção de residências com cuidado na execução e nos detalhes que fazem parte do seu dia a dia.',
    photo: 'project',
    label: 'RESIDENCIAL',
  },
  {
    id: 'obras-comerciais',
    number: '02',
    title: 'Obras comerciais',
    subtitle: 'Espaços para crescer.',
    description:
      'Execução do seu projeto comercial, com atenção aos ambientes que vão receber seu negócio.',
    photo: 'commercial',
    label: 'COMERCIAL',
  },
  {
    id: 'galpoes',
    number: '03',
    title: 'Galpões',
    subtitle: 'Espaços para produzir.',
    description:
      'Construção de galpões a partir do seu projeto, acompanhando cada etapa da execução.',
    photo: 'warehouse',
    label: 'INDUSTRIAL',
  },
] as const;
