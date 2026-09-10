import type { Dict } from './en'

/**
 * Simplified Chinese. The shape is pinned to `Dict` (derived from en.ts), so adding a
 * key in English and forgetting it here is a compile error.
 *
 * Brand marks, the temperature numeral and the phone number stay in Latin script.
 */
export const zh: Dict = {
  meta: {
    label: '中文',
    short: '中文',
    htmlLang: 'zh',
  },

  brand: {
    name: 'AirJoy',
    wordmark: 'Airjoy',
    category: '/Cooling',
    caps: 'AIRJOY',
  },

  cinematic: {
    taglineLead: '以更聪明的空气，',
    taglineStrong: '带来持久舒适。',
    taglineStrong2: '每一刻都清凉。',
    temperature: '24°',
    comfortZone: '你的舒适温度',
    designedFor: '为日常而设计',
    everyday: '每一天',
    comfort: '都舒适',
    cursorOpen: '感受清凉',
    cursorClose: '关闭',
    enterSite: '进入网站',
  },

  nav: {
    services: '服务项目',
    howItWorks: '服务流程',
    brands: '品牌与现货',
    faqs: '常见问题',
    phone: '07713 743188',
    intro: '首页',
    menu: '菜单',
    close: '关闭菜单',
  },

  hero: {
    eyebrow: '空调，原来可以很简单',
    titleA: '四季如春，',
    titleB: '全年',
    titleC: '舒适。',
    bodyA: '夏天更清凉，冬天更温暖。',
    bodyB: '为伦敦及周边地区的住宅与商业空间提供空调服务。',
    cta: '获取报价',
    link: '了解我们的服务',
    imageCaptionLeft: '好空气，好生活',
    imageCaptionRight: 'AirJoy / 家居舒适',
    imageAlt: '明亮宁静的客厅，墙上装有壁挂式空调',
  },

  trust: {
    a: '伦敦及周边地区',
    b: '办公室与商业空间',
    c: '从安装到售后',
  },

  services: {
    eyebrow: '为你的舒适而来',
    titleA: '合适的方案，',
    titleB: '应对每一种',
    titleC: '天气。',
    body: '从第一台空调的选购，到现有系统的日常养护，我们都能帮上忙。',
    items: [
      {
        num: '01',
        title: '空调安装',
        body: '无论是单个房间还是多个空间，我们从一开始就为你考虑机型选配与安装位置。',
        tags: ['住宅与商业空间', '单机与多联机系统'],
      },
      {
        num: '02',
        title: '保养与维护',
        body: '为现有系统提供必要的养护，从常规清洁到运行状况检查。',
        tags: ['定期保养', '系统清洁养护'],
      },
      {
        num: '03',
        title: '故障检测与维修',
        body: '异响、漏水，或是不制冷？请先描述你遇到的具体问题。',
        tags: ['故障诊断', '现有系统支持'],
      },
    ],
  },

  process: {
    titleA: '多一点规划，',
    titleB: '多很多舒适。',
    body: '从你的第一个问题，到一套真正适合你空间的系统，路径清晰明确。',
    steps: [
      {
        n: '1',
        title: '说说你的空间',
        body: '想一想有哪些房间、平时如何使用，以及你希望改善的地方。',
      },
      {
        n: '2',
        title: '找到合适的方案',
        body: '通过现场勘查，确定系统类型、安装位置与施工要求。',
      },
      {
        n: '3',
        title: '安心享受舒适',
        body: '确认施工方案，熟悉操作方式，并规划系统的长期养护。',
      },
    ],
  },

  brands: {
    eyebrow: '我们供应的品牌',
    titleA: '值得信赖的品牌，',
    titleB: '恰到好处的选择。',
    body: '我们安装并维护多个成熟厂商的系统。以下机型为我们常用系列的示例。',
    disclaimer:
      '以上为示例机型，仅供参考。库存会随时变动，适合你的机型需以现场勘查为准，欢迎来电确认。',
    colCapacity: '制冷量',
    colRoom: '适用',
    colStatus: '库存状态',
    status: {
      in: '现货',
      low: '库存偏少',
      order: '需订货',
    },
    seriesLabel: '系列',
    rooms: {
      small: '卧室或小型办公室',
      medium: '客厅或开放式办公区',
      large: '大空间或开放式格局',
    },
    blurbs: {
      mitsubishi: '分体式空调领域的老牌厂商，室内机运行安静，机型规格齐全。',
      bosch: '简洁实用的壁挂式系统，一台机器同时满足热泵制热与制冷需求。',
      midea: '产品线覆盖广泛，从单个房间到多联机方案，兼顾家用与商用需求。',
    },
  },

  faq: {
    title: '几个常见的问题。',
    items: [
      {
        q: '空调除了制冷，也能制热吗？',
        a: '许多现代空调采用热泵技术，可同时提供制热与制冷。具体功能取决于你所选择的机型。',
      },
      {
        q: '我需要多大功率的机型？',
        a: '房间面积只是其中一个因素。保温情况、窗户、日照、层高以及空间的使用方式同样重要。要确定合适的机型，最好的方式是安排一次现场勘查。',
      },
      {
        q: '可以在多个房间安装空调吗？',
        a: '可以。视房屋情况而定，可以选择多套独立系统，也可以采用一拖多方案。一拖多系统能将多台室内机连接至一台匹配的室外机。',
      },
      {
        q: '多久需要保养一次？',
        a: '请参照所用机型的厂商建议。使用频率与周边环境也会影响保养周期。请按说明定期清洁滤网，若发现运行效果下降，应及时安排检查。',
      },
    ],
  },

  enquiry: {
    eyebrow: '从你的空间开始',
    titleA: '让空气更好的',
    titleB: '下一步。',
    body: '欢迎致电 AirJoy，与我们讨论安装、保养或维修需求。你也可以先整理一份需求说明，把项目细节记录下来。',
    phone: '07713 743188',
    note: '想先做准备？可在下方保存你的需求说明。此表单会将内容下载到本地，并不会发送给我们。',
    needLabel: '你需要什么服务？',
    needOptions: {
      installation: '安装',
      servicing: '保养',
      repairs: '维修',
      advice: '选购咨询',
    },
    spaceLabel: '你的空间',
    spaceOptions: {
      home: '住宅',
      office: '办公室',
      shop: '门店或商铺',
      other: '其他',
    },
    townLabel: '城镇或区域',
    townPlaceholder: '例如：你所在的城镇',
    moreLabel: '再多说一点',
    morePlaceholder: '房间情况、现有系统，或你遇到的问题',
    submit: '保存需求说明',
    saved: '需求说明已保存到你的下载文件夹',
    briefHeading: 'AirJoy 需求说明',
    briefGenerated: '整理于',
    briefNeed: '所需服务',
    briefSpace: '你的空间',
    briefTown: '城镇或区域',
    briefMore: '详细说明',
    briefNotProvided: '未填写',
    briefFooter:
      '本说明在 AirJoy 网站上整理生成，尚未发送。请致电 07713 743188 与我们进一步沟通。',
  },

  footer: {
    tagline: '全年舒适，始终如一。',
    region: 'AirJoy · 伦敦及周边地区',
  },

  a11y: {
    switchLanguage: '切换语言',
    toggleQuestion: '展开或收起答案',
    backToTop: '回到顶部',
  },
}
