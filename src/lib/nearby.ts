import type { Metadata } from 'next';
import type { Locale } from '@/i18n/routing';
import catalog from '@/data/places.json';
import photos from '@/data/place-photos.json';
import guides from '@/data/visitor-guides.json';

export const siteOrigin = 'https://www.skopjeoldbazaar.com';

export function localizedPath(locale: Locale, path = '') {
  return `${locale === 'en' ? '/en' : ''}${path}` || '/';
}

export function canonicalMetadata(path: string, locale: Locale): Metadata {
  const zh = siteOrigin + localizedPath('zh', path);
  const en = siteOrigin + localizedPath('en', path);
  return { alternates: { canonical: locale === 'en' ? en : zh, languages: { zh, en, 'x-default': zh } } };
}

const locations = {
  public: ['Public landmark', '公共地标', 'Visit from the public approach.', '从公共道路走访。', 'Free to view from public space.', '从公共空间观看免费。'],
  museum: ['Visitor venue', '参观场馆', 'Check current hours and last entry with the venue.', '向场馆核对当期开放和最后入场时间。', 'Check current admissions and exceptions directly with the venue.', '向场馆核对当前票价与适用优惠。'],
  memorial: ['Memorial', '纪念馆', 'Check the published weekday and weekend times separately.', '工作日与周末的开放时间请分别核对。', 'Free admission. Groups should book in advance.', '免费入场；团体请提前预约。'],
  heritage: ['Historic site', '历史遗迹', 'Plan an exterior stop and check on-site signs for interior access.', '可先安排外观游览，进内部前看现场开放标识。', 'Viewing from the street is free. Ask on site about admission to any open interior or event.', '临街观看免费；若开放内部或举办活动，请向现场询问门票。'],
  worship: ['Religious site', '宗教场所', 'Check visitor access at the gate and give worship priority.', '在门口确认访客开放安排，礼拜活动优先。', 'The street view is free. Check locally for any interior admission arrangements.', '临街观看免费；内部参观安排请现场确认。'],
  market: ['Working market', '日常市场', 'Watch for individual traders’ hours.', '营业时间各摊不同，请现场查看。', 'Pay individual traders for purchases; confirm prices first.', '按摊付款，购物前先确认价格。'],
  park: ['Outdoor space', '户外景点', 'Visit in daylight and check any local closures before setting out.', '建议白天游览，出发前核对临时关闭情况。', 'Check separately for transport, tours, and other optional services.', '交通、导览和其他可选项目请另查收费。'],
  performance: ['Performance venue', '演出场馆', 'Use the venue schedule for performance and box-office times.', '按场馆演出与售票公告核对时间。', 'Book the performance through the venue; prices depend on the production.', '由场馆售票，票价随当期演出而变。'],
} as const;

const protectedBazaar = 'https://cair.gov.mk/wp-content/uploads/2018/06/Cultural-Heritage-Management-Plan.pdf';
const conservationEN = 'The Cultural Heritage Protection Office and Conservation Centre–Skopje have roles in protected-monument conservation. Ask at this entrance who handles day-to-day access.';
const conservationZH = '文化遗产保护办公室与斯科普里保护中心负责受保护古迹的相关保护事务。具体入口的日常开放由哪一方负责，请在该地点核实。';

const sources = {
  city: ['https://skopje.gov.mk/en_us', 'City of Skopje', '斯科普里市政府', 'The City of Skopje lists this as a city landmark. Check locally which office handles works or temporary access changes at this point.', '斯科普里市将此处列为城市地标。负责此处施工或临时通行调整的具体部门，请以现场告示为准。'],
  cityCulture: ['https://skopje.gov.mk/en_us/skopje/kulturni-ustanovi/', 'City of Skopje cultural institutions', '斯科普里市文化机构', '', ''],
  daut: ['https://nationalgallery.mk/daut-pasha-hamam/?lang=en', 'National Gallery · Daut Pasha Hamam', '国家美术馆 · 达乌特帕夏浴场', 'The National Gallery operates the former bath as an art venue and oversees exhibition access.', '北马其顿国家美术馆运营这座由古浴场改建的展馆，并负责展览开放。'],
  cifte: ['https://nationalgallery.mk/cifte-amammk/', 'National Gallery · Čifte Hammam', '国家美术馆 · 奇夫泰双浴场', 'The National Gallery uses the former bath as an exhibition venue and manages exhibition entry.', '北马其顿国家美术馆在这座原浴场举办展览，并管理展览入场。'],
  ottoman: ['https://tourismmacedonia.gov.mk/wp-content/uploads/2018/09/Otomanskite-spomenici-ENG.pdf', 'Tourism Agency · Ottoman monuments', '国家旅游机构 · 奥斯曼古迹', conservationEN, conservationZH],
  military: ['https://arhiva.mod.gov.mk/military-museum/', 'Ministry of Defence · Area institutions', '北马其顿国防部 · 周边机构', 'The ministry identifies the museum and tomb in the Holy Saviour church complex. Confirm which on-site staff handle museum entry and who handles worship access.', '北马其顿国防部将博物馆与墓址列在圣救世主教堂建筑群内。纪念地的入场与礼拜空间的开放，请分别向现场人员确认。'],
  museumMacedonia: ['https://museum.org.mk/page/kontakt', 'Museum of Macedonia · Contact', '马其顿博物馆 · 联系方式', 'The Museum of the Republic of North Macedonia runs its own galleries. Ask staff separately about access to the courtyard and neighboring inn.', '北马其顿共和国博物馆负责自身展厅运营；庭院及邻近古驿站的开放请向馆方另行询问。'],
  archaeology: ['https://amm.org.mk/en/plan-your-visit/', 'Archaeological Museum', '北马其顿考古博物馆', 'The Archaeological Museum of the Republic of North Macedonia operates the galleries and collections.', '北马其顿共和国考古博物馆负责展厅运营和馆藏管理。'],
  struggle: ['https://mmb.org.mk/en/museum-of-the-macedonian-struggle-for-independence/', 'Museum of the Macedonian Struggle for Independence', '马其顿独立斗争博物馆', 'The national Museum of the Macedonian Struggle for Independence manages admissions and its historical exhibition at this building.', '马其顿独立斗争国家博物馆在此负责入场及历史展陈。'],
  holocaust: ['https://mmb.org.mk/en/institutions-collaborators-of-nu-museum-of-the-macedonian-struggle-for-independence-skopje/', 'Museum of the Macedonian Struggle · Partner institutions', '马其顿独立斗争博物馆 · 合作机构', 'For visits, contact the Holocaust Memorial Center. Check directly who handles group bookings and special programmes.', '参观请联系犹太人大屠杀纪念中心。团体预约和特别活动分别由谁负责，请向中心询问。'],
  teresa: ['https://motherteresa.mk/memorial-house/', 'Mother Teresa Memorial House', '特蕾莎修女纪念馆', 'The Memorial House manages gallery admission and group visits. Catholic clergy hold services in the chapel.', '特蕾莎修女纪念馆负责展厅入场及团体参观，小教堂礼拜由天主教神职人员主持。'],
  moca: ['https://skopje.gov.mk/media/7631/strategija-za-kultura-na-grad-skopje-2021-2030.pdf', 'City of Skopje · Cultural strategy and institutions', '斯科普里市 · 文化战略与机构', 'The Museum of Contemporary Art operates the gallery on Samuilova. Its exhibition access is separate from Kale Fortress.', '斯科普里当代艺术博物馆运营萨穆伊洛瓦街展馆，展览入场与卡莱要塞分别安排。'],
  theatre: ['https://www.mnt.mnt.mk/en/kontakt', 'Macedonian National Theatre · Box office', '马其顿国家剧院 · 售票处', 'The Macedonian National Theatre operates the performance venue and its box office.', '马其顿国家剧院负责这座演出场馆与售票处的运营。'],
  opera: ['https://operabalet.mk/en/contact-us/', 'National Opera and Ballet · Ticket office', '国家歌剧与芭蕾舞院 · 售票处', 'The National Opera and Ballet operates the venue and manages production schedules and tickets.', '国家歌剧与芭蕾舞院负责场馆运营，管理节目安排与售票。'],
  philharmonic: ['https://www.filharmonija.mk/contact/?lang=en', 'Macedonian Philharmonic · Ticket office', '马其顿爱乐 · 售票处', 'The Philharmonic of the Republic of North Macedonia operates the hall and its ticket office.', '北马其顿共和国爱乐乐团运营音乐厅并管理其售票处。'],
  park: ['https://parkovi.com.mk/en/activity/', 'Parks and Greenery · Maintenance responsibilities', '园林公共企业 · 养护职责', 'The City of Skopje’s public enterprise Parks and Greenery maintains public park landscaping. Nearby attractions organize their own admissions.', '斯科普里市园林公共企业负责公共公园绿化养护，邻近场馆各自安排入场。'],
  zoo: ['https://skopje.gov.mk/en_us/skopje/kulturni-ustanovi/', 'City of Skopje · Skopje Zoo', '斯科普里市 · 斯科普里动物园', 'Skopje Zoo is a public institution responsible for the zoo grounds and visitor entry.', '斯科普里动物园是负责园区运营和游客入场的公共机构。'],
  vodno: ['https://parkovi.com.mk/en/vodno-2/', 'Parks and Greenery · Vodno', '园林公共企业 · 沃德诺', 'The public enterprise Parks and Greenery manages the park-forest. Check transport and any structures at the summit with their respective operators.', '园林公共企业负责森林公园养护；交通及峰顶个别设施请分别向其运营方核实。'],
  matka: ['https://parkovi.com.mk/en/activity/', 'Parks and Greenery · Matka responsibilities', '园林公共企业 · 马特卡养护职责', 'The Parks and Greenery public enterprise maintains greenery within the protected area. Boat trips and other services are arranged separately with their operators.', '园林公共企业负责保护区绿化养护。船游等服务由各运营方另行安排。'],
} as const;

const operators: Partial<Record<string, readonly [string, string]>> = {
  'suli-an': ['The Museum of the City of Skopje is responsible for the museum collection at Suli An. The Faculty of Fine Arts uses teaching areas separately.', '斯科普里市博物馆负责苏利驿站的博物馆馆藏，艺术学院另行使用教学空间。'],
  'bit-pazar': ['Confirm current market supervision with the office or contact posted at the market. Individual traders manage their own stalls and sales.', '当前市场管理机构请以入口公示的办公室或联系方式为准；各摊主负责自己的摊位和交易。'],
  'museum-city-of-skopje': ['The Museum of the City of Skopje operates the museum galleries in the former station and administers its collections.', '斯科普里市博物馆运营旧车站内的展厅并负责其馆藏。'],
  'art-bridge': ['The bridge is a public pedestrian link. Confirm current bridge works or event closures through the information posted by the city.', '艺术桥属于公共人行通道。桥上施工或活动临时管制请查市方现场告示。'],
  'skopje-fortress': ['Conservation and visitor access involve separate responsibilities. Confirm the gate operator and current public access on the notice at the main entrance.', '古迹保护与游客通行分属不同职责。请在主入口查验当期开放范围和负责城门的机构。'],
  'kursumli-an': ['The inn stands in the Museum of Macedonia grounds. Confirm courtyard access at the museum and event entry with the event organizer.', '古驿站位于马其顿博物馆院区内。院区通行请向博物馆确认，活动入场请查主办方安排。'],
};

const visitHours: Partial<Record<string, readonly [string, string]>> = {
  'cifte-hammam': ['The National Gallery lists 10:00–18:00. Confirm exhibition dates and opening days.', '国家美术馆公布时段为 10:00–18:00。请另查展期与开放日。'],
  'archaeological-museum': ['Tuesday–Sunday, 10:00–18:00. Confirm last entry before setting out.', '周二至周日 10:00–18:00，出发前确认最后入场时间。'],
  'mother-teresa-memorial-house': ['Monday–Friday 09:00–20:00, weekends 09:00–14:00. Last entry 15 minutes before closing.', '周一至周五 09:00–20:00，周末 09:00–14:00。关闭前 15 分钟停止入场。'],
  'museum-macedonian-struggle': ['The museum lists 17:15 as last gallery entry. Check opening days and holiday exceptions.', '博物馆公布展厅最后入场时间为 17:15，出发前查开放日与节假日调整。'],
};

type PlacePhoto = { src: string; source: string | null; en: string; zh: string };
const placePhotos: Partial<Record<string, PlacePhoto>> = photos;

type Place = typeof catalog[keyof typeof catalog];
type GuideCopy = { history: string; observe: string; approach: string; photoQuestion: string; observeQuestion: string; stay: string; advice: string; secondPhoto: string };
type LocalizedSource = { href: string } & Record<Locale, string>;
const visitorGuides: Record<string, Record<Locale, GuideCopy> & { sources: LocalizedSource[] }> = guides;
export const nearbyPlaces: Record<string, Place> = catalog;
export const nearbySlugs = Object.keys(catalog);

export function placeDetails(slug: string, locale: Locale) {
  const place = nearbyPlaces[slug];
  const guide = visitorGuides[slug];
  const source = sources[place.source as keyof typeof sources];
  const kind = locations[place.kind as keyof typeof locations];
  const zh = locale === 'zh';
  const management = operators[slug]?.[zh ? 1 : 0] ?? source[zh ? 4 : 3];
  const query = `${place.localName}, Skopje, North Macedonia`;
  const references = new Map<string, string>([
    [source[0], source[zh ? 2 : 1]],
    ...(['ottoman', 'military'].includes(place.source)
      ? [[protectedBazaar, zh ? '查伊尔市镇 · 旧巴扎文化遗产管理计划' : 'Municipality of Čair · Old Bazaar heritage management plan'] as const]
      : []),
    ...guide.sources.map(({ href, ...labels }) => [href, labels[locale]] as const),
  ]);
  return {
    ...place[locale],
    guide: guide[locale],
    localName: place.localName,
    next: place.next,
    management,
    kind: kind[zh ? 1 : 0],
    hours: visitHours[slug]?.[zh ? 1 : 0] ?? kind[zh ? 3 : 2],
    picture: placePhotos[slug],
    fees: kind[zh ? 5 : 4],
    duration: zh ? `建议约 ${place.minutes} 分钟` : `Allow about ${place.minutes} minutes`,
    map: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
    mapEmbed: `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`,
    references: Array.from(references, ([href, label]) => ({ href, label })),
  };
}
