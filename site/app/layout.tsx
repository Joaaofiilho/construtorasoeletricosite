import type { Metadata } from 'next';
import '@fontsource-variable/manrope';
import '@fontsource-variable/dm-sans';
import './globals.css';

export const metadata: Metadata = {
  icons: { icon: '/favicon.svg' },
  title: 'Soelétrico | Construção com cuidado em Trairi, Ceará',
  description:
    'Construção de casas, obras comerciais e galpões em Trairi e região. A qualidade do acabamento e o acompanhamento próximo de João Sabiá, com mais de 15 anos de experiência.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
