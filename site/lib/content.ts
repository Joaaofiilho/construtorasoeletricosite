import galleryPhotos from './ouro-verde-photos.json';

export const contact = {
  whatsapp:
    'https://wa.me/5585999350248?text=' +
    encodeURIComponent(
      'Olá! Gostaria de conversar sobre a execução de uma obra com a Soelétrico.',
    ),
  phone: '(85) 99935-0248',
  email: 'soeletrico@gmail.com',
};
export const projectId = 'casa-de-alto-padrao-no-ouro-verde';
export const projectHref = `/projetos#${projectId}`;
export const projectTitle = 'Casa de Alto Padrão no Ouro Verde';

const findPhoto = (name: string, caption: string) => {
  const photo = galleryPhotos.find((photo) => photo.name === name)!;
  return { ...photo, alt: `${caption} — ${projectTitle}`, caption };
};
export const photos = {
  hero: findPhoto('foto-30', 'Fachada e área de lazer no Ouro Verde'),
  detail: findPhoto('foto-43', 'Escada e acabamentos internos'),
  project: findPhoto('foto-41', 'Casa de Alto Padrão no Ouro Verde ao entardecer'),
};

export const gallery = [
  {
    title: 'Fachada, piscina e jardim',
    ids: [30, 34, 35, 36, 37, 38, 39, 41, 27, 28],
  },
  { title: 'Varandas e área de lazer', ids: [29, 31, 32, 33] },
  {
    title: 'Salas, cozinha e jantar',
    ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  { title: 'Quartos', ids: [13, 14, 15, 16, 17, 18, 19, 20] },
  { title: 'Banheiros', ids: [21, 22, 23, 24, 25, 26] },
  { title: 'Escada e detalhes', ids: [43, 44, 45] },
].map((group) => ({
  title: group.title,
  photos: group.ids.map((id, index) =>
    findPhoto(
      `foto-${String(id).padStart(2, '0')}`,
      `${group.title} · foto ${index + 1}`,
    ),
  ),
}));

export const projectTypes = [
  {
    id: projectId,
    href: projectHref,
    number: '01',
    title: 'Casas',
    subtitle: 'Espaços para viver.',
    description:
      'Construção de residências com cuidado na execução e nos detalhes que fazem parte do seu dia a dia.',
  },
  {
    id: 'obras-comerciais',
    href: '/projetos',
    number: '02',
    title: 'Obras comerciais',
    subtitle: 'Espaços para crescer.',
    description:
      'Execução do seu projeto comercial, com atenção aos ambientes que vão receber seu negócio.',
  },
  {
    id: 'galpoes',
    href: '/projetos',
    number: '03',
    title: 'Galpões',
    subtitle: 'Espaços para produzir.',
    description:
      'Construção de galpões a partir do seu projeto, acompanhando cada etapa da execução.',
  },
] as const;
