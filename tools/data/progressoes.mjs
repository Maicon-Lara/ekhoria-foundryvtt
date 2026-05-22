// Tabelas de progressão de BA/JP/XP por nível, transcritas LITERALMENTE do
// livro "Ekhoria — Mecânicas para Old Dragon 2".
//
// As classes do cenário são "Especializações" que herdam o BA/JP do arquétipo
// base do OD2, mas usam uma tabela de XP de Especialista própria do livro.
// O nível 1 não possui XP no schema do sistema (só ba/jp).

// [ba, jp, xp]  — o xp do nível 1 é ignorado pelo schema.
const TABELAS = {
  // Especialização de Clérigo — DV 8 (Custódio Solar, Relicário Vivo)
  clerigo_esp: [
    [1, 5, 0], [1, 5, 2000], [1, 5, 4000], [3, 7, 7000], [3, 7, 10000],
    [3, 7, 20000], [5, 9, 30000], [5, 9, 40000], [5, 9, 50000], [7, 11, 100000],
    [7, 11, 200000], [7, 11, 300000], [9, 13, 400000], [9, 13, 500000], [9, 13, 600000],
  ],
  // Especialização de Guerreiro — DV 10 (Narcoguerreiro, Pugilista)
  guerreiro_esp: [
    [1, 5, 0], [2, 5, 2500], [3, 6, 5000], [4, 6, 8500], [5, 8, 11500],
    [6, 8, 23000], [7, 10, 33000], [8, 10, 43000], [9, 11, 53000], [10, 11, 106000],
    [11, 13, 210000], [12, 13, 320000], [13, 14, 430000], [14, 14, 540000], [15, 16, 650000],
  ],
  // Especialização de Mago — DV 4 (Lito-arcanista, Guardião da Centelha)
  mago_esp: [
    [0, 5, 0], [1, 5, 3000], [1, 5, 6000], [1, 5, 10000], [2, 7, 13000],
    [2, 7, 26000], [2, 7, 36000], [3, 7, 45000], [3, 7, 56000], [3, 10, 112000],
    [4, 10, 190000], [4, 10, 280000], [4, 10, 370000], [4, 13, 460000], [5, 13, 550000],
  ],
  // Especialização de Ladrão — DV 6 (Diplomata, Voraz)
  ladrao_esp: [
    [1, 5, 0], [1, 5, 1500], [2, 5, 3000], [2, 5, 5500], [3, 8, 8500],
    [3, 8, 17000], [4, 8, 27000], [4, 8, 37000], [5, 11, 47000], [5, 11, 94000],
    [6, 11, 190000], [6, 11, 280000], [7, 14, 370000], [7, 14, 460000], [8, 14, 550000],
  ],
};

// Converte a tabela [ba,jp,xp] no formato esperado pelo schema do sistema:
// nível 1 = { ba, jp }; níveis 2..15 = { ba, jp, xp }.
export function progressao(tabela) {
  const tab = TABELAS[tabela];
  if (!tab) throw new Error(`Tabela de progressão desconhecida: ${tabela}`);
  const levels = {};
  tab.forEach(([ba, jp, xp], i) => {
    const lvl = i + 1;
    levels[String(lvl)] = lvl === 1 ? { ba, jp } : { ba, jp, xp };
  });
  return levels;
}
