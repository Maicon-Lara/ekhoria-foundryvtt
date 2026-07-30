// Brasões e retratos autorais do cenário, do acervo do cofre Obsidian
// (Compendio/Imagens). Convertidos de 1920×1920 e 2,5 MB para 128px webp de
// ~5 KB: um ícone em resolução cheia numa lista de compêndio faria o Foundry
// carregar megabytes por linha.
//
// A distinção é deliberada: RAÇA usa brasão (Icones/normal — escudo, símbolo),
// CLASSE usa retrato (Obsidian-classes — a pessoa). Uma raça é uma marca; uma
// classe é alguém.
//
// Gerado por tools/make-icones.py. Para trocar uma imagem, mexa no acervo e
// rode o script — não edite este arquivo à mão.

const PASTA = "modules/ekhoria/assets/icones";

const ARQUIVO = {
  "Autokthon": "icon_autokthon",
  "Cambion": "icon_cambion",
  "Elfo Drow": "icon_drow",
  "Mantes": "icon_mante",
  "Nefilim": "icon_nefilim",
  "Orc do Sol Poente": "icon_orc",
  "Grimor": "icon_halfling",
  "Arkanim": "icon_arkanim",
  "Atlante": "icon_atlante",
  "Silente": "icon_silente",
  "Custódio Solar": "custodio_solar",
  "Diplomata": "diplomata",
  "Guardião da Centelha": "guardiao_da_centelha",
  "Lito-arcanista": "lito_arcanista",
  "Marcado": "marcado",
  "Mestre das Armas": "mestre_das_armas",
  "Narcoguerreiro": "narcoguerreiro",
  "Pugilista": "pugilista",
  "Relicário Vivo": "relicario_vivo",
  "Voraz": "voraz",
  "Astromante": "v2_astromante_nefilim",
  "Corvo": "v2_corvo_halfling",
  "Guardião da Pira": "v2_guardiao_pira",
  "Inquisidor Lunar": "v2_inquisidor_lunar",
  "Sabotador da Cratera": "v2_sabotador_cratera",
  "Vociferante de Arcanita": "v2_vociferante_arcanita"
};

// "Marcado (Couraçado)" e "Guardião da Centelha (Joia)" caem no ícone da base:
// a variante é a mesma classe com uma escolha feita.
const semVariante = (nome) => nome.replace(/\s*\([^)]*\)\s*$/, "").trim();

export function iconeProprio(nome) {
  const arq = ARQUIVO[nome] ?? ARQUIVO[semVariante(nome)];
  return arq ? `${PASTA}/${arq}.webp` : null;
}
