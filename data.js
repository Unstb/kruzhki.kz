/* Demonstration content only. Organizations, teachers and availability are examples. */
globalThis.KRUZH_DATA = {
  categories: [
    { id: 'sport', icon: 'activity', name: { kk: 'Спорт', ru: 'Спорт', en: 'Sport' } },
    { id: 'art', icon: 'palette', name: { kk: 'Шығармашылық', ru: 'Творчество', en: 'Arts & crafts' } },
    { id: 'dance', icon: 'music-2', name: { kk: 'Би', ru: 'Танцы', en: 'Dance' } },
    { id: 'music', icon: 'music', name: { kk: 'Музыка', ru: 'Музыка', en: 'Music' } },
    { id: 'tech', icon: 'bot', name: { kk: 'Технологиялар', ru: 'Технологии', en: 'Technology' } },
    { id: 'mind', icon: 'brain', name: { kk: 'Зияткерлік даму', ru: 'Развитие интеллекта', en: 'Learning & discovery' } }
  ],
  activities: [
    {
      id: 'swimming', category: 'sport',
      title: { kk: 'Судағы алғашқы жетістіктер', ru: 'Плавание с удовольствием', en: 'Discover the joy of swimming' },
      org: { kk: 'Aqua Lab · үлгі орталық', ru: 'Aqua Lab · демоцентр', en: 'Aqua Lab · demo centre' },
      description: {
        kk: 'Бала суға сенімді үйреніп, тыныс алу мен жүзудің негізгі тәсілдерін меңгереді. Шағын топта әр қатысушыға көңіл бөлінеді. Алғашқы сабаққа жүзу киімі, бас киім, сүлгі және ауыстыратын аяқ киім қажет.',
        ru: 'Помогаем уверенно чувствовать себя в воде, освоить дыхание и основные стили плавания. Небольшая группа позволяет уделить внимание каждому. На первое занятие понадобятся купальный костюм, шапочка, полотенце и сменная обувь.',
        en: 'Build confidence in the water while learning breathing techniques and swimming fundamentals. Small groups give every swimmer individual attention. Bring swimwear, a swim cap, a towel and pool shoes to your first lesson.'
      },
      teacher: { kk: 'Аян · үлгі жаттықтырушы', ru: 'Аян · демотренер', en: 'Ayan · demo instructor' },
      district: 'bostandyk',
      address: { kk: 'Тимирязев көшесі маңы, Алматы', ru: 'Район улицы Тимирязева, Алматы', en: 'Near Timiryazev Street, Almaty' },
      image: 'assets/swim.jpg',
      level: { kk: 'Бастапқы деңгей', ru: 'Для начинающих', en: 'Beginner friendly' }, promoted: false,
      groups: [
        { id: 'swim-7', ageMin: 7, ageMax: 10, days: [1, 3, 5], time: '17:00', duration: 60, price: 24000, unit: 'month', capacity: 10, available: 4, nextDate: '2026-11-23' },
        { id: 'swim-10', ageMin: 10, ageMax: 14, days: [2, 4], time: '18:00', duration: 60, price: 20000, unit: 'month', capacity: 10, available: 1, nextDate: '2026-11-24' },
        { id: 'swim-adult', ageMin: 18, ageMax: 65, days: [6], time: '10:00', duration: 60, price: 4500, unit: 'lesson', capacity: 8, available: 0, nextDate: '2026-11-28' }
      ]
    },
    {
      id: 'football', category: 'sport',
      title: { kk: 'Футбол: командамен бірге', ru: 'Футбол: играем в команде', en: 'Football: better together' },
      org: { kk: 'Steppe Football · үлгі мектеп', ru: 'Steppe Football · демошкола', en: 'Steppe Football · demo school' },
      description: {
        kk: 'Доппен жұмыс, үйлесімді қимыл және командалық ойын. Жаттығулар жас ерекшелігіне сай ойын түрінде өтеді. Қатысушылар бір-бірін қолдап, алаңда шешім қабылдауды үйренеді. Спорттық киім мен залға арналған аяқ киім қажет.',
        ru: 'Работа с мячом, координация и командная игра. Тренировки проходят в игровой форме с учётом возраста. Учимся поддерживать друг друга и принимать решения на поле. Нужны спортивная форма и обувь для зала.',
        en: 'Ball skills, coordination and teamwork through age-appropriate games. Players learn to support one another and make confident decisions on the pitch. Bring sportswear and indoor football shoes.'
      },
      teacher: { kk: 'Данияр · үлгі жаттықтырушы', ru: 'Данияр · демотренер', en: 'Daniyar · demo coach' },
      district: 'auezov',
      address: { kk: 'Сайран маңы, Алматы', ru: 'Район Сайрана, Алматы', en: 'Sairan area, Almaty' },
      image: 'assets/football.jpg',
      level: { kk: 'Тәжірибе қажет емес', ru: 'Без опыта', en: 'No experience needed' }, promoted: false,
      groups: [
        { id: 'football-6', ageMin: 6, ageMax: 9, days: [2, 4], time: '16:00', duration: 60, price: 18000, unit: 'month', capacity: 14, available: 5, nextDate: '2026-11-24' },
        { id: 'football-10', ageMin: 10, ageMax: 13, days: [1, 3, 5], time: '18:00', duration: 75, price: 22000, unit: 'month', capacity: 14, available: 3, nextDate: '2026-11-23' }
      ]
    },
    {
      id: 'painting', category: 'art',
      title: { kk: 'Қиялға толы сурет әлемі', ru: 'Рисование без границ', en: 'A world of colour' },
      org: { kk: 'Qalam Studio · үлгі студия', ru: 'Qalam Studio · демостудия', en: 'Qalam Studio · demo studio' },
      description: {
        kk: 'Акварель, гуашь және пастельмен тәжірибе жасап, өз ойымызды сурет арқылы жеткіземіз. Дайын үлгіні көшіруге емес, баланың қиялына мән береміз. Негізгі материалдар бағаға кіреді. Бояу тисе уайымдамайтын киіммен келіңіз.',
        ru: 'Экспериментируем с акварелью, гуашью и пастелью и выражаем идеи через рисунок. Вместо копирования готовых образцов развиваем собственное воображение. Основные материалы включены. Выбирайте одежду, которую не страшно испачкать.',
        en: 'Explore watercolours, gouache and pastels while bringing your own ideas to life. We encourage imagination rather than copying a template. Core materials are included. Wear clothes that can handle a little paint.'
      },
      teacher: { kk: 'Әсел · үлгі оқытушы', ru: 'Асель · демопедагог', en: 'Asel · demo teacher' },
      district: 'medeu',
      address: { kk: 'Достық даңғылы маңы, Алматы', ru: 'Район проспекта Достык, Алматы', en: 'Near Dostyk Avenue, Almaty' },
      image: 'assets/art.jpg',
      level: { kk: 'Барлық деңгейге', ru: 'Для любого уровня', en: 'All levels welcome' }, promoted: true,
      groups: [
        { id: 'paint-6', ageMin: 6, ageMax: 9, days: [2, 4], time: '16:30', duration: 75, price: 16000, unit: 'month', capacity: 8, available: 3, nextDate: '2026-11-24' },
        { id: 'paint-10', ageMin: 10, ageMax: 15, days: [6], time: '11:00', duration: 90, price: 4000, unit: 'lesson', capacity: 8, available: 2, nextDate: '2026-11-28' }
      ]
    },
    {
      id: 'dance', category: 'dance',
      title: { kk: 'Заманауи би ырғағы', ru: 'Современные танцы', en: 'Move with modern dance' },
      org: { kk: 'Qadam Dance · үлгі студия', ru: 'Qadam Dance · демостудия', en: 'Qadam Dance · demo studio' },
      description: {
        kk: 'Музыканы сезініп, еркін қимылдап, қарапайым би комбинацияларын үйренеміз. Сабаққа қыздыру жаттығулары, ырғақпен жұмыс және шағын қойылым кіреді. Жеңіл спорттық киім мен таза кроссовка қажет.',
        ru: 'Учимся чувствовать музыку, свободно двигаться и собирать простые танцевальные комбинации. В программе разминка, работа с ритмом и небольшие постановки. Понадобятся удобная спортивная одежда и чистые кроссовки.',
        en: 'Feel the music, move with confidence and learn simple dance combinations. Each class includes a warm-up, rhythm exercises and short routines. Bring comfortable sportswear and clean trainers.'
      },
      teacher: { kk: 'Мадина · үлгі хореограф', ru: 'Мадина · демохореограф', en: 'Madina · demo dance teacher' },
      district: 'almaly',
      address: { kk: 'Жібек жолы көшесі маңы, Алматы', ru: 'Район улицы Жибек Жолы, Алматы', en: 'Near Zhibek Zholy Street, Almaty' },
      image: 'assets/dance.jpg',
      level: { kk: 'Бастапқы деңгей', ru: 'Для начинающих', en: 'Beginner friendly' }, promoted: false,
      groups: [
        { id: 'dance-7', ageMin: 7, ageMax: 11, days: [1, 3], time: '17:00', duration: 60, price: 18000, unit: 'month', capacity: 12, available: 6, nextDate: '2026-11-23' },
        { id: 'dance-12', ageMin: 12, ageMax: 17, days: [2, 4], time: '19:00', duration: 75, price: 20000, unit: 'month', capacity: 12, available: 0, nextDate: '2026-11-24' }
      ]
    },
    {
      id: 'robotics', category: 'tech',
      title: { kk: 'Роботты өзің құрастыр', ru: 'Собери своего робота', en: 'Build your first robot' },
      org: { kk: 'Jas Lab · үлгі зертхана', ru: 'Jas Lab · демолаборатория', en: 'Jas Lab · demo learning lab' },
      description: {
        kk: 'Бөлшектерді біріктіріп, датчиктерді зерттеп, роботқа алғашқы бағдарламаны жазамыз. Балалар жұппен жұмыс істеп, әр шешімін сынап көреді. Құрастыру жинақтары мен компьютерлер сабақта беріледі.',
        ru: 'Соединяем детали, изучаем датчики и пишем первые программы для робота. Дети работают в парах и проверяют свои идеи на практике. Конструкторы и компьютеры предоставляются на занятии.',
        en: 'Connect components, explore sensors and write a robot’s first programme. Children work in pairs, test ideas and learn by making. Robotics kits and computers are provided during class.'
      },
      teacher: { kk: 'Ернар · үлгі тәлімгер', ru: 'Ернар · демонаставник', en: 'Yernar · demo mentor' },
      district: 'bostandyk',
      address: { kk: 'Әл-Фараби даңғылы маңы, Алматы', ru: 'Район проспекта Аль-Фараби, Алматы', en: 'Near Al-Farabi Avenue, Almaty' },
      image: 'assets/robotics.jpg',
      level: { kk: 'Тәжірибе қажет емес', ru: 'Без опыта', en: 'No experience needed' }, promoted: false,
      groups: [
        { id: 'robot-8', ageMin: 8, ageMax: 11, days: [3, 5], time: '16:00', duration: 90, price: 26000, unit: 'month', capacity: 8, available: 2, nextDate: '2026-11-25' },
        { id: 'robot-12', ageMin: 12, ageMax: 16, days: [6], time: '14:00', duration: 120, price: 6500, unit: 'lesson', capacity: 8, available: 4, nextDate: '2026-11-28' }
      ]
    },
    {
      id: 'chess', category: 'mind',
      title: { kk: 'Шахмат: ойлан, байқап көр', ru: 'Шахматы: думай на ход вперёд', en: 'Chess: think one move ahead' },
      org: { kk: 'Oilan Club · үлгі клуб', ru: 'Oilan Club · демоклуб', en: 'Oilan Club · demo club' },
      description: {
        kk: 'Фигуралардың жүрісінен бастап қарапайым стратегияға дейін. Ойын арқылы зейінді, шыдамдылықты және өз шешімін түсіндіруді дамытамыз. Әр сабақта тапсырмалар мен достық партиялар бар. Тақта мен фигуралар беріледі.',
        ru: 'От первых ходов до простых стратегий. Через игру развиваем внимание, терпение и умение объяснять свои решения. На каждом занятии есть задачи и дружеские партии. Доски и фигуры предоставляются.',
        en: 'From the first moves to simple strategies, discover chess through puzzles and friendly games. Develop focus, patience and the confidence to explain your thinking. Boards and pieces are provided.'
      },
      teacher: { kk: 'Арман · үлгі оқытушы', ru: 'Арман · демопедагог', en: 'Arman · demo teacher' },
      district: 'almaly',
      address: { kk: 'Абылай хан даңғылы маңы, Алматы', ru: 'Район проспекта Абылай хана, Алматы', en: 'Near Abylai Khan Avenue, Almaty' },
      image: 'assets/chess.jpg',
      level: { kk: 'Бастапқы деңгей', ru: 'Для начинающих', en: 'Beginner friendly' }, promoted: false,
      groups: [
        { id: 'chess-6', ageMin: 6, ageMax: 9, days: [1, 3], time: '15:30', duration: 60, price: 14000, unit: 'month', capacity: 10, available: 5, nextDate: '2026-11-23' },
        { id: 'chess-10', ageMin: 10, ageMax: 14, days: [2, 4], time: '17:30', duration: 60, price: 14000, unit: 'month', capacity: 10, available: 1, nextDate: '2026-11-24' }
      ]
    },
    {
      id: 'piano', category: 'music',
      title: { kk: 'Фортепианодағы алғашқы әуен', ru: 'Первые мелодии на фортепиано', en: 'Your first piano melodies' },
      org: { kk: 'Saz Room · үлгі студия', ru: 'Saz Room · демостудия', en: 'Saz Room · demo studio' },
      description: {
        kk: 'Пернелермен танысып, ырғақты сезінуді және қарапайым әуендерді ойнауды үйренеміз. Шағын топта музыканы тыңдап, бірге орындаймыз. Алғашқы сабақтар үшін үйде аспап болуы міндетті емес.',
        ru: 'Знакомимся с клавишами, чувствуем ритм и учимся играть простые мелодии. В маленькой группе слушаем музыку и играем вместе. Для первых занятий инструмент дома не обязателен.',
        en: 'Explore the keyboard, discover rhythm and play simple melodies. Small groups make space for listening and making music together. You do not need an instrument at home for your first lessons.'
      },
      teacher: { kk: 'Айша · үлгі оқытушы', ru: 'Айша · демопедагог', en: 'Aisha · demo teacher' },
      district: 'medeu',
      address: { kk: 'Қабанбай батыр көшесі маңы, Алматы', ru: 'Район улицы Кабанбай батыра, Алматы', en: 'Near Kabanbai Batyr Street, Almaty' },
      image: 'assets/music.jpg',
      level: { kk: 'Бастапқы деңгей', ru: 'Для начинающих', en: 'Beginner friendly' }, promoted: false,
      groups: [
        { id: 'piano-6', ageMin: 6, ageMax: 9, days: [2, 4], time: '15:00', duration: 45, price: 22000, unit: 'month', capacity: 4, available: 2, nextDate: '2026-11-24' },
        { id: 'piano-10', ageMin: 10, ageMax: 15, days: [6], time: '12:00', duration: 60, price: 5000, unit: 'lesson', capacity: 4, available: 1, nextDate: '2026-11-28' }
      ]
    },
    {
      id: 'taekwondo', category: 'sport',
      title: { kk: 'Таэквондо: сенімді қадам', ru: 'Тхэквондо: уверенный старт', en: 'Taekwondo: a confident start' },
      org: { kk: 'Batyr Do · үлгі мектеп', ru: 'Batyr Do · демошкола', en: 'Batyr Do · demo school' },
      description: {
        kk: 'Тепе-теңдік, икемділік және негізгі техникалар. Жасқа сай жаттығулар арқылы тәртіп пен өзара сыйластықты қалыптастырамыз. Бастапқы топта жанасусыз жаттығулар басым. Бірінші сабаққа ыңғайлы спорттық киім жеткілікті.',
        ru: 'Баланс, гибкость и базовая техника. Через подходящие возрасту упражнения развиваем дисциплину и уважение друг к другу. В начальной группе преобладают бесконтактные упражнения. На первое занятие достаточно удобной спортивной формы.',
        en: 'Develop balance, flexibility and basic technique through age-appropriate exercises. Classes encourage discipline and mutual respect. Beginner sessions focus on non-contact practice. Comfortable sportswear is enough for your first class.'
      },
      teacher: { kk: 'Нұрлан · үлгі жаттықтырушы', ru: 'Нурлан · демотренер', en: 'Nurlan · demo coach' },
      district: 'auezov',
      address: { kk: 'Мамыр шағын ауданы, Алматы', ru: 'Микрорайон Мамыр, Алматы', en: 'Mamyr neighbourhood, Almaty' },
      image: 'assets/martial.jpg',
      level: { kk: 'Бастапқы деңгей', ru: 'Для начинающих', en: 'Beginner friendly' }, promoted: false,
      groups: [
        { id: 'taek-7', ageMin: 7, ageMax: 10, days: [1, 3, 5], time: '17:30', duration: 60, price: 18000, unit: 'month', capacity: 12, available: 4, nextDate: '2026-11-23' },
        { id: 'taek-11', ageMin: 11, ageMax: 16, days: [2, 4], time: '18:30', duration: 75, price: 18000, unit: 'month', capacity: 12, available: 3, nextDate: '2026-11-24' }
      ]
    },
    {
      id: 'pottery', category: 'art',
      title: { kk: 'Балшықтан туған өнер', ru: 'Керамика своими руками', en: 'Make something with clay' },
      org: { kk: 'Balshyq Atelier · үлгі шеберхана', ru: 'Balshyq Atelier · демомастерская', en: 'Balshyq Atelier · demo workshop' },
      description: {
        kk: 'Балшықты илеп, шағын ыдыс пен сәндік бұйым жасаймыз. Қолмен мүсіндеу арқылы ұсақ моторика мен кеңістіктік ойлауды дамытамыз. Балшық, құралдар және бір бұйымды күйдіру бағаға кіреді. Дайын жұмысты кейін алып кетуге болады.',
        ru: 'Лепим небольшие чаши и декоративные предметы из глины. Работа руками развивает мелкую моторику и пространственное мышление. Глина, инструменты и обжиг одного изделия включены. Готовую работу можно будет забрать позже.',
        en: 'Shape small bowls and decorative objects from clay. Hands-on making develops fine motor skills and spatial thinking. Clay, tools and firing for one piece are included. Finished work can be collected after firing.'
      },
      teacher: { kk: 'Дана · үлгі шебер', ru: 'Дана · демомастер', en: 'Dana · demo instructor' },
      district: 'bostandyk',
      address: { kk: 'Атакент маңы, Алматы', ru: 'Район Атакента, Алматы', en: 'Atakent area, Almaty' },
      image: 'assets/pottery.jpg',
      level: { kk: 'Барлық деңгейге', ru: 'Для любого уровня', en: 'All levels welcome' }, promoted: false,
      groups: [
        { id: 'clay-8', ageMin: 8, ageMax: 14, days: [6], time: '10:30', duration: 90, price: 5500, unit: 'lesson', capacity: 6, available: 1, nextDate: '2026-11-28' },
        { id: 'clay-adult', ageMin: 18, ageMax: 65, days: [7], time: '13:00', duration: 120, price: 7500, unit: 'lesson', capacity: 6, available: 3, nextDate: '2026-11-29' }
      ]
    },
    {
      id: 'tennis', category: 'sport',
      title: { kk: 'Тенниспен танысу', ru: 'Знакомство с теннисом', en: 'Get into tennis' },
      org: { kk: 'Rally Club · үлгі клуб', ru: 'Rally Club · демоклуб', en: 'Rally Club · demo club' },
      description: {
        kk: 'Ракетканы ұстаудан бастап алғашқы доп алмасуға дейін. Қозғалыс, реакция және дәлдікті ойын арқылы дамытамыз. Бастапқы сабақтарға ракетка беріледі. Спорттық киім мен табаны таза аяқ киім қажет.',
        ru: 'От правильного хвата ракетки до первых розыгрышей. Развиваем движение, реакцию и точность через игровые упражнения. На начальных занятиях ракетка предоставляется. Нужны спортивная форма и обувь с чистой подошвой.',
        en: 'Start with a comfortable grip and work towards your first rallies. Playful drills build movement, reactions and accuracy. Rackets are provided for introductory classes. Bring sportswear and clean-soled trainers.'
      },
      teacher: { kk: 'Тимур · үлгі жаттықтырушы', ru: 'Тимур · демотренер', en: 'Timur · demo coach' },
      district: 'medeu',
      address: { kk: 'Көктөбе маңы, Алматы', ru: 'Район Кок-Тобе, Алматы', en: 'Kok-Tobe area, Almaty' },
      image: 'assets/tennis.jpg',
      level: { kk: 'Бастапқы деңгей', ru: 'Для начинающих', en: 'Beginner friendly' }, promoted: false,
      groups: [
        { id: 'tennis-7', ageMin: 7, ageMax: 10, days: [2, 4], time: '16:00', duration: 60, price: 28000, unit: 'month', capacity: 6, available: 2, nextDate: '2026-11-24' },
        { id: 'tennis-11', ageMin: 11, ageMax: 16, days: [6], time: '09:00', duration: 90, price: 6500, unit: 'lesson', capacity: 6, available: 0, nextDate: '2026-11-28' }
      ]
    },
    {
      id: 'english', category: 'mind',
      title: { kk: 'Ағылшын тілі ойын арқылы', ru: 'Английский через игру', en: 'English through play' },
      org: { kk: 'Soz Club · үлгі клуб', ru: 'Soz Club · демоклуб', en: 'Soz Club · demo club' },
      description: {
        kk: 'Күнделікті тақырыптарда сөйлеп, жаңа сөздерді ойын, әңгіме және шағын жобалар арқылы үйренеміз. Қателесуден қорықпай сөйлеуге қолдау көрсетеміз. Оқу материалдары сабақта беріледі.',
        ru: 'Говорим на повседневные темы и учим новые слова через игры, истории и небольшие проекты. Помогаем начать общаться без страха ошибок. Учебные материалы выдаются на занятии.',
        en: 'Explore everyday topics and new vocabulary through games, stories and small projects. A supportive setting helps children speak without worrying about mistakes. Learning materials are provided during class.'
      },
      teacher: { kk: 'Ләйлә · үлгі оқытушы', ru: 'Лейла · демопедагог', en: 'Leila · demo teacher' },
      district: 'almaly',
      address: { kk: 'Байтұрсынұлы көшесі маңы, Алматы', ru: 'Район улицы Байтурсынова, Алматы', en: 'Near Baitursynov Street, Almaty' },
      image: 'assets/language.jpg',
      level: { kk: 'Бастапқы деңгей', ru: 'Начальный уровень', en: 'Elementary level' }, promoted: false,
      groups: [
        { id: 'english-7', ageMin: 7, ageMax: 9, days: [1, 3], time: '16:00', duration: 60, price: 18000, unit: 'month', capacity: 8, available: 4, nextDate: '2026-11-23' },
        { id: 'english-10', ageMin: 10, ageMax: 13, days: [2, 4], time: '17:00', duration: 75, price: 20000, unit: 'month', capacity: 8, available: 3, nextDate: '2026-11-24' }
      ]
    },
    {
      id: 'theatre', category: 'art',
      title: { kk: 'Сахнадағы алғашқы қадам', ru: 'Первые шаги на сцене', en: 'Find your voice on stage' },
      org: { kk: 'Sahna Studio · үлгі студия', ru: 'Sahna Studio · демостудия', en: 'Sahna Studio · demo studio' },
      description: {
        kk: 'Сөйлеу, қозғалыс және импровизация жаттығулары арқылы өз ойымызды еркін жеткіземіз. Балалар қысқа көріністер құрып, серіктесін тыңдауды үйренеді. Соңғы сабақта топ ішінде шағын көрсетілім өткіземіз.',
        ru: 'Через упражнения на речь, движение и импровизацию учимся свободно выражать мысли. Придумываем короткие сцены и учимся слушать партнёра. На заключительном занятии устраиваем небольшой показ внутри группы.',
        en: 'Build confidence through voice, movement and improvisation. Create short scenes and learn to listen to a scene partner. The course ends with a small sharing session within the group.'
      },
      teacher: { kk: 'Самал · үлгі оқытушы', ru: 'Самал · демопедагог', en: 'Samal · demo teacher' },
      district: 'auezov',
      address: { kk: 'Ақсай шағын ауданы, Алматы', ru: 'Микрорайон Аксай, Алматы', en: 'Aksai neighbourhood, Almaty' },
      image: 'assets/theatre.jpg',
      level: { kk: 'Тәжірибе қажет емес', ru: 'Без опыта', en: 'No experience needed' }, promoted: false,
      groups: [
        { id: 'theatre-8', ageMin: 8, ageMax: 11, days: [3, 5], time: '17:00', duration: 90, price: 19000, unit: 'month', capacity: 10, available: 4, nextDate: '2026-11-25' },
        { id: 'theatre-12', ageMin: 12, ageMax: 17, days: [6], time: '15:00', duration: 120, price: 5000, unit: 'lesson', capacity: 10, available: 6, nextDate: '2026-11-28' }
      ]
    }
  ]
};
