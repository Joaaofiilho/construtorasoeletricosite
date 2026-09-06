# Soelétrico

Landing page da construtora de João Sabiá, em Trairi, Ceará, e região. Visual editorial em areia, grafite e verde-limão, com casa 3D conceitual que se constrói conforme a leitura avança.

## Executar

Requer Node.js 24 ou superior para os testes TypeScript nativos. A aplicação está em `site/`.

```sh
cd site
npm ci
npm run dev
```

Prévia de desenvolvimento: http://localhost:3000 . A porta efetiva é informada pelo servidor se 3000 estiver ocupada.

```sh
npm run build
npm start
```

A exportação estática fica em `site/dist/client/`. `npm start` serve essa pasta localmente. Não há banco de dados, formulário, envio automático de mensagens nem servidor de aplicação necessário para hospedar o resultado estático. Publicação e domínio ficam para uma etapa posterior.

## O que foi implementado

- Abertura, serviços (casas, obras comerciais e galpões), acompanhamento e acabamento, projeto concluído e contato.
- WhatsApp com código de país e DDD, mensagem pré-preenchida revisável pelo visitante e e-mail direto.
- Modelo procedural Three.js com cinco etapas: fundação, estrutura/paredes, cobertura, esquadrias/acabamento, paisagismo/entrega. Avança e retrocede com a rolagem e fica pronto na seção de contato.
- Área lateral exclusiva no computador. No celular, conteúdo com rolagem nativa em uma área acima da faixa reservada à miniatura, evitando sobreposições.
- Revelações progressivas com IntersectionObserver. Conteúdo entregue em HTML e legível sem JavaScript.
- Casa estática para movimento reduzido, falha de carregamento, ausência de WebGL ou perda do contexto gráfico. A alternativa é renderizada do próprio modelo 3D.
- Fotografias e fontes hospedadas junto aos arquivos do site, sem depender de terceiros para exibição.

## Conteúdo e fotos

Contatos e referências fotográficas: `site/lib/content.ts`. Conteúdo das seções: `site/app/page.tsx`. Estilos: `site/app/globals.css`.

As fotografias são **ilustrativas e não retratam obras executadas pela Soelétrico**. As legendas e o aviso da seção deixam isso explícito. A obra real é descrita somente como casa de luxo concluída com piscina ampla de lazer, sem inventar endereço, área ou autoria.

Originais de 7334 × 4895, 7360 × 4912 e 7952 × 5304 pixels ficam em `site/assets/originals/`. A página usa versões WebP responsivas de 768, 1536 e 2560 pixels: imagens acima de 4K ficam preservadas, sem impor esse peso aos celulares. Autoria, licença e links estão em `site/public/images/SOURCES.md`.

Para substituir pelas fotos reais:

1. Salve os novos originais em `site/assets/originals/` e ajuste a lista do script `site/scripts/prepare-images.mjs`.
2. Execute `node scripts/prepare-images.mjs` de dentro de `site/`.
3. Atualize descrições e dimensões em `site/lib/content.ts`.
4. Troque os avisos ilustrativos somente nas imagens efetivamente substituídas. Atualize também o texto de referência visual da seção de projeto.
5. Execute `npm run build` e revise a prévia no computador e no celular.

## Verificação

```sh
cd site
npm test
npm run typecheck
npm run lint
npm run build
npm run test:browser
```

O teste de navegador requer Google Chrome instalado e a prévia em execução. Para verificar outro endereço: `TEST_URL=http://localhost:4173 npm run test:browser`. As evidências são gravadas em `site/outputs/` (ignorada pelo Git).

A suíte cobre limites e reversão do progresso; computador (1440px), tablet (900px), celular (360px) e paisagem (844 × 390px); imagens, contatos, âncoras, ausência de transbordamento e separação da casa; movimento reduzido; JavaScript desabilitado; WebGL ausente e perda do contexto; manutenção do trecho de leitura ao girar o celular. A inspeção visual usa screenshots reais desses estados.

O lint cobre o código da aplicação e os testes. O catálogo Shadcn e o hook não utilizados, fornecidos pelo gerador, permanecem sem alterações e fora desse lint. As imagens são otimizadas previamente para exportação estática, por isso a regra que exige servidor de imagens Next não se aplica aos dois componentes que as exibem.

## Observações técnicas

A cena 3D é importada separadamente e renderizada em mudanças de progresso/tamanho. O aviso de tamanho do chunk Three.js no build refere-se a esse módulo adiado. Geometrias, materiais, renderer e observadores são liberados no descarte.

O gerador Sites fixou dependências que apresentam avisos no `npm audit`, incluindo ferramentas de desenvolvimento e processamento no servidor. A entrega é uma exportação estática; nenhuma função de servidor é publicada. Antes de adotar um servidor Node/React em produção, revisar e atualizar essas dependências. Não foi executado `npm audit fix --force`, para preservar a compatibilidade do gerador.

Referência da implementação 3D: https://threejs.org/manual/en/creating-a-scene.html .

## Planejamento

- Especificação aprovada: `docs/superpowers/specs/2026-09-06-soeletrico-landing-page-design.md`.
- Plano de implementação: `docs/superpowers/plans/2026-09-06-soeletrico-landing-page.md`.
