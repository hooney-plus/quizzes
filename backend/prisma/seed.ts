import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const questions = [
  // ═══════════════════════════════════════════
  // CAPITAIS — FÁCIL
  // ═══════════════════════════════════════════
  { text: 'Qual é a capital do Brasil?', options: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador'], correctAnswer: 'Brasília', category: 'capitals', difficulty: 'easy' },
  { text: 'Qual é a capital do Japão?', options: ['Osaka', 'Hiroshima', 'Kyoto', 'Tóquio'], correctAnswer: 'Tóquio', category: 'capitals', difficulty: 'easy' },
  { text: 'Qual é a capital da França?', options: ['Lyon', 'Marselha', 'Paris', 'Nice'], correctAnswer: 'Paris', category: 'capitals', difficulty: 'easy' },
  { text: 'Qual é a capital da Argentina?', options: ['Córdoba', 'Rosário', 'Buenos Aires', 'Mendoza'], correctAnswer: 'Buenos Aires', category: 'capitals', difficulty: 'easy' },
  { text: 'Qual é a capital do Egito?', options: ['Alexandria', 'Cairo', 'Luxor', 'Assuã'], correctAnswer: 'Cairo', category: 'capitals', difficulty: 'easy' },
  { text: 'Qual é a capital da Itália?', options: ['Milão', 'Veneza', 'Roma', 'Florença'], correctAnswer: 'Roma', category: 'capitals', difficulty: 'easy' },
  { text: 'Qual é a capital do México?', options: ['Guadalajara', 'Monterrey', 'Cancún', 'Cidade do México'], correctAnswer: 'Cidade do México', category: 'capitals', difficulty: 'easy' },
  { text: 'Qual é a capital de Portugal?', options: ['Porto', 'Faro', 'Lisboa', 'Braga'], correctAnswer: 'Lisboa', category: 'capitals', difficulty: 'easy' },
  { text: 'Qual é a capital da Espanha?', options: ['Barcelona', 'Sevilha', 'Valência', 'Madrid'], correctAnswer: 'Madrid', category: 'capitals', difficulty: 'easy' },
  { text: 'Qual é a capital da Alemanha?', options: ['Munique', 'Hamburgo', 'Frankfurt', 'Berlim'], correctAnswer: 'Berlim', category: 'capitals', difficulty: 'easy' },
  { text: 'Qual é a capital dos Estados Unidos?', options: ['Nova York', 'Los Angeles', 'Washington D.C.', 'Chicago'], correctAnswer: 'Washington D.C.', category: 'capitals', difficulty: 'easy' },
  { text: 'Qual é a capital do Reino Unido?', options: ['Manchester', 'Edimburgo', 'Liverpool', 'Londres'], correctAnswer: 'Londres', category: 'capitals', difficulty: 'easy' },

  // ═══════════════════════════════════════════
  // CAPITAIS — MÉDIO
  // ═══════════════════════════════════════════
  { text: 'Qual é a capital da Austrália?', options: ['Sydney', 'Melbourne', 'Brisbane', 'Camberra'], correctAnswer: 'Camberra', category: 'capitals', difficulty: 'medium' },
  { text: 'Qual é a capital do Canadá?', options: ['Toronto', 'Vancouver', 'Ottawa', 'Montreal'], correctAnswer: 'Ottawa', category: 'capitals', difficulty: 'medium' },
  { text: 'Qual é a capital da Índia?', options: ['Mumbai', 'Nova Delhi', 'Bangalore', 'Calcutá'], correctAnswer: 'Nova Delhi', category: 'capitals', difficulty: 'medium' },
  { text: 'Qual é a capital da África do Sul?', options: ['Joanesburgo', 'Cidade do Cabo', 'Pretória', 'Durban'], correctAnswer: 'Pretória', category: 'capitals', difficulty: 'medium' },
  { text: 'Qual é a capital da Suíça?', options: ['Zurique', 'Genebra', 'Lausanne', 'Berna'], correctAnswer: 'Berna', category: 'capitals', difficulty: 'medium' },
  { text: 'Qual é a capital da Grécia?', options: ['Salônica', 'Patras', 'Atenas', 'Heraklion'], correctAnswer: 'Atenas', category: 'capitals', difficulty: 'medium' },
  { text: 'Qual é a capital da Turquia?', options: ['Istambul', 'Izmir', 'Ancara', 'Bursa'], correctAnswer: 'Ancara', category: 'capitals', difficulty: 'medium' },
  { text: 'Qual é a capital da China?', options: ['Xangai', 'Hong Kong', 'Nanquim', 'Pequim'], correctAnswer: 'Pequim', category: 'capitals', difficulty: 'medium' },
  { text: 'Qual é a capital da Coreia do Sul?', options: ['Busan', 'Incheon', 'Seul', 'Daegu'], correctAnswer: 'Seul', category: 'capitals', difficulty: 'medium' },
  { text: 'Qual é a capital da Holanda?', options: ['Roterdã', 'Haia', 'Utrecht', 'Amsterdã'], correctAnswer: 'Amsterdã', category: 'capitals', difficulty: 'medium' },
  { text: 'Qual é a capital do Peru?', options: ['Cusco', 'Arequipa', 'Lima', 'Trujillo'], correctAnswer: 'Lima', category: 'capitals', difficulty: 'medium' },
  { text: 'Qual é a capital da Tailândia?', options: ['Chiang Mai', 'Phuket', 'Bangcoc', 'Pattaya'], correctAnswer: 'Bangcoc', category: 'capitals', difficulty: 'medium' },
  { text: 'Qual é a capital da Colômbia?', options: ['Medellín', 'Cali', 'Bogotá', 'Cartagena'], correctAnswer: 'Bogotá', category: 'capitals', difficulty: 'medium' },

  // ═══════════════════════════════════════════
  // CAPITAIS — DIFÍCIL
  // ═══════════════════════════════════════════
  { text: 'Qual é a capital do Cazaquistão?', options: ['Almaty', 'Astana', 'Shymkent', 'Karaganda'], correctAnswer: 'Astana', category: 'capitals', difficulty: 'hard' },
  { text: 'Qual é a capital da Islândia?', options: ['Bergen', 'Akureyri', 'Reykjavík', 'Tromsø'], correctAnswer: 'Reykjavík', category: 'capitals', difficulty: 'hard' },
  { text: 'Qual é a capital da Nova Zelândia?', options: ['Auckland', 'Christchurch', 'Dunedin', 'Wellington'], correctAnswer: 'Wellington', category: 'capitals', difficulty: 'hard' },
  { text: 'Qual é a capital do Nepal?', options: ['Pokhara', 'Katmandu', 'Bhaktapur', 'Lalitpur'], correctAnswer: 'Katmandu', category: 'capitals', difficulty: 'hard' },
  { text: 'Qual é a capital de Mianmar (Birmânia)?', options: ['Rangum', 'Mandalay', 'Naypyidaw', 'Bago'], correctAnswer: 'Naypyidaw', category: 'capitals', difficulty: 'hard' },
  { text: 'Qual é a capital do Paquistão?', options: ['Karachi', 'Lahore', 'Islamabad', 'Peshawar'], correctAnswer: 'Islamabad', category: 'capitals', difficulty: 'hard' },
  { text: 'Qual é a capital da Mongólia?', options: ['Darhan', 'Erdenet', 'Ulaanbaatar', 'Choibalsan'], correctAnswer: 'Ulaanbaatar', category: 'capitals', difficulty: 'hard' },
  { text: 'Qual é a capital de Moçambique?', options: ['Beira', 'Nampula', 'Maputo', 'Pemba'], correctAnswer: 'Maputo', category: 'capitals', difficulty: 'hard' },
  { text: 'Qual é a capital do Quirguistão?', options: ['Osh', 'Jalal-Abad', 'Bishkek', 'Karakol'], correctAnswer: 'Bishkek', category: 'capitals', difficulty: 'hard' },

  // ═══════════════════════════════════════════
  // CONTINENTES — FÁCIL
  // ═══════════════════════════════════════════
  { text: 'Em qual continente fica o Japão?', options: ['Europa', 'América', 'Ásia', 'Oceania'], correctAnswer: 'Ásia', category: 'continents', difficulty: 'easy' },
  { text: 'Em qual continente fica o Egito?', options: ['Ásia', 'Europa', 'África', 'América'], correctAnswer: 'África', category: 'continents', difficulty: 'easy' },
  { text: 'Em qual continente fica a Austrália?', options: ['Ásia', 'África', 'América', 'Oceania'], correctAnswer: 'Oceania', category: 'continents', difficulty: 'easy' },
  { text: 'Em qual continente fica o México?', options: ['América do Sul', 'América Central', 'América do Norte', 'Caribe'], correctAnswer: 'América do Norte', category: 'continents', difficulty: 'easy' },
  { text: 'Em qual continente fica a Nigéria?', options: ['Ásia', 'América', 'Europa', 'África'], correctAnswer: 'África', category: 'continents', difficulty: 'easy' },
  { text: 'Em qual continente fica o Brasil?', options: ['América do Norte', 'Europa', 'América do Sul', 'África'], correctAnswer: 'América do Sul', category: 'continents', difficulty: 'easy' },
  { text: 'Em qual continente fica a Índia?', options: ['Europa', 'Oceania', 'América', 'Ásia'], correctAnswer: 'Ásia', category: 'continents', difficulty: 'easy' },
  { text: 'Em qual continente fica a França?', options: ['Ásia', 'África', 'Europa', 'América'], correctAnswer: 'Europa', category: 'continents', difficulty: 'easy' },
  { text: 'Em qual continente fica o Canadá?', options: ['Europa', 'Ásia', 'América do Norte', 'América do Sul'], correctAnswer: 'América do Norte', category: 'continents', difficulty: 'easy' },

  // ═══════════════════════════════════════════
  // CONTINENTES — MÉDIO
  // ═══════════════════════════════════════════
  { text: 'Em qual continente fica a Turquia?', options: ['Apenas Europa', 'Apenas Ásia', 'Ambos Europa e Ásia', 'Oriente Médio'], correctAnswer: 'Ambos Europa e Ásia', category: 'continents', difficulty: 'medium' },
  { text: 'Em qual continente fica a Groenlândia?', options: ['Europa', 'América do Norte', 'Ártico', 'América do Sul'], correctAnswer: 'América do Norte', category: 'continents', difficulty: 'medium' },
  { text: 'Em qual continente fica Madagascar?', options: ['Ásia', 'Oceania', 'América', 'África'], correctAnswer: 'África', category: 'continents', difficulty: 'medium' },
  { text: 'Em qual continente fica o Cazaquistão?', options: ['Europa', 'Oriente Médio', 'América', 'Ásia'], correctAnswer: 'Ásia', category: 'continents', difficulty: 'medium' },
  { text: 'Em qual continente fica Marrocos?', options: ['Europa', 'Ásia', 'América do Norte', 'África'], correctAnswer: 'África', category: 'continents', difficulty: 'medium' },
  { text: 'Em qual continente ficam as Filipinas?', options: ['Oceania', 'Ásia', 'América', 'África'], correctAnswer: 'Ásia', category: 'continents', difficulty: 'medium' },
  { text: 'Em qual continente fica Papua Nova Guiné?', options: ['Ásia', 'América', 'África', 'Oceania'], correctAnswer: 'Oceania', category: 'continents', difficulty: 'medium' },
  { text: 'Em qual continente fica o Irã?', options: ['África', 'Europa', 'América', 'Ásia'], correctAnswer: 'Ásia', category: 'continents', difficulty: 'medium' },

  // ═══════════════════════════════════════════
  // CONTINENTES — DIFÍCIL
  // ═══════════════════════════════════════════
  { text: 'Em qual continente fica Chipre geograficamente?', options: ['Europa', 'África', 'Ásia', 'Oceania'], correctAnswer: 'Ásia', category: 'continents', difficulty: 'hard' },
  { text: 'Em qual continente fica o Suriname?', options: ['América do Norte', 'América Central', 'América do Sul', 'Caribe'], correctAnswer: 'América do Sul', category: 'continents', difficulty: 'hard' },
  { text: 'Em qual continente fica Timor-Leste?', options: ['Oceania', 'Ásia', 'África', 'América'], correctAnswer: 'Ásia', category: 'continents', difficulty: 'hard' },
  { text: 'Em qual continente fica a Geórgia (país)?', options: ['Europa', 'América', 'Oceania', 'Ásia'], correctAnswer: 'Ásia', category: 'continents', difficulty: 'hard' },
  { text: 'Em qual continente fica o Iêmen?', options: ['África', 'Europa', 'América', 'Ásia'], correctAnswer: 'Ásia', category: 'continents', difficulty: 'hard' },

  // ═══════════════════════════════════════════
  // FATOS GEOGRÁFICOS — FÁCIL
  // ═══════════════════════════════════════════
  { text: 'Qual é o maior oceano do mundo?', options: ['Oceano Atlântico', 'Oceano Índico', 'Oceano Ártico', 'Oceano Pacífico'], correctAnswer: 'Oceano Pacífico', category: 'geography', difficulty: 'easy' },
  { text: 'Qual é o maior país do mundo em área?', options: ['Canadá', 'China', 'Estados Unidos', 'Rússia'], correctAnswer: 'Rússia', category: 'geography', difficulty: 'easy' },
  { text: 'Qual é o país mais populoso do mundo?', options: ['China', 'Índia', 'Estados Unidos', 'Indonésia'], correctAnswer: 'Índia', category: 'geography', difficulty: 'easy' },
  { text: 'Qual é o menor país do mundo?', options: ['Mônaco', 'Liechtenstein', 'Vaticano', 'San Marino'], correctAnswer: 'Vaticano', category: 'geography', difficulty: 'easy' },
  { text: 'Qual é o rio mais longo do mundo?', options: ['Rio Amazonas', 'Rio Nilo', 'Rio Yangtzé', 'Rio Mississipi'], correctAnswer: 'Rio Nilo', category: 'geography', difficulty: 'easy' },
  { text: 'Em qual país fica o Monte Everest?', options: ['Índia', 'Tibet', 'Nepal', 'China'], correctAnswer: 'Nepal', category: 'geography', difficulty: 'easy' },
  { text: 'Qual é a maior floresta tropical do mundo?', options: ['Floresta do Congo', 'Taiga Siberiana', 'Floresta Amazônica', 'Floresta de Bornéu'], correctAnswer: 'Floresta Amazônica', category: 'geography', difficulty: 'easy' },
  { text: 'Qual é o continente mais frio do mundo?', options: ['Ártico', 'Europa', 'Ásia', 'Antártica'], correctAnswer: 'Antártica', category: 'geography', difficulty: 'easy' },
  { text: 'Quantos continentes existem no mundo?', options: ['5', '6', '7', '8'], correctAnswer: '7', category: 'geography', difficulty: 'easy' },
  { text: 'Qual é o maior deserto quente do mundo?', options: ['Deserto de Gobi', 'Deserto da Arábia', 'Deserto do Saara', 'Deserto de Atacama'], correctAnswer: 'Deserto do Saara', category: 'geography', difficulty: 'easy' },

  // ═══════════════════════════════════════════
  // FATOS GEOGRÁFICOS — MÉDIO
  // ═══════════════════════════════════════════
  { text: 'Qual é o deserto mais extenso do mundo (incluindo frios)?', options: ['Deserto do Saara', 'Deserto de Gobi', 'Deserto Ártico', 'Deserto Antártico'], correctAnswer: 'Deserto Antártico', category: 'geography', difficulty: 'medium' },
  { text: 'Qual é o lago mais profundo do mundo?', options: ['Lago Superior', 'Mar Cáspio', 'Lago Baikal', 'Lago Titicaca'], correctAnswer: 'Lago Baikal', category: 'geography', difficulty: 'medium' },
  { text: 'Em qual país fica o Canal de Suez?', options: ['Jordânia', 'Israel', 'Egito', 'Arábia Saudita'], correctAnswer: 'Egito', category: 'geography', difficulty: 'medium' },
  { text: 'Em qual país ficam as Cataratas do Iguaçu?', options: ['Apenas Brasil', 'Apenas Argentina', 'Brasil e Argentina', 'Paraguai'], correctAnswer: 'Brasil e Argentina', category: 'geography', difficulty: 'medium' },
  { text: 'Qual é a maior ilha do mundo?', options: ['Austrália', 'Groenlândia', 'Bornéu', 'Nova Guiné'], correctAnswer: 'Groenlândia', category: 'geography', difficulty: 'medium' },
  { text: 'Qual país tem o maior número de lagos do mundo?', options: ['Rússia', 'Brasil', 'Finlândia', 'Canadá'], correctAnswer: 'Canadá', category: 'geography', difficulty: 'medium' },
  { text: 'Qual é a montanha mais alta das Américas?', options: ['Monte McKinley', 'Monte Aconcágua', 'Monte Logan', 'Monte Chimborazo'], correctAnswer: 'Monte Aconcágua', category: 'geography', difficulty: 'medium' },
  { text: 'Qual é o maior lago de água doce do mundo?', options: ['Lago Baikal', 'Lago Titicaca', 'Lago Superior', 'Lago Vitória'], correctAnswer: 'Lago Superior', category: 'geography', difficulty: 'medium' },
  { text: 'Qual é o rio mais caudaloso do mundo (por volume de água)?', options: ['Rio Nilo', 'Rio Yangtzé', 'Rio Amazonas', 'Rio Mississippi'], correctAnswer: 'Rio Amazonas', category: 'geography', difficulty: 'medium' },
  { text: 'Qual país da América do Sul faz fronteira com o maior número de países?', options: ['Argentina', 'Peru', 'Colômbia', 'Brasil'], correctAnswer: 'Brasil', category: 'geography', difficulty: 'medium' },
  { text: 'Qual é o estreito que separa a Europa da África?', options: ['Estreito de Bering', 'Estreito de Malaca', 'Estreito de Gibraltar', 'Estreito de Ormuz'], correctAnswer: 'Estreito de Gibraltar', category: 'geography', difficulty: 'medium' },
  { text: 'Em qual país fica o maior recife de coral do mundo?', options: ['Brasil', 'Indonésia', 'Filipinas', 'Austrália'], correctAnswer: 'Austrália', category: 'geography', difficulty: 'medium' },

  // ═══════════════════════════════════════════
  // FATOS GEOGRÁFICOS — DIFÍCIL
  // ═══════════════════════════════════════════
  { text: 'Em qual país fica o Canal do Panamá?', options: ['Costa Rica', 'Colômbia', 'Panamá', 'Venezuela'], correctAnswer: 'Panamá', category: 'geography', difficulty: 'hard' },
  { text: 'Qual é o ponto mais baixo da superfície terrestre?', options: ['Vale da Morte', 'Mar Morto', 'Lago Assal', 'Depressão de Qattara'], correctAnswer: 'Mar Morto', category: 'geography', difficulty: 'hard' },
  { text: 'Qual é a montanha mais alta da África?', options: ['Monte Quênia', 'Monte Ruwenzori', 'Monte Kilimanjaro', 'Monte Atlas'], correctAnswer: 'Monte Kilimanjaro', category: 'geography', difficulty: 'hard' },
  { text: 'Qual país possui o maior número de fusos horários do mundo?', options: ['Rússia', 'Estados Unidos', 'China', 'França'], correctAnswer: 'França', category: 'geography', difficulty: 'hard' },
  { text: 'Qual é a capital de um país soberano mais ao norte do mundo?', options: ['Oslo', 'Helsinque', 'Reykjavík', 'Estocolmo'], correctAnswer: 'Reykjavík', category: 'geography', difficulty: 'hard' },
  { text: 'Qual é o país sem saída para o mar mais populoso do mundo?', options: ['Suíça', 'Etiópia', 'Bolívia', 'Áustria'], correctAnswer: 'Etiópia', category: 'geography', difficulty: 'hard' },
  { text: 'Qual é o único mar sem litoral (cercado completamente por terra)?', options: ['Mar Morto', 'Mar de Aral', 'Mar Cáspio', 'Mar Negro'], correctAnswer: 'Mar Cáspio', category: 'geography', difficulty: 'hard' },
  { text: 'Qual é a cidade mais populosa do mundo?', options: ['Xangai', 'Pequim', 'Tóquio', 'Mumbai'], correctAnswer: 'Tóquio', category: 'geography', difficulty: 'hard' },
  { text: 'Em qual país fica o Deserto de Atacama, o mais árido do mundo?', options: ['Argentina', 'Peru', 'Chile', 'Bolívia'], correctAnswer: 'Chile', category: 'geography', difficulty: 'hard' },
  { text: 'Quantos países fazem fronteira com a Rússia?', options: ['10', '12', '14', '16'], correctAnswer: '14', category: 'geography', difficulty: 'hard' },
];

async function main() {
  console.log('🌱 Atualizando banco de perguntas...');
  await prisma.answer.deleteMany({});
  await prisma.question.deleteMany({});
  for (const q of questions) {
    await prisma.question.create({ data: q });
  }
  console.log(`✅ ${questions.length} perguntas inseridas com sucesso!`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
