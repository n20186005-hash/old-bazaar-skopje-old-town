import type {Locale} from '@/i18n/routing';

type GuideCopy = {
  name: string; subtitle: string; summary: string; location: string;
  sections: {title: string; paragraphs: string[]}[];
  tips: string[]; faq: {q: string; a: string}[];
};
export type NearbyGuide = {
  slug: string; mapQuery: string;
  sources: {url: string; en: string; zh: string}[];
  copy: Record<Locale, GuideCopy>;
};
export const nearbyGuides: NearbyGuide[] = [
  {
    slug: 'daut-pasha-hammam', mapQuery: 'Daut Pasha Hammam Skopje',
    sources: [
      {url: 'https://nationalgallery.mk/daut-pasha-hamam/?lang=en', en: 'National Gallery: Daut Pasha Hamam', zh: '国家美术馆：达乌特帕夏浴场'},
      {url: 'https://nationalgallery.mk/?lang=en', en: 'National Gallery: current programme', zh: '国家美术馆：近期节目'},
    ],
    copy: {
      en: {
        name: 'Daut Pasha Hammam', subtitle: 'A former bathhouse and a National Gallery venue',
        summary: 'Add an art visit to your Old Bazaar walk. Daut Pasha Hammam brings the spaces of a historic bathhouse together with the story of Macedonian fine art, giving the street walk an indoor cultural counterpart.',
        location: 'Combine this central Skopje venue with the bazaar. Navigate to Daut Pasha Hammam itself; the National Gallery operates several buildings and its general office address is a different destination.',
        sections: [
          {title: 'Start with the building', paragraphs: ['The National Gallery dates Daut Pasha Hammam to the second half of the fifteenth century. Its account describes separate male and female departments and a building of about 900 square metres. These former functions help explain why its spaces feel different from a purpose-built modern gallery.', 'A useful way to look around is to notice how one room leads into another before turning to individual works. Compare the interior with the scale of the bazaar lanes outside, while respecting any rooms closed to visitors.']},
          {title: 'Follow its change of use', paragraphs: ['The building was restored and adapted as an art gallery in 1948. The institution describes the permanent display installed in 2001 as an overview of Macedonian fine art from the fourteenth to the twentieth century.', 'Use that account as an introduction to the collection, rather than a promise that every work or room will be available on your visit. Ask which permanent and temporary displays can currently be seen.']},
          {title: 'Choose an art-and-architecture pairing', paragraphs: ['Čifte Hammam is another National Gallery venue within the Old Bazaar. Comparing the two can turn a shopping-and-café walk into a visit focused on reused historic buildings and art.', 'Check the programme for each venue before choosing one or both. They are separate buildings; an event at one should not be treated as the exhibition schedule of the other. Keeping one indoor stop leaves more time for the street walk.']},
          {title: 'Make the indoor visit a separate plan', paragraphs: ['Confirm admission, exhibition access and holiday arrangements with the National Gallery before setting a fixed itinerary. The bazaar’s streets and a gallery interior have different visiting conditions.', 'If you need step-free access, want to take photographs or are carrying luggage, ask about the rules for this building and exhibition. Keep a flexible bazaar walk as an alternative if indoor access is unavailable.']},
        ],
        tips: ['Save the specific Daut Pasha Hammam map search.', 'Check which rooms and displays are open.', 'Treat admission and access as separate from the street walk.'],
        faq: [
          {q: 'Is the hammam still used for bathing?', a: 'The National Gallery identifies it as a restored historic bathhouse adapted for art-gallery use.'},
          {q: 'Is it the same building as Čifte Hammam?', a: 'No. They are separate former bathhouses in the National Gallery’s group of venues.'},
          {q: 'Can I assume the permanent display is fully accessible?', a: 'Check directly with the Gallery. Its collection history does not guarantee access to every room or work on a particular day.'},
        ],
      },
      zh: {
        name: '达乌特帕夏浴场', subtitle: '从历史浴场走进国家美术馆展馆',
        summary: '为旧巴扎散步加入一段艺术参观。达乌特帕夏浴场将历史浴场的空间与马其顿美术联系起来，适合与街巷、商铺和咖啡馆的室外行程组合。',
        location: '这处斯科普里市中心场馆可与旧巴扎组合。导航请搜索浴场本身；国家美术馆有多个展馆，总办公地址不是这座浴场的入口。',
        sections: [
          {title: '先观察建筑本身', paragraphs: ['国家美术馆将浴场年代定为十五世纪后半叶。馆方介绍原建筑分设男女两部分，面积约九百平方米。理解原来的用途，有助于看懂这里与现代专用展厅不同的空间组织。', '建议先留意各个房间如何相连，再观看具体作品，也可以与室外巴扎街巷的尺度比较。现场未开放的房间不应进入。']},
          {title: '理解浴场怎样成为美术馆', paragraphs: ['建筑于1948年修复并改作美术馆。机构官网将2001年布置的常设陈列介绍为十四至二十世纪马其顿美术发展的概览。', '这份说明适合帮助理解馆藏方向，但不代表每件作品或每个展厅在到访当天都开放。参观前可以询问当前可看的常设与临时陈列。']},
          {title: '怎样组合艺术与建筑', paragraphs: ['旧巴扎内的奇夫特浴场也是国家美术馆展馆。两者可以相互比较，让原本以商铺和咖啡馆为主的散步，延伸到历史建筑再利用与艺术主题。', '决定只去一处还是组合两处前，请分别查看各馆节目。它们是不同建筑，不能把一馆的展览安排当作另一馆的日程。只选择一个室内停靠点，也能为街区散步留出更多时间。']},
          {title: '将室内参观单独规划', paragraphs: ['固定行程前，向国家美术馆确认门票、展区开放和节假日安排。街区道路与室内场馆的参观条件应分别考虑。', '如果需要无台阶通行、想拍照或携带行李，请询问本展馆和当期展览的具体要求。若当天无法入内，仍可灵活继续旧巴扎街巷行程。']},
        ],
        tips: ['保存达乌特帕夏浴场的具体地图搜索。', '确认当天开放的展厅与陈列。', '室内门票和通行条件与街区散步分开确认。'],
        faq: [
          {q: '这里现在仍供人泡澡吗？', a: '国家美术馆将其介绍为经过修复、改作艺术展馆的历史浴场。'},
          {q: '这里与奇夫特浴场是同一座建筑吗？', a: '不是，两者是国家美术馆展馆体系中不同的历史浴场。'},
          {q: '常设展一定全部开放吗？', a: '请直接向美术馆确认。馆藏历史介绍并不保证某一天每个房间和每件作品都可参观。'},
        ],
      },
    },
  },
  {
    slug: 'cifte-hammam', mapQuery: 'Cifte Hammam Skopje',
    sources: [
      {url: 'https://nationalgallery.mk/cifte-hammam/?lang=en', en: 'National Gallery: Cifte Hammam', zh: '国家美术馆：奇夫特浴场'},
      {url: 'https://nationalgallery.mk/daut-pasha-hamam/?lang=en', en: 'National Gallery: its group of venues', zh: '国家美术馆：展馆体系介绍'},
      {url: 'https://nationalgallery.mk/?lang=en', en: 'National Gallery: current programme', zh: '国家美术馆：近期节目'},
    ],
    copy: {
      en: {
        name: 'Čifte Hammam', subtitle: 'Historic architecture within the bazaar’s street network',
        summary: 'Look beyond the shopfronts for a former Ottoman bathhouse that is now part of the National Gallery. Its position inside the bazaar makes it a cultural stop to weave into a street walk.',
        location: 'The National Gallery locates Čifte Hammam in the middle of the Old Skopje Bazaar, near the Bezisten, Suli An and Murat Pasha Mosque.',
        sections: [
          {title: 'Find it within the bazaar', paragraphs: ['The Gallery’s location description places the hammam among the bazaar’s other monuments, rather than outside the city. Use its relationship with the Bezisten, Suli An and Murat Pasha Mosque to understand the surrounding streets.', 'A practical approach is to find the specific venue entrance first and then explore the lanes around it. Search by Čifte or Cifte Hammam, not simply by “National Gallery”, which refers to more than one building.']},
          {title: 'Place the bathhouse in its historical setting', paragraphs: ['The institution dates the hammam to the middle of the fifteenth century and attributes its construction to Isa Bey. Its account places public baths alongside mosques, covered markets and inns in the development of Ottoman-era towns.', 'Use this context to compare the functions of the buildings around you. A bathhouse, a trading space and an inn were different parts of urban life; looking at them together gives the street walk a clearer theme.']},
          {title: 'Check this venue’s own exhibition programme', paragraphs: ['Čifte Hammam belongs to the National Gallery’s group of venues. An indoor visit therefore depends on the programme and access arrangements for this building, not just the ability to walk through the bazaar.', 'If choosing between Čifte and Daut Pasha Hammam, compare their current exhibitions. An art-focused day can include both, while a single indoor visit allows more time for nearby streets and shops.']},
          {title: 'Keep the rest of the walk flexible', paragraphs: ['Make the hammam a named stop rather than building a minute-by-minute schedule around unconfirmed access. Check admission, photography, holiday opening and any mobility requirements with the National Gallery.', 'If it is closed, continue the bazaar walk and use the official venue page to learn about the building. Do not infer indoor opening hours from general information about the surrounding district.']},
        ],
        tips: ['Use the venue name Čifte/Cifte Hammam.', 'Check the programme for this building specifically.', 'Keep nearby streets as a flexible continuation.'],
        faq: [
          {q: 'Is this an excursion outside Skopje?', a: 'No. The National Gallery places it in the middle of the Old Bazaar.'},
          {q: 'Does an event at Daut Pasha Hammam apply here too?', a: 'The venues are separate. Check which building is named in the Gallery’s programme.'},
          {q: 'Can I use the bazaar’s opening hours?', a: 'Confirm the gallery’s own access and admission conditions; street access does not establish when its interior is open.'},
        ],
      },
      zh: {
        name: '奇夫特浴场', subtitle: '旧巴扎街巷网络中的历史建筑',
        summary: '在商铺之外，寻找这座如今属于国家美术馆的奥斯曼时期浴场。它位于旧巴扎内部，适合自然地加入街区散步，而不必另作城外行程。',
        location: '国家美术馆将奇夫特浴场的位置描述为旧巴扎中部，靠近贝齐斯坦、苏利驿站与穆拉特帕夏清真寺。',
        sections: [
          {title: '在旧巴扎内部找到它', paragraphs: ['馆方的位置介绍将浴场放在旧巴扎的其他古迹之间，而非城外。理解它与贝齐斯坦、苏利驿站和穆拉特帕夏清真寺的关系，有助于认识周边街巷。', '可以先找到具体入口，再探索附近道路。导航使用“Čifte Hammam”或“Cifte Hammam”，不要只搜索涵盖多个场馆的“国家美术馆”。']},
          {title: '放回历史城市的背景中观察', paragraphs: ['国家美术馆将浴场年代定为十五世纪中期，并将建造者记为伊萨贝伊。官网把公共浴场与清真寺、有顶市场、驿站一起，放在奥斯曼时期城镇发展的背景中介绍。', '可以据此比较周边建筑的不同功能。浴场、交易空间与驿站分别对应城市生活的不同部分，放在一起看，散步会更有主题。']},
          {title: '查看本展馆自己的节目', paragraphs: ['奇夫特浴场属于国家美术馆的展馆体系。室内能否参观，取决于这座建筑的节目和开放安排，不能仅根据街区可以通行来判断。', '如果在奇夫特与达乌特帕夏浴场之间取舍，可以先比较当前展览。以艺术为重点时可组合两处，只选一处室内参观则能为附近街巷和商铺留出时间。']},
          {title: '让街区散步保持灵活', paragraphs: ['将浴场设为一个明确停靠点，不必围绕未经确认的开放条件排出精确到分钟的时间表。门票、拍摄、节假日和行动辅助需求应向国家美术馆确认。', '若当天未开放，可继续街区行程，再通过官方专页了解建筑。旧巴扎整体的开放信息不能代替展馆室内的开放安排。']},
        ],
        tips: ['导航使用奇夫特浴场的具体名称。', '确认节目注明的是本展馆。', '周边街巷可作为灵活的后续行程。'],
        faq: [
          {q: '这里需要安排城外出游吗？', a: '不需要。国家美术馆将其位置描述为旧巴扎中部。'},
          {q: '达乌特帕夏浴场的活动也适用于这里吗？', a: '两者是不同展馆，请看清馆方节目注明的具体建筑。'},
          {q: '可以直接使用旧巴扎的开放时间吗？', a: '室内展馆应单独确认开放和票务条件，街区能通行并不意味着展馆同时开放。'},
        ],
      },
    },
  },
  {
    slug: 'museum-of-macedonia', mapQuery: 'Museum of Macedonia Josif Mihajlovikj 7 Skopje',
    sources: [
      {url: 'https://museum.org.mk/page/etnologija&lang=en', en: 'Museum of Macedonia: Ethnology Department', zh: '马其顿博物馆：民族学部'},
      {url: 'https://museum.org.mk/?lang=en', en: 'Museum of Macedonia: current programme and contact', zh: '马其顿博物馆：近期节目与联系信息'},
    ],
    copy: {
      en: {
        name: 'Museum of Macedonia', subtitle: 'Crafts, household objects and the lives behind the bazaar',
        summary: 'Give a craft-focused bazaar walk a wider context. The museum’s Ethnology Department connects making, clothing and everyday objects with the cultural history of communities across Macedonia.',
        location: 'The museum lists St. Josif Mihajlovikj No. 7, Skopje. It is a different institution from the Archaeological Museum on the riverfront and the Museum of the City of Skopje.',
        sections: [
          {title: 'Choose a theme that connects to the street walk', paragraphs: ['The Ethnology Department’s collections cover clothing, textiles, jewellery, household utensils, tools and traditional architecture. Its description of the permanent exhibition connects objects with daily life and customs.', 'For a bazaar visit, try asking how an object was made, what material was used and how it served a household. These questions can make looking at shopfronts more rewarding than treating every item simply as a souvenir.']},
          {title: 'Follow copper-working and jewellery', paragraphs: ['The museum describes coppersmithing as a characteristic craft of the region’s bazaars and names Skopje among the important centres. Its account of the permanent exhibition includes copper vessels and an open-workshop setting.', 'The jewellery collection also includes goldsmithing and silversmithing tools and techniques, including filigree. Ask which craft sections are accessible and choose a few objects to study closely rather than assuming that the whole collection is displayed.']},
          {title: 'Look beyond production and trade', paragraphs: ['Clothing, woven textiles and domestic interiors bring the household into the story. The department’s account also includes the traditional culture of different communities.', 'You might pair textiles with jewellery, or compare tools with the finished household vessels. These are suggested themes for your own visit, not a fixed museum route or a guarantee that particular objects are currently on view.']},
          {title: 'Find the correct museum and confirm the visit', paragraphs: ['Use the Museum of Macedonia’s own name and address when navigating. Searching only for “Skopje museum” can lead to another institution, and the riverfront Archaeological Museum is not interchangeable with this one.', 'Confirm the accessible exhibitions, admission, holiday arrangements and any step-free requirements with the museum. Plan the indoor visit separately from the open-air bazaar walk so either part can be adjusted.']},
        ],
        tips: ['Search for Museum of Macedonia, Josif Mihajlovikj 7.', 'Ask which ethnology and craft sections are open.', 'Use the museum’s own current contact and programme pages.'],
        faq: [
          {q: 'Is this the Archaeological Museum by the river?', a: 'No. Use the Museum of Macedonia’s own address and venue name.'},
          {q: 'What is the connection with the bazaar?', a: 'The museum’s account of copper-working, jewellery and other crafts provides a useful theme for a bazaar walk; its collection covers wider cultural heritage.'},
          {q: 'Will every craft collection be accessible?', a: 'Ask the museum which exhibitions and sections are open on your planned visit.'},
        ],
      },
      zh: {
        name: '马其顿博物馆', subtitle: '从工艺、生活器物理解巴扎背后的日常',
        summary: '为关注手工艺的旧巴扎散步补充文化背景。博物馆民族学部将制作工艺、服饰与日常器物，同马其顿不同社群的文化历史联系起来。',
        location: '馆方列出的地址为斯科普里 Josif Mihajlovikj 街7号。它与河畔考古博物馆、斯科普里市博物馆是不同机构。',
        sections: [
          {title: '选择与街区散步相连的主题', paragraphs: ['民族学部的收藏涵盖服饰、织物、首饰、生活器皿、工具与传统建筑。官网对常设陈列的介绍，将器物与日常生活、习俗联系起来。', '参观时可以带着三个问题：物件怎样制作、用了什么材料、在家庭中有什么用途。再回到街巷看橱窗与商铺，观察会比单纯将每样东西视为纪念品更丰富。']},
          {title: '沿着铜工和首饰这条线索看', paragraphs: ['博物馆将铜匠工艺介绍为区域巴扎具有代表性的行业，并将斯科普里列为重要中心之一。官网对常设民族学陈列的介绍包含铜器和开放式工坊布景。', '首饰收藏也包括金银匠的工具与制作方法，例如细丝工艺。可以先询问哪些工艺展区开放，再选几件物品仔细观察，不要默认所有馆藏都会展出。']},
          {title: '从制作与交易延伸到生活', paragraphs: ['服饰、织物与居住空间让参观从生产活动延伸到家庭生活。民族学部的介绍也涵盖不同社群的传统文化。', '可以将织物与首饰作比较，或把工具与制作完成的生活器皿联系起来看。这些是自主参观的主题建议，不是馆方固定路线，也不保证某件特定物品当前正在展出。']},
          {title: '找对场馆，再确认参观条件', paragraphs: ['导航请使用马其顿博物馆本身的名称和地址。仅搜索“斯科普里博物馆”可能指向其他机构，河畔考古博物馆也不能与本馆互相替代。', '请向馆方确认开放的展区、门票、节假日以及无台阶通行需求。室内参观与旧巴扎室外散步分开规划，更便于按实际情况调整。']},
        ],
        tips: ['导航搜索本馆及 Josif Mihajlovikj 街7号。', '询问民族学与工艺展区的开放范围。', '查看本馆的近期节目和联系信息。'],
        faq: [
          {q: '这里就是河边的考古博物馆吗？', a: '不是。请使用马其顿博物馆本身的地址和场馆名称。'},
          {q: '它与旧巴扎有什么联系？', a: '馆方对铜工、首饰及其他工艺的介绍可作为巴扎散步的主题线索，但馆藏覆盖更广的文化遗产。'},
          {q: '所有工艺收藏都能看到吗？', a: '请向馆方确认计划到访当天开放的展览和展区。'},
        ],
      },
    },
  },
];
export const nearbyLabels = {
  en: {title: 'Explore around the Old Bazaar', subtitle: 'Three cultural stops for a richer city walk', intro: 'Choose art, historic architecture or the crafts of everyday life. These city cultural visits complement the bazaar, and each indoor venue has its own access arrangements.', read: 'Plan this visit', all: 'All nearby guides', home: 'Old Bazaar guide', location: 'Where it fits', tips: 'Before you go', faq: 'Questions for your visit', sources: 'Sources and current visitor information', note: 'Check the institution’s current programme, admission and access before fixing your itinerary.', maps: 'Search for this venue on Google Maps', related: 'Continue exploring', route: 'Choose a theme for your walk', routeText: 'Compare the two National Gallery hammams for art and architecture, or use the Museum of Macedonia’s ethnology collections as a craft-focused companion. Choose the venues that are open and leave time for the bazaar itself.'},
  zh: {title: '探索旧巴扎周边', subtitle: '三个文化停靠点，丰富城市散步', intro: '按兴趣选择艺术、历史建筑或日常手工艺，让旧巴扎散步更有主题。这些城市文化场馆各有室内开放与入场安排，需要分别确认。', read: '查看参观指南', all: '全部周边指南', home: '旧巴扎指南', location: '怎样加入行程', tips: '出发前的小清单', faq: '参观常见问题', sources: '资料来源与当前参观信息', note: '确定固定行程前，请向场馆查看近期节目、入场与通行条件。', maps: '在 Google 地图上搜索本场馆', related: '继续探索', route: '按兴趣选择散步主题', routeText: '喜欢艺术与建筑，可比较国家美术馆的两座浴场；关注手工艺，可选择马其顿博物馆的民族学主题。根据当天开放的场馆组合行程，也为旧巴扎街巷本身留出时间。'},
};
