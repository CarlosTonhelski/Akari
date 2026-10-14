/* AKARI — dados de demonstração: receitas, países, ingredientes, técnicas e questionário. */
var AKARI_DATA = (function () {
  var B = "assets/img/";
  var IMG = {
    bao: B + "bao.svg", bibimbap: B + "bibimbap.svg", caphe: B + "caphe.svg",
    daifuku: B + "daifuku.svg", greencurry: B + "greencurry.svg", gyoza: B + "gyoza.svg",
    icurry: B + "i-curry.svg", ifish: B + "i-fishsauce.svg", iginger: B + "i-ginger.svg",
    igochu: B + "i-gochujang.svg", ilemon: B + "i-lemongrass.svg", imiso: B + "i-miso.svg",
    inori: B + "i-nori.svg", irice: B + "i-rice.svg", isesame: B + "i-sesame.svg",
    ishoyu: B + "i-shoyu.svg", jiaozi: B + "jiaozi.svg", jjigae: B + "jjigae.svg",
    kungpao: B + "kungpao.svg", lamian: B + "lamian.svg", mango: B + "mango.svg",
    mapo: B + "mapo.svg", matcha: B + "matcha.svg", nigiri: B + "nigiri.svg",
    padthai: B + "padthai.svg", ramen: B + "ramen.svg", rolls: B + "rolls.svg",
    sashimi: B + "sashimi.svg", tempura: B + "tempura.svg"
  };

  var CATS = [
    { id: "sushi", label: "Sushi e sashimi" }, { id: "ramen", label: "Ramen e lámen" }, { id: "chinesa", label: "Pratos chineses" },
    { id: "coreana", label: "Culinária coreana" }, { id: "tailandesa", label: "Culinária tailandesa" }, { id: "entradas", label: "Entradas e acompanhamentos" },
    { id: "sobremesas", label: "Sobremesas orientais" }, { id: "bebidas", label: "Bebidas tradicionais" }
  ];
  var GCATS = [
    { id: "arroz", label: "Arroz" }, { id: "macarrao", label: "Macarrão" }, { id: "dumplings", label: "Dumplings e pães" },
    { id: "curries", label: "Curries e ensopados" }, { id: "petiscos", label: "Petiscos" }
  ];

  var COUNTRIES = [
    { id: "japao", name: "Japão", native: "日本", roman: "Nihon", lang: "ja", img: IMG.nigiri, alt: "Nigiri de salmão e atum sobre ardósia", stamp: "Washoku · UNESCO 2013",
      motto: "A arte de subtrair até restar a essência — e de respeitar a estação.",
      intro: "Uma cozinha de subtração: retirar o excesso até restar a essência. A sazonalidade (shun), o cuidado com a apresentação e o umami do dashi orientam a mesa japonesa — do balcão do izakaya ao jantar kaiseki em muitos tempos.",
      dishes: ["Sushi e sashimi", "Ramen", "Tempurá", "Missoshiru", "Okonomiyaki"],
      ingredients: ["Dashi (kombu e katsuobushi)", "Shoyu", "Missô", "Mirin", "Arroz de grão curto"],
      techniques: [
        { n: "Dashi", d: "Extração delicada do umami da alga kombu e do bonito seco, em poucos minutos e sem ferver forte." },
        { n: "Hira-zukuri", d: "O corte de sashimi em fatias retangulares, num único movimento longo da faca." },
        { n: "Agemono", d: "Frituras leves e rápidas, como o tempurá, com massa gelada e pouco mexida." }
      ],
      curiosities: [
        "Washoku, a culinária tradicional japonesa, é Patrimônio Cultural Imaterial da UNESCO desde 2013.",
        "“Ichiju-sansai” — uma sopa e três acompanhamentos, com arroz — é a estrutura clássica de uma refeição caseira."
      ] },
    { id: "china", name: "China", native: "中国", roman: "Zhōngguó", lang: "zh", img: IMG.jiaozi, alt: "Jiaozi no cesto de bambu", stamp: "8 grandes cozinhas",
      motto: "Oito grandes tradições regionais e o domínio absoluto do fogo.",
      intro: "Não existe uma “comida chinesa”: existem cozinhas chinesas. De Sichuan, com seu picante que formiga, ao vapor delicado de Cantão, o país reúne tradições regionais tão diferentes entre si quanto as de países vizinhos.",
      dishes: ["Jiaozi", "Mapo tofu", "Pato laqueado de Pequim", "Dim sum cantonês", "Lámen de Lanzhou"],
      ingredients: ["Shoyu claro e escuro", "Vinho de arroz Shaoxing", "Vinagre preto", "Pimenta de Sichuan", "Doubanjiang"],
      techniques: [
        { n: "Chao", d: "Salteado no wok em fogo altíssimo, que cria o wok hei — o “sopro do wok”." },
        { n: "Zheng", d: "Cozimento no vapor, que preserva textura e sabor de peixes, dumplings e pães." },
        { n: "Hong shao", d: "O “braseado vermelho”: cozimento lento em shoyu, açúcar e vinho até o molho laquear." }
      ],
      curiosities: [
        "A tradição reconhece oito grandes cozinhas regionais: Sichuan, Cantão, Shandong, Jiangsu, Zhejiang, Fujian, Hunan e Anhui.",
        "No Ano-Novo Lunar, o formato dos jiaozi lembra antigos lingotes de prata — comê-los é um voto de prosperidade."
      ] },
    { id: "coreia", name: "Coreia do Sul", native: "한국", roman: "Hanguk", lang: "ko", img: IMG.bibimbap, alt: "Bibimbap em tigela de pedra", stamp: "Kimjang · UNESCO 2013",
      motto: "Fermentação, pimenta e uma mesa feita para dividir.",
      intro: "A fermentação é a palavra-chave. Kimchi, os jang — pastas de soja e de pimenta — e uma mesa coberta de banchan, pequenos acompanhamentos compartilhados, fazem de cada refeição coreana um pequeno banquete.",
      dishes: ["Bibimbap", "Kimchi jjigae", "Bulgogi", "Japchae", "Tteokbokki"],
      ingredients: ["Gochujang", "Gochugaru", "Doenjang", "Óleo de gergelim", "Kimchi"],
      techniques: [
        { n: "Fermentação", d: "O kimchi amadurece de dias a meses; seu sabor muda e define o prato em que será usado." },
        { n: "Namul", d: "Legumes e folhas escaldados ou salteados e temperados um a um, com alho e gergelim." },
        { n: "Gui", d: "Grelhados feitos à mesa, como o bulgogi e o samgyeopsal, comidos em trouxinhas de folha." }
      ],
      curiosities: [
        "O kimjang, a preparação coletiva de kimchi no fim do outono, é Patrimônio Cultural Imaterial da UNESCO desde 2013.",
        "Na Coreia, os hashis costumam ser de metal e vêm sempre acompanhados de uma colher, usada para o arroz e a sopa."
      ] },
    { id: "tailandia", name: "Tailândia", native: "ไทย", roman: "Prathet Thai", lang: "th", img: IMG.greencurry, alt: "Curry verde tailandês com arroz jasmim", stamp: "4 sabores em equilíbrio",
      motto: "Doce, azedo, salgado e picante na mesma garfada.",
      intro: "Equilíbrio em movimento: doce, azedo, salgado e picante convivem no mesmo prato, e ninguém vence. Ervas frescas como capim-limão, galanga e folha de limão kaffir assinam o perfume de cada receita.",
      dishes: ["Pad thai", "Tom yum", "Curry verde", "Som tam", "Arroz glutinoso com manga"],
      ingredients: ["Molho de peixe (nam pla)", "Pasta de curry", "Capim-limão", "Galanga", "Tamarindo", "Açúcar de palma"],
      techniques: [
        { n: "Krok", d: "Socar pastas de curry e saladas como o som tam no pilão de pedra ou de barro." },
        { n: "Quebrar o coco", d: "Ferver o creme de coco até a gordura se separar e fritar nela a pasta de curry." },
        { n: "Ajuste à mesa", d: "Condimentos como prik nam pla, açúcar e pimenta seca para cada um equilibrar o próprio prato." }
      ],
      curiosities: [
        "Na Tailândia come-se com colher e garfo: o garfo empurra a comida para a colher, que é quem vai à boca.",
        "O pad thai foi promovido como prato nacional nas décadas de 1930 e 1940, durante o governo de Plaek Phibunsongkhram."
      ] },
    { id: "vietna", name: "Vietnã", native: "Việt Nam", roman: "Việt Nam", lang: "vi", img: IMG.rolls, alt: "Rolinhos frescos vietnamitas", stamp: "Ervas frescas",
      motto: "Caldos claros, ervas cruas e o frescor como princípio.",
      intro: "Frescor e leveza. Caldos aromáticos, ervas cruas em abundância e o contraste entre quente e frio, crocante e macio — uma cozinha que reúne heranças chinesas, francesas e do Sudeste Asiático com identidade própria.",
      dishes: ["Phở", "Bánh mì", "Gỏi cuốn", "Bún chả", "Cà phê sữa đá"],
      ingredients: ["Molho de peixe (nước mắm)", "Papel de arroz", "Hortelã, coentro e perilla", "Limão", "Pimenta olho-de-pássaro"],
      techniques: [
        { n: "Caldo longo", d: "Ossos cozidos por horas com cebola, gengibre e especiarias tostadas, como no phở." },
        { n: "Enrolar", d: "Rolinhos frescos montados à mesa com papel de arroz, ervas e proteína." },
        { n: "Nước chấm", d: "O molho de mergulhar que equilibra molho de peixe, limão, açúcar, alho e pimenta." }
      ],
      curiosities: [
        "O bánh mì une a baguete herdada do período colonial francês a recheios e temperos vietnamitas.",
        "O phở surgiu no norte do Vietnã no início do século XX e é tradicionalmente um café da manhã."
      ] }
  ];

  function R(o) { return o; }
  var RECIPES = [
    R({ id: "nigiri-salmao-atum", title: "Nigiri de salmão e atum", country: "japao", cat: "sushi", gcat: "arroz", time: 70, diff: 3, yield: "16 peças",
      img: IMG.nigiri, alt: "Quatro nigiris de salmão e atum sobre ardósia, com gengibre e wasabi",
      desc: "Bolinhos de arroz temperado cobertos por fatias de peixe cru: a prova de que no sushi a técnica está no arroz.",
      int: 1, spice: 0, temp: "frio", protein: "peixe", popular: false,
      ings: ["360 g (2 xícaras) de arroz japonês de grão curto", "400 ml de água", "80 ml de vinagre de arroz", "2 colheres (sopa) de açúcar", "1 colher (chá) de sal", "200 g de salmão próprio para consumo cru", "200 g de atum próprio para consumo cru", "Wasabi a gosto", "Shoyu e gengibre em conserva (gari) para servir"],
      steps: ["Lave o arroz trocando a água até ficar quase transparente e deixe escorrer por 30 minutos.", "Cozinhe com a água, tampado: depois de ferver, 12 minutos em fogo baixo; desligue e abafe por 10 minutos.", "Aqueça o vinagre com açúcar e sal até dissolver. Espalhe o arroz numa tigela larga, regue e misture em movimentos de corte, abanando até ficar morno.", "Corte o peixe contra as fibras em fatias de 7 × 3 cm e 5 mm de espessura, num único movimento da faca.", "Com as mãos úmidas em água com um pouco de vinagre, modele bolinhos de cerca de 15 g de arroz.", "Passe um toque de wasabi na fatia, apoie o arroz por cima e pressione com dois dedos, virando a peça para dar forma. Sirva logo."],
      tip: "Use apenas peixe vendido como próprio para consumo cru, previamente congelado conforme as normas sanitárias. O arroz deve estar na temperatura do corpo ao modelar — nunca gelado.",
      plating: "Alinhe as peças na diagonal sobre um prato escuro, com gari e wasabi num canto. Ao comer, mergulhe o peixe no shoyu, não o arroz." }),
    R({ id: "sashimi-moriawase", title: "Sashimi moriawase", country: "japao", cat: "sushi", gcat: null, time: 25, diff: 2, yield: "2 porções",
      img: IMG.sashimi, alt: "Fatias de sashimi de salmão e atum com shissô e daikon em prato escuro",
      desc: "Seleção de peixes crus em fatias precisas, com daikon em fios e shissô. Só funciona com faca afiada e peixe impecável.",
      int: 1, spice: 0, temp: "frio", protein: "peixe",
      ings: ["150 g de salmão próprio para consumo cru", "150 g de atum próprio para consumo cru", "10 cm de daikon (nabo japonês)", "4 folhas de shissô", "1/2 limão-siciliano", "Wasabi fresco ralado ou em pasta", "Shoyu para servir"],
      steps: ["Rale o daikon em fios finíssimos, deixe 10 minutos em água gelada e escorra muito bem.", "Mantenha o peixe gelado até o último momento e seque-o com papel-toalha.", "Corte em hira-zukuri: fatias retangulares de cerca de 1 cm, puxando a faca num único movimento longo.", "Forme um pequeno monte de daikon, encoste as folhas de shissô e apoie as fatias levemente sobrepostas.", "Finalize com wasabi e uma meia-lua de limão."],
      tip: "Serrar o peixe rasga as fibras e muda a textura. Se a faca não corta numa só passada, ela precisa ser afiada.",
      plating: "Monte com número ímpar de fatias de cada peixe — um costume japonês de equilíbrio visual — e deixe espaço livre no prato." }),
    R({ id: "ramen-tonkotsu", title: "Ramen tonkotsu", country: "japao", cat: "ramen", gcat: "macarrao", time: 540, diff: 3, yield: "4 tigelas",
      img: IMG.ramen, alt: "Tigela de ramen tonkotsu com chashu, ovo marinado, nori, naruto e cebolinha",
      desc: "Caldo branco e cremoso de ossos de porco, fervido por horas, com chashu, ovo marinado e macarrão firme.",
      int: 3, spice: 0, temp: "quente", protein: "carne", popular: true,
      ings: ["1,5 kg de ossos de porco (pés e espinhaço)", "1 cebola, 1 cabeça de alho e 5 cm de gengibre", "600 g de barriga de porco sem pele", "100 ml de shoyu, 50 ml de mirin e 50 ml de saquê (marinada)", "4 ovos", "4 porções de macarrão para ramen", "60 ml de shoyu e 1 colher (sopa) de óleo de gergelim (tare)", "Cebolinha, nori, kamaboko (naruto) e gergelim"],
      steps: ["Escalde os ossos por 10 minutos, descarte a água e lave-os bem.", "Cubra com água fria e mantenha em fervura forte por 8 horas, completando a água — é a fervura vigorosa que emulsiona a gordura e deixa o caldo branco.", "Enrole a barriga de porco, doure por todos os lados e cozinhe por 2 horas na marinada; reserve a marinada.", "Cozinhe os ovos por 6 min 30 s, esfrie em água gelada, descasque e deixe na marinada por 12 horas.", "Na última hora do caldo, junte cebola, alho e gengibre. Coe.", "Em cada tigela, coloque 2 colheres de tare, 350 ml de caldo fervente e o macarrão cozido. Cubra com chashu fatiado, ovo, nori, naruto e cebolinha."],
      tip: "Aqueça as tigelas com água quente antes de montar: o ramen esfria rápido e a gordura do caldo perde o brilho.",
      plating: "Encoste a folha de nori em pé na borda e posicione o ovo cortado com a gema voltada para cima, ao lado do chashu." }),
    R({ id: "lamen-de-lanzhou", title: "Lámen de Lanzhou", country: "china", cat: "ramen", gcat: null, time: 210, diff: 2, yield: "4 tigelas",
      img: IMG.lamian, alt: "Tigela de lámen de Lanzhou com caldo claro, carne, rabanete e óleo de pimenta",
      desc: "Macarrão puxado à mão em caldo bovino claro e perfumado, com rabanete branco, coentro e óleo de pimenta.",
      int: 2, spice: 2, temp: "quente", protein: "carne",
      ings: ["800 g de músculo bovino", "1,5 kg de ossos bovinos", "2 anises-estrelados, 1 pau de canela, 3 folhas de louro", "1 colher (chá) de pimenta de Sichuan", "5 cm de gengibre", "300 g de rabanete branco (daikon)", "500 g de macarrão de trigo fresco tipo lamian", "Óleo de pimenta, coentro, cebolinha e sal"],
      steps: ["Deixe carne e ossos de molho em água fria por 1 hora; escalde, descarte a água e lave.", "Cubra com 4 litros de água, junte especiarias e gengibre e cozinhe por 2 h 30 em fogo baixo, sem ferver forte, para o caldo ficar claro.", "Retire a carne, deixe esfriar e corte em fatias finas.", "Cozinhe o rabanete em fatias no caldo por 15 minutos e acerte o sal.", "Cozinhe o macarrão, distribua nas tigelas e cubra com caldo, carne e rabanete.", "Finalize com óleo de pimenta, coentro e cebolinha."],
      tip: "Em Lanzhou se diz que a tigela perfeita tem “um claro, dois brancos, três vermelhos, quatro verdes e cinco amarelos”: caldo claro, rabanete branco, óleo de pimenta, ervas verdes e macarrão amarelado.",
      plating: "Sirva em tigela funda e larga, com o óleo de pimenta formando pequenas poças vermelhas sobre o caldo." }),
    R({ id: "frango-kung-pao", title: "Frango kung pao", country: "china", cat: "chinesa", gcat: null, time: 30, diff: 1, yield: "3 porções",
      img: IMG.kungpao, alt: "Frango kung pao com amendoim, pimentas secas e cebolinha",
      desc: "Clássico de Sichuan: frango salteado com pimentas secas, amendoim e o formigamento da pimenta de Sichuan.",
      int: 3, spice: 2, temp: "quente", protein: "carne",
      ings: ["500 g de sobrecoxa de frango em cubos", "1 colher (sopa) de shoyu, 1 colher (chá) de vinho Shaoxing e 1 colher (chá) de amido (marinada)", "10 pimentas vermelhas secas", "1 colher (chá) de pimenta de Sichuan", "80 g de amendoim torrado sem sal", "3 cebolinhas em pedaços", "3 dentes de alho e 2 cm de gengibre picados", "1 colher (sopa) de vinagre preto, 1 de shoyu, 1 de açúcar, 1 colher (chá) de amido e 3 colheres (sopa) de água (molho)"],
      steps: ["Misture o frango com a marinada e deixe por 15 minutos.", "Misture os ingredientes do molho numa tigela.", "Aqueça bem o wok com 2 colheres (sopa) de óleo e frite as pimentas secas e a de Sichuan por 20 segundos, sem queimar.", "Junte o frango e salteie até dourar.", "Acrescente alho, gengibre e a parte branca da cebolinha.", "Despeje o molho, mexa até engrossar e brilhar e finalize com amendoim e o verde da cebolinha."],
      tip: "O sabor característico é o “ma la”: o formigamento da pimenta de Sichuan (ma) somado ao ardor da pimenta (la), amarrados pelo agridoce do molho.",
      plating: "Sirva no centro da mesa, numa travessa rasa para o amendoim continuar crocante, com arroz branco à parte." }),
    R({ id: "mapo-tofu", title: "Mapo tofu", country: "china", cat: "chinesa", gcat: null, time: 25, diff: 1, yield: "3 porções",
      img: IMG.mapo, alt: "Mapo tofu com molho vermelho, cubos de tofu e cebolinha",
      desc: "Tofu macio em molho vermelho de pasta de fava, carne moída e pimenta de Sichuan. Picante, aromático e reconfortante.",
      int: 3, spice: 3, temp: "quente", protein: "carne", veg: "Troque a carne por shiitake picado para uma versão vegetariana.",
      ings: ["400 g de tofu macio", "150 g de carne suína moída", "2 colheres (sopa) de doubanjiang", "1 colher (sopa) de feijão-preto fermentado (douchi) picado", "1 colher (chá) de pimenta de Sichuan moída", "2 dentes de alho e 1 cm de gengibre", "250 ml de caldo de galinha", "1 colher (sopa) de amido dissolvido em 3 de água", "Cebolinha e óleo de pimenta"],
      steps: ["Corte o tofu em cubos de 2 cm e escalde por 2 minutos em água com sal — isso firma os cubos.", "Doure a carne até ficar sequinha.", "Junte doubanjiang, douchi, alho e gengibre e frite até o óleo ficar vermelho.", "Adicione o caldo e o tofu e cozinhe por 5 minutos, empurrando com as costas da colher em vez de mexer.", "Engrosse com o amido em duas etapas.", "Finalize com óleo de pimenta, pimenta de Sichuan e cebolinha."],
      tip: "Mexa empurrando, nunca girando: os cubos de tofu precisam chegar inteiros à mesa.",
      plating: "Uma tigela funda e escura realça o vermelho do molho; polvilhe a pimenta de Sichuan só no último segundo." }),
    R({ id: "jiaozi", title: "Jiaozi no vapor", country: "china", cat: "chinesa", gcat: "dumplings", time: 90, diff: 2, yield: "30 unidades",
      img: IMG.jiaozi, alt: "Jiaozi cozidos no vapor em cesto de bambu",
      desc: "Os dumplings do norte da China, de massa fina e recheio suculento de porco e repolho. Prato obrigatório do Ano-Novo Lunar.",
      int: 2, spice: 0, temp: "quente", protein: "carne",
      ings: ["300 g de farinha de trigo", "150 ml de água", "300 g de carne suína moída", "200 g de repolho chinês picado", "2 cebolinhas", "1 colher (sopa) de shoyu", "1 colher (chá) de vinho Shaoxing", "1 colher (chá) de óleo de gergelim e 1 cm de gengibre ralado", "Vinagre preto e alho para o molho"],
      steps: ["Misture farinha e água, sove por 10 minutos e deixe a massa descansar coberta por 30 minutos.", "Tempere a carne e adicione 3 colheres (sopa) de água aos poucos, mexendo sempre no mesmo sentido; junte repolho e cebolinha.", "Abra discos de 8 cm, mais finos nas bordas que no centro.", "Recheie e feche em meia-lua, fazendo pregas.", "Cozinhe em água fervente; quando voltar a ferver, junte meio copo de água fria. Repita três vezes.", "Retire quando flutuarem e a massa estiver translúcida."],
      tip: "Mexer o recheio sempre no mesmo sentido desenvolve a liga da carne e mantém o caldo dentro do dumpling.",
      plating: "Sirva no cesto de bambu ou numa travessa clara, com vinagre preto e alho em tigelinhas individuais." }),
    R({ id: "bibimbap", title: "Bibimbap", country: "coreia", cat: "coreana", gcat: "arroz", time: 50, diff: 2, yield: "2 porções",
      img: IMG.bibimbap, alt: "Bibimbap em tigela de pedra com legumes, carne, ovo e gochujang",
      desc: "Arroz coberto por legumes temperados, carne e ovo, misturado à mesa com gochujang. A crosta da tigela de pedra é o prêmio.",
      int: 2, spice: 2, temp: "quente", protein: "carne", popular: true, veg: "Substitua a carne por tofu dourado e cogumelos — fica ótimo vegetariano.",
      ings: ["2 xícaras de arroz cozido", "150 g de carne bovina em tiras finas", "1 cenoura em julienne", "1 maço de espinafre", "150 g de broto de feijão", "6 cogumelos shiitake fatiados", "2 ovos", "2 colheres (sopa) de gochujang", "Óleo de gergelim, shoyu, alho, açúcar, vinagre e gergelim"],
      steps: ["Marine a carne com shoyu, alho, açúcar e óleo de gergelim por 20 minutos.", "Prepare cada legume separadamente (namul): escalde espinafre e broto e tempere com sal, alho e óleo de gergelim; salteie cenoura e shiitake.", "Misture gochujang, 1 colher de óleo de gergelim, 1 de açúcar e 1 de vinagre para o molho.", "Unte a tigela de pedra com óleo de gergelim, aqueça, coloque o arroz e deixe chiar por 5 minutos.", "Arrume legumes e carne em setores e coloque um ovo frito no centro.", "À mesa, junte o molho e misture tudo."],
      tip: "A crosta dourada do fundo da tigela de pedra, o nurungji, é disputada — não mexa o arroz enquanto ela se forma.",
      plating: "Alterne as cores — verde ao lado do laranja, claro ao lado do escuro — e só misture diante de quem vai comer." }),
    R({ id: "kimchi-jjigae", title: "Kimchi jjigae", country: "coreia", cat: "coreana", gcat: "curries", time: 40, diff: 1, yield: "3 porções",
      img: IMG.jjigae, alt: "Kimchi jjigae em panela de barro com tofu e cebolinha",
      desc: "Ensopado borbulhante de kimchi bem fermentado, barriga de porco e tofu. O conforto das noites frias coreanas.",
      int: 3, spice: 2, temp: "quente", protein: "carne",
      ings: ["300 g de kimchi bem fermentado e 1/2 xícara do seu caldo", "200 g de barriga de porco em fatias", "300 g de tofu firme", "1 cebola", "1 colher (sopa) de gochugaru", "1 colher (sopa) de gochujang", "2 dentes de alho", "600 ml de água ou caldo de anchova", "2 cebolinhas e 1 colher (chá) de óleo de gergelim"],
      steps: ["Doure a barriga de porco na panela com o óleo de gergelim.", "Junte o kimchi picado e refogue por 5 minutos, até amaciar.", "Adicione cebola, alho, gochugaru e gochujang.", "Despeje a água e o caldo do kimchi e cozinhe por 20 minutos.", "Acrescente o tofu em fatias e cozinhe por mais 5 minutos.", "Finalize com cebolinha e sirva ainda borbulhando."],
      tip: "Quanto mais azedo o kimchi, melhor o ensopado: é o destino clássico do kimchi que já passou do ponto para ser comido puro.",
      plating: "Leve à mesa na própria panela de barro (ttukbaegi), fervendo, com uma tigela de arroz branco para cada pessoa." }),
    R({ id: "pad-thai", title: "Pad thai", country: "tailandia", cat: "tailandesa", gcat: "macarrao", time: 35, diff: 2, yield: "2 porções",
      img: IMG.padthai, alt: "Pad thai com camarão, tofu, amendoim, broto de feijão e limão",
      desc: "Macarrão de arroz salteado com tamarindo, camarão e tofu, finalizado à mesa com amendoim, limão e pimenta.",
      int: 2, spice: 1, temp: "quente", protein: "peixe", popular: true, veg: "Sem camarão e com shoyu no lugar do molho de peixe, vira uma versão vegetariana.",
      ings: ["200 g de macarrão de arroz de 5 mm", "200 g de camarão limpo", "100 g de tofu firme em cubos", "2 ovos", "2 colheres (sopa) de polpa de tamarindo", "2 colheres (sopa) de molho de peixe", "2 colheres (sopa) de açúcar de palma", "1 chalota e 2 dentes de alho", "100 g de broto de feijão e cebolinha-francesa", "50 g de amendoim torrado, limão e pimenta em flocos"],
      steps: ["Hidrate o macarrão em água morna por 30 minutos, até ficar flexível mas firme.", "Aqueça tamarindo, molho de peixe e açúcar até dissolver.", "No wok quente, doure o tofu, a chalota e o alho; junte o camarão.", "Empurre tudo para o lado, quebre os ovos e mexa até quase firmar.", "Adicione o macarrão e o molho e salteie até absorver.", "Junte broto e cebolinha, misture por 30 segundos e desligue."],
      tip: "Não encharque o macarrão: ele termina de cozinhar no molho. Se grudar no wok, pingue água, não óleo.",
      plating: "Sirva com amendoim, flocos de pimenta, açúcar e limão ao lado, para cada pessoa ajustar o próprio equilíbrio — como nas bancas de rua." }),
    R({ id: "curry-verde", title: "Curry verde com frango", country: "tailandia", cat: "tailandesa", gcat: "curries", time: 40, diff: 2, yield: "4 porções",
      img: IMG.greencurry, alt: "Curry verde tailandês com frango, berinjela e manjericão e arroz jasmim ao lado",
      desc: "Gaeng keow wan: frango e berinjela em leite de coco com pasta de curry verde, folha de kaffir e manjericão tailandês.",
      int: 3, spice: 3, temp: "quente", protein: "carne", veg: "Use tofu firme e legumes e troque o molho de peixe por shoyu para a versão vegetariana.",
      ings: ["3 colheres (sopa) de pasta de curry verde", "800 ml de leite de coco", "500 g de sobrecoxa de frango em tiras", "200 g de berinjela tailandesa ou comum em cubos", "4 folhas de limão kaffir", "1 colher (sopa) de açúcar de palma", "2 colheres (sopa) de molho de peixe", "1 maço de manjericão tailandês", "1 pimenta vermelha e arroz jasmim para servir"],
      steps: ["Ferva 200 ml da parte mais grossa do leite de coco até a gordura se separar.", "Frite a pasta de curry nessa gordura por 2 a 3 minutos, até perfumar.", "Junte o frango e envolva bem na pasta.", "Adicione o restante do leite de coco, as folhas de kaffir e a berinjela; cozinhe por 12 minutos.", "Tempere com açúcar de palma e molho de peixe.", "Desligue e junte manjericão e pimenta fatiada."],
      tip: "“Keow wan” quer dizer “verde doce” — mas o doce se refere ao tom verde claro e suave do curry, não ao açúcar.",
      plating: "Sirva em tigela, com o arroz jasmim à parte, moldado em cúpula — nunca afogado no curry." }),
    R({ id: "gyoza", title: "Gyoza", country: "japao", cat: "entradas", gcat: null, time: 60, diff: 2, yield: "24 unidades",
      img: IMG.gyoza, alt: "Gyoza dourados em prato verde-escuro com molho de soja e óleo de pimenta",
      desc: "Pastéis japoneses selados na frigideira e terminados no vapor: base crocante, topo macio e recheio suculento.",
      int: 2, spice: 0, temp: "quente", protein: "carne", popular: true,
      ings: ["24 discos de massa para gyoza", "250 g de carne suína moída", "150 g de acelga chinesa (hakusai) picada", "1 colher (chá) de sal", "2 cebolinhas", "1 dente de alho e 1 cm de gengibre", "1 colher (sopa) de shoyu e 1 colher (chá) de óleo de gergelim", "Shoyu, vinagre de arroz e rayu em partes iguais para o molho"],
      steps: ["Salgue a acelga por 10 minutos e esprema bem a água.", "Misture carne, acelga e temperos e sove até ficar pegajoso.", "Coloque 1 colher (chá) de recheio por disco, umedeça a borda e feche com 5 ou 6 pregas de um só lado.", "Doure a base na frigideira com óleo por 2 minutos.", "Adicione 80 ml de água, tampe e cozinhe no vapor por 4 minutos.", "Destampe e deixe a água evaporar até a base voltar a ficar crocante."],
      tip: "Uma colher (chá) de amido na água do vapor forma a “asa” rendada e crocante que une os gyozas — o hanetsuki.",
      plating: "Cubra a frigideira com o prato e vire de uma vez, deixando a base dourada para cima." }),
    R({ id: "goi-cuon", title: "Gỏi cuốn (rolinhos frescos)", country: "vietna", cat: "entradas", gcat: "petiscos", time: 40, diff: 1, yield: "8 rolinhos",
      img: IMG.rolls, alt: "Rolinhos frescos vietnamitas com camarão e ervas, molho de amendoim e limão",
      desc: "Papel de arroz envolvendo camarão, aletria e ervas frescas, com molho de amendoim e hoisin. Leve e cheio de aroma.",
      int: 1, spice: 0, temp: "frio", protein: "peixe",
      ings: ["8 folhas de papel de arroz", "12 camarões cozidos cortados ao meio no comprimento", "100 g de aletria de arroz (bún) cozida", "Folhas de alface", "Hortelã, coentro e manjericão", "3 colheres (sopa) de pasta de amendoim", "2 colheres (sopa) de molho hoisin", "Água morna e amendoim picado"],
      steps: ["Mergulhe uma folha de papel de arroz em água morna por 2 a 3 segundos e apoie na tábua.", "No terço inferior, coloque alface, aletria e ervas.", "Dobre uma vez sobre o recheio e apoie três metades de camarão com o lado rosado para baixo.", "Dobre as laterais e enrole firme até o fim.", "Bata hoisin, pasta de amendoim e água até ficar cremoso e finalize com amendoim picado."],
      tip: "Não deixe o papel amolecer na água: ele termina de hidratar na tábua e fica muito mais fácil de enrolar.",
      plating: "Corte na diagonal para mostrar o interior e sirva em até meia hora, antes que o papel resseque." }),
    R({ id: "bao-de-porco", title: "Bao de barriga de porco", country: "china", cat: "entradas", gcat: "dumplings", time: 180, diff: 3, yield: "8 unidades",
      img: IMG.bao, alt: "Três bao buns recheados com barriga de porco, pepino, coentro e amendoim",
      desc: "Gua bao: pão macio no vapor, dobrado como um sanduíche, com barriga de porco braseada, pepino, coentro e amendoim.",
      int: 2, spice: 0, temp: "quente", protein: "carne",
      ings: ["300 g de farinha de trigo", "5 g de fermento biológico seco", "20 g de açúcar", "160 ml de leite morno e 1 colher (sopa) de óleo", "600 g de barriga de porco", "60 ml de shoyu, 2 colheres (sopa) de vinho Shaoxing e 2 de açúcar mascavo", "1 anis-estrelado", "Pepino em fatias, coentro e amendoim torrado moído com açúcar"],
      steps: ["Sove a massa por 10 minutos até ficar lisa e deixe crescer por 1 hora.", "Cozinhe a barriga em pedaços com shoyu, vinho, açúcar, anis e água, tampado, por 1 h 30 em fogo baixo.", "Divida a massa em 8, abra ovais, pincele óleo e dobre ao meio sobre um palito untado.", "Deixe descansar por 20 minutos e cozinhe no vapor por 10 minutos.", "Recheie com o porco fatiado, pepino, coentro e amendoim."],
      tip: "Ao desligar o vapor, espere 3 minutos antes de abrir a tampa: a mudança brusca de temperatura murcha os pães.",
      plating: "Sirva três por pessoa, lado a lado, com o recheio voltado para quem vai comer." }),
    R({ id: "tempura", title: "Tempurá de camarão e legumes", country: "japao", cat: "entradas", gcat: "petiscos", time: 35, diff: 2, yield: "3 porções",
      img: IMG.tempura, alt: "Tempurá de camarão e legumes sobre papel, com molho tentsuyu",
      desc: "Massa gelada e pouco mexida que vira uma casca leve, quase transparente. Servido com tentsuyu e daikon ralado.",
      int: 1, spice: 0, temp: "quente", protein: "peixe",
      ings: ["12 camarões grandes com cauda", "1 batata-doce em rodelas finas", "1 abobrinha em fatias", "6 folhas de shissô", "1 gema e 200 ml de água gelada", "100 g de farinha de trigo fraca", "Óleo para fritar", "200 ml de dashi, 50 ml de shoyu e 50 ml de mirin (tentsuyu)", "Daikon ralado"],
      steps: ["Descasque os camarões mantendo a cauda e faça pequenos cortes na barriga para que fiquem retos.", "Aqueça o óleo a 170–180 °C.", "Misture a gema com a água gelada, adicione a farinha de uma vez e misture com hashis em poucos movimentos — grumos são bem-vindos.", "Passe os ingredientes em farinha seca, depois na massa, e frite poucos por vez, de 1 a 2 minutos.", "Escorra numa grade e aqueça os ingredientes do tentsuyu para servir com o daikon."],
      tip: "Massa fria e pouco mexida é o segredo: o glúten não se desenvolve e a casquinha fica leve.",
      plating: "Apoie sobre papel dobrado (kaishi), com os camarões inclinados e as caudas para cima." }),
    R({ id: "ichigo-daifuku", title: "Ichigo daifuku", country: "japao", cat: "sobremesas", gcat: null, time: 45, diff: 2, yield: "8 unidades",
      img: IMG.daifuku, alt: "Ichigo daifuku inteiros e um cortado mostrando o anko e o morango",
      desc: "Mochi macio envolvendo pasta de feijão azuki e um morango inteiro. Doce, ácido e elástico na mesma mordida.",
      int: 1, spice: 0, temp: "frio", protein: "vegetal",
      ings: ["100 g de farinha de arroz glutinoso (mochiko ou shiratamako)", "30 g de açúcar", "150 ml de água", "240 g de anko (pasta doce de feijão azuki)", "8 morangos pequenos", "Amido de milho para polvilhar"],
      steps: ["Lave e seque os morangos e envolva cada um em 30 g de anko, deixando a ponta à mostra.", "Misture farinha, açúcar e água até ficar liso.", "Cozinhe no micro-ondas por 1 minuto, mexa; repita por mais 1 minuto e depois 30 segundos, até ficar elástico e translúcido.", "Despeje sobre superfície polvilhada com amido e divida em 8.", "Abra cada porção e envolva o morango, fechando por baixo."],
      tip: "Trabalhe o mochi ainda morno e com as mãos polvilhadas de amido — frio, ele endurece e racha.",
      plating: "Sirva no mesmo dia, inteiros e um cortado ao meio com faca molhada para revelar o morango." }),
    R({ id: "arroz-glutinoso-manga", title: "Arroz glutinoso com manga", country: "tailandia", cat: "sobremesas", gcat: null, time: 290, diff: 1, yield: "4 porções",
      img: IMG.mango, alt: "Arroz glutinoso com fatias de manga e calda de coco",
      desc: "Khao niao mamuang: arroz glutinoso cozido no vapor e banhado em leite de coco, com manga madura e calda levemente salgada.",
      int: 1, spice: 0, temp: "frio", protein: "vegetal",
      ings: ["250 g de arroz glutinoso tailandês", "300 ml de leite de coco", "80 g de açúcar", "1/2 colher (chá) de sal", "2 mangas maduras", "1 colher (sopa) de feijão-mungo amarelo torrado ou gergelim", "1 colher (chá) de amido de arroz"],
      steps: ["Deixe o arroz de molho em água por pelo menos 4 horas.", "Cozinhe no vapor, sobre um pano, por 25 minutos.", "Aqueça 200 ml do leite de coco com açúcar e sal, sem ferver.", "Despeje sobre o arroz quente, tampe e deixe absorver por 20 minutos.", "Engrosse o restante do leite de coco com o amido e uma pitada de sal para a calda.", "Fatie a manga e sirva com o arroz e a calda."],
      tip: "A calda leva sal de propósito: é o contraste salgado que faz o doce da manga e do coco brilhar.",
      plating: "Molde o arroz em cúpula com uma tigelinha, encoste a manga em leque e regue a calda só sobre o arroz." }),
    R({ id: "matcha", title: "Matcha batido", country: "japao", cat: "bebidas", gcat: null, time: 5, diff: 1, yield: "1 tigela",
      img: IMG.matcha, alt: "Matcha batido em chawan com chasen de bambu sobre esteira",
      desc: "Chá verde em pó batido com água quente até formar espuma fina. Vegetal, levemente amargo e profundamente umami.",
      int: 2, spice: 0, temp: "quente", protein: "vegetal", drink: true,
      ings: ["2 g de matcha cerimonial (cerca de 1 colher de chá rasa)", "70 ml de água a 75–80 °C", "Chawan (tigela), chasen (batedor de bambu) e peneira fina"],
      steps: ["Aqueça a tigela e o batedor com água quente; descarte a água e seque.", "Peneire o matcha na tigela para desfazer os grumos.", "Despeje a água a cerca de 80 °C — fervente, ela queima e amarga o chá.", "Bata com movimentos rápidos de pulso, em M ou W, por 15 a 20 segundos, até formar espuma fina.", "Termine levantando o batedor pelo centro da tigela."],
      tip: "Matcha cerimonial é para beber puro; o culinário, mais adstringente, vai melhor em doces e lattes.",
      plating: "Na cerimônia do chá, quem serve gira a tigela para que a face mais bonita fique voltada para o convidado." }),
    R({ id: "ca-phe-sua-da", title: "Cà phê sữa đá", country: "vietna", cat: "bebidas", gcat: null, time: 10, diff: 1, yield: "1 copo",
      img: IMG.caphe, alt: "Café vietnamita gelado com leite condensado e o filtro phin ao lado",
      desc: "Café robusta forte, filtrado gota a gota no phin, sobre leite condensado e muito gelo. Intenso e doce.",
      int: 3, spice: 0, temp: "frio", protein: "vegetal", drink: true,
      ings: ["20 g (2 colheres de sopa) de café robusta moído médio-grosso", "2 colheres (sopa) de leite condensado", "100 ml de água fervente", "Gelo", "Filtro vietnamita (phin)"],
      steps: ["Coloque o leite condensado no fundo do copo.", "Ponha o café no phin, nivele e coloque a prensa por cima.", "Despeje 20 ml de água fervente e espere 30 segundos para o café se expandir.", "Complete com a água, tampe e deixe gotejar por 4 a 5 minutos.", "Misture com o leite condensado e despeje sobre um copo cheio de gelo."],
      tip: "O leite condensado se popularizou no café vietnamita porque o leite fresco era raro e difícil de conservar no clima tropical.",
      plating: "Sirva com o phin ainda gotejando sobre o copo, para que se vejam as camadas se formando." })
  ];

  var INGREDIENTS = [
    { id: "shoyu", name: "Shoyu", img: IMG.ishoyu, alt: "Shoyu em pires de cerâmica com grãos de soja", origin: "China · Japão", flavor: "Salgado, umami, notas tostadas",
      taste: "Salgado e profundamente umami, com notas tostadas e um leve dulçor da fermentação de soja e trigo.", uses: "Tare de ramen, marinadas, teriyaki, molho para sushi e sashimi, temperos de salteados.", pairs: "Mirin, gengibre, alho, gergelim, vinagre de arroz, açúcar.", storage: "Depois de aberto, na geladeira: o frio retarda a oxidação, que escurece o molho e apaga o aroma." },
    { id: "misso", name: "Missô", img: IMG.imiso, alt: "Missô em tigela de madeira", origin: "Japão", flavor: "Umami profundo, salgado, fermentado",
      taste: "Pasta de soja fermentada com koji. O branco (shiro) é suave e adocicado; o vermelho (aka), mais longo e intenso.", uses: "Missoshiru, marinadas para peixe, molhos, caldos de ramen e até sobremesas com caramelo.", pairs: "Dashi, tofu, peixe, cebolinha, manteiga, mel.", storage: "Na geladeira, bem fechado. Na sopa, dissolva fora da fervura para preservar o aroma." },
    { id: "gengibre", name: "Gengibre", img: IMG.iginger, alt: "Raiz de gengibre fresco e fatias", origin: "Sul e Sudeste Asiático", flavor: "Picante, fresco, cítrico",
      taste: "Picância fresca e aromática, com notas cítricas que ficam mais doces quando cozidas.", uses: "Refogados, caldos, marinadas, recheios de dumplings e o gari, a conserva servida com sushi.", pairs: "Alho, cebolinha, shoyu, peixe, porco, mel.", storage: "Inteiro, fora da geladeira por alguns dias; para durar meses, congele e rale ainda congelado." },
    { id: "oleo-gergelim", name: "Óleo de gergelim torrado", img: IMG.isesame, alt: "Óleo de gergelim torrado com sementes de gergelim", origin: "China · Coreia · Japão", flavor: "Tostado, amendoado, intenso",
      taste: "Intensamente tostado e amendoado; poucas gotas mudam o perfume de um prato inteiro.", uses: "Finalização, namul coreano, molhos e marinadas. Não serve para fritar: o aroma se perde no calor alto.", pairs: "Shoyu, alho, vinagre de arroz, cebolinha, gochujang.", storage: "Longe da luz e do calor. Aberto, prefira a geladeira ou consuma em poucos meses." },
    { id: "nori", name: "Alga nori", img: IMG.inori, alt: "Folhas de alga nori empilhadas", origin: "Japão", flavor: "Marinho, tostado, leve umami",
      taste: "Sabor de mar suave, tostado e levemente doce, com textura crocante quando está seca.", uses: "Sushi enrolado e temaki, onigiri, finalização de ramen, furikake.", pairs: "Arroz, gergelim, shoyu, peixe, ovo.", storage: "Embalagem bem fechada, com sachê de sílica. Se amolecer, passe rapidamente sobre a chama para recuperar." },
    { id: "arroz-sushi", name: "Arroz para sushi", img: IMG.irice, alt: "Arroz para sushi em hangiri de madeira", origin: "Japão", flavor: "Neutro, levemente doce, macio",
      taste: "Grão curto (japonica) rico em amilopectina: macio, brilhante e levemente pegajoso depois de cozido.", uses: "Sushi, onigiri, donburi e acompanhamento de refeições japonesas.", pairs: "Vinagre de arroz, açúcar, sal, kombu, gergelim.", storage: "Cru, em pote fechado e local fresco. Temperado, não vai à geladeira (endurece): consuma no mesmo dia." },
    { id: "pasta-curry", name: "Pasta de curry", img: IMG.icurry, alt: "Pasta de curry vermelha no pilão de pedra", origin: "Tailândia", flavor: "Aromática, picante, herbácea",
      taste: "Pimentas, capim-limão, galanga, alho e chalota socados juntos. A vermelha usa pimenta seca; a verde, pimenta fresca.", uses: "Curries com leite de coco, marinadas de carne e bolinhos de peixe (tod man pla).", pairs: "Leite de coco, molho de peixe, açúcar de palma, manjericão tailandês, folha de kaffir.", storage: "Na geladeira depois de aberta, coberta por uma película de óleo; congela bem em porções." },
    { id: "capim-limao", name: "Capim-limão", img: IMG.ilemon, alt: "Talos de capim-limão e rodelas", origin: "Sudeste Asiático", flavor: "Cítrico, floral, sem acidez",
      taste: "Perfume cítrico e floral, sem a acidez do limão. Use a parte inferior, mais macia, e amasse para liberar o aroma.", uses: "Tom yum, pastas de curry, marinadas, caldos e chás.", pairs: "Galanga, folha de kaffir, pimenta, leite de coco, frango.", storage: "Na geladeira, embrulhado em papel úmido, por até duas semanas. Congela muito bem." },
    { id: "molho-peixe", name: "Molho de peixe", img: IMG.ifish, alt: "Molho de peixe cor de âmbar com anchovas", origin: "Sudeste Asiático", flavor: "Salgado, umami intenso",
      taste: "Anchovas fermentadas com sal. O aroma é forte no frasco, mas se transforma em umami profundo ao cozinhar.", uses: "Curries, nước chấm, salteados e saladas como o som tam.", pairs: "Limão, açúcar de palma, pimenta, alho, coentro.", storage: "Em temperatura ambiente, longe da luz. Com o tempo escurece, sem estragar." },
    { id: "gochujang", name: "Gochujang", img: IMG.igochu, alt: "Gochujang em pote de cerâmica", origin: "Coreia", flavor: "Picante, doce, fermentado",
      taste: "Pasta de pimenta, arroz glutinoso e soja fermentados: picante, adocicada e com umami persistente.", uses: "Bibimbap, tteokbokki, marinadas de porco e frango, ensopados.", pairs: "Óleo de gergelim, alho, mel, vinagre de arroz, pepino.", storage: "Na geladeira depois de aberto; dura vários meses." }
  ];

  var TECHS = [
    { id: "corte", label: "Corte de legumes", title: "Corte de legumes", intro: "Na cozinha japonesa, o corte define textura, tempo de cozimento e beleza do prato. Uma faca afiada e a mão de apoio em forma de garra são o começo de tudo.",
      steps: [{ b: "Mão em garra.", t: "Dobre as pontas dos dedos da mão de apoio para dentro; a lâmina desliza encostada nos nós dos dedos." },
        { b: "Sengiri, fios finos.", t: "Corte lâminas de 1 a 2 mm, empilhe e fatie de novo em fios — o corte do daikon do sashimi e da cenoura do bibimbap." },
        { b: "Naname-giri, diagonal.", t: "Fatie cebolinha, pepino ou cenoura a 45°: mais superfície de contato e cozimento mais rápido no wok." },
        { b: "Rangiri, corte rolante.", t: "Corte na diagonal, gire o legume um quarto de volta e corte de novo. Pedaços irregulares e parecidos, ideais para ensopados." },
        { b: "Puxe, não serre.", t: "Facas japonesas cortam num gesto longo de puxar ou empurrar. Serrar esmaga as fibras." }],
      tip: "Estabilize o legume antes de tudo: corte uma face plana e apoie-a na tábua. Legume que rola é dedo em risco." },
    { id: "arroz", label: "Preparo do arroz", title: "Preparo do arroz japonês", intro: "O arroz de grão curto é a base do sushi e do onigiri. A textura certa — solto, brilhante e levemente pegajoso — depende mais do método do que da panela.",
      steps: [{ b: "Lave.", t: "Em água fria, mexendo com a mão em círculos; troque a água 4 a 5 vezes, até ficar quase transparente." },
        { b: "Descanse.", t: "Deixe escorrer por 30 minutos para o grão hidratar por igual." },
        { b: "Meça.", t: "Cerca de 1,1 a 1,2 parte de água para 1 de arroz, em volume. Ferva, tampe e cozinhe por 12 minutos em fogo baixo." },
        { b: "Abafe.", t: "Desligue e deixe 10 minutos tampado, sem abrir." },
        { b: "Tempere, para sushi.", t: "Regue com vinagre de arroz, açúcar e sal dissolvidos e misture em cortes com a espátula, abanando para dar brilho." }],
      tip: "Nunca guarde arroz de sushi na geladeira: o amido endurece. Cubra com um pano úmido e use no mesmo dia." },
    { id: "sushi", label: "Montagem de sushi", title: "Montagem de sushi (hosomaki)", intro: "O maki fino é o melhor treino: pouco recheio, pouca margem para erro e um resultado que mostra na hora se o arroz e a pressão estão certos.",
      steps: [{ b: "Prepare a esteira.", t: "Cubra a makisu com filme e apoie meia folha de nori, lado brilhante para baixo." },
        { b: "Molhe as mãos.", t: "Use tezu — água com um pouco de vinagre — para o arroz não grudar." },
        { b: "Espalhe o arroz.", t: "Cerca de 80 g em camada fina e uniforme, deixando 1 cm livre na borda de cima." },
        { b: "Recheie com moderação.", t: "Uma única faixa de pepino ou atum no centro. Pouco recheio enrola melhor." },
        { b: "Enrole.", t: "Levante a esteira, encontre a borda de arroz com a borda livre e pressione com firmeza, sem esmagar." },
        { b: "Corte.", t: "Com faca úmida, corte ao meio e depois cada metade em três, num movimento só." }],
      tip: "Se o rolo abriu, foi recheio demais ou arroz até a borda. No sushi, menos é quase sempre mais." },
    { id: "equilibrio", label: "Equilíbrio de sabores", title: "Equilíbrio entre sabores", intro: "As cozinhas asiáticas trabalham por camadas: cada sabor tem ingredientes que o reforçam e outros que o seguram. Provar e ajustar no final faz parte da receita.",
      steps: [{ b: "Comece pelo salgado e pelo umami:", t: "shoyu, molho de peixe, missô ou dashi formam a base." },
        { b: "Ajuste o ácido:", t: "limão, tamarindo ou vinagre de arroz levantam pratos pesados e gordurosos." },
        { b: "Arredonde com o doce:", t: "açúcar de palma, mirin ou mel suavizam acidez e picância." },
        { b: "Dose a picância por último:", t: "é fácil adicionar pimenta, impossível retirar." },
        { b: "Prove com arroz:", t: "o prato será comido com arroz, então tempere um pouco mais intenso do que pareceria certo sozinho." }],
      tip: "Exagerou no sal? Não acrescente água: equilibre com ácido e doce, como faria um cozinheiro tailandês.", tastes: true }
  ];

  var TASTES = [
    { n: "Salgado", s: "Shoyu, molho de peixe, missô", color: "#9A6A3C" },
    { n: "Doce", s: "Açúcar de palma, mirin, mel", color: "#C5A46D" },
    { n: "Ácido", s: "Limão, tamarindo, vinagre de arroz", color: "#B9C46A" },
    { n: "Picante", s: "Pimentas, gochujang, Sichuan", color: "#D93825" },
    { n: "Umami", s: "Dashi, kombu, cogumelos secos", color: "#73836A" }
  ];

  var FACTS = [
    { k: "いただきます", lang: "ja", country: "Japão", q: "Por que se diz “itadakimasu” antes de comer?", a: "A expressão vem da forma humilde do verbo “receber”. É um agradecimento a todos que tornaram a refeição possível — de quem plantou e pescou a quem cozinhou — e às vidas que viraram alimento." },
    { k: "鑊氣", lang: "zh", country: "China", q: "O que é o “wok hei”?", a: "Literalmente, “o sopro do wok”: o aroma levemente defumado que surge quando os ingredientes tocam o metal em temperatura altíssima. Na cozinha cantonesa, é sinal de domínio do fogo." },
    { k: "반찬", lang: "ko", country: "Coreia do Sul", q: "Por que a mesa coreana tem tantos potinhos?", a: "São os banchan: kimchi, legumes temperados e conservas servidos para todos dividirem. Nos restaurantes, costumam ser reabastecidos sem custo adicional." },
    { k: "ข้าว", lang: "th", country: "Tailândia", q: "“Já comeu arroz?” é uma saudação?", a: "Sim. “Gin khao reu yang?” — já comeu arroz? — é um cumprimento cotidiano na Tailândia. Mostra cuidado com o outro e o lugar central do arroz (khao) na vida do país." },
    { k: "Tết", lang: "vi", country: "Vietnã", q: "O que não pode faltar no Ano-Novo vietnamita?", a: "O bánh chưng: bolo quadrado de arroz glutinoso, feijão-mungo e porco, embrulhado em folhas e cozido por horas. Pela tradição, a forma quadrada representa a Terra." }
  ];

  var TIMELINE = [
    { y: "2014", t: "O primeiro caderno", d: "Uma viagem a Osaka e uma tigela de ramen num balcão de oito lugares. As anotações começam ali." },
    { y: "2017", t: "O mapa cresce", d: "Seul, Bangkok e Hanói entram no caderno — junto com a certeza de que “comida asiática” é sempre plural." },
    { y: "2020", t: "A cozinha vira laboratório", d: "Sem viagens, cada receita anotada é testada, ajustada e reescrita com ingredientes encontrados no Brasil." },
    { y: "2023", t: "Nasce a AKARI", d: "O caderno ganha nome, identidade e uma equipe de cozinheiros, tradutores e ilustradores." },
    { y: "2026", t: "A plataforma", d: "Receitas, culturas, técnicas e uma experiência interativa para cada pessoa descobrir o próprio paladar." }
  ];

  var QUESTIONS = [
    { key: "int", kicker: "Intensidade", q: "Como você prefere os sabores?", opts: [
      { v: 1, label: "Suaves e delicados", sub: "O ingrediente fala mais alto que o tempero" },
      { v: 2, label: "Equilibrados", sub: "Nem tímidos, nem exagerados" },
      { v: 3, label: "Intensos e marcantes", sub: "Caldo encorpado, molho que gruda" }] },
    { key: "spice", kicker: "Pimenta", q: "Qual é a sua relação com a pimenta?", opts: [
      { v: 0, label: "Prefiro sem", sub: "Nada de ardência, por favor" },
      { v: 1, label: "Um toque leve", sub: "Para acordar o prato" },
      { v: 2, label: "Picância média", sub: "Gosto de sentir, sem sofrer" },
      { v: 3, label: "Quanto mais, melhor", sub: "Pode vir com tudo" }] },
    { key: "temp", kicker: "Temperatura", q: "Quente ou frio?", opts: [
      { v: "quente", label: "Quente e reconfortante", sub: "Caldos, ensopados, wok" },
      { v: "frio", label: "Frio e fresco", sub: "Peixe cru, ervas, sobremesas geladas" },
      { v: "any", label: "Tanto faz", sub: "Depende do dia" }] },
    { key: "protein", kicker: "No centro do prato", q: "O que não pode faltar?", opts: [
      { v: "carne", label: "Carnes", sub: "Porco, boi, frango" },
      { v: "peixe", label: "Peixes e frutos do mar", sub: "Salmão, atum, camarão" },
      { v: "vegetal", label: "Vegetais e tofu", sub: "Sem carne no prato" },
      { v: "any", label: "Sem preferência", sub: "Surpreenda-me" }] },
    { key: "time", kicker: "Tempo", q: "Quanto tempo você tem para cozinhar?", opts: [
      { v: 30, label: "Até 30 minutos", sub: "Jantar de dia de semana" },
      { v: 60, label: "Até 1 hora", sub: "Dá para caprichar" },
      { v: 999, label: "A tarde inteira", sub: "Projeto de fim de semana" }] }
  ];

  return { IMG: IMG, CATS: CATS, GCATS: GCATS, COUNTRIES: COUNTRIES, RECIPES: RECIPES, INGREDIENTS: INGREDIENTS, TECHS: TECHS, TASTES: TASTES, FACTS: FACTS, TIMELINE: TIMELINE, QUESTIONS: QUESTIONS };
})();
