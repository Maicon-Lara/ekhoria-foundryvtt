// Ficha-modelo de contratado (Actor type "retainer").
//
// UMA ficha, genérica, e não nove. As nove existem do outro lado — como
// statblock do livro, em bestiario.mjs — e replicá-las aqui criaria a mesma
// estatística em dois documentos, que é como elas divergem. Quem quiser a ficha
// de um piqueiro específico usa a macro "Contratar", que lê os números do
// compêndio na hora e monta a ficha a partir deles.
//
// Este modelo existe para os dois casos em que a macro não serve: quando o
// contratado não está no livro (um especialista, um marinheiro, um NPC que a
// mesa inventou), e quando alguém precisa de uma ficha de contratado sem
// depender do JavaScript do módulo estar ativo.

export const contratadosModelo = [
  {
    nome: "Contratado (modelo)",
    profissao: "—",
    nivel: 0,
    pv: 3,
    caExtra: 0,
    notas:
      "<p><em>Copie esta ficha e preencha. Para os contratados do livro — mercenários, aprendiz, ajudante — use a macro <strong>Contratar</strong> no compêndio <strong>Ekhoria: Ferramentas</strong>: ela lê os números direto do Bestiário e já escreve as ressalvas abaixo.</em></p>"
      + "<hr><h4>O que esta ficha não guarda</h4>"
      + "<ul>"
      + "<li><strong>CA é calculada</strong>, não digitada: 10 + mod. de Destreza + <em>CA extra</em> + armadura e escudo equipados. Para reproduzir uma CA do livro sem nomear a armadura, ponha a diferença em <em>CA extra</em> — e <strong>zere aquele campo ao equipar armadura de verdade</strong>, senão soma duas vezes.</li>"
      + "<li><strong>JP é fixa em 4.</strong> Não existe campo. Os mercenários do livro têm JP 5 — a diferença é anotação de mesa.</li>"
      + "<li><strong>Moral não existe</strong> nesta ficha. Anote aqui, e role à parte. Importa mais do que parece: o ajudante testa moral toda noite, em segredo, e foge se falhar.</li>"
      + "<li><strong>Nível começa em 0</strong>, e isso não é lacuna — é o estado do Aprendiz, que ainda não está pronto para um nível de classe. Promova para 1 quando estiver.</li>"
      + "</ul>"
      + "<hr><h4>Comitiva — se o contratante for Diplomata</h4>"
      + "<ul>"
      + "<li><strong>1º nível:</strong> custo de contratação −25%; seguidores com <strong>+1 de Moral</strong>.</li>"
      + "<li><strong>3º:</strong> ataques de proteção da comitiva são Ações Fáceis.</li>"
      + "<li><strong>6º:</strong> membros recebem <strong>PV adicionais iguais ao mod. de Carisma</strong> do Diplomata.</li>"
      + "<li><strong>10º:</strong> membros recebem <strong>bônus em JP e Dano iguais ao mod. de Carisma</strong>.</li>"
      + "</ul>"
      + "<p><em>Os três últimos não têm campo nesta ficha: o de PV você soma ao máximo, os de JP e Dano ficam escritos aqui.</em></p>",
  },
];
