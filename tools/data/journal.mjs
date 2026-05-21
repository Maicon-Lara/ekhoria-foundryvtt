// Journal de referência do mestre para o cenário Ekhoria.
// Uma única JournalEntry com várias páginas de texto (HTML).

const paginas = [
  {
    title: "Classes Exclusivas de Ekhoria",
    content: `
<h1>Classes Exclusivas de Ekhoria</h1>
<p>As classes a seguir são exclusivas do cenário Ekhoria e não existem no OD2 base. Elas podem ser usadas em substituição ou adição às classes padrão, a critério do Mestre. As fichas mecânicas completas estão no compêndio <strong>Ekhoria: Classes</strong>.</p>

<h2>Custódio Solar</h2>
<p><em>Exclusivo de Autokthons. Guerreiro-Clérigo solar devotado à luz.</em></p>
<p><strong>DV:</strong> 1d8 | <strong>Progressão:</strong> Clérigo</p>
<table>
<thead><tr><th>Nível</th><th>Habilidade</th></tr></thead>
<tbody>
<tr><td>1</td><td>Magias Divinas Solares; Cura por Luz 1×/dia (1d8+nível PV, alcance 9m)</td></tr>
<tr><td>3</td><td>Disciplina Solar: +1 BA e dano com arma OU +1 CA (à escolha)</td></tr>
<tr><td>6</td><td>Brilho Protetor: Aura 3m — cega mortos-vivos (JPS anula); +2 CA aliados na aura</td></tr>
<tr><td>10</td><td>Transcendência Solar 1×/dia: pulso 9m, nível×1d6 a mortos-vivos, quebra maldições</td></tr>
</tbody>
</table>

<h2>Relicário Vivo</h2>
<p><em>Exclusivo de Silentes. Hospedeiro de uma entidade. Conjura magias pagando PV.</em></p>
<p><strong>DV:</strong> 1d8 | <strong>Progressão:</strong> Clérigo</p>
<table>
<thead><tr><th>Nível</th><th>Habilidade</th></tr></thead>
<tbody>
<tr><td>1</td><td>Entidade Interna: magias divinas custam 2 PV por círculo; Ressonância 1×/dia</td></tr>
<tr><td>3</td><td>Controle Parcial: suprime/liberta entidade 1h; recupera 1d4 PV ao suprimir</td></tr>
<tr><td>6</td><td>Fusão Temporária 1h: +4 em atributo à escolha e CA +2</td></tr>
<tr><td>10</td><td>Domínio Pleno: todas habilidades da entidade 1×/dia, sem custo em PV</td></tr>
</tbody>
</table>

<h2>Narcoguerreiro</h2>
<p><em>Guerreiro especializado em Fungos do Degelo de Vornfell.</em></p>
<p><strong>DV:</strong> 1d10 | <strong>Progressão:</strong> Guerreiro</p>
<table>
<thead><tr><th>Nível</th><th>Habilidade</th></tr></thead>
<tbody>
<tr><td>1</td><td>Maestria em Arma (+1 dano); Imunidade a Pó de Morthan e gases; Seiva de Yggdras (cura 1d4 PV)</td></tr>
<tr><td>3</td><td>Coquetel Marcial: combina dois Fungos simultaneamente</td></tr>
<tr><td>6</td><td>Metabolismo Acelerado: +1 JPC permanente; +2 contra venenos/vício</td></tr>
<tr><td>10</td><td>Tolerância de Elite: regenera 1d4 PV/rodada por 1d4+mod.CON rodadas</td></tr>
</tbody>
</table>

<h2>Pugilista</h2>
<p><em>Mestre de armas pequenas/médias e combate desarmado.</em></p>
<p><strong>DV:</strong> 1d10 | <strong>Progressão:</strong> Guerreiro</p>
<table>
<thead><tr><th>Nível</th><th>Habilidade</th></tr></thead>
<tbody>
<tr><td>1</td><td>Maestria em Arma (+1 dano); Escola Marcial (Mãos de Ferro / Dança do Vento / Punhos do Vale)</td></tr>
<tr><td>3</td><td>Combate Desarmado Aprimorado: 1d4+mod.FOR</td></tr>
<tr><td>6</td><td>Resistência de Campeão: +1 JP; 1×/combate fica de pé com 1 PV ao chegar a 0</td></tr>
<tr><td>10</td><td>Maestria Corporal: 1d6+mod.FOR desarmado; segundo ataque desarmado</td></tr>
</tbody>
</table>

<h2>Lito-arcanista</h2>
<p><em>Mago com corpo saturado de cristais via Ritual da Saturação.</em></p>
<p><strong>DV:</strong> 1d4 | <strong>Progressão:</strong> Mago</p>
<table>
<thead><tr><th>Nível</th><th>Habilidade</th></tr></thead>
<tbody>
<tr><td>1</td><td>Corpo Cristalino: resistência a fogo/gelo/elétrico (à escolha), CA natural +1; Ressonância Mineral 18m</td></tr>
<tr><td>3</td><td>Magia Elementar: magias do cristal dominante como extra de 1º</td></tr>
<tr><td>6</td><td>Forma de Pedra 1×/dia (1h): +2 CA</td></tr>
<tr><td>10</td><td>Coração de Cristal: imune ao tipo de dano do cristal dominante</td></tr>
</tbody>
</table>

<h2>Guardião da Centelha</h2>
<p><em>Elite de Cinthara. Usa cristais de combate.</em></p>
<p><strong>DV:</strong> 1d10 | <strong>Progressão:</strong> Guerreiro</p>
<table>
<thead><tr><th>Nível</th><th>Habilidade</th></tr></thead>
<tbody>
<tr><td>1</td><td>Maestria em Arma (+1 dano); Arte da Centelha: cone 3m, 1d6 (até 3 alvos, JPD reduz), 1×/round</td></tr>
<tr><td>3</td><td>Escudo de Cristal 1×/dia: absorve nível×2 de dano</td></tr>
<tr><td>6</td><td>Rajada Combinada: dois cristais, +1d6 + efeito do 2º cristal</td></tr>
<tr><td>10</td><td>Mestre da Centelha: +2d6 com cristais; Arte da Centelha como 3º círculo 1×/dia (3d6, cone 9m)</td></tr>
</tbody>
</table>

<h2>Diplomata</h2>
<p><em>Especialista em negociação e influência social.</em></p>
<p><strong>DV:</strong> 1d6 | <strong>Progressão:</strong> Ladrão</p>
<table>
<thead><tr><th>Nível</th><th>Habilidade</th></tr></thead>
<tbody>
<tr><td>1</td><td>Ouvir Ruídos 1–2/1d6; Comitiva: –25% contratação, +1 Moral seguidores</td></tr>
<tr><td>3</td><td>Audiência: 1–2/1d6 + mod.CAR para bônus em Teste de Reação</td></tr>
<tr><td>6</td><td>Traquejo Social: 1 idioma adicional por ponto de mod.CAR</td></tr>
<tr><td>10</td><td>Rede de Contatos: Teste de CAR → 1d4 contatos fornecem informações obscuras</td></tr>
</tbody>
</table>

<h2>Voraz</h2>
<p><em>Irmandade Voraz de Vornfell. Caçador de criaturas monstruosas.</em></p>
<p><strong>DV:</strong> 1d6 | <strong>Progressão:</strong> Ladrão</p>
<table>
<thead><tr><th>Nível</th><th>Habilidade</th></tr></thead>
<tbody>
<tr><td>1</td><td>Anatomia de Campo: 1ª rodada contra criaturas monstruosas = ataque Fácil; Arsenal do Inimigo (1d6)</td></tr>
<tr><td>3</td><td>Medo Como Ferramenta 1×/combate: ao abater criatura, intimida do mesmo tipo</td></tr>
<tr><td>6</td><td>Caça Especializada (tipo escolhido): +1d6 dano e +2 JP</td></tr>
<tr><td>10</td><td>Anatomista de Elite: Ataque Furtivo retorna contra criaturas de caça especializada</td></tr>
</tbody>
</table>
`,
  },
  {
    title: "Raças de Ekhoria",
    content: `
<h1>Raças de Ekhoria</h1>
<p>Além das raças padrão do OD2, o cenário Ekhoria apresenta as raças originárias a seguir. As fichas mecânicas completas estão no compêndio <strong>Ekhoria: Raças</strong>.</p>
<p><em>Nota:</em> Atlante, Autokthon, Cambion, Mantes, Nefilim e Varko também aparecem no <strong>Guia de Raças</strong> oficial (módulo <code>olddragon2e-racas</code>). As versões abaixo são as adaptações do cenário Ekhoria.</p>

<h2>Arkanim</h2>
<p><em>Movimento: 9m | Infravisão: — | Alinhamento: Qualquer</em></p>
<ul>
<li><strong>Filhos de Arkádia:</strong> 1 em 1d6 de detectar anomalias mágicas.</li>
<li><strong>Infecção Mágica:</strong> +1 em JPS e JPC contra efeitos de origem arcana.</li>
<li><strong>Herança Arcana:</strong> Conjura 1 magia de 1º círculo aleatória, 1×/dia.</li>
</ul>

<h2>Atlante</h2>
<p><em>Movimento: 9m (terra) / 12m (natação) | Infravisão: 18m | Alinhamento: Ordem</em></p>
<ul>
<li><strong>Anfíbios:</strong> Respiram sob a água; sem penalidades submerso.</li>
<li><strong>Adaptabilidade:</strong> +1 em uma JP à escolha.</li>
<li><strong>Letrados:</strong> Leem/escrevem o próprio idioma + um adicional.</li>
<li><strong>Dependência de Água:</strong> Dobro de água diária; submergir 1×/semana.</li>
</ul>

<h2>Autokthon</h2>
<p><em>Movimento: 9m | Infravisão: — | Alinhamento: Qualquer</em></p>
<ul>
<li><strong>Pedra da Alma (Hers'ta):</strong> Destruí-la = morte instantânea; removê-la = coma.</li>
<li><strong>Constructo Vivo:</strong> Não dorme, come, respira ou envelhece. Imune a venenos e doenças. Não usa poções.</li>
<li><strong>Resistência Arcana:</strong> 8h de estudo para memorizar magias.</li>
<li><strong>Suscetível:</strong> Vulnerável a efeitos mentais, paralisia e cegueira.</li>
<li><strong>Construção Variável:</strong> 2 características únicas de construção (definir com o Mestre).</li>
</ul>

<h2>Cambion</h2>
<p><em>Movimento: 9m | Infravisão: 18m | Alinhamento: Caos</em></p>
<ul>
<li><strong>Resistência das Trevas:</strong> +1 em JPS e JPC contra efeitos mágicos.</li>
<li><strong>Herança Infernal:</strong> Uma habilidade menor da linhagem demoníaca (definir com o Mestre).</li>
<li><strong>Estigma Social:</strong> –2 em Testes de Reação com quem teme demônios.</li>
</ul>

<h2>Mantes</h2>
<p><em>Movimento: 9m | Infravisão: 18m | Alinhamento: Neutro</em></p>
<ul>
<li><strong>Exoesqueleto:</strong> CA natural 14; não usa armaduras convencionais.</li>
<li><strong>Saltadores:</strong> Saltam o dobro da distância humana.</li>
<li><strong>Graciosos:</strong> +1 em JPD.</li>
<li><strong>Sem Sono:</strong> Imune à magia Sono.</li>
<li><strong>Ecdise:</strong> 1×/ano, 1 dia imóvel; ao final recupera todos os PV, remove venenos/doenças crônicas e restaura membros.</li>
<li><strong>Membros Extras:</strong> Duas mãos destras adicionais; ataque extra sem penalidade.</li>
</ul>

<h2>Nefilim</h2>
<p><em>Movimento: 9m | Infravisão: — | Alinhamento: Ordem</em></p>
<ul>
<li><strong>Presença Celestial:</strong> Aura que acalma involuntariamente os próximos.</li>
<li><strong>Incapaz de Mentir:</strong> Tentativas de mentira falham automaticamente.</li>
<li><strong>Resistência Divina:</strong> +1 em uma JP à escolha.</li>
<li><strong>Recuperação Acelerada:</strong> 2 PV/dia; 1d6+2 PV com repouso completo.</li>
</ul>

<h2>Orc do Sol Poente</h2>
<p><em>Movimento: 9m | Infravisão: 18m | Alinhamento: Ordem</em></p>
<ul>
<li><strong>Técnica Refinada:</strong> +1 no dano com armas cortantes e perfurantes.</li>
<li><strong>Corpos Forjados:</strong> Testes de Força para erguer/empurrar são sempre Fáceis.</li>
<li><strong>Postura do Sol Poente:</strong> +1 em JPC.</li>
<li><strong>Disciplina de Marcha:</strong> Armaduras contam 1 ponto mais leves para carga.</li>
</ul>

<h2>Silente</h2>
<p><em>Movimento: 9m | Infravisão: — | Alinhamento: Neutro</em></p>
<ul>
<li><strong>Eco-Sombrio:</strong> –4 em Testes de Reação; 1 em 1d6 de passar despercebido.</li>
<li><strong>Mestre das Lâminas Curtas:</strong> Ataques com adagas/facas são Fáceis; +1 CA com duas lâminas.</li>
<li><strong>Corpo Estático:</strong> Não cura naturalmente nem por magia. 500ml de sangue fresco restaura 1d4 PV.</li>
<li><strong>Eco Antimágico:</strong> Não conjura; imune a magias diretas.</li>
</ul>

<h2>Varko</h2>
<p><em>Movimento: 6m | Infravisão: 30m | Alinhamento: Caos</em></p>
<ul>
<li><strong>Conhecimento das Profundezas:</strong> 1–2 em 1d6 para informações subterrâneas.</li>
<li><strong>Vigorosos:</strong> +1 em JPC.</li>
<li><strong>Pequenos:</strong> Ataques de criaturas Grandes são Difíceis.</li>
<li><strong>Restrições:</strong> Apenas armas pequenas/médias; luz forte torna tudo Difícil.</li>
<li><strong>Sono Intranquilo:</strong> Dorme 4h; recupera 1d2+1 PV por descanso.</li>
</ul>
`,
  },
  {
    title: "Combinações de Classe e Raça",
    content: `
<h1>Combinações de Classe e Raça</h1>
<p>Algumas combinações de classe e raça são exclusivas ou têm restrições especiais em Ekhoria.</p>

<h2>Restrições Exclusivas</h2>
<table>
<thead><tr><th>Classe</th><th>Raça Obrigatória</th><th>Motivo</th></tr></thead>
<tbody>
<tr><td>Custódio Solar</td><td>Autokthon</td><td>A classe exige o chassi de Constructo Vivo e a Pedra da Alma como canal de energia solar.</td></tr>
<tr><td>Relicário Vivo</td><td>Silente</td><td>O Corpo Estático dos Silentes é pré-requisito para hospedar uma entidade sem destruir o organismo.</td></tr>
</tbody>
</table>

<h2>Combinações Recomendadas</h2>
<table>
<thead><tr><th>Raça</th><th>Classes Sugeridas</th><th>Sinergia</th></tr></thead>
<tbody>
<tr><td>Arkanim</td><td>Mago, Lito-arcanista, Bruxo</td><td>Herança Arcana + acesso a magias cria conjuradores versáteis.</td></tr>
<tr><td>Atlante</td><td>Guerreiro, Ladrão, Diplomata</td><td>Adaptabilidade e letramento combinam bem com classes versáteis.</td></tr>
<tr><td>Cambion</td><td>Bruxo, Assassino, Voraz</td><td>Herança Infernal potencializa pactos e ataques sombrios.</td></tr>
<tr><td>Mantes</td><td>Pugilista, Guerreiro, Ranger</td><td>Membros extras + CA natural = combatente formidável sem armadura.</td></tr>
<tr><td>Nefilim</td><td>Clérigo, Paladino, Diplomata</td><td>Recuperação acelerada e presença celestial beneficiam classes de suporte.</td></tr>
<tr><td>Orc do Sol Poente</td><td>Guerreiro, Narcoguerreiro, Guardião da Centelha</td><td>Técnica refinada + disciplina marcial = dano consistente.</td></tr>
<tr><td>Varko</td><td>Ladrão, Assassino, Voraz</td><td>Infravisão longa + pequeno porte = furtividade excepcional.</td></tr>
</tbody>
</table>

<h2>Combinações Inusitadas (mas válidas)</h2>
<ul>
<li><strong>Nefilim Bruxo:</strong> O Nefilim não consegue mentir, mas pode firmar um pacto genuíno com uma entidade. Tensão dramática rica.</li>
<li><strong>Atlante Narcoguerreiro:</strong> A dependência de água somada à dos fungos cria um personagem de sobrevivência dupla.</li>
<li><strong>Varko Diplomata:</strong> Estigma de pequeno porte + habilidade social cria um negociador improvavelmente eficaz.</li>
</ul>
`,
  },
  {
    title: "Itens e Substâncias de Ekhoria",
    content: `
<h1>Itens e Substâncias Especiais de Ekhoria</h1>

<h2>Fungos do Degelo (Vornfell)</h2>
<p>Substâncias alquímicas extraídas dos fungos que crescem no degelo de Vornfell. Usadas pelo Narcoguerreiro como ferramentas de combate e sobrevivência.</p>
<table>
<thead><tr><th>Fungo</th><th>Efeito</th><th>Duração</th><th>Vício</th></tr></thead>
<tbody>
<tr><td>Seiva de Yggdras Diluída</td><td>Cura 1d4 PV; uso seguro pelo Narcoguerreiro</td><td>Imediato</td><td>Baixo</td></tr>
<tr><td>Pó de Morthan</td><td>Paralisa criaturas que falham em JPC (CD 12)</td><td>1d4 rodadas</td><td>—</td></tr>
<tr><td>Esporos do Véu</td><td>+2 BA e +2 CA por 3 rodadas; depois, exaustão leve</td><td>3 rodadas</td><td>Médio</td></tr>
<tr><td>Néctar do Sono Profundo</td><td>Criatura dorme 1d6 horas (JPS CD 14 anula)</td><td>1d6 horas</td><td>Baixo</td></tr>
</tbody>
</table>

<h2>Cristais de Combate (Cinthara)</h2>
<p>Cristais energizados usados pelos Guardiões da Centelha. Cada tipo tem propriedades únicas.</p>
<table>
<thead><tr><th>Cristal</th><th>Efeito Base</th><th>Efeito (Rajada Combinada)</th></tr></thead>
<tbody>
<tr><td>Arkanita (base)</td><td>Escudo de Cristal; sem efeito adicional</td><td>—</td></tr>
<tr><td>Ônix</td><td>+1d6 de dano nas explosões</td><td>Cega o alvo por 1 rodada (JPS anula)</td></tr>
<tr><td>Centelha Solar</td><td>+1d6 de dano de luz</td><td>Atordoa o alvo por 1 rodada (JPS anula)</td></tr>
<tr><td>Gelo Vivo</td><td>+1d6 de dano de frio</td><td>Reduz o deslocamento do alvo em 3m por 1 rodada</td></tr>
<tr><td>Cristal Trovão</td><td>+1d6 de dano de trovão</td><td>Empurra o alvo 1,5m para trás</td></tr>
</tbody>
</table>
<p><em>Nota: Cristais custam entre 50 e 200 PO cada, conforme a raridade. A disponibilidade é decisão do Mestre.</em></p>

<h2>Pedra da Alma (Hers'ta)</h2>
<p>Objeto vital dos Autokthons. Deve ser protegida a qualquer custo.</p>
<ul>
<li><strong>Localização:</strong> Geralmente embutida no peito ou nas costas do Autokthon.</li>
<li><strong>Se destruída:</strong> Morte instantânea, sem salvação.</li>
<li><strong>Se removida:</strong> Coma imediato. Recolocada em até 1 hora, desperta normalmente.</li>
<li><strong>CA da pedra:</strong> 10 (se exposta); CA do Autokthon se embutida.</li>
<li><strong>PV da pedra:</strong> 10 + nível do Autokthon.</li>
</ul>
`,
  },
];

export const journalPages = [
  {
    title: "Ekhoria — Referência do Mestre",
    pages: paginas,
  },
];
