// Journal de referência do mestre para o cenário Ekhoria.
// Uma única JournalEntry com páginas-resumo. As fichas mecânicas completas
// estão nos compêndios "Ekhoria: Classes" e "Ekhoria: Raças".

const paginas = [
  {
    title: "Classes de Ekhoria",
    content: `
<h1>Classes de Ekhoria</h1>
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
<h1>Raças de Ekhoria</h1>
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
<h1>Exclusividades e Observações de Conversão</h1>

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
<p>Fungos do Degelo, Cristais de Centelha, Pedra da Alma e demais itens do cenário são detalhados nos capítulos "Arsenal de Ekhoria" e "Magias de Ekhoria" do livro. Não foram incluídos neste módulo nesta versão.</p>
`,
  },
];

export const journalPages = [
  {
    title: "Ekhoria — Referência do Mestre",
    pages: paginas,
  },
];
