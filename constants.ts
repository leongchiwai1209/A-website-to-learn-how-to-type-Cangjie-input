import { CangjieChar, PracticeItem, Translations, LangCode } from './types';

// Embedded dictionary to avoid JSON module resolution issues in browser environments
const dictionaryData: Record<string, string> = {
  "日": "A", "曰": "A", "旦": "AM", "明": "AB", "早": "AJ", "是": "AMYO", "時": "AGDI", "晚": "ANAU", "昨": "AOS", "晴": "AQMB", "映": "ATLK", "暖": "ABME", "暗": "AYTA", "晶": "AAA", "星": "AHQM", "春": "QKA", "書": "LQA", "最": "ASE", "會": "OMA", "晃": "AFMU", "晨": "AMMV", "景": "AYRF", "暑": "AJKA", "智": "ORDA", "暫": "JLA", "曆": "MHDA", "曉": "ATGU", "曠": "AITC", "曝": "ARTE", "曳": "LWP", "更": "MLWK", "曷": "APWV", "曼": "AWLE", "曾": "CWA", "替": "QOA", "旱": "AMJ", "昇": "AT", "旬": "PA", "旭": "KN", "旺": "AG", "昂": "AHVL", "昆": "APP", "昌": "AA", "昏": "HPA", "易": "AHH", "昔": "TA", "普": "TCA", "晰": "ADHL", "晾": "AYRF", "暈": "ABJJ", "暉": "ABJJ", "暇": "ARSE", "暴": "ATEC", "曇": "AMMI", "曙": "AWLA", "曬": "AMMP",
  "月": "B", "有": "KB", "服": "BSLE", "朋": "BB", "肌": "BHNI", "肋": "BKS", "肚": "BG", "背": "LPB", "能": "IBPP", "望": "YGB", "期": "TCMB", "青": "QMB", "朝": "JJB", "肯": "YMB", "育": "YIB", "脆": "BNIU", "脫": "BCRU", "腳": "BGIL", "臉": "BOMM", "膽": "BNCR", "臟": "BTIS", "脈": "BHNO", "肥": "BAU", "肩": "HSB", "股": "BHNE", "肢": "BJE", "胖": "BFQ", "勝": "BFQS", "胡": "JR", "膠": "BSMH", "朦": "BTBO", "胞": "BPRU", "胎": "BIRO", "胃": "WB", "胆": "BAM", "肺": "BYLB", "脖": "BJBD", "脚": "BGIL", "脯": "BIJB", "腦": "BVYW", "腰": "BMWV", "腹": "BHOE", "腸": "BASH", "腿": "BYGV", "膚": "YPBO", "膜": "BTAK", "膝": "BNHU", "臂": "SJWB", "臀": "SEB",
  "金": "C", "公": "CI", "共": "TC", "八": "HO", "父": "CK", "釜": "CKG", "弟": "CNLH", "錢": "CIJ", "錯": "CTA", "録": "CNME", "銅": "CBMR", "鏡": "CYTU", "鐵": "CJIG", "銀": "CAV", "鋼": "CBTU", "針": "CJ", "鐘": "CYTJ", "鍵": "CNKQ", "鎮": "CJBC", "鎖": "CFBC", "鍋": "CROB", "鋒": "CHEJ", "銳": "CCRU", "錄": "CVNE", "錦": "CHLB", "錫": "CAPH", "鍛": "CHJE", "鍊": "CDWF", "釘": "CMN", "釗": "LNCN", "釣": "CPI", "鈍": "CPU", "鈕": "CNG", "鈴": "COIN", "鈷": "CJR", "鉗": "CTM", "鉛": "CHR", "鉤": "CPI", "銘": "CNIR", "銜": "HOIMN", "鋪": "CIJB", "鋸": "CSJR", "錐": "COYG", "錘": "CHJM", "錠": "CJMO", "錨": "CTW", "鍍": "CITE", "鎂": "CTGK", "鏤": "CLLV", "鐮": "CITC", "鐲": "CWLI",
  "木": "D", "林": "DD", "森": "DDD", "本": "DM", "未": "DJ", "末": "DJ", "来": "DOO", "東": "DW", "果": "WD", "杳": "DA", "查": "DAM", "樹": "DGBI", "校": "DYCK", "樣": "DTQE", "機": "DII", "橋": "DHKB", "檢": "DOMO", "業": "TCD", "板": "DHE", "杯": "DMF", "材": "DDH", "村": "DDI", "松": "DCI", "析": "DHL", "染": "ND", "柔": "NHQD", "架": "KRD", "案": "JVD", "條": "OLD", "極": "DNHE", "構": "DTTB", "標": "DMWF", "權": "DTRG", "札": "DU", "术": "ID", "李": "DND", "杏": "DR", "杖": "DJK", "杜": "DG", "束": "DL", "杠": "DM", "楊": "DAMH", "杭": "DYHN", "枕": "DLBU", "枝": "DJE", "枉": "DMG", "枪": "DCU", "楓": "DHNI", "柱": "DYG", "柳": "DHHL", "柴": "YPD", "柵": "DBT", "核": "DYVO", "根": "DAV", "格": "DHER", "栽": "JID", "桀": "NQMD", "桃": "DLMO", "桌": "YAD", "桑": "EED", "梁": "EID", "梅": "DOWY", "梓": "DYTJ", "梗": "DMLK", "梢": "DFB", "梧": "DMMR", "梨": "HD", "梭": "DICE", "梯": "DCNH", "械": "DIT", "梵": "DDI", "棒": "DQKA", "棕": "DJMF", "棚": "DBB", "棟": "DDW", "棠": "FBD", "棲": "DMCW", "棺": "DJRR", "碗": "MNJU", "概": "DAIU", "榜": "DYBS", "榮": "FFD", "榴": "DHHW", "榻": "DASM", "槁": "DYRB", "樑": "DEID", "樓": "DLV", "樞": "DSRR", "樟": "DYTJ", "模": "DTAK", "橫": "DTLC", "櫻": "DBCV", "欄": "DTAW",
  "水": "E", "永": "INE", "泉": "HAE", "氷": "IM", "江": "EM", "河": "EMNR", "海": "EOWY", "洋": "ETQ", "洗": "EHGU", "活": "EHJR", "流": "EYIU", "法": "EGI", "治": "EIR", "波": "EDHE", "油": "ELW", "酒": "EMCW", "深": "EBCK", "清": "EQMB", "温": "EWOT", "港": "ETCU", "遊": "YSND", "漢": "ETO", "池": "EPD", "決": "EDK", "汽": "EOMN", "沙": "EFH", "沒": "EHE", "沟": "EPK", "液": "EYOK", "涼": "EYRF", "淚": "EHSO", "淨": "EBSD", "淺": "EIJ", "涵": "EUNE", "混": "EAPP", "減": "EIR", "測": "EBCN", "湖": "EJRB", "湯": "EASH", "源": "EMHF", "溪": "EBVK", "溶": "EJCR", "演": "EJMC", "漫": "EAWE", "漏": "ESMB", "漂": "EMWF", "濟": "EYX", "汁": "EJ", "求": "IJE", "泛": "EHIO", "污": "EMVS", "汗": "EMJ", "汛": "ENJ", "汝": "EV", "汞": "ME", "汰": "EKI", "汲": "ENHE", "汾": "ECSH", "沁": "EP", "沂": "EHML", "沈": "ELBU", "沖": "EL", "沫": "EDJ", "沸": "ELLN", "沼": "ESHR", "沽": "EJR", "沾": "EYR", "沿": "ECR", "況": "ERHU", "泊": "EHA", "泌": "EPH", "泗": "EWC", "泡": "EPRU", "泣": "EYT", "泥": "ESP", "注": "EYG", "泰": "QKE", "泳": "EINE", "泵": "MRE", "洛": "EHER", "洞": "EBMR", "津": "ELQ", "洪": "ETC", "洲": "EILL", "洽": "EOMR", "派": "EHHV", "漿": "VINE", "澆": "EGGU", "濃": "ETWV", "濕": "EAVT", "瀉": "EHXF", "瀑": "EATE", "瀚": "EJJON", "瀛": "EYRNV",
  "火": "F", "炎": "FF", "光": "FMU", "当": "FSM", "秋": "HDF", "燈": "FNOT", "燒": "FGGU", "熱": "GIWF", "照": "ARF", "然": "BKF", "無": "OTF", "爲": "BHF", "点": "YRF", "煮": "JAF", "焦": "OGF", "災": "PF", "炭": "UMOF", "炮": "FPRU", "炸": "FHS", "烈": "MNF", "烏": "HRAF", "烤": "FJKS", "煙": "FMWG", "煩": "FMBC", "熟": "YIBF", "燃": "FBKF", "營": "FFR", "爆": "FAT", "爐": "FIST", "爛": "FUGW", "灰": "KF", "灶": "FG", "灸": "NOF", "灼": "FPI", "炕": "FYHN", "炒": "FFH", "炊": "FNO", "炯": "FBR", "炳": "FMOB", "為": "IKF", "烘": "FTC", "烙": "FHER", "烹": "YRQF", "烽": "FHEJ", "焉": "MYF", "焊": "FAMJ", "焙": "FYTR", "焚": "DDF", "焰": "FNHX", "煎": "TBF", "熙": "SUF", "熨": "SIF", "熬": "GOKF", "熾": "FYIA", "燉": "FYBK", "燐": "FFDQ", "燕": "TLPF", "燙": "EIOF", "燥": "FRRD", "燦": "FYED", "燧": "FYTO",
  "土": "G", "士": "G", "去": "GI", "吉": "GR", "志": "GP", "寺": "GDI", "地": "GPD", "坊": "GYHS", "坂": "GHE", "均": "GPMM", "坐": "OOG", "型": "GCLM", "堂": "FBG", "場": "GAMH", "城": "GIHS", "基": "TCG", "堅": "LEG", "堆": "GOG", "在": "KLG", "圭": "GG", "址": "GYLM", "坡": "GDHE", "坦": "GAM", "埋": "GWG", "執行": "TUG", "域": "GIRM", "培": "GYTR", "堪": "GTMV", "報": "GTSE", "塗": "EOMG", "境": "GYTU", "增": "GCWA", "墨": "WG", "壁": "SJG", "壞": "GYWV", "冉": "GB", "册": "BT", "凸": "BSS", "凹": "SSU", "圾": "GNHE", "坎": "GNO", "坑": "GYHN", "坤": "GL", "坪": "GMFJ", "垂": "HJM", "埃": "GIOK", "埔": "GIJB", "執": "GNI", "堡": "ORDG", "堤": "GAMO", "堯": "GGHU", "堵": "GJKA", "塊": "GHI", "塑": "TBUG", "塔": "GTOR", "塘": "GIL", "塚": "GBMO", "塞": "JTCOG", "填": "GJBC", "塵": "IPG", "塹": "JLROG", "塾": "YIG", "墓": "TAKG", "墜": "NOG", "壇": "GYWM", "壓": "MDI", "壕": "GBRO", "壟": "YBPG", "壤": "GYRV",
  "竹": "H", "笑": "HHK", "答": "HOMR", "等": "HGDI", "筆": "HLQ", "算": "HBU", "箇": "HWJR", "箱": "HDBU", "管": "HJRR", "入": "OH", "千": "HJ", "年": "OQ", "午": "OJ", "牛": "HQ", "升": "HT", "生": "HQM", "先": "HGU", "失": "HQO", "朱": "HJD", "行": "HOMN", "得": "HOAMI", "待": "HOGDI", "彼": "HODHE", "役": "HOHNE", "後": "HOVI", "律": "HOLQ", "微": "HOUK", "徳": "HOPWP", "第": "HCNH", "策": "HDB", "筋": "HBLS", "筷": "HNON", "簡": "HANA", "篇": "HHSB", "籃": "HSIT", "籍": "HQDA", "竺": "HMM", "竿": "HMJ", "笃": "HSQF", "笆": "HAU", "笈": "HNHE", "笋": "HP", "笏": "HPHH", "笔": "HQU", "笙": "HHQM", "笛": "HLW", "符": "HOIF", "笨": "HDM", "笮": "HHS", "笱": "HPR", "笳": "HKSR", "笵": "HEJU", "船": "HYCR", "艦": "HYSIT", "艇": "HYNKG", "航": "HYYHN", "艙": "HYOIR", "般": "HYHNE", "舵": "HYJP", "舶": "HYHA", "舷": "HYYVI", "筏": "HOI", "筐": "HSMG", "筑": "HMHN", "筒": "HBMR", "箏": "HBSD", "箝": "HTM", "箔": "HHA", "箕": "HTMC", "範": "HJU", "築": "HMND", "篋": "HSK", "侯": "ONK", "篩": "HHRB", "篤": "HSQF", "籬": "HYBG", "米": "FD", "粉": "FCSH", "粒": "FYT", "粗": "FBM", "粘": "FYR", "粟": "MWFD", "粵": "HWMVS", "糞": "TWC", "糧": "FYRM",
  "戈": "I", "成": "IHS", "我": "HQI", "戒": "IT", "或": "IRM", "國": "WIRM", "戰": "RRJWI", "截": "JIGI", "載": "JICI", "式": "IPM", "武": "MPMYM", "划": "ILN", "戌": "IHM", "威": "IHMV", "戚": "IHYF", "戛": "MUHI", "戟": "JJI", "戡": "TMVI", "戳": "SMRI", "戴": "JICI", "尤": "IK", "尷": "KILIT", "尬": "KIOLL", "就": "YFU", "尨": "IKUH", "對": "TGGDI", "導": "NAUI", "將": "VMI", "專": "JIDI", "尋": "SMRI", "尊": "TWDI",
  "十": "J", "古": "JR", "克": "JRHU", "章": "YTJ", "草": "TAJ", "南": "JBJ", "真": "JBC", "直": "JBM", "車": "JWJ", "乾": "JJON", "協": "KSKS", "博": "IBI", "支": "JE", "丈": "JK", "卓": "YAJ", "準": "EGJ", "辜": "JRJ", "幹": "JJOM", "考": "JKP", "老": "JKP", "者": "JKA", "耆": "JPA", "耋": "JKMIG", "而": "MBLL", "耍": "MBV", "耐": "MBDI", "耑": "UMLB", "耗": "DQU", "耕": "QDJ", "耘": "QMBI", "耙": "QAU", "耜": "QRLL", "耦": "QDLB", "耳": "SJ", "耶": "SJBH", "耽": "SJLBU", "耿": "SJBK", "聊": "SJHNL", "聆": "SJOII", "聖": "SRHG", "聘": "SJLWS", "聚": "SEOO", "聞": "ANSJ", "聯": "SJTK", "聰": "SJPKP", "聲": "GEH", "職": "SJYIA", "聽": "SJJWP", "聾": "YBSJ",
  "大": "K", "太": "KI", "天": "MK", "夫": "QO", "央": "LBK", "友": "KE", "右": "KR", "左": "KM", "布": "KLB", "希": "KKB", "奇": "KMR", "奈": "KMMF", "美": "TGK", "犬": "IK", "狂": "KHG", "獨": "KHWLI", "夸": "KMVS", "夾": "KOO", "奄": "KLU", "奔": "KJT", "奕": "YCK", "套": "KSM", "奚": "BVK", "奠": "TWK", "奧": "HBK", "奪": "KOGI", "奮": "KW", "狼": "KHIAV", "狐": "KHHVO", "狸": "KHWG", "獅": "KHLB", "猛": "KHNDT", "猴": "KHONK", "猶": "KHTKW", "獄": "KHYIK", "獎": "VMIK", "獲": "KHTOE", "獵": "KHVV", "獸": "RRIK", "獻": "YBHIK", "獺": "KHDLC", "王": "MG", "玖": "MGNO", "玩": "MGMU", "玲": "MGOII", "玻": "MGHE", "珊": "MGMM", "珍": "MGOH", "珠": "MGJD", "班": "MGHL", "現": "MGBU", "球": "MGJE", "理": "MGWG", "琉": "MGYIU", "琪": "MGTMC", "琴": "MGMON", "琵": "MGPP", "琶": "MGBAU", "瑞": "MGMB", "瑟": "MGPH", "瑣": "MGFBC", "瑪": "MGSQF", "瑰": "MGHI", "璃": "MGYVB", "環": "MGW", "璽": "MGBF", "瓊": "MGYBE", "瓏": "MGYBP", "瓔": "MGBBV",
  "中": "L", "忠": "LP", "串": "LL", "仲": "OL", "虫": "LMI", "史": "LK", "事": "JLN", "畫": "LGW", "申": "LWL", "由": "LW", "甲": "WL", "巾": "LB", "帆": "LBHNI", "帖": "LBYR", "帳": "LBPO", "幅": "LBMW", "幕": "TAKB", "幣": "FKLB", "幢": "LBYG", "幡": "LBHW", "虱": "LNI", "虹": "LMIM", "虻": "LMYV", "蚊": "LMYK", "蚌": "LMQJ", "蚯": "LMOM", "蚓": "LMNL", "蛇": "LMJP", "蛋": "NYLI", "蛙": "LMGG", "蛤": "LMOMR", "蛛": "LMMG", "蜜": "JPHU", "蜡": "LMTA", "蜥": "LMDHL", "蜻": "LMQMB", "蜿": "LMJNU", "蝶": "LMPTD", "蝦": "LMRSE", "蝸": "LMBBR", "蝙": "LMHSB", "蝗": "LMHAG", "蝌": "LMHD", "蝎": "LMAPV", "融": "GBLMI", "蟻": "LMTGI", "蠅": "LIRXU", "蠍": "LMAPV", "蠕": "LMMBB", "蠟": "LMVVV", "蠶": "MULMI", "蠻": "VFRLI", "蠢": "QKA",
  "一": "M", "二": "MM", "三": "MMM", "工": "M", "雨": "MLBY", "平": "MFJ", "亞": "MTC", "下": "MY", "不": "MF", "否": "MFR", "正": "MYLM", "政": "MYOK", "原": "MHALF", "到": "MGLN", "至": "MIG", "致": "MIGK", "玉": "MGI", "雪": "MBV", "雷": "MBW", "霧": "MBNKS", "霜": "MBDB", "露": "MBRMR", "雹": "MBPRU", "電": "MBHU", "需": "MBMB", "震": "MBMMV", "霉": "MBOWY", "霍": "MBOG", "霓": "MBHXU", "霖": "MBDD", "霙": "MBTLK", "霞": "MBRSE", "霸": "MBAB", "霹": "MBSRJ", "霽": "MBYX", "霾": "MBWG", "示": "MMF", "社": "IFG", "祀": "IFRU", "祁": "IFHL", "祇": "IFHVP", "祈": "IFHHL", "祉": "IFYLM", "祐": "IFKR", "祖": "IFBM", "神": "IFLWL", "祝": "IFRHU", "祠": "IFSMR", "祥": "IFTQ", "票": "MWF", "祭": "BHMVF", "視": "IFBUHU", "祿": "IFVNE", "禁": "DMMF", "禍": "IFBBR", "禎": "IFYBC", "福": "IFMRW", "禦": "HOINF", "禪": "IFCWJ", "禮": "IFTWT", "禱": "IFQNI",
  "弓": "N", "引": "NL", "弱": "NINLM", "強": "NILI", "發": "NOKNE", "飛": "NOHTO", "風": "HNKI", "氣": "OMFD", "乃": "NHS", "及": "NHE", "弗": "LLN", "弘": "NKI", "弛": "NPD", "张": "NPO", "弦": "NYVI", "彩": "BDHH", "彈": "NCWJ", "彌": "NMBK", "彎": "VFN", "孑": "NKM", "孔": "NDHU", "孕": "NSND", "字": "JND", "存": "KLND", "孝": "JKND", "季": "HDND", "孤": "NDHVO", "孩": "NDYVO", "孫": "NDVIF", "孵": "HHSND", "孺": "NDMBB", "疋": "NYO", "疏": "N YIUI", "疑": "PKNKO", "疆": "NGMW",
  "人": "O", "今": "OIN", "令": "OII", "介": "OLL", "企": "OYLM", "会": "OMMI", "合": "OMR", "全": "OMG", "余": "OMD", "食": "OIAV", "飲": "OINO", "命": "OIMRL", "化": "OP", "他": "OPD", "代": "OIP", "任": "OHG", "休": "OD", "位": "OYT", "信": "OYR", "倍": "OYTR", "優": "OMBE", "億": "OYTP", "体": "ODM", "何": "OMNR", "作": "OOS", "使": "OJLK", "例": "OMNI", "保": "ORD", "價": "OWMC", "什": "OJ", "仁": "OMM", "仇": "OKN", "仍": "ONHS", "付": "ODI", "仙": "OMU", "仗": "OJK", "份": "OCSH", "件": "OHQ", "仰": "OHVL", "伍": "OMGG", "伏": "OIK", "伐": "OI", "傳": "OJII", "伯": "OHA", "估": "OJR", "伴": "OFQ", "伶": "OOII", "伸": "OLWL", "伺": "OSMR", "似": "OVIO", "伽": "OKSR", "佃": "OW", "但": "OAM", "低": "OHVP", "住": "OYG", "佐": "OKM", "佑": "OKR", "佔": "OYR", "佛": "OLLN", "你": "ONF", "佩": "OHNB", "佯": "OTQ", "佳": "OGG", "併": "OTT", "來": "DOO", "侍": "OGDI", "供": "OTC", "依": "OYHV", "侮": "OWYI", "侯": "ONK", "侵": "OSME", "侶": "ORR", "便": "OMBK", "係": "OHVF", "促": "ORYO", "俄": "OHQI", "俊": "OICE", "俎": "OBM", "俗": "OCOR", "俘": "OBND", "俞": "OMBN", "俟": "OIOK", "俠": "OKOO", "修": "OLOH", "俯": "OIOI", "俱": "OBMC", "俳": "OLYY", "俸": "OQKA", "俺": "OKLU", "俾": "OHHJ", "倒": "OMGN", "倔": "OSUU", "倖": "OGTJ", "倘": "OFBR", "候": "ONK", "倚": "OKMR", "借": "OTA", "倡": "OAA", "倫": "OOMA", "值": "OJBM", "假": "ORSE", "偉": "ODMQ", "偏": "OHSB", "停": "OYRN", "健": "ONKQ", "側": "OBCN", "偵": "OYBC", "偶": "OWLB", "偷": "OOMA", "偽": "OBHF", "傑": "ONQD", "傘": "OOOL", "備": "OTHB", "傢": "OJMO", "催": "OUOG", "傭": "OILB", "傲": "OKGS", "債": "OQMO", "傷": "OOAH", "傾": "OPMC", "僅": "OTLM", "像": "ONPO", "僑": "OHKB", "僕": "OTCO", "僖": "OGRR", "僚": "OKCF", "僞": "OBHF", "僥": "OGGU", "僧": "OCWA", "儀": "OTGI", "儂": "OMWV", "儒": "OMBB", "償": "OFBC", "儲": "OYKA", "儷": "OMBP", "儼": "OMTM",
  "心": "P", "必": "PH", "忍": "SIP", "忘": "YVP", "忙": "PYV", "快": "PDK", "性": "PHQM", "情": "PQMB", "想": "DUP", "意": "YTJP", "愛": "BBPE", "感": "IRP", "應": "IOGP", "憲": "JLHP", "憩": "RUBP", "忽": "PHP", "念": "OINP", "怎": "HSP", "怒": "VEP", "怕": "PHA", "怖": "PKLB", "思": "WP", "急": "NSDP", "怨": "NUP", "怪": "PEG", "總": "VFRP", "戀": "VFRP", "恥": "SJQP", "恩": "WKP", "恭": "TCP", "息": "HUP", "恰": "POMR", "悅": "PCRU", "悉": "HDP", "悔": "POWY", "悟": "PMMR", "悠": "OIKP", "患": "LLP", "悲": "LYYP", "悶": "ANP", "悸": "PHD", "悼": "PYAJ", "悽": "PJLV", "惜": "PTA", "惟": "POG", "惠": "JIP", "惡": "MIMP", "惱": "PVYW", "惶": "PHAG", "惹": "TKP", "愁": "HDFP", "愈": "OMBP", "愉": "POMB", "愚": "WBYP", "慈": "TVIP", "態": "ICP", "慌": "PYIU", "慎": "PJBC", "慄": "PMWD", "慍": "PWOT", "愧": "PHI", "愷": "PGUT", "愿": "MFIP", "懾": "PSJJ", "慕": "TAKP", "慘": "PIKH", "慚": "PJJL", "慟": "PHGS", "慢": "PWLE", "慣": "PWJC", "慧": "QIMP", "慨": "PAIU", "慰": "SFIP", "慶": "IXE", "慾": "KOP", "憂": "MBBE", "憊": "HEDP", "憎": "PCWA", "憐": "PFDQ", "憑": "IFP", "憔": "POGF", "懂": "PTG", "懇": "AVP", "懊": "PHBK", "懋": "DDKP", "懷": "PYWV", "懸": "BFFP", "懺": "PIM", "懼": "PBUG", "懿": "GTIP",
  "手": "Q", "看": "HQBU", "拜": "HQMQ", "拿": "ORQ", "挙": "FQC", "掌": "FBRQ", "打": "QMN", "払": "QI", "投": "QHNE", "指": "QPA", "持": "QGDI", "推": "QOG", "提": "QAMO", "揚": "QAMH", "接": "QYTV", "損": "QRBC", "換": "QNBK", "才": "DH", "扎": "QU", "扒": "QC", "扑": "QY", "托": "QHP", "抄": "QFH", "折": "QHL", "抓": "QHLO", "扮": "QCSH", "扯": "QYLM", "批": "QPP", "找": "QHI", "技": "QJE", "把": "QAU", "抑": "QHV", "抗": "QYHN", "撫": "QOTU", "擇": "QWLJ", "據": "QYPO", "擔": "QNCR", "扭": "QNG", "扶": "QQO", "扼": "QMSU", "抉": "QDK", "改": "SUOK", "攻": "MOK", "攸": "OLOK", "抱": "QPRU", "抵": "QHVP", "抹": "QDJ", "押": "QWL", "抽": "QLW", "拂": "QLLN", "拆": "QHMY", "拇": "QWYI", "拈": "QYR", "拉": "QYT", "拌": "QFQ", "拍": "QHA", "拐": "QRSH", "拒": "QSS", "拓": "QMR", "拔": "QIKK", "拖": "QPD", "拘": "QPR", "拙": "QUU", "招": "QSHR", "括": "QHJR", "拭": "QIPM", "拮": "QGR", "拯": "QNEM", "拱": "QTC", "拳": "FQQ", "拷": "QJKS", "拼": "QTT", "拽": "QLWP", "拾": "QOMR", "按": "QJV", "挑": "QLMO", "挖": "QJCN", "振": "QMMV", "挺": "QNKG", "捐": "QRB", "捕": "QIJB", "捆": "QWD", "捉": "QRYO", "捌": "QRLN", "捍": "QAMJ", "捎": "QFB", "捏": "QHG", "捧": "QQKA", "捨": "QOMR", "捩": "QHSO", "捺": "QMMF", "捲": "QFU", "捷": "QJLO", "掃": "QSMB", "授": "QBBE", "掉": "QYAJ", "排": "QLYY", "掖": "QYOK", "掘": "QSUU", "掙": "QBSD", "掛": "QGGY", "採": "QBD", "探": "QBCD", "控": "QJCM", "掩": "QKLU", "措": "QTA", "掬": "QPFD", "捫": "QAN", "掰": "HQCN", "握": "QSMG", "揣": "QUMB", "揩": "QPPA", "揪": "QHDF", "揭": "QAPV", "揮": "QBJJ", "援": "QBME", "揠": "QSUV", "搖": "QBOU", "搗": "QHAF", "搜": "QHXE", "搞": "QYRB", "搬": "QHYE", "搭": "QTOR", "搶": "QOIR", "攜": "QOGS", "攝": "QSJE", "攣": "VFQC", "攤": "QTOG", "攪": "QHBBU",
  "口": "R", "回": "WR", "困": "WD", "固": "WJR", "国": "WIRM", "圖": "WMRW", "園": "WYMV", "因": "WK", "問": "ANR", "味": "RD", "和": "HDR", "知": "OKR", "名": "NIR", "君": "SKR", "告": "HGR", "周": "BGR", "器": "RRDRR", "品": "RRR", "喝": "RAPV", "唱": "RAA", "員": "RBC", "只": "RC", "叫": "RVL", "召": "SHR", "可": "MNR", "台": "IR", "司": "SMR", "吃": "RON", "各": "HER", "合": "OMR", "吉": "GR", "同": "BMR", "后": "HMR", "吏": "JLK", "吐": "RG", "向": "HBR", "呀": "RMTH", "吝": "YKR", "吞": "MKR", "吟": "ROIN", "否": "MFR", "含": "OINR", "吸": "RNHE", "吹": "RNO", "吻": "RPHH", "吾": "MMR", "呆": "RD", "呈": "RMG", "呂": "RR", "呢": "RSP", "呵": "RMNR", "呼": "RHPO", "咀": "RBM", "咆": "RPRU", "咎": "HOR", "咏": "RINE", "咐": "RODI", "咒": "RRHU", "咕": "RJR", "咖": "RKSR", "咨": "IOR", "咫": "SOR", "咬": "RYK", "咯": "RHER", "咱": "RHBU", "咳": "RYVO", "咸": "IHR", "咽": "RWK", "哀": "YRHV", "哄": "RTC", "哇": "RGG", "哈": "ROMR", "哉": "JIR", "哥": "MRMR", "哨": "RFB", "哩": "RWG", "哭": "RRK", "哮": "RJKD", "哲": "QLR", "哺": "RIJB", "哼": "RYRN", "哽": "RMLK", "唆": "RICE", "唇": "MMR", "唉": "RIOK", "唏": "RKKB", "唐": "ILR", "售": "OGR", "唯": "ROG", "唳": "RHSK", "唸": "ROIP", "唾": "RHJM", "商": "YCRB", "啟": "HKR", "啖": "RFF", "啜": "REEE", "啞": "RMTC", "啡": "RLMY", "啤": "RHWJ", "啦": "RYT", "啪": "RHA", "啼": "RYBB", "喃": "RJBJ", "善": "TGR", "喊": "RIHR", "喘": "RUMB", "喜": "GRTR", "喧": "RJMM", "喻": "ROMN", "喪": "GRRV", "喬": "HKB", "單": "RRWJ", "嗅": "RHBK", "嗇": "GOWR", "嗔": "RJBC", "嗚": "RHAF", "嗜": "RJKA", "嗟": "RTQM", "嗡": "RCIM", "嗣": "RMBR", "嗤": "RYL", "嗥": "RHUJ", "嗦": "RJMC", "嗨": "REOY", "嗯": "RWK", "嗓": "REED", "嘉": "GRTR", "嘗": "FBRR", "噓": "RYPM", "噴": "RJTO", "嚇": "RGLC", "嚴": "RRMO", "嚼": "RWRI", "囊": "JBRV", "囑": "RSHI", "囚": "WO", "四": "WC", "囤": "WRU", "囿": "WKB", "圃": "WIJB", "圍": "WDMQ", "圓": "WRBC", "團": "WFII",
  "尸": "S", "尺": "SO", "局": "SSR", "居": "SJR", "屋": "SMIG", "展": "STV", "層": "SCWA", "属": "SHYI", "尿": "SE", "尾": "SHU", "届": "SLW", "尹": "SK", "尼": "SP", "屁": "SPP", "屆": "SLW", "屍": "SNMP", "屎": "SFD", "屏": "STT", "屐": "SHE", "履": "SHO", "屬": "SHYI", "刁": "SM", "弔": "NL", "弧": "NHVO", "張": "NSMV", "戶": "HS", "房": "HSNS", "戾": "HSK", "扁": "HSB", "扇": "HSMM", "扈": "HSRA", "扉": "HSLMY",
  "廿": "T", "甘": "TM", "其": "TMC", "期": "TCMB", "甚": "TMMV", "某": "TMD", "茶": "TOMD", "花": "TOP", "若": "TKR", "苦": "TJR", "英": "TLK", "荷": "TMNR", "華": "TMJ", "萬": "TWLB", "落": "TEHR", "葉": "TPTD", "夢": "TWLN", "舊": "TOGX", "藥": "TVHD", "藝": "TIGN", "艾": "TK", "芒": "TYV", "芋": "TMJ", "芍": "TPI", "芳": "TYHS", "芝": "TIM", "芙": "TQO", "芭": "TAU", "芽": "TMNH", "苔": "TIR", "苗": "TW", "苛": "TMNR", "苧": "TJ", "茂": "TIHS", "范": "TEJU", "茄": "TKSR", "茅": "TNIN", "茉": "TD", "茗": "TNIR", "茜": "TMCW", "茨": "TIMO", "荒": "TYIU", "莫": "TAK", "菜": "TBD", "菩": "TYTR", "萎": "THDV", "菌": "TWJR", "著": "TJKA", "蒙": "TBO", "蒼": "TOIR", "蓋": "TGBT", "蓮": "TYJJ", "蔡": "TBOF", "蔣": "TVMI", "蕭": "TLX", "薄": "TEJI", "薦": "TIXF", "薩": "TNLH", "薪": "TYMQ", "薯": "TWLA", "薰": "THGF", "藏": "TIMS", "蘇": "TNFE", "蘭": "TAWF", "革": "TLJ", "靴": "TLJOP", "靶": "TLJAU", "鞋": "TLJGG", "鞍": "TLJJV", "鞠": "TLJFD", "鞭": "TLJOK", "牙": "MTH",
  "山": "U", "出": "UU", "岩": "UR", "崖": "UMGG", "崩": "UBB", "密": "JPHU", "島": "HAYU", "幽": "UVI", "凶": "UK", "画": "MWU", "函": "UNE", "逆": "YTU", "屹": "UON", "岌": "UNHE", "岐": "UJE", "岑": "UOIN", "岔": "CSH", "岱": "OPU", "岳": "OMU", "岸": "UMJ", "岫": "ULW", "岡": "UBK", "岢": "UMNR", "岷": "URHP", "崇": "UMFI", "崎": "UKMR", "崔": "UOG", "崗": "UMBK", "嵐": "UHNI", "嵌": "UTMO", "嶄": "UJJL", "嶺": "UOII", "巒": "VFVC",
  "女": "V", "奴": "VE", "好": "VND", "如": "VR", "妃": "VSU", "妹": "VD", "姉": "VLJH", "始": "VIR", "姓": "VHQM", "委": "HDV", "姿": "IOV", "婦": "VSMB", "媽": "VSQF", "婚": "VHPA", "婆": "EOV", "奶": "VNHS", "奸": "VMJ", "妄": "YV", "妊": "VHG", "妍": "VMT", "妓": "VJE", "妖": "VHK", "妙": "VHIT", "妥": "BV", "妨": "VYHS", "妮": "VSP", "妻": "JLV", "妾": "YTV", "姆": "VWYI", "姊": "VLX", "姐": "VBM", "姑": "VJR", "娃": "VGG", "婁": "LLV", "嬌": "VHKB", "婊": "VQMO", "嫩": "VDLK", "嬉": "VGRR", "嬴": "YRBNV", "嬸": "VJHW", "糸": "VI", "系": "HVI", "糾": "VL", "紀": "VSU", "紂": "VDI", "約": "VPI", "紅": "VM", "紆": "VMD", "紇": "VON", "納": "VOB", "紐": "VNG", "純": "VPU", "紗": "VFH", "紘": "VKI", "紙": "VHVP", "級": "VNHE", "紛": "VCSH", "素": "QMVC", "紡": "VYHS", "索": "JVI", "紫": "YPF", "紮": "DVI", "累": "WVI", "細": "VW", "紳": "VLWL", "紹": "VSHR", "終": "VHEY", "組": "VBM", "絆": "VFQ", "結": "VGR", "絕": "VRAU", "絞": "VYCK", "絡": "VHER", "給": "VOMR", "絨": "VIJ", "統": "VYIU", "絲": "VFVF", "絹": "VRB", "綁": "VQJL", "綏": "VBV", "經": "VMVM", "綜": "VMMF", "綠": "VVNE", "綢": "VBGR", "維": "VOG", "綱": "VBTU", "網": "VBK", "綴": "VEEE", "綸": "VOMA", "綺": "VKMR", "綻": "VJMO", "綽": "VYAJ", "綾": "VGC", "綿": "VHAB", "緇": "VVVW", "緊": "SEVI", "緋": "VLMY", "緒": "VJKA", "緝": "VRJ", "緞": "VHJE", "締": "VYBB", "緣": "VVNO", "編": "VHSB", "緩": "VBME", "緬": "VMWL", "緯": "VDMQ", "練": "VDWF", "緻": "VMGK", "緘": "VIR", "縱": "VHOO", "縮": "VJMA", "繁": "OKVI", "繃": "VBB", "績": "VQM", "繆": "VSMH", "織": "VYIA", "繕": "VTGR", "繚": "VKCF", "繞": "VGGU", "繡": "VHD", "繪": "VOMA", "繩": "VFRXU", "繼": "VFVG", "繽": "VYMC", "纈": "VGRC", "續": "VGWC", "纏": "VIWG", "纜": "VSWU",
  "田": "W", "町": "WMN", "男": "WKS", "思": "WP", "留": "HHW", "番": "HDW", "異": "WTC", "略": "WHER", "界": "WOL", "畢": "WTJ", "甸": "PW", "畏": "WMV", "畔": "WFQ", "畜": "YVW", "畝": "YWW", "當": "FBCW", "畸": "WKMR", "畿": "VIW", "目": "BU", "盲": "YVBU", "相": "DBU", "盾": "HJU", "省": "FHU", "眉": "AHBU", "看": "HQBU", "盼": "BUCSH", "眠": "BURVP", "眼": "BUAV", "眾": "WLOO", "睛": "BUQMB", "睡": "BUHJM", "督": "YEBU", "睦": "BUG", "睫": "BUJLO", "睹": "BUJKA", "睾": "WLGJ", "睿": "YBMC", "瞥": "FKBBU", "瞭": "BUKCF", "瞳": "BUYTG", "瞻": "BUNCR", "矇": "BUTBO", "矗": "JMBBM",
  "難": "X", "齊": "X", "龜": "NXU", "肅": "LX", "黽": "RXU", "齋": "YXF", "齏": "XYX", "臼": "HX", "舁": "HXMM", "舅": "HXWS", "鼠": "HVXV",
  "卜": "Y", "上": "YM", "占": "YR", "貞": "YBC", "餐": "YEVI", "肯": "YMB", "止": "YLM", "此": "YMP", "步": "YMH", "頻": "YHMBC", "道": "YTHU", "造": "YHGR", "連": "YJJ", "通": "YNIB", "進": "YOG", "遇": "YWLB", "過": "YBBR", "達": "YGT", "運": "YBBJ", "邊": "YHSB", "迷": "YFD", "追": "YHR", "卡": "YMY", "卣": "YWS", "卦": "GGY", "卧": "SLY", "師": "HRILB", "帥": "HRILB", "彥": "YHHHH", "產": "YHM", "顏": "YHMBC", "顫": "YJMBC", "充": "YIHU", "兆": "LMO", "兒": "HXHU", "兔": "NAI", "黨": "FBRHU", "兜": "HVHU", "兢": "JCUJU", "免": "NAU", "兕": "RHU", "內": "OB", "兩": "MLBO", "衣": "YHV", "表": "QMVO", "衫": "LBHHH", "袁": "GRV", "袂": "LBDK", "袖": "LBW", "被": "LBDHE", "袒": "LBAM", "袍": "LBPRU", "袋": "OPHV", "袈": "KRYHV", "裁": "JIYHV", "裂": "QJHV", "裝": "VGYHV", "裙": "LBSHR", "補": "LBIJE", "裸": "LBWD", "製": "HBHV", "複": "OAHV", "褲": "LBIJU", "襪": "LBTWI", "襲": "YPHV", "襯": "LBYDU", "言": "YMMR", "訂": "YIMN", "訃": "YIY", "計": "YIJ", "訊": "YINJ", "訌": "YIM", "討": "YIDI", "訐": "YIMJ", "訓": "YILLL", "訖": "YION", "託": "YIHP", "記": "YIOSU", "訛": "YIOP", "訝": "YIMTH", "訟": "YICI", "訣": "YIDK", "訥": "YIOB", "訪": "YIYHS", "設": "YIHNE", "許": "YIOJ", "訴": "YIHMY", "訶": "YIMNR", "診": "YIOHH", "註": "YIYG", "証": "YIMOT", "詁": "YIJR", "詆": "YIHVP", "評": "YIMFJ", "詛": "YIBM", "詞": "YISMR", "詡": "YISMM", "詢": "YIPA", "詣": "YIPA", "試": "YIPIM", "詩": "YIGDI", "詫": "YIJHP", "詬": "YIHMR", "詭": "YINMU", "詮": "YIOMG", "詰": "YIGR", "話": "YIR", "該": "YIYVO", "詳": "YITQ", "詼": "YIKF", "誅": "YIJD", "誇": "YIKMS", "誌": "YIGP", "認": "YISHP", "誓": "QJYI", "誕": "YINMY", "誘": "YIHD", "語": "YIMMR", "誠": "YIIHS", "誡": "YIIT", "誣": "YIMO", "誤": "YIRMK", "誦": "YINIB", "誨": "YIOWY", "說": "YICRU", "誰": "YIOG", "課": "YIWD", "誼": "YIBM", "調": "YIBGR", "諂": "YINHX", "諄": "YIYRD", "談": "YIFF", "請": "YIQMB", "諍": "YIBSD", "諒": "YIYRF", "論": "YIOMA", "諗": "YIOIP", "諷": "YIHNI", "諸": "YIJKA", "諺": "YIYHH", "諾": "YITKR", "謀": "YITMD", "謂": "YIWB", "謄": "BFQYI", "謎": "YIYFD", "謠": "YIBOU", "謝": "YIHHI", "謗": "YIYBS", "謙": "YITXC", "講": "YIGB", "謊": "YITYU", "謬": "YISMH", "證": "YIMOT", "識": "YIYIA", "譜": "YITCA", "警": "TKYI", "譬": "SJYI", "議": "YITGI", "護": "YITOE", "譽": "HCYI", "讀": "YIGWC", "變": "VFOKE", "讓": "YIYRV", "讚": "YIHCO", "足": "RYO", "趴": "RYC", "趾": "RYYLM", "趺": "RYQO", "跛": "RYDHE", "距": "RYSS", "跟": "RYAV", "跡": "RYYL", "路": "RYHER", "跳": "RYLMO", "踐": "RYII", "踏": "RYE", "踝": "RYWD", "踞": "RYSJR", "踢": "RYAPH", "踩": "RYBD", "蹤": "RYHOO", "躍": "RYSYG", "跑": "RYPRU", "身": "HHH", "躬": "HHN", "軀": "HHSRR", "躲": "HHHND",
  "倉": "OIR", "頡": "GRMBC", "學": "HBDND", "習": "SMA", "驗": "SFOMO", "寫": "JHXYF", "聽": "SJJWP", "見": "BUHU", "觀": "TGBUU", "親": "YDQU", "覺": "HBBUU", "京": "YRF", "都": "JANL", "市": "YLB", "區": "SRR", "縣": "BFF", "貓": "BHTW", "鳥": "HAF", "魚": "NWF", "馬": "SQF", "鹿": "IPP", "龍": "YBP", "虎": "YPHU", "飯": "OIHE", "麵": "JAMWL", "包": "PRU", "子": "ND", "音": "YTA", "樂": "VD", "私": "HI", "家": "JMSO", "族": "YSOK", "母": "WYI", "兄": "RHU", "的": "HAPI", "了": "NN", "個": "OWJR", "這": "YMMR", "那": "SQL", "就": "YFU", "要": "MWV", "以": "VIO", "自": "HBU", "著": "TJKA", "之": "IO", "可": "MNR", "她": "VPD", "里": "WG", "小": "NC", "麼": "IDHI", "多": "NN", "没": "EHE", "于": "MD", "起": "GOSU", "還": "YMWV", "只": "RC", "用": "BQ", "種": "HDHL", "面": "MWYL", "文": "YK", "加": "KSR", "利": "HDLN", "新": "YDHL", "受": "BBE", "外": "NIY", "門": "AN", "实": "JNK", "定": "JMO", "主": "MGI", "間": "ANA", "几": "HN", "所": "HSHML", "前": "TBLN", "動": "HGRKS", "比": "PP", "高": "YRB", "又": "NK", "力": "KS", "頭": "MTMBC", "教": "JKOK", "期": "TCMB", "長": "SMV", "特": "HQGDI", "處": "YHE", "務": "NHKS", "設": "YRHNE", "題": "AOMBC", "量": "AMWG", "解": "NBQ", "度": "ITE", "建": "NKJL", "灣": "EVFN", "興": "HXC", "義": "TGI", "世": "PT", "陽": "NLAMH", "陰": "NLOIN", "關": "ANVFI", "完": "JMU", "科": "HDYJ", "影": "AFHHH", "須": "MHHBC", "消": "EFB", "離": "YBG", "復": "HOAO", "病": "KOMB", "象": "NAPO", "院": "NLJMU", "歷": "MHMD", "買": "WLBC", "賣": "GBC", "舉": "HC", "適": "YYBC", "確": "MRBG", "衆": "HOO", "率": "YIIJ", "容": "JCOR", "幫": "QBUHL", "初": "LNH", "效": "YKOK", "底": "IHPM", "站": "YTYR", "故": "JRok", "帝": "YBLB", "射": "HHDH", "斗": "YJ", "角": "NBG", "色": "NAU", "蟲": "LMI", "血": "HBT", "西": "MCW",
  "飧": "NIIAV", "飢": "OIHNI", "飼": "OISMR", "飽": "OIPRU", "飾": "OIOLB", "餃": "OIYCK", "餉": "OIHBR", "養": "TOIAV", "餌": "OISJ", "餒": "OIBV", "餓": "OIHQI", "餘": "OIOMD", "餚": "OIKKB", "餛": "OIAPP", "餡": "OINHX", "館": "OIJRR", "饃": "OITAK", "饅": "OIAWE", "饒": "OIGGU", "饑": "OIVII", "首": "THU", "香": "HDA", "馥": "HAHOE", "馨": "GEHDA", "馭": "SQME", "馮": "IMSQF", "駝": "SQJP", "駕": "KRSQF", "駢": "SQOTT", "駛": "SQLK", "駟": "SQWC", "駭": "SQYVO", "駸": "SQSME", "駱": "SQHER", "駿": "SQICE", "騎": "SQKMR", "騖": "NKSQF", "騙": "SQHSB", "騰": "BFQSQ", "騷": "SQEII", "騾": "SQWVI", "驀": "TAKQF", "驃": "SQMWF", "驅": "SQSRR", "驗": "SQOMO", "驛": "SQWLJ", "驟": "SQSEO", "驢": "SQYPT", "驥": "SQTLP", "驪": "SQMMP", "髒": "BBIVG", "髮": "IKHHH", "鬆": "IKDCI", "鬚": "IKHHH", "鬥": "LN", "鬧": "LNYLB", "鬼": "HI", "魁": "HIQU", "魂": "HIMUI", "魄": "HIRB", "魅": "HJDHI", "魔": "IDHII", "魯": "NWA", "魴": "NWFYS", "魷": "NWFIK", "鮑": "NWFPU", "鮪": "NWFKB", "鮫": "NWFYK", "鮭": "NWFGG", "鮮": "NWFTQ", "鯉": "NWFWG", "鯊": "EFHWF", "鯖": "NWFQB", "鯛": "NWFGR", "鯨": "NWF YF", "鱷": "NWFR S", "鱸": "NWFYPT", "鳳": "HN HAF", "鳴": "R HAF", "鳶": "IP HAF", "鴃": "DK HAF", "鴆": "MV HAF", "鴇": "OP HAF", "鴉": "MTHAF", "鴒": "OIIHAF", "鴕": "JP HAF", "鴛": "NUD HAF", "鴞": "RS HAF", "鴟": "HPM HAF", "鴦": "LBK HAF", "鴨": "WL HAF", "鴻": "EM HAF", "鴿": "OMRHAF", "鵝": "HQI HAF", "鵡": "MPMHAF", "鵬": "BB HAF", "鵰": "BGRHAF", "鵲": "TA HAF", "鵪": "KLUHAF", "鶇": "DW HAF", "鶴": "OBG HAF", "鸚": "BCV HAF", "鹵": "YWI", "鹹": "YWIHR", "鹼": "YWIOI", "鹽": "YWLBT", "麒": "IP TMC", "麓": "DDIPP", "麗": "MMBBP", "麝": "IPHHD", "麟": "IP FDQ", "麥": "JONE", "麻": "IDJC", "麾": "IDHU", "黃": "TCMC", "黍": "HDHE", "黑": "WF", "黔": "WFOIN", "默": "WFIK", "黛": "OPWF", "黜": "WFUU", "點": "WFYR", "黨": "FBRWF", "黴": "HOFDK", "黷": "WFGRC", "鼓": "GTXE", "鼕": "HEYTE", "鼠": "HVXV", "鼻": "HLW L", "齊": "YX", "齋": "YXF", "齒": "YMUO", "齡": "YMOII", "齲": "YMUK", "龐": "IDYBP", "龔": "YBP P"
};

export const CANGJIE_DATA: CangjieChar[] = [
  { key: 'A', char: '日', cat: '哲理', aux: ['日', '曰'], desc_ja: '太陽、丸い形、または横に分割された形。日の形を基本とする。', desc_zh: '太阳、圆形或横向分割的形状。' },
  { key: 'B', char: '月', cat: '哲理', aux: ['月', '冂', '冖', '冉'], desc_ja: '月、肉体、または「冂」のような囲いに関連する形。', desc_zh: '月亮、肉体或「冂」形的框架。' },
  { key: 'C', char: '金', aux: ['金', 'ハ', '儿', '丷'], cat: '哲理', desc_ja: '金属、鋭い角、または「ハ」のように下に開いた形。', desc_zh: '金属、尖角或「ハ」形。' },
  { key: 'D', char: '木', aux: ['木', '十', '寸'], cat: '哲理', desc_ja: '木、または「十」の字のように交差する形。', desc_zh: '树木、交叉 or 「十」字形。' },
  { key: 'E', char: '水', aux: ['水', '氵', '又'], cat: '哲理', desc_ja: '水、さんずい、または「又」のような形。', desc_zh: '水、三点水或「又」形。' },
  { key: 'F', char: '火', aux: ['火', '灬', '小'], cat: '哲理', desc_ja: '火、れんが（四つ点）、または「小」の形。', desc_zh: '火、四点底或「小」字形。' },
  { key: 'G', char: '土', aux: ['土', '士'], cat: '哲理', desc_ja: '土、または「士」のような縦横の交差。', desc_zh: '土、土地或「士」字。' },
  { key: 'H', char: '竹', aux: ['竹', 'ノ', '斤'], cat: '筆画', desc_ja: '短い斜線、払いの形。「ノ」の筆画。', desc_zh: '短斜线、撇或竹字头。' },
  { key: 'I', char: '戈', aux: ['戈', '丶', '广'], cat: '筆画', desc_ja: '点、あるいは「戈」のような斜めの点。', desc_zh: '点、勾或带有「丶」的形状。' },
  { key: 'J', char: '十', aux: ['十', '宀', '耂'], cat: '筆画', desc_ja: '十字、または「宀」のように上を覆う形。', desc_zh: '十字架或「宀」形的盖子。' },
  { key: 'K', char: '大', aux: ['大', '乂', '犭'], cat: '筆画', desc_ja: '「大」の形、三又の交差。', desc_zh: '大、叉或类似形状。' },
  { key: 'L', char: '中', aux: ['中', '丨', '衤'], cat: '筆画', desc_ja: '縦棒、中心を貫く線。', desc_zh: '中、竖线或贯穿中心的笔画。' },
  { key: 'M', char: '一', aux: ['一', '厂', '石'], cat: '筆画', desc_ja: '横棒、土台、または水平な線。', desc_zh: '横、地平线或水平笔画。' },
  { key: 'N', char: '弓', aux: ['弓', '乙', '亅', 'マ'], cat: '筆画', desc_ja: '曲がった線、フック、折れ曲がりの筆画。', desc_zh: '折、勾或弯曲笔画。' },
  { key: 'O', char: '人', aux: ['人', '亻', '入'], cat: '人体', desc_ja: '人、にんべん、または左右に分かれる形。', desc_zh: '人、单人旁或侧面的人。' },
  { key: 'P', char: '心', aux: ['心', '忄', '勹', '匕'], cat: '人体', desc_ja: '心、りっしんべん、または包むような形。', desc_zh: '心、竖心旁或包含在内的形状。' },
  { key: 'Q', char: '手', aux: ['手', '扌', 'キ'], cat: '人体', desc_ja: '手、てへん、または突き出す線。', desc_zh: '手、提手旁或向外伸展的形状。' },
  { key: 'R', char: '口', aux: ['口'], cat: '人体', desc_ja: '四角い囲みの形。', desc_zh: '口、矩形或开口形状。' },
  { key: 'S', char: '尸', aux: ['尸', 'コ', '匚', '乙'], cat: '字形', desc_ja: '死体、屋根、または「コ」の字の形。', desc_zh: '尸、外框或折形。' },
  { key: 'T', char: '廿', aux: ['廿', '艹', '共'], cat: '字形', desc_ja: '20、くさかんむり、または二本の縦棒。', desc_zh: '二十、草字头 or 双竖线。' },
  { key: 'U', char: '山', aux: ['山', '凵', '屮'], cat: '字形', desc_ja: '上に開いた器、または山のような形。', desc_zh: '山、上开口或向上突出的形状。' },
  { key: 'V', char: '女', aux: ['女', 'レ', 'く', '巛'], cat: '字形', desc_ja: '女、あるいは「く」の字型の折れ。', desc_zh: '女、撇折或类似形状。' },
  { key: 'W', char: '田', aux: ['田', '囗', '毋'], cat: '字形', desc_ja: '中に十字がある四角、または「囗」。', desc_zh: '田、围框或内部有东西的矩形。' },
  { key: 'X', char: '難', aux: ['難'], cat: '特殊', desc_ja: '例外的な字形、または複雑で分解できない部分。', desc_zh: '特殊字符、难以拆解的笔画。' },
  { key: 'Y', char: '卜', aux: ['卜', 'ト', '辶'], cat: '字形', desc_ja: '占い、点と線、しんにょう。', desc_zh: '卜、点与线、走之底。' }
];

export const KEYBOARD_LAYOUT = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"]
];

// Use inline data
export const DICTIONARY: Record<string, string> = dictionaryData;

// A curated list for practice, sorted roughly by complexity or category
export const PRACTICE_LIST: PracticeItem[] = [
  // Level 1: Single Code (Basic Roots)
  { word: '日', code: 'A' },
  { word: '月', code: 'B' },
  { word: '木', code: 'D' },
  { word: '火', code: 'F' },
  { word: '土', code: 'G' },
  { word: '人', code: 'O' },
  { word: '手', code: 'Q' },
  { word: '口', code: 'R' },
  { word: '田', code: 'W' },
  { word: '女', code: 'V' },
  
  // Level 2: Simple Compounds (2 codes)
  { word: '明', code: 'AB' },
  { word: '林', code: 'DD' },
  { word: '朋', code: 'BB' },
  { word: '出', code: 'UU' },
  { word: '炎', code: 'FF' },
  { word: '吕', code: 'RR' },
  { word: '昌', code: 'AA' },
  { word: '早', code: 'AJ' },
  { word: '本', code: 'DM' },
  { word: '古', code: 'JR' },
  { word: '名', code: 'NIR' },
  { word: '好', code: 'VND' },
  { word: '休', code: 'OD' },
  { word: '信', code: 'OYR' },

  // Level 3: Common Words (3 codes)
  { word: '時', code: 'AGDI' },
  { word: '和', code: 'HDR' },
  { word: '地', code: 'GPD' },
  { word: '車', code: 'JWJ' },
  { word: '音', code: 'YTA' },
  { word: '想', code: 'DUP' },
  { word: '意', code: 'YTJP' },
  { word: '門', code: 'AN' }, // Wait, 門 is AN (2)
  { word: '問', code: 'ANR' },
  { word: '間', code: 'ANA' },
  { word: '聞', code: 'ANS' },
  { word: '開', code: 'ANT' },
  { word: '閉', code: 'ANDH' },
  
  // Level 4: Complex (4-5 codes)
  { word: '道', code: 'YTHU' },
  { word: '倉', code: 'OIR' },
  { word: '頡', code: 'GRMBC' },
  { word: '漢', code: 'ETO' },
  { word: '驗', code: 'SFOMO' },
  { word: '機', code: 'DII' },
  { word: '樹', code: 'DGBI' },
  { word: '橋', code: 'DHKB' },
  { word: '藥', code: 'TVHD' },
  { word: '麗', code: 'MMBBP' },
  { word: '龍', code: 'YBP' },
  { word: '龜', code: 'NXU' },
  { word: '電', code: 'MBHU' },
  { word: '話', code: 'YRHJR' },
  { word: '聽', code: 'SJJWP' }
];

export const TRANSLATIONS: Record<LangCode, Translations> = {
  ja: {
    flag: "🇯🇵",
    nav_home: "ホーム", nav_learn: "字母学習", nav_practice: "練習", nav_table: "一覧",
    home_title: "倉頡コード検索", home_desc: "知りたい漢字を入力すると、倉頡入力法での解体コードを表示します。", home_placeholder: "漢字を1文字入力してください",
    learn_title: "倉頡字母学習", learn_desc: "キーボードのキーを押して、字母と補助字形を確認しましょう。", learn_aux_title: "補助字形",
    practice_title: "解体トレーニング", practice_hint_prefix: "ヒント：", practice_instruction: "物理キーボードで倉頡字母を入力してください",
    btn_skip: "スキップ", table_title: "倉頡五大分類", footer_ref: "倉頡輸入法リファレンス準拠。",
    lookup_error: "データがありません", lookup_code: "倉頡コード: ",
    cats: { "哲理": "哲理", "筆画": "筆画", "人体": "人体", "字形": "字形", "特殊": "特殊" }
  },
  'zh-hans': {
    flag: "🇨🇳",
    nav_home: "首页", nav_learn: "字母学习", nav_practice: "练习", nav_table: "列表",
    home_title: "仓颉代码查询", home_desc: "输入您想了解的汉字，即可显示其仓颉输入法的拆解代码。", home_placeholder: "请输入一个汉字",
    learn_title: "仓颉字母学习", learn_desc: "按下键盘上的按键，查看字母及其辅助字形。", learn_aux_title: "辅助字形",
    practice_title: "拆解练习", practice_hint_prefix: "提示：", practice_instruction: "请使用物理键盘输入仓颉字母",
    btn_skip: "跳过", table_title: "仓颉五大分类", footer_ref: "参考 仓颉输入法 维基百科。",
    lookup_error: "未找到数据", lookup_code: "仓颉码: ",
    cats: { "哲理": "哲理", "筆画": "笔画", "人体": "人体", "字形": "字形", "特殊": "特殊" }
  },
  'zh-hant': {
    flag: "🇹🇼",
    nav_home: "首頁", nav_learn: "字母學習", nav_practice: "練習", nav_table: "列表",
    home_title: "倉頡代碼查詢", home_desc: "輸入您想了解的漢字，即可顯示其倉頡輸入法的拆解代碼。", home_placeholder: "請輸入一個漢字",
    learn_title: "倉頡字母學習", learn_desc: "按下鍵盤上的按鍵，查看字母及其補助字形。", learn_aux_title: "補助字形",
    practice_title: "拆解練習", practice_hint_prefix: "提示：", practice_instruction: "請使用物理鍵盤輸入倉頡字母",
    btn_skip: "跳過", table_title: "倉頡五大分類", footer_ref: "參考 倉頡輸入法 維基百科。",
    lookup_error: "未找到數據", lookup_code: "倉頡碼: ",
    cats: { "哲理": "哲理", "筆画": "筆畫", "人体": "人體", "字形": "字形", "特殊": "特殊" }
  },
  'zh-hk': {
    flag: "🇭🇰",
    nav_home: "首頁", nav_learn: "字母學習", nav_practice: "練習", nav_table: "一覽",
    home_title: "倉頡碼查詢", home_desc: "輸入你想了解嘅漢字，就顯示倉頡輸入法嘅拆碼。", home_placeholder: "請輸入一個漢字",
    learn_title: "倉頡字母學習", learn_desc: "撳下鍵盤按鍵，睇下字母同補助字形。", learn_aux_title: "補助字形",
    practice_title: "拆碼練習", practice_hint_prefix: "提示：", practice_instruction: "請使用鍵盤輸入倉頡字母",
    btn_skip: "跳過", table_title: "倉頡五大分類", footer_ref: "參考 倉頡輸入法 維基百科。",
    lookup_error: "搵唔到數據", lookup_code: "倉頡碼: ",
    cats: { "哲理": "哲理", "筆画": "筆畫", "人体": "人體", "字形": "字形", "特殊": "特殊" }
  }
};
