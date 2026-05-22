// Journal de referência do mestre para o cenário Ekhoria.
// Uma única JournalEntry com páginas-resumo. As fichas mecânicas completas
// estão nos compêndios "Ekhoria: Classes" e "Ekhoria: Raças".

const paginas = [
  {
    title: "Classes de Ekhoria",
    content: `
<p>As 8 classes a seguir são <strong>Especializações</strong> exclusivas do cenário. Cada uma herda o BA/JP de um arquétipo base do OD2, mas usa uma tabela de XP de Especialista própria. As fichas completas (com habilidades por nível) estão no compêndio <strong>Ekhoria: Classes</strong>.</p>
<table>
<thead><tr><th>Classe</th><th>Especialização de</th><th>DV</th><th>Restrição</th></tr></thead>
<tbody>
<tr><td>Custódio Solar</td><td>Clérigo</td><td>1d8</td><td>Apenas Autokthons</td></tr>
<tr><td>Relicário Vivo</td><td>Clérigo</td><td>1d8</td><td>Apenas Silentes</td></tr>
<tr><td>Narcoguerreiro</td><td>Guerreiro</td><td>1d10</td><td>—</td></tr>
<tr><td>Pugilista</td><td>Guerreiro</td><td>1d10</td><td>—</td></tr>
<tr><td>Lito-arcanista</td><td>Mago</td><td>1d4</td><td>Apenas Arkanim (Arkádia)</td></tr>
<tr><td>Guardião da Centelha</td><td>Mago</td><td>1d4</td><td>Cinthara; alinhamento Ordeiro</td></tr>
<tr><td>Diplomata</td><td>Ladrão</td><td>1d6</td><td>—</td></tr>
<tr><td>Voraz</td><td>Ladrão</td><td>1d6</td><td>—</td></tr>
</tbody>
</table>
<p><em>Todas as classes ganham a habilidade Reputação no 11º nível (Relicário Vivo ganha Infâmia).</em></p>
`,
  },
  {
    title: "Raças de Ekhoria",
    content: `
<p>O cenário apresenta 7 raças com mecânica própria (compêndio <strong>Ekhoria: Raças</strong>). As raças base do OD2 (Humano, Elfo, Anão, Halfling, Meio-Elfo, Gnomo) recebem apenas <em>lore</em> no livro de Ekhoria e usam a mecânica do Livro de Regras Básicas do OD2.</p>
<table>
<thead><tr><th>Raça</th><th>Movimento</th><th>Infravisão</th><th>Alinhamento</th></tr></thead>
<tbody>
<tr><td>Autokthon</td><td>9 m</td><td>30 m</td><td>Neutro ou Ordeiro</td></tr>
<tr><td>Cambion</td><td>9 m (6 m se pequeno)</td><td>15 m</td><td>Qualquer</td></tr>
<tr><td>Elfo Drow</td><td>9 m</td><td>18 m</td><td>Neutro</td></tr>
<tr><td>Mantes</td><td>9 m</td><td>18 m</td><td>Neutro</td></tr>
<tr><td>Nefilim</td><td>9 m (6 m se pequeno)</td><td>15 m</td><td>Ordeiro</td></tr>
<tr><td>Orc do Sol Poente</td><td>9 m</td><td>18 m</td><td>Ordeiro</td></tr>
<tr><td>Varko</td><td>6 m</td><td>30 m</td><td>Caótico</td></tr>
</tbody>
</table>
`,
  },
  {
    title: "Exclusividades e Observações de Conversão",
    content: `

<h2>Restrições de classe por raça/origem</h2>
<ul>
<li><strong>Custódio Solar → Autokthon:</strong> a classe exige o chassi de Constructo Vivo. Ao passar pelo Ritual da Renúncia, o personagem assume as habilidades raciais de Autokthon.</li>
<li><strong>Relicário Vivo → Silente:</strong> apenas o corpo morto-vivo consciente de um Silente pode hospedar a Anomalia.</li>
<li><strong>Lito-arcanista → Arkanim:</strong> exclusivo de habitantes de Arkádia submetidos ao Ritual da Saturação.</li>
<li><strong>Guardião da Centelha → Cinthara:</strong> anões-magos de alinhamento Ordeiro, dependentes dos Cristais de Centelha.</li>
</ul>

<h2>Sobre "Silente" e "Arkanim"</h2>
<p>No livro de Ekhoria, <strong>Silente</strong> (morto-vivo consciente de Breônia) e <strong>Arkanim</strong> (habitante de Arkádia) são <em>identidades de origem/lore</em>, e não raças jogáveis com ficha mecânica própria — diferentemente das 7 raças do capítulo "Povos de Ekhoria". As restrições acima são transcritas como o livro as define; cabe ao Mestre decidir como representá-las na criação de personagem.</p>

<h2>Itens, substâncias e magias</h2>
<p>O arsenal (armas, armaduras e substâncias) está no compêndio <strong>Ekhoria: Arsenal</strong>, e as magias das quatro escolas, no compêndio <strong>Ekhoria: Magias</strong>. Os detalhes de materiais, cristais, munições e regras estão na página a seguir.</p>
`,
  },
  {
    title: "Arsenal — Materiais, Cristais e Regras",
    content: `

<h2>Metais Especiais</h2>
<ul>
<li><strong>Prata</strong> (×2): essencial contra licantropos e certos mortos-vivos.</li>
<li><strong>Bronze</strong> (×1,5): −1 na CA, mas reduz o peso (armadura pesada conta como média para Carga).</li>
<li><strong>Mitral</strong> (×10): armaduras mais leves (+1 CA) e armas mais afiadas (+1 dano). Extremamente raro.</li>
</ul>

<h2>Cristais de Ekhoria</h2>
<table>
<thead><tr><th>Cristal</th><th>Em armadura</th><th>Em arma</th><th>Custo</th></tr></thead>
<tbody>
<tr><td>Arkanita</td><td>+1 em JP contra magias</td><td>Dano mágico (afeta imunes a armas normais)</td><td>×5</td></tr>
<tr><td>Ônix</td><td>Furtividade Fácil</td><td>+2 dano em ataques furtivos/pelas costas; silencia armas de fogo</td><td>×4</td></tr>
<tr><td>Centelha Solar</td><td>+1 em JP contra medo, paralisia e necromancia</td><td>+1d6 de fogo no 1º acerto de cada combate</td><td>×6</td></tr>
<tr><td>Erebo</td><td>Anula totalmente magia se passar na JP</td><td>Absorve a próxima magia conjurada pelo alvo</td><td>×7</td></tr>
</tbody>
</table>

<h2>Armas de Fogo (Instável)</h2>
<p>Armas de pederneira usam tambor rotativo (recarga de 1 rodada por câmara) e não somam Força no dano. Resultados <strong>1–2 no d20</strong> são falha crítica (role 1d6: 1–2 emperramento; 3–4 gatilho preso; 5 backfire 1d3 de dano; 6 tambor travado por 1 turno).</p>
<p><strong>Instabilidade de Ressonância:</strong> uma arma encantada ou forjada com cristal NÃO pode disparar munição de cristal — a munição detona na câmara (arma mundana destruída; arma mágica perde +1; usuário sofre o dano sem JP).</p>

<h2>Regras de Vício e Abstinência</h2>
<p>Sempre que uma substância é consumida fora de uso seguro, o Mestre rola 1d6 em segredo; resultado ≤ ao valor de Vício torna o personagem dependente. <strong>Recuperação:</strong> isolamento e 1d3+1 sucessos em JP (Sabedoria −10), semanais, com consumo diário de Extrato de Mandra Diluído.</p>

<h2>Extração de Despojos</h2>
<p>Com adaga/faca e tempo (1 a 4 Turnos conforme o tamanho), faz-se um Teste de Sabedoria (instinto) ou Inteligência (técnica). Sucesso extrai o recurso; falha o inutiliza; 20 natural dobra/melhora. Recursos biológicos não tratados degradam em 1d4 dias.</p>
`,
  },
];

export const journalPages = [
  {
    title: "Ekhoria — Referência do Mestre",
    pages: paginas,
  },
];
