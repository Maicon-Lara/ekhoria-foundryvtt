#!/usr/bin/env node
/**
 * Gera os arquivos de compêndio (.db) do módulo Ekhoria
 * em formato JSONL (um JSON por linha), compatível com Foundry VTT v12+
 *
 * Execute com: node gerar-compendios.js
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

function uid() {
  return crypto.randomBytes(8).toString("hex");
}

// ─── CLASSES ───────────────────────────────────────────────────

const classes = [
  {
    nome: "Custódio Solar",
    id: "CUSTODIO",
    descricao: "Guerreiro-Clérigo solar. Exclusivo de Autokthons.",
    dv: 8,
    habilidades: [
      { nivel: 1,  texto: "Magias Divinas Solares: Lança magias do círculo solar diariamente." },
      { nivel: 1,  texto: "Cura por Luz: 1×/dia cura 1d8+nível PV em aliado a 9m." },
      { nivel: 3,  texto: "Disciplina Solar: +1 BA e dano com arma (ou +1 CA, à escolha)." },
      { nivel: 6,  texto: "Brilho Protetor: Aura de 3m que cega mortos-vivos (JPS anula); +2 CA aliados na aura." },
      { nivel: 10, texto: "Transcendência Solar: 1×/dia pulso de luz (9m), nível×1d6 a mortos-vivos, quebra maldições." }
    ]
  },
  {
    nome: "Relicário Vivo",
    id: "RELICARIO",
    descricao: "Hospedeiro de entidade. Exclusivo de Silentes.",
    dv: 8,
    habilidades: [
      { nivel: 1,  texto: "Entidade Interna: Acessa magias divinas pagando 2 PV por círculo." },
      { nivel: 1,  texto: "Ressonância: 1×/dia invoca habilidade da entidade (acordar com MJ)." },
      { nivel: 3,  texto: "Controle Parcial: Suprime/liberta entidade por até 1h; recupera 1d4 PV ao suprimir." },
      { nivel: 6,  texto: "Fusão Temporária: +4 em um atributo e CA +2 por 1h." },
      { nivel: 10, texto: "Domínio Pleno: Usa todas as habilidades da entidade 1×/dia sem custo em PV." }
    ]
  },
  {
    nome: "Narcoguerreiro",
    id: "NARCOGUERRE",
    descricao: "Especialista em Fungos do Degelo de Vornfell.",
    dv: 10,
    habilidades: [
      { nivel: 1,  texto: "Maestria em Arma: +1 no dano com uma arma à escolha." },
      { nivel: 1,  texto: "Conhecimento Químico: Imune a Pó de Morthan e gases tóxicos." },
      { nivel: 1,  texto: "Uso Seguro de Seiva: Cura 1d4 PV com Seiva de Yggdras Diluída." },
      { nivel: 3,  texto: "Coquetel Marcial: Combina dois Fungos do Degelo simultaneamente." },
      { nivel: 6,  texto: "Metabolismo Acelerado: +1 JPC permanente; +2 contra venenos e vício." },
      { nivel: 10, texto: "Tolerância de Elite: Regenera 1d4 PV/rodada por 1d4+mod.CON rodadas." }
    ]
  },
  {
    nome: "Pugilista",
    id: "PUGILISTA",
    descricao: "Especializado em armas pequenas/médias e combate desarmado.",
    dv: 10,
    habilidades: [
      { nivel: 1,  texto: "Maestria em Arma: +1 no dano com uma arma à escolha." },
      { nivel: 1,  texto: "Escola Marcial: Escolha sua escola (Mãos de Ferro, Dança do Vento ou Punhos do Vale)." },
      { nivel: 3,  texto: "Combate Desarmado Aprimorado: Ataques desarmados causam 1d4+mod.FOR." },
      { nivel: 6,  texto: "Resistência de Campeão: +1 JP permanente. Ao chegar a 0 PV, fica de pé com 1 PV (1×/combate)." },
      { nivel: 10, texto: "Maestria Corporal: Ataques desarmados causam 1d6+mod.FOR; segundo ataque desarmado." }
    ]
  },
  {
    nome: "Lito-arcanista",
    id: "LITO",
    descricao: "Mago com corpo saturado de cristais via Ritual da Saturação.",
    dv: 4,
    habilidades: [
      { nivel: 1,  texto: "Corpo Cristalino: Resistência a fogo, gelo ou elétrico. CA natural +1." },
      { nivel: 1,  texto: "Ressonância Mineral: Detecta cristais mágicos a 18m." },
      { nivel: 3,  texto: "Magia Elementar: Magias elementais do cristal dominante como extra de 1º." },
      { nivel: 6,  texto: "Forma de Pedra: 1×/dia transforma parcialmente o corpo por 1h; +2 CA." },
      { nivel: 10, texto: "Coração de Cristal: Imune ao tipo de dano do cristal dominante." }
    ]
  },
  {
    nome: "Guardião da Centelha",
    id: "GUARDIAO",
    descricao: "Elite de Cinthara. Usa cristais de combate.",
    dv: 10,
    habilidades: [
      { nivel: 1,  texto: "Maestria em Arma: +1 no dano com arma à escolha." },
      { nivel: 1,  texto: "Arte da Centelha: Cone de 3m, 1d6 a até 3 criaturas (JPD reduz). 1×/round." },
      { nivel: 3,  texto: "Escudo de Cristal: 1×/dia, barreira absorve (nível×2) de dano." },
      { nivel: 6,  texto: "Rajada Combinada: Dois cristais; +1d6 de dano e efeito do segundo cristal." },
      { nivel: 10, texto: "Mestre da Centelha: +2d6 com cristais; Arte da Centelha como 3º círculo 1×/dia (3d6, cone 9m)." }
    ]
  },
  {
    nome: "Diplomata",
    id: "DIPLOMATA",
    descricao: "Especialista em negociação e influência social.",
    dv: 6,
    habilidades: [
      { nivel: 1,  texto: "Ouvir Ruídos: 1–2 em 1d6 em ambiente silencioso." },
      { nivel: 1,  texto: "Comitiva: Custo de contratação –25%; +1 Moral para seguidores." },
      { nivel: 3,  texto: "Audiência: 1–2 em 1d6 + mod. CAR para bônus em Teste de Reação." },
      { nivel: 6,  texto: "Traquejo Social: 1 idioma adicional por ponto de mod. CAR." },
      { nivel: 10, texto: "Rede de Contatos: Teste de CAR → 1d4 contatos fornecem informações obscuras." }
    ]
  },
  {
    nome: "Voraz",
    id: "VORAZ",
    descricao: "Irmandade Voraz de Vornfell. Especialista em criaturas monstruosas.",
    dv: 6,
    habilidades: [
      { nivel: 1,  texto: "Anatomia de Campo: Ataques contra criaturas monstruosas são Fáceis na 1ª rodada." },
      { nivel: 1,  texto: "Arsenal do Inimigo: Cria armas improvisadas de partes de criaturas (1d6)." },
      { nivel: 3,  texto: "Medo Como Ferramenta: 1×/combate ao abater criatura, intimida do mesmo tipo." },
      { nivel: 6,  texto: "Caça Especializada: Contra tipo escolhido: +1d6 de dano e +2 JP." },
      { nivel: 10, texto: "Anatomista de Elite: Ataque Furtivo retorna contra criaturas de caça especializada." }
    ]
  }
];

// ─── RAÇAS ─────────────────────────────────────────────────────

const racas = [
  {
    nome: "Arkanim",
    id: "ARKANIM",
    descricao: "Filhos de Arkádia, sensíveis à magia.",
    movimento: 9,
    habilidades: [
      "Filhos de Arkádia: 1 em 1d6 de detectar anomalias mágicas.",
      "Infecção Mágica: +1 em JPS e JPC por origem arcana.",
      "Herança Arcana: Conjura 1 magia de 1º nível aleatória, 1×/dia."
    ]
  },
  {
    nome: "Atlante",
    id: "ATLANTE",
    descricao: "Anfíbios ordeiros de civilizações abissais.",
    movimento: "9m (terra) / 12m (natação)",
    habilidades: [
      "Infravisão: 18m subaquática; 18m fora d'água.",
      "Anfíbios: Respiram sob a água; sem penalidades submerso.",
      "Adaptabilidade: +1 em uma JP à escolha.",
      "Letrados: Leem/escrevem próprio idioma + um adicional.",
      "Dependência de Água: Dobro de água diária; mergulhar 1×/semana."
    ]
  },
  {
    nome: "Autokthon",
    id: "AUTOKTHON",
    descricao: "Constructo vivo com Pedra da Alma. Não dorme, não come, não envelhece.",
    movimento: 9,
    habilidades: [
      "Pedra da Alma (Hers'ta): Destruí-la = morte; removê-la = coma.",
      "Constructo Vivo: Não dorme, não come, não respira, não envelhece. Imune a venenos e doenças. Não bebe poções.",
      "Resistência Arcana: 8h de estudo para memorizar magias.",
      "Suscetível: Vulnerável a efeitos mentais, paralisia, cegueira.",
      "Construção Variável: 2 características únicas de construção."
    ]
  },
  {
    nome: "Cambion",
    id: "CAMBION",
    descricao: "Descendentes de linhagem demoníaca. Tendem ao Caos.",
    movimento: 9,
    habilidades: [
      "Resistência das Trevas: +1 em JPS e JPC contra efeitos mágicos.",
      "Herança Infernal: Uma habilidade menor da linhagem demoníaca.",
      "Estigma Social: –2 em Testes de Reação com raças que temem demônios.",
      "Infravisão: 18 metros."
    ]
  },
  {
    nome: "Mantes",
    id: "MANTES",
    descricao: "Insectoides com exoesqueleto e membros extras.",
    movimento: 9,
    habilidades: [
      "Infravisão: 18 metros.",
      "Exoesqueleto: CA natural 14; não usa armaduras.",
      "Saltadores: Saltam o dobro da distância humana.",
      "Graciosos: +1 em JPD.",
      "Sem Sono: Imune à magia Sono.",
      "Ecdise: 1×/ano, 1 dia imóvel; ao final recupera todos PV, remove venenos/doenças crônicas, restaura membros.",
      "Membros Extras: Duas mãos destras; ataque extra sem penalidade."
    ]
  },
  {
    nome: "Nefilim",
    id: "NEFILIM",
    descricao: "Descendentes celestiais. Presença calmante. Incapazes de mentir.",
    movimento: 9,
    habilidades: [
      "Presença Celestial: Aura que acalma involuntariamente.",
      "Incapaz de Mentir: Tentativas de mentira falham automaticamente.",
      "Resistência Divina: +1 em uma JP à escolha.",
      "Recuperação Acelerada: 2 PV/dia; 1d6+2 PV com repouso completo."
    ]
  },
  {
    nome: "Orc do Sol Poente",
    id: "ORC_SOL",
    descricao: "Orcs disciplinados e refinados. Tendem à Ordem.",
    movimento: 9,
    habilidades: [
      "Infravisão: 18 metros.",
      "Técnica Refinada: +1 no dano com armas cortantes e perfurantes.",
      "Corpos Forjados: Testes de Força para erguer/empurrar são sempre Fáceis.",
      "Postura do Sol Poente: +1 em JPC.",
      "Disciplina de Marcha: Armaduras contam 1 ponto mais leves para carga."
    ]
  },
  {
    nome: "Silente",
    id: "SILENTE",
    descricao: "Corpo Estático. Não cura naturalmente. Sangue fresco restaura PV.",
    movimento: 9,
    habilidades: [
      "Eco-Sombrio: –4 em testes de reação; 1 em 1d6 de passar despercebido.",
      "Mestre das Lâminas Curtas: Ataques com adagas/facas são Fáceis; +1 CA usando duas lâminas.",
      "Corpo Estático: Não cura naturalmente nem por magia. 500ml de sangue fresco restaura 1d4 PV.",
      "Eco Antimágico: Não conjura; imune a magias diretas."
    ]
  },
  {
    nome: "Varko",
    id: "VARKO",
    descricao: "Pequenos seres das profundezas. Infravisão de 30m. Luz forte os prejudica.",
    movimento: 6,
    habilidades: [
      "Infravisão: 30 metros.",
      "Conhecimento das Profundezas: 1–2 em 1d6 para informações subterrâneas.",
      "Vigorosos: +1 em JPC.",
      "Pequenos: Ataques de criaturas grandes são Difíceis.",
      "Restrições: Apenas armas pequenas/médias; luz forte = tudo Difícil.",
      "Sono Intranquilo: Dorme 4h; recupera 1d2+1 PV por descanso."
    ]
  }
];

// ─── GERAÇÃO DOS ARQUIVOS .db (JSONL) ──────────────────────────

function gerarDescricaoClasse(c) {
  const linhas = c.habilidades
    .map(h => `<li><strong>Nível ${h.nivel}:</strong> ${h.texto}</li>`)
    .join("\n");
  return `<p><em>${c.descricao}</em></p><p><strong>Dado de Vida:</strong> 1d${c.dv}</p><ul>${linhas}</ul>`;
}

function gerarDescricaoRaca(r) {
  const linhas = r.habilidades.map(h => `<li>${h}</li>`).join("\n");
  const mov = typeof r.movimento === "string" ? r.movimento : `${r.movimento}m`;
  return `<p><em>${r.descricao}</em></p><p><strong>Movimento:</strong> ${mov}</p><ul>${linhas}</ul>`;
}

// Compêndio de classes
const classesDb = classes.map(c => JSON.stringify({
  _id: uid(),
  name: c.nome,
  type: "feature",
  img: "icons/sundries/scrolls/scroll-rolled-brown.webp",
  system: {
    description: { value: gerarDescricaoClasse(c) }
  },
  flags: { ekhoria: { tipo: "classe", id: c.id } }
})).join("\n");

// Compêndio de raças
const racasDb = racas.map(r => JSON.stringify({
  _id: uid(),
  name: r.nome,
  type: "feature",
  img: "icons/environment/people/group.webp",
  system: {
    description: { value: gerarDescricaoRaca(r) }
  },
  flags: { ekhoria: { tipo: "raca", id: r.id } }
})).join("\n");

// Salva os arquivos
const packsDir = path.join(__dirname, "packs");
if (!fs.existsSync(packsDir)) fs.mkdirSync(packsDir, { recursive: true });

fs.writeFileSync(path.join(packsDir, "ekhoria-classes.db"), classesDb, "utf8");
fs.writeFileSync(path.join(packsDir, "ekhoria-racas.db"), racasDb, "utf8");

console.log(`✔ ekhoria-classes.db gerado (${classes.length} entradas)`);
console.log(`✔ ekhoria-racas.db gerado (${racas.length} entradas)`);
console.log("Pronto! Copie a pasta ekhoria-module para Data/modules/ no seu Foundry.");

// ─── JOURNAL DE REFERÊNCIA DO MESTRE ───────────────────────────

const journalPages = [
  {
    title: "Classes Exclusivas de Ekhoria",
    content: `
<h1>Classes Exclusivas de Ekhoria</h1>
<p>As classes a seguir são exclusivas do cenário Ekhoria e não existem no OD2 base. Elas podem ser usadas em substituição ou adição às classes padrão, a critério do Mestre.</p>

<h2>Custódio Solar</h2>
<p><em>Exclusivo de Autokthons. Guerreiro-Clérigo solar devotado à luz.</em></p>
<p><strong>DV:</strong> 1d8 | <strong>BA/JP:</strong> Progressão de Clérigo</p>
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
<p><strong>DV:</strong> 1d8 | <strong>BA/JP:</strong> Progressão de Clérigo</p>
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
<p><strong>DV:</strong> 1d10 | <strong>BA/JP:</strong> Progressão de Guerreiro</p>
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
<p><strong>DV:</strong> 1d10 | <strong>BA/JP:</strong> Progressão de Guerreiro</p>
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
<p><strong>DV:</strong> 1d4 | <strong>BA/JP:</strong> Progressão de Mago</p>
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
<p><strong>DV:</strong> 1d10 | <strong>BA/JP:</strong> Progressão de Guerreiro</p>
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
<p><em>Especialista em negociação e influência social. Progressão de Ladrão.</em></p>
<p><strong>DV:</strong> 1d6 | <strong>BA/JP:</strong> Progressão de Ladrão</p>
<table>
<thead><tr><th>Nível</th><th>Habilidade</th></tr></thead>
<tbody>
<tr><td>1</td><td>Ouvir Ruídos 1–2/1d6; Comitiva: –25% contrataçao, +1 Moral seguidores; Talentos de Diplomata</td></tr>
<tr><td>3</td><td>Audiência: 1–2/1d6 + mod.CAR para bônus em Teste de Reação</td></tr>
<tr><td>6</td><td>Traquejo Social: 1 idioma adicional por ponto de mod.CAR</td></tr>
<tr><td>10</td><td>Rede de Contatos: Teste de CAR → 1d4 contatos fornecem informações obscuras</td></tr>
</tbody>
</table>

<h2>Voraz</h2>
<p><em>Irmandade Voraz de Vornfell. Caçador de criaturas monstruosas.</em></p>
<p><strong>DV:</strong> 1d6 | <strong>BA/JP:</strong> Progressão de Ladrão</p>
<table>
<thead><tr><th>Nível</th><th>Habilidade</th></tr></thead>
<tbody>
<tr><td>1</td><td>Anatomia de Campo: 1ª rodada contra criaturas monstruosas = ataque Fácil; Arsenal do Inimigo (1d6)</td></tr>
<tr><td>3</td><td>Medo Como Ferramenta 1×/combate: ao abater criatura, intimida do mesmo tipo</td></tr>
<tr><td>6</td><td>Caça Especializada (tipo escolhido): +1d6 dano e +2 JP</td></tr>
<tr><td>10</td><td>Anatomista de Elite: Ataque Furtivo retorna contra criaturas de caça especializada</td></tr>
</tbody>
</table>
`
  },
  {
    title: "Raças de Ekhoria",
    content: `
<h1>Raças de Ekhoria</h1>
<p>Além das raças padrão do OD2 (Humano, Elfo, Anão, Halfling, Meio-Elfo, Gnomo), o cenário Ekhoria apresenta as seguintes raças originárias.</p>

<h2>Arkanim</h2>
<p><em>Movimento: 9m | Alinhamento: Qualquer</em></p>
<ul>
<li><strong>Filhos de Arkádia:</strong> 1 em 1d6 de detectar anomalias mágicas.</li>
<li><strong>Infecção Mágica:</strong> +1 em JPS e JPC contra efeitos de origem arcana.</li>
<li><strong>Herança Arcana:</strong> Conjura 1 magia de 1º nível aleatória, 1×/dia.</li>
</ul>

<h2>Atlante</h2>
<p><em>Movimento: 9m (terra) / 12m (natação) | Alinhamento: Tendem à Ordem</em></p>
<ul>
<li><strong>Infravisão:</strong> 18m subaquática; 18m fora d'água.</li>
<li><strong>Anfíbios:</strong> Respiram sob a água; sem penalidades submerso.</li>
<li><strong>Adaptabilidade:</strong> +1 em uma JP à escolha (JPD, JPC ou JPS).</li>
<li><strong>Letrados:</strong> Leem/escrevem próprio idioma + um adicional.</li>
<li><strong>Dependência de Água:</strong> Dobro da quantidade diária; mergulhar 1×/semana.</li>
</ul>

<h2>Autokthon</h2>
<p><em>Movimento: 9m | Alinhamento: Qualquer</em></p>
<ul>
<li><strong>Pedra da Alma (Hers'ta):</strong> Destruí-la = morte instantânea; removê-la = coma.</li>
<li><strong>Constructo Vivo:</strong> Não dorme, não come, não respira, não envelhece. Imune a venenos e doenças. Não bebe poções.</li>
<li><strong>Resistência Arcana:</strong> 8h de estudo para memorizar magias (em vez do padrão).</li>
<li><strong>Suscetível:</strong> Vulnerável a efeitos mentais, paralisia, cegueira.</li>
<li><strong>Construção Variável:</strong> 2 características únicas de construção (definir com o MJ).</li>
</ul>

<h2>Cambion</h2>
<p><em>Movimento: 9m | Alinhamento: Tendem ao Caos</em></p>
<ul>
<li><strong>Infravisão:</strong> 18 metros.</li>
<li><strong>Resistência das Trevas:</strong> +1 em JPS e JPC contra efeitos mágicos.</li>
<li><strong>Herança Infernal:</strong> Uma habilidade menor da linhagem demoníaca (acordar com MJ).</li>
<li><strong>Estigma Social:</strong> –2 em Testes de Reação com raças que temem demônios.</li>
</ul>

<h2>Mantes</h2>
<p><em>Movimento: 9m | Alinhamento: Tendem ao Neutro</em></p>
<ul>
<li><strong>Infravisão:</strong> 18 metros.</li>
<li><strong>Exoesqueleto:</strong> CA natural 14; não usa armaduras convencionais.</li>
<li><strong>Saltadores:</strong> Saltam o dobro da distância humana.</li>
<li><strong>Graciosos:</strong> +1 em JPD.</li>
<li><strong>Sem Sono:</strong> Imune à magia Sono.</li>
<li><strong>Ecdise:</strong> 1×/ano — passa 1 dia imóvel mudando o exoesqueleto. Ao final: recupera todos os PV, remove venenos/doenças crônicas e restaura membros perdidos não-vitais.</li>
<li><strong>Membros Extras:</strong> Duas mãos destras; ataque extra sem penalidade.</li>
</ul>

<h2>Nefilim</h2>
<p><em>Movimento: 9m | Alinhamento: Tendem à Ordem</em></p>
<ul>
<li><strong>Presença Celestial:</strong> Aura que acalma involuntariamente criaturas próximas.</li>
<li><strong>Incapaz de Mentir:</strong> Tentativas de mentira falham automaticamente.</li>
<li><strong>Resistência Divina:</strong> +1 em uma JP à escolha.</li>
<li><strong>Recuperação Acelerada:</strong> Cura 2 PV/dia normalmente; 1d6+2 PV com repouso completo (em vez de 1 PV e 1d4 PV).</li>
</ul>

<h2>Orc do Sol Poente</h2>
<p><em>Movimento: 9m | Alinhamento: Tendem à Ordem</em></p>
<ul>
<li><strong>Infravisão:</strong> 18 metros.</li>
<li><strong>Técnica Refinada:</strong> +1 no dano com armas cortantes e perfurantes.</li>
<li><strong>Corpos Forjados:</strong> Testes de Força para erguer/empurrar são sempre Fáceis.</li>
<li><strong>Postura do Sol Poente:</strong> +1 em JPC.</li>
<li><strong>Disciplina de Marcha:</strong> Armaduras contam 1 ponto mais leves para carga.</li>
</ul>

<h2>Silente</h2>
<p><em>Movimento: 9m | Alinhamento: Tendem ao Neutro</em></p>
<ul>
<li><strong>Eco-Sombrio:</strong> –4 em testes de reação; 1 em 1d6 de passar despercebido.</li>
<li><strong>Mestre das Lâminas Curtas:</strong> Ataques com adagas/facas são Fáceis; +1 CA usando duas lâminas.</li>
<li><strong>Corpo Estático:</strong> Não cura naturalmente nem por magia. Beber 500ml de sangue fresco restaura 1d4 PV.</li>
<li><strong>Eco Antimágico:</strong> Não conjura magias; imune a magias diretas.</li>
</ul>

<h2>Varko</h2>
<p><em>Movimento: 6m | Alinhamento: Tendem ao Caos</em></p>
<ul>
<li><strong>Infravisão:</strong> 30 metros.</li>
<li><strong>Conhecimento das Profundezas:</strong> 1–2 em 1d6 para informações sobre ambientes subterrâneos.</li>
<li><strong>Vigorosos:</strong> +1 em JPC.</li>
<li><strong>Pequenos:</strong> Ataques de criaturas grandes são Difíceis.</li>
<li><strong>Restrições:</strong> Apenas armas pequenas e médias; luz forte torna tudo Difícil.</li>
<li><strong>Sono Intranquilo:</strong> Dorme 4h; recupera 1d2+1 PV por descanso.</li>
</ul>
`
  },
  {
    title: "Recursos Diários por Classe",
    content: `
<h1>Recursos Diários por Classe</h1>
<p>Esta tabela resume todos os recursos de uso limitado (por dia ou por combate) das classes de Ekhoria, para referência rápida do Mestre.</p>

<h2>Custódio Solar</h2>
<table>
<thead><tr><th>Recurso</th><th>Usos/Dia</th><th>Nível Mínimo</th></tr></thead>
<tbody>
<tr><td>Cura por Luz (1d8+nível PV, aliado a 9m)</td><td>1×</td><td>1</td></tr>
<tr><td>Transcendência Solar (pulso 9m, nível×1d6)</td><td>1×</td><td>10</td></tr>
</tbody>
</table>

<h2>Relicário Vivo</h2>
<table>
<thead><tr><th>Recurso</th><th>Usos/Dia</th><th>Nível Mínimo</th></tr></thead>
<tbody>
<tr><td>Ressonância (habilidade da entidade)</td><td>1×</td><td>1</td></tr>
<tr><td>Domínio Pleno (todas habilidades da entidade)</td><td>1×</td><td>10</td></tr>
</tbody>
</table>

<h2>Narcoguerreiro</h2>
<table>
<thead><tr><th>Recurso</th><th>Usos/Dia</th><th>Nível Mínimo</th></tr></thead>
<tbody>
<tr><td>Uso Seguro de Seiva (cura 1d4 PV)</td><td>1×</td><td>1</td></tr>
<tr><td>Tolerância de Elite (regen 1d4 PV/rodada)</td><td>1×</td><td>10</td></tr>
</tbody>
</table>

<h2>Pugilista</h2>
<table>
<thead><tr><th>Recurso</th><th>Usos</th><th>Nível Mínimo</th></tr></thead>
<tbody>
<tr><td>Resistência de Campeão (ficar de pé com 1 PV)</td><td>1×/combate</td><td>6</td></tr>
</tbody>
</table>

<h2>Lito-arcanista</h2>
<table>
<thead><tr><th>Recurso</th><th>Usos/Dia</th><th>Nível Mínimo</th></tr></thead>
<tbody>
<tr><td>Forma de Pedra (+2 CA, 1h)</td><td>1×</td><td>6</td></tr>
</tbody>
</table>

<h2>Guardião da Centelha</h2>
<table>
<thead><tr><th>Recurso</th><th>Usos/Dia</th><th>Nível Mínimo</th></tr></thead>
<tbody>
<tr><td>Arte da Centelha (cone 3m, 1d6)</td><td>1×/round (ilimitado)</td><td>1</td></tr>
<tr><td>Escudo de Cristal (nível×2 dano absorvido)</td><td>1×</td><td>3</td></tr>
<tr><td>Mestre da Centelha como 3º círculo (3d6, cone 9m)</td><td>1×</td><td>10</td></tr>
</tbody>
</table>

<h2>Diplomata</h2>
<table>
<thead><tr><th>Recurso</th><th>Usos/Dia</th><th>Nível Mínimo</th></tr></thead>
<tbody>
<tr><td>Audiência (bônus Teste de Reação)</td><td>1×</td><td>3</td></tr>
<tr><td>Rede de Contatos (1d4 informantes)</td><td>1×</td><td>10</td></tr>
</tbody>
</table>

<h2>Voraz</h2>
<table>
<thead><tr><th>Recurso</th><th>Usos</th><th>Nível Mínimo</th></tr></thead>
<tbody>
<tr><td>Medo Como Ferramenta (intimidar após abater)</td><td>1×/combate</td><td>3</td></tr>
</tbody>
</table>

<h2>Arkanim (Raça)</h2>
<table>
<thead><tr><th>Recurso</th><th>Usos/Dia</th><th>Condição</th></tr></thead>
<tbody>
<tr><td>Herança Arcana (magia de 1º nível aleatória)</td><td>1×</td><td>Sempre</td></tr>
</tbody>
</table>
`
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
<tr><td>Orc do Sol Poente</td><td>Guerreiro, Narcoguerreiro, Guardião</td><td>Técnica refinada + disciplina marcial = dano consistente.</td></tr>
<tr><td>Varko</td><td>Ladrão, Assassino, Voraz</td><td>Infravisão longa + pequeno porte = furtividade excepcional.</td></tr>
</tbody>
</table>

<h2>Combinações Inusitadas (mas válidas)</h2>
<ul>
<li><strong>Nefilim Bruxo:</strong> O Nefilim não consegue mentir, mas pode fazer um pacto genuíno com uma entidade. Tensão dramática rica.</li>
<li><strong>Atlante Narcoguerreiro:</strong> A dependência de água e a dependência de fungos criam um personagem de sobrevivência dupla.</li>
<li><strong>Varko Diplomata:</strong> Estigma de pequeno porte + habilidade social cria um negociador improvávelmente eficaz.</li>
</ul>
`
  },
  {
    title: "Itens e Substâncias de Ekhoria",
    content: `
<h1>Itens e Substâncias Especiais de Ekhoria</h1>

<h2>Fungos do Degelo (Vornfell)</h2>
<p>Substâncias alucinógenas extraídas dos fungos que crescem no degelo de Vornfell. Usadas pelo Narcoguerreiro como ferramentas de combate e sobrevivência.</p>

<table>
<thead><tr><th>Fungo</th><th>Efeito</th><th>Duração</th><th>Vício</th></tr></thead>
<tbody>
<tr><td>Seiva de Yggdras Diluída</td><td>Cura 1d4 PV; uso seguro pelo Narcoguerreiro</td><td>Imediato</td><td>Baixo</td></tr>
<tr><td>Pó de Morthan</td><td>Paralisa criaturas que falham em JPC (CD 12)</td><td>1d4 rodadas</td><td>—</td></tr>
<tr><td>Esporos do Véu</td><td>+2 BA e +2 CA por 3 rodadas; depois: exaustão leve</td><td>3 rodadas</td><td>Médio</td></tr>
<tr><td>Néctar do Sono Profundo</td><td>Criatura dorme 1d6 horas (JPS CD 14 anula)</td><td>1d6 horas</td><td>Baixo</td></tr>
</tbody>
</table>

<h2>Cristais de Combate (Cinthara)</h2>
<p>Cristais energizados usados pelos Guardiões da Centelha. Cada tipo tem propriedades únicas.</p>

<table>
<thead><tr><th>Cristal</th><th>Efeito Base</th><th>Efeito Rajada Combinada</th></tr></thead>
<tbody>
<tr><td>Arkanita (base)</td><td>Escudo de Cristal; sem efeito adicional</td><td>—</td></tr>
<tr><td>Ônix</td><td>+1d6 dano nas explosões</td><td>Cega alvo por 1 rodada (JPS anula)</td></tr>
<tr><td>Centelha Solar</td><td>+1d6 dano de luz</td><td>Atordoa alvo por 1 rodada (JPS anula)</td></tr>
<tr><td>Gelo Vivo</td><td>+1d6 dano de frio</td><td>Reduz deslocamento do alvo em 3m por 1 rodada</td></tr>
<tr><td>Cristal Trovão</td><td>+1d6 dano de trovão</td><td>Empurra alvo 1,5m para trás</td></tr>
</tbody>
</table>
<p><em>Nota: Cristais custam entre 50–200 PO cada, dependendo da raridade. O Mestre decide disponibilidade.</em></p>

<h2>Pedra da Alma (Hers'ta)</h2>
<p>Objeto vital dos Autokthons. Deve ser protegida a qualquer custo.</p>
<ul>
<li><strong>Localização:</strong> Geralmente embutida no peito ou costas do Autokthon.</li>
<li><strong>Se destruída:</strong> Morte instantânea, sem salvação.</li>
<li><strong>Se removida:</strong> Coma imediato. Recolocada em 1 hora = desperta normalmente.</li>
<li><strong>CA da pedra:</strong> 10 (se exposta); CA do Autokthon se embutida.</li>
<li><strong>PV da pedra:</strong> 10 + nível do Autokthon.</li>
</ul>
`
  }
];

// Gera o arquivo .db do Journal
const journalDb = journalPages.map((page, i) => JSON.stringify({
  _id: uid(),
  name: page.title,
  pages: [
    {
      _id: uid(),
      name: page.title,
      type: "text",
      text: { content: page.content, format: 1 },
      sort: (i + 1) * 100000
    }
  ],
  flags: { ekhoria: { tipo: "journal" } }
})).join("\n");

fs.writeFileSync(path.join(packsDir, "ekhoria-journal.db"), journalDb, "utf8");
console.log(`✔ ekhoria-journal.db gerado (${journalPages.length} páginas)`);
