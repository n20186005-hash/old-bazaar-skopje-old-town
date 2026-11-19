export type ExploreSlug = 'walking-route' | 'historic-landmarks' | 'shopping-and-food';
type Article = {
  title: string; subtitle: string; intro: string; duration: string;
  sections: { heading: string; paragraphs: string[] }[];
  stops: { name: string; description: string; query: string }[];
  tips: string[]; faq: { q: string; a: string }[];
};

export const exploreSlugs: ExploreSlug[] = ['walking-route', 'historic-landmarks', 'shopping-and-food'];
export const mapLink = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query + ', Skopje, North Macedonia')}`;

export const explore: Record<'en' | 'zh', Record<ExploreSlug, Article>> = {
  en: {
    'walking-route': {
      title: 'Old Bazaar Skopje Walking Route', subtitle: 'A self-guided walk from Stone Bridge to the historic market lanes', duration: 'Allow 2–3 hours',
      intro: 'The Old Bazaar is best explored on foot. This route starts at the Vardar River, passes historic trading streets and Ottoman buildings, and ends near the northern market. It is a suggested itinerary, not a marked trail; individual courtyards and monuments may have restricted access.',
      sections: [
        { heading: 'Start from Macedonia Square', paragraphs: ['Cross the Stone Bridge toward the northern bank of the Vardar. This is a useful orientation point between the modern city centre and the old commercial quarter.', 'At the bazaar entrance, slow down and follow the narrow streets rather than treating the district as one enclosed attraction. The streets remain part of an active neighbourhood.'] },
        { heading: 'Explore inns, workshops and side streets', paragraphs: ['Look for the courtyards of Kapan An and Suli An and the surrounding shopfronts. Historic hans served merchants and travellers, while the bazaar still supports retail, cafés and small trades.', 'Continue toward the mosque and hammam area, choosing short side-street detours if the lanes are busy. A shop may be open while a museum or monument is closed.'] },
        { heading: 'Finish at Bit Pazar or return toward the river', paragraphs: ['Bit Pazar is a distinct market experience at the northern side of the old quarter. If you prefer architecture, loop back by the bazaar’s historic lanes instead.', 'Kale Fortress is nearby on higher ground but is an optional extension; do not assume public access to every part of the grounds.'] },
      ],
      stops: [
        { name: 'Stone Bridge', description: 'Orient yourself where the old and newer city centres meet.', query: 'Stone Bridge Skopje' },
        { name: 'Daut Pasha Hammam', description: 'Observe the domed historic bath building near the bazaar approach.', query: 'Daut Pasha Hammam' },
        { name: 'Kapan An', description: 'Look for the historic inn courtyard and adjoining lanes.', query: 'Kapan An Skopje' },
        { name: 'Suli An', description: 'A former merchants’ inn associated with bazaar history.', query: 'Suli An Skopje' },
        { name: 'Mustafa Pasha Mosque', description: 'The mosque stands above part of the old quarter.', query: 'Mustafa Pasha Mosque Skopje' },
        { name: 'Bit Pazar', description: 'Continue to the northern market or turn back.', query: 'Bit Pazar Skopje' },
      ],
      tips: ['Wear shoes suitable for uneven paving and sloped lanes.', 'Carry a map for the side streets; the order of stops can be adjusted.', 'Allow extra time for cafés, photography and respectful visits to active religious sites.'],
      faq: [
        { q: 'How long does the Old Bazaar walk take?', a: 'Budget about two to three hours for this suggested route, longer if you visit museums or stop for food.' },
        { q: 'Can I start at Stone Bridge?', a: 'Yes. Stone Bridge is a straightforward starting point from Macedonia Square.' },
        { q: 'Is the route step-free?', a: 'No. The area has cobblestones, slopes and uneven surfaces; check the individual venue before planning accessible entry.' },
      ],
    },
    'historic-landmarks': {
      title: 'Historic Landmarks in Skopje Old Bazaar', subtitle: 'Mosques, hammams, caravanserais and the trading quarter', duration: 'Allow 2–4 hours',
      intro: 'Skopje’s Old Bazaar (Stara Čaršija) preserves the pattern of a historic trading district with religious buildings, former inns and public baths. These places are different kinds of heritage: some are active places of worship, others have cultural uses, and not every interior is freely accessible.',
      sections: [
        { heading: 'How the bazaar developed', paragraphs: ['The district’s commercial history predates the Ottoman period, while many surviving landmark buildings reflect Ottoman-era urban life. Inns, covered market spaces and workshops supported traders who arrived from surrounding regions.', 'The preserved street network is itself part of the experience. Rather than looking only for grand façades, notice the transitions between open market lanes, courtyards and small shops.'] },
        { heading: 'Mosques and religious heritage', paragraphs: ['Mustafa Pasha Mosque is associated with the late fifteenth century and is one of the best-known landmarks overlooking the bazaar. As an active religious site, modest dress and consideration for worshippers are appropriate.', 'The bazaar also reflects the city’s varied communities and religious history. Avoid assuming all worship spaces operate like ticketed museums.'] },
        { heading: 'Hammams and merchants’ inns', paragraphs: ['Daut Pasha Hammam, a former Ottoman bath, is a prominent domed structure close to the bazaar entrance. Čifte Hammam is another important bath building in the district.', 'Kapan An, Suli An and Kuršumli An illustrate the role of inns in the trading quarter. Their present uses and public entry conditions may differ; verify at the venue.'] },
      ],
      stops: [
        { name: 'Daut Pasha Hammam', description: 'Fifteenth-century bath architecture and cultural reuse.', query: 'Daut Pasha Hammam Skopje' },
        { name: 'Čifte Hammam', description: 'Distinctive paired-bath heritage in the bazaar.', query: 'Cifte Hammam Skopje' },
        { name: 'Kapan An', description: 'Historic caravanserai courtyard.', query: 'Kapan An Skopje' },
        { name: 'Suli An', description: 'Former trading inn in the historic district.', query: 'Suli An Skopje' },
        { name: 'Kuršumli An', description: 'Another important Ottoman-period inn complex.', query: 'Kursumli An Skopje' },
        { name: 'Mustafa Pasha Mosque', description: 'Landmark mosque on the upper edge of the bazaar.', query: 'Mustafa Pasha Mosque Skopje' },
      ],
      tips: ['Check exhibition and monument entry separately from street access.', 'Be respectful when photographing places of worship.', 'Look for building signs and site-specific information rather than relying on one set of district-wide opening hours.'],
      faq: [
        { q: 'Is the Old Bazaar one museum?', a: 'No. It is a lived-in district with independent shops, streets, monuments and cultural institutions.' },
        { q: 'Are the hammams still public baths?', a: 'Some historic hammam buildings have been adapted for cultural uses. Check the current programme of each venue.' },
        { q: 'Can I enter every historic inn?', a: 'Not necessarily. Public access depends on the building and its current use.' },
      ],
    },
    'shopping-and-food': {
      title: 'Shopping and Food in Skopje Old Bazaar', subtitle: 'Craft lanes, cafés, local flavours and practical visitor etiquette', duration: 'Allow 1–3 hours',
      intro: 'The Old Bazaar is both a heritage district and a working commercial neighbourhood. Goldsmiths, craftspeople, cafés, sweet shops and everyday traders give its lanes a different rhythm from a conventional shopping mall. What you find varies by street, shop and day.',
      sections: [
        { heading: 'What to look for in the shops', paragraphs: ['Browse jewellery, metalwork, textiles and souvenir shops while paying attention to the distinction between locally made work and mass-produced goods. Ask the seller about materials, craftsmanship and pricing before deciding.', 'Small shops may display fixed prices or quote prices verbally. Confirm the final amount and accepted payment method before a purchase, especially for custom work.'] },
        { heading: 'Food and café stops', paragraphs: ['Cafés and bakeries are part of the bazaar’s street life. Visitors may encounter Turkish-style coffee, tea, pastries and Balkan grilled dishes; menus and dietary options vary by establishment.', 'If you want a quiet break, look for a courtyard or a side street rather than assuming the main route will always be uncrowded. Check menus and opening times on site.'] },
        { heading: 'Bit Pazar and the historic bazaar are related but different', paragraphs: ['Bit Pazar, at the northern end, is a broader everyday market environment. The central Old Bazaar lanes focus more visibly on historic buildings, shops and cafés.', 'For a short first visit, combine a walk through the heritage core with a brief market stop. For photography, ask permission before taking close-up portraits or pictures inside small shops.'] },
      ],
      stops: [
        { name: 'Old Bazaar central lanes', description: 'Browse craft and jewellery shopfronts.', query: 'Old Bazaar Skopje' },
        { name: 'Bezisten', description: 'Locate the historic covered-market area.', query: 'Skopje Bezisten' },
        { name: 'Kapan An', description: 'Pause around an old merchants’ inn courtyard.', query: 'Kapan An Skopje' },
        { name: 'Bit Pazar', description: 'Explore the market area north of the heritage core.', query: 'Bit Pazar Skopje' },
      ],
      tips: ['Ask permission for photographs inside businesses.', 'Confirm prices and payment methods before ordering or buying.', 'Check dietary ingredients directly with the seller; street foods may vary.'],
      faq: [
        { q: 'Is shopping possible every day?', a: 'The streets can be visited, but individual shops and markets set their own hours; holidays and religious observances may affect trading.' },
        { q: 'Where is Bit Pazar?', a: 'It is toward the northern side of the Old Bazaar area, within walking distance of the central heritage lanes.' },
        { q: 'Should I bring cash?', a: 'Some small traders may prefer cash. Check accepted methods and keep modest local currency available if needed.' },
      ],
    },
  },
  zh: {
    'walking-route': {
      title: '斯科普里旧巴扎步行路线', subtitle: '从石桥出发，串联古驿站、清真寺与传统市场', duration: '建议 2–3 小时',
      intro: '旧巴扎适合步行慢游。本路线从瓦尔达尔河畔出发，穿过传统商街、奥斯曼时期建筑与北侧市场。这是自助游建议，并非现场标示的固定步道；各建筑内部可能有独立的参观限制。',
      sections: [
        { heading: '从马其顿广场与石桥开始', paragraphs: ['从马其顿广场穿过石桥，前往瓦尔达尔河北岸。石桥是辨认新城中心与旧商贸街区方位的便利地标。', '进入旧巴扎后不必只沿一条主路前进。这里是仍在营业和生活的街区，适合留时间观察巷道与街边店铺。'] },
        { heading: '串游古驿站与手工艺街道', paragraphs: ['沿街寻找 Kapan An、Suli An 古驿站庭院，以及传统商铺。驿站曾为往来商人提供服务，如今周边仍有咖啡馆与各类小店。', '可继续经过古浴场和清真寺区域，视人流选择支巷。注意商铺营业不代表博物馆和古迹内部必然开放。'] },
        { heading: '在比特巴扎结束或折返', paragraphs: ['北侧的 Bit Pazar 是较偏日常生活的市场，与历史街区核心的建筑氛围不同。若更关注古建筑，可以沿另一条巷道返回河边。', '卡莱要塞位于附近高地，可作为额外路线，但不应预设全部区域都可进入。'] },
      ],
      stops: [
        { name: '石桥 Stone Bridge', description: '连接新旧城区的起点与方向地标。', query: 'Stone Bridge Skopje' },
        { name: '达乌特帕夏浴场', description: '观察旧巴扎入口一带的穹顶古浴场。', query: 'Daut Pasha Hammam' },
        { name: 'Kapan An 古驿站', description: '留意庭院建筑与相邻巷弄。', query: 'Kapan An Skopje' },
        { name: 'Suli An 古驿站', description: '认识昔日商贸住宿设施。', query: 'Suli An Skopje' },
        { name: '穆斯塔法帕夏清真寺', description: '位于旧城区较高位置的历史地标。', query: 'Mustafa Pasha Mosque Skopje' },
        { name: '比特巴扎 Bit Pazar', description: '参观北侧市场或从这里折返。', query: 'Bit Pazar Skopje' },
      ],
      tips: ['鹅卵石及坡道不平，建议穿舒适防滑的鞋。', '巷道众多，保留地图定位并灵活调整顺序。', '为咖啡休息、拍照及宗教场所礼仪预留时间。'],
      faq: [
        { q: '旧巴扎走一圈需要多久？', a: '这条建议路线可预留约 2–3 小时；如进入博物馆或停留用餐，需要更长时间。' },
        { q: '可以从石桥出发吗？', a: '可以。石桥连接马其顿广场与旧城区，是容易辨认的步行起点。' },
        { q: '路线适合无障碍通行吗？', a: '并非全程无台阶或平整路面。街区有坡道与鹅卵石，进入建筑前应分别核实无障碍条件。' },
      ],
    },
    'historic-landmarks': {
      title: '斯科普里旧巴扎历史建筑指南', subtitle: '清真寺、古浴场、商队驿站与传统街区', duration: '建议 2–4 小时',
      intro: '斯科普里旧巴扎（Stara Čaršija）保存了传统商贸街区格局，也汇集宗教建筑、商队驿站和公共浴场。有些场所仍有宗教用途，有些转为文化空间，因此不能将整个街区视为统一售票的博物馆。',
      sections: [
        { heading: '街区的商贸历史', paragraphs: ['这里的商贸活动早于奥斯曼统治时期，而现存不少重要建筑反映了奥斯曼时期的城市生活。驿站、集市和工坊共同服务来自不同地区的商人。', '街道形态也是遗产的一部分。除了大型纪念建筑，不妨观察店铺、巷道、庭院和公共空间之间的联系。'] },
        { heading: '清真寺与宗教文化', paragraphs: ['穆斯塔法帕夏清真寺建于十五世纪末，是俯瞰旧巴扎的重要地标之一。参访仍在使用的宗教空间时，应尊重礼拜活动和服装规范。', '旧巴扎也见证斯科普里不同社群的历史。宗教建筑的开放方式不能简单等同于普通旅游展馆。'] },
        { heading: '古浴场与商人驿站', paragraphs: ['达乌特帕夏浴场位于旧巴扎入口附近，以奥斯曼式穹顶建筑著称；Čifte Hammam 也是街区的重要浴场遗产。', 'Kapan An、Suli An 与 Kuršumli An 展现了昔日商旅停留和贸易活动的空间。各建筑现今用途不一，开放与入内规定应分别查询。'] },
      ],
      stops: [
        { name: '达乌特帕夏浴场', description: '十五世纪浴场建筑及后续文化用途。', query: 'Daut Pasha Hammam Skopje' },
        { name: 'Čifte Hammam 双浴场', description: '旧城区另一处重要浴场建筑。', query: 'Cifte Hammam Skopje' },
        { name: 'Kapan An 古驿站', description: '观察商队驿站的庭院布局。', query: 'Kapan An Skopje' },
        { name: 'Suli An 古驿站', description: '旧巴扎传统商旅建筑。', query: 'Suli An Skopje' },
        { name: 'Kuršumli An 古驿站', description: '奥斯曼时期的重要驿站建筑群。', query: 'Kursumli An Skopje' },
        { name: '穆斯塔法帕夏清真寺', description: '位于旧街区上缘的清真寺。', query: 'Mustafa Pasha Mosque Skopje' },
      ],
      tips: ['街道全天可走访，不代表每处博物馆或古迹内部全天开放。', '拍摄礼拜场所和访客时应尊重现场规定。', '建议留意每座建筑自己的说明牌与参观公告。'],
      faq: [
        { q: '旧巴扎是一座博物馆吗？', a: '不是。它是包含商店、街道、宗教场所和文化机构的实际生活街区。' },
        { q: '古浴场现在还能洗浴吗？', a: '部分古浴场已转为文化用途，应查询相关机构当期展览和开放安排。' },
        { q: '所有古驿站都能入内吗？', a: '不能保证。是否开放取决于建筑现有用途和现场管理。' },
      ],
    },
    'shopping-and-food': {
      title: '斯科普里旧巴扎购物与美食', subtitle: '传统手工艺、咖啡馆、市场与实用逛街建议', duration: '建议 1–3 小时',
      intro: '旧巴扎既是历史景区，也是持续经营的商业街区。金饰、手工艺、小吃、咖啡馆和日常市场让这里有别于现代购物中心。具体经营内容随店铺与日期而变。',
      sections: [
        { heading: '商店与手工艺如何挑选', paragraphs: ['可留意金饰、金属工艺、织物及纪念品店。选购时可询问材料、制作工艺和产地，区分当地手工制作与批量商品。', '部分店铺明码标价，部分需要现场询价。若有定制需求，先确认金额、交付时间及支付方式。'] },
        { heading: '咖啡、烘焙与当地风味', paragraphs: ['街区内可以找到咖啡馆、茶饮和烘焙店，也有巴尔干烤肉等餐饮选择。菜单、素食和其他饮食需求需要向具体店家核实。', '主街人流较多时，适合寻找庭院或侧巷休息。不应假设所有店家营业时间相同。'] },
        { heading: '比特巴扎与历史商街的区别', paragraphs: ['北侧的 Bit Pazar 更偏向日常市场；旧巴扎中心巷道则较集中历史建筑、旅游商店和咖啡馆。', '首次到访可先看历史街区，再短暂延伸到市场。近距离拍摄商家或店内陈列前，建议先征求同意。'] },
      ],
      stops: [
        { name: '旧巴扎中心商街', description: '留意传统手工艺与金饰店。', query: 'Old Bazaar Skopje' },
        { name: 'Bezisten 传统市场区', description: '寻找历史有顶集市一带。', query: 'Skopje Bezisten' },
        { name: 'Kapan An 古驿站', description: '在传统商旅庭院附近休息。', query: 'Kapan An Skopje' },
        { name: '比特巴扎 Bit Pazar', description: '体验旧街区北侧的日常市场。', query: 'Bit Pazar Skopje' },
      ],
      tips: ['进入小店拍照前先征求同意。', '购买或点餐前确认价格与支付方式。', '如有饮食禁忌，应向具体店家确认食材。'],
      faq: [
        { q: '旧巴扎每天都能购物吗？', a: '街道可以走访，但各店铺独立营业，节假日与宗教活动可能影响开放时间。' },
        { q: 'Bit Pazar 在哪里？', a: '位于旧巴扎区域北侧，可从传统街区中心步行前往。' },
        { q: '需要准备现金吗？', a: '部分小型商家可能偏好现金，可备少量当地货币，并在交易前确认支付方式。' },
      ],
    },
  },
};

export const officialSources = [
  { label: 'North Macedonia Tourism Agency · Old Bazaar', url: 'https://macedonia-timeless.com/eng/things_to_do/senses/touch/culture-history/old-bazaar/' },
  { label: 'City of Skopje · Official portal', url: 'https://skopje.gov.mk/en_us/' },
  { label: 'Tourism Agency · Ottoman monuments guide (PDF)', url: 'https://tourismmacedonia.gov.mk/wp-content/uploads/2018/09/Otomanskite-spomenici-ENG.pdf' },
];
