import { CangjieChar, PracticeItem, Translations, LangCode } from './types';

// Keeping the interface but removing the hardcoded dictionary to be fetched via JSON
export const CANGJIE_DATA: CangjieChar[] = [
  { key: 'A', char: '日', cat: '哲理', aux: ['日', '曰'], desc_ja: '太陽、丸い形、または横に分割された形。日の形を基本とする。', desc_zh: '太阳、圆形或横向分割的形状。', desc_en: 'Sun, round shape, or horizontally split shape. Based on the sun character.' },
  { key: 'B', char: '月', cat: '哲理', aux: ['月', '冂', '冖', '冉'], desc_ja: '月、肉体、または「冂」のような囲いに関連する形。', desc_zh: '月亮、肉体或「冂」形的框架。', desc_en: 'Moon, flesh, or enclosure like "冂".' },
  { key: 'C', char: '金', aux: ['金', 'ハ', '儿', '丷'], cat: '哲理', desc_ja: '金属、鋭い角、または「ハ」のように下に開いた形。', desc_zh: '金属、尖角或「ハ」形。', desc_en: 'Gold/Metal, sharp corners, or shapes opening downwards like "ハ".' },
  { key: 'D', char: '木', aux: ['木', '十', '寸'], cat: '哲理', desc_ja: '木、または「十」の字のように交差する形。', desc_zh: '树木、交叉 or 「十」字形。', desc_en: 'Wood/Tree, or crossed shapes like "十".' },
  { key: 'E', char: '水', aux: ['水', '氵', '又'], cat: '哲理', desc_ja: '水、さんずい、または「又」のような形。', desc_zh: '水、三点水或「又」形。', desc_en: 'Water, three dots water radical, or shapes like "又".' },
  { key: 'F', char: '火', aux: ['火', '灬', '小'], cat: '哲理', desc_ja: '火、れんが（四つ点）、または「小」の形。', desc_zh: '火、四点底或「小」字形。', desc_en: 'Fire, four dots radical, or "小" shape.' },
  { key: 'G', char: '土', aux: ['土', '士'], cat: '哲理', desc_ja: '土、または「士」のような縦横の交差。', desc_zh: '土、土地或「士」字。', desc_en: 'Earth/Soil, or cross shapes like "士".' },
  { key: 'H', char: '竹', aux: ['竹', 'ノ', '斤'], cat: '筆画', desc_ja: '短い斜線、払いの形。「ノ」の筆画。', desc_zh: '短斜线、撇或竹字头。', desc_en: 'Bamboo, short slant (stroke), or "ノ" shape.' },
  { key: 'I', char: '戈', aux: ['戈', '丶', '广'], cat: '筆画', desc_ja: '点、あるいは「戈」のような斜めの点。', desc_zh: '点、勾或带有「丶」的形状。', desc_en: 'Dot, or hook/slant dot shapes.' },
  { key: 'J', char: '十', aux: ['十', '宀', '耂'], cat: '筆画', desc_ja: '十字、または「宀」のように上を覆う形。', desc_zh: '十字架或「宀」形的盖子。', desc_en: 'Cross, or roof shape "宀".' },
  { key: 'K', char: '大', aux: ['大', '乂', '犭'], cat: '筆画', desc_ja: '「大」の形、三又の交差。', desc_zh: '大、叉或类似形状。', desc_en: 'Big, "X" shape, or crossed strokes.' },
  { key: 'L', char: '中', aux: ['中', '丨', '衤'], cat: '筆画', desc_ja: '縦棒、中心を貫く線。', desc_zh: '中、竖线或贯穿中心的笔画。', desc_en: 'Middle, vertical line.' },
  { key: 'M', char: '一', aux: ['一', '厂', '石'], cat: '筆画', desc_ja: '横棒、土台、または水平な線。', desc_zh: '横、地平线或水平笔画。', desc_en: 'One, horizontal line, or floor.' },
  { key: 'N', char: '弓', aux: ['弓', '乙', '亅', 'マ'], cat: '筆画', desc_ja: '曲がった線、フック、折れ曲がりの筆画。', desc_zh: '折、勾或弯曲笔画。', desc_en: 'Bow, hook, or turning stroke.' },
  { key: 'O', char: '人', aux: ['人', '亻', '入'], cat: '人体', desc_ja: '人、にんべん、または左右に分かれる形。', desc_zh: '人、单人旁或侧面的人。', desc_en: 'Person, single person radical, or splitting shapes.' },
  { key: 'P', char: '心', aux: ['心', '忄', '勹', '匕'], cat: '人体', desc_ja: '心、りっしんべん、または包むような形。', desc_zh: '心、竖心旁或包含在内的形状。', desc_en: 'Heart, vertical heart radical, or enclosing shapes.' },
  { key: 'Q', char: '手', aux: ['手', '扌', 'キ'], cat: '人体', desc_ja: '手、てへん、または突き出す線。', desc_zh: '手、提手旁或向外伸展的形状。', desc_en: 'Hand, hand radical, or projecting shapes.' },
  { key: 'R', char: '口', aux: ['口'], cat: '人体', desc_ja: '四角い囲みの形。', desc_zh: '口、矩形或开口形状。', desc_en: 'Mouth, square, or opening shapes.' },
  { key: 'S', char: '尸', aux: ['尸', 'コ', '匚', '乙'], cat: '字形', desc_ja: '死体、屋根、または「コ」の字の形。', desc_zh: '尸、外框或折形。', desc_en: 'Corpse, frame, or "コ" shape.' },
  { key: 'T', char: '廿', aux: ['廿', '艹', '共'], cat: '字形', desc_ja: '20、くさかんむり、または二本の縦棒。', desc_zh: '二十、草字头 or 双竖线。', desc_en: 'Twenty, grass radical, or double vertical lines.' },
  { key: 'U', char: '山', aux: ['山', '凵', '屮'], cat: '字形', desc_ja: '上に開いた器、または山のような形。', desc_zh: '山、上开口或向上突出的形状。', desc_en: 'Mountain, upward opening container.' },
  { key: 'V', char: '女', aux: ['女', 'レ', 'く', '巛'], cat: '字形', desc_ja: '女、あるいは「く」の字型の折れ。', desc_zh: '女、撇折或类似形状。', desc_en: 'Woman, or "V" / "く" shaped folds.' },
  { key: 'W', char: '田', aux: ['田', '囗', '毋'], cat: '字形', desc_ja: '中に十字がある四角、または「囗」。', desc_zh: '田、围框或内部有东西的矩形。', desc_en: 'Field, enclosure "囗", or rectangle with contents.' },
  { key: 'X', char: '難', aux: ['難'], cat: '特殊', desc_ja: '例外的な字形、または複雑で分解できない部分。', desc_zh: '特殊字符、难以拆解的笔画。', desc_en: 'Difficult/Special, complex shapes.' },
  { key: 'Y', char: '卜', aux: ['卜', 'ト', '辶'], cat: '字形', desc_ja: '占い、点と線、しんにょう。', desc_zh: '卜、点与线、走之底。', desc_en: 'Divination, dot and line, or movement radical "辶".' }
];

export const KEYBOARD_LAYOUT = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"]
];

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
  { word: '門', code: 'AN' }, 
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
    nav_home: "ホーム", nav_learn: "字母学習", nav_practice: "練習", nav_table: "一覧", nav_rules: "入力規則",
    home_title: "倉頡コード検索", home_desc: "知りたい漢字を入力すると、倉頡入力法での解体コードを表示します。", home_placeholder: "漢字を1文字入力してください",
    learn_title: "倉頡字母学習", learn_desc: "キーボードのキーを押して、字母と補助字形を確認しましょう。", learn_aux_title: "補助字形",
    practice_title: "解体トレーニング", practice_hint_prefix: "ヒント：", practice_instruction: "物理キーボードで倉頡字母を入力してください",
    btn_skip: "スキップ", table_title: "倉頡五大分類", rules_title: "入力規則と原則", rules_desc: "倉頡入力法における文字の分解ルールとコード取得の基本原則。",
    footer_ref: "倉頡輸入法リファレンス準拠。",
    lookup_error: "データがありません", lookup_code: "倉頡コード: ",
    cats: { "哲理": "哲理", "筆画": "筆画", "人体": "人体", "字形": "字形", "特殊": "特殊" },
    extended_mode_label: "拡張辞書（古字）", extended_mode_desc: "全字庫（CNS11643）などの古字・稀有文字を含めて検索します。データの読み込みに時間がかかる場合があります。", loading_extended: "拡張辞書を読み込み中...",
    rules_list: [
        {
            title: "基本原則：取碼方向",
            desc: "文字は基本的に「上から下へ」「左から右へ」「外から内へ」の順序でコードを取ります。",
            examples: [{char: "吉", code: "GR", note: "土(G) → 口(R) (上から下)"}, {char: "明", code: "AB", note: "日(A) → 月(B) (左から右)"}, {char: "国", code: "WIRM", note: "囗(W) → 玉(IRM) (外から内)"}]
        },
        {
            title: "連体字（ひとつの塊）",
            desc: "部品に分かれない文字は、最大4コードまで取ります。4コードを超える場合は「最初、2番目、3番目、最後」のコードを取ります。",
            examples: [{char: "鳥", code: "HAF", note: "全コード"}, {char: "雨", code: "MLBY", note: "全コード"}]
        },
        {
            title: "分体字（左右や上下に分かれる）",
            desc: "文字が「体（Body）」と「用（Remainder）」に分かれる場合、最大5コードを取ります。通常は「体」から最初と最後、「用」から最初・2番目・最後を取ります。",
            examples: [{char: "時", code: "AGDI", note: "日(A) + 寺(GDI)"}, {char: "話", code: "YRHJR", note: "言(YR) + 舌(HJR)"}]
        }
    ]
  },
  'zh-hans': {
    flag: "🇨🇳",
    nav_home: "首页", nav_learn: "字母学习", nav_practice: "练习", nav_table: "列表", nav_rules: "输入规则",
    home_title: "仓颉代码查询", home_desc: "输入您想了解的汉字，即可显示其仓颉输入法的拆解代码。", home_placeholder: "请输入一个汉字",
    learn_title: "仓颉字母学习", learn_desc: "按下键盘上的按键，查看字母及其辅助字形。", learn_aux_title: "辅助字形",
    practice_title: "拆解练习", practice_hint_prefix: "提示：", practice_instruction: "请使用物理键盘输入仓颉字母",
    btn_skip: "跳过", table_title: "仓颉五大分类", rules_title: "取码规则与原则", rules_desc: "了解仓颉输入法的基本拆字规则和取码顺序。",
    footer_ref: "参考 仓颉输入法 维基百科。",
    lookup_error: "未找到数据", lookup_code: "仓颉码: ",
    cats: { "哲理": "哲理", "筆画": "笔画", "人体": "人体", "字形": "字形", "特殊": "特殊" },
    extended_mode_label: "扩展字典（古籍）", extended_mode_desc: "包括全字库（CNS11643）等古籍和罕见字符。数据加载可能需要一些时间。", loading_extended: "正在加载扩展字典...",
    rules_list: [
        {
            title: "基本原则：取码方向",
            desc: "取码顺原则为「由上而下」、「由左而右」、「由外而内」。",
            examples: [{char: "吉", code: "GR", note: "由上而下"}, {char: "明", code: "AB", note: "由左而右"}, {char: "国", code: "WIRM", note: "由外而内"}]
        },
        {
            title: "连体字",
            desc: "凡字之字形不能拆分者为连体字。取码上限为4码。若超过4码，取首、二、三、尾码。",
            examples: [{char: "鳥", code: "HAF", note: "全码"}, {char: "雨", code: "MLBY", note: "全码"}]
        },
        {
            title: "分体字",
            desc: "凡字身可拆分为两部分（字首、字身）者。取码上限为5码。通常取字首之首尾，字身之首二尾。",
            examples: [{char: "時", code: "AGDI", note: "日(A) + 寺(GDI)"}, {char: "話", code: "YRHJR", note: "言(YR) + 舌(HJR)"}]
        }
    ]
  },
  'zh-hant': {
    flag: "🇹🇼",
    nav_home: "首頁", nav_learn: "字母學習", nav_practice: "練習", nav_table: "列表", nav_rules: "輸入規則",
    home_title: "倉頡代碼查詢", home_desc: "輸入您想了解的漢字，即可顯示其倉頡輸入法的拆解代碼。", home_placeholder: "請輸入一個漢字",
    learn_title: "倉頡字母學習", learn_desc: "按下鍵盤上的按鍵，查看字母及其補助字形。", learn_aux_title: "補助字形",
    practice_title: "拆解練習", practice_hint_prefix: "提示：", practice_instruction: "請使用物理鍵盤輸入倉頡字母",
    btn_skip: "跳過", table_title: "倉頡五大分類", rules_title: "取碼規則與原則", rules_desc: "了解倉頡輸入法的基本拆字規則和取碼順序。",
    footer_ref: "參考 倉頡輸入法 維基百科。",
    lookup_error: "未找到數據", lookup_code: "倉頡碼: ",
    cats: { "哲理": "哲理", "筆画": "筆畫", "人体": "人體", "字形": "字形", "特殊": "特殊" },
    extended_mode_label: "擴展字典（古籍）", extended_mode_desc: "包括全字庫（CNS11643）等古籍和罕見字符。數據加載可能需要一些時間。", loading_extended: "正在加載擴展字典...",
    rules_list: [
        {
            title: "基本原則：取碼方向",
            desc: "取碼順原則為「由上而下」、「由左而右」、「由外而內」。",
            examples: [{char: "吉", code: "GR", note: "由上而下"}, {char: "明", code: "AB", note: "由左而右"}, {char: "国", code: "WIRM", note: "由外而內"}]
        },
        {
            title: "連體字",
            desc: "凡字之字形不能拆分者為連體字。取碼上限為4碼。若超過4碼，取首、二、三、尾碼。",
            examples: [{char: "鳥", code: "HAF", note: "全碼"}, {char: "雨", code: "MLBY", note: "全碼"}]
        },
        {
            title: "分體字",
            desc: "凡字身可拆分為兩部分（字首、字身）者。取碼上限為5碼。通常取字首之首尾，字身之首二尾。",
            examples: [{char: "時", code: "AGDI", note: "日(A) + 寺(GDI)"}, {char: "話", code: "YRHJR", note: "言(YR) + 舌(HJR)"}]
        }
    ]
  },
  'zh-hk': {
    flag: "🇭🇰",
    nav_home: "首頁", nav_learn: "字母學習", nav_practice: "練習", nav_table: "一覽", nav_rules: "輸入規則",
    home_title: "倉頡碼查詢", home_desc: "輸入你想了解嘅漢字，就顯示倉頡輸入法嘅拆碼。", home_placeholder: "請輸入一個漢字",
    learn_title: "倉頡字母學習", learn_desc: "撳下鍵盤按鍵，睇下字母同補助字形。", learn_aux_title: "補助字形",
    practice_title: "拆碼練習", practice_hint_prefix: "提示：", practice_instruction: "請使用鍵盤輸入倉頡字母",
    btn_skip: "跳過", table_title: "倉頡五大分類", rules_title: "取碼規則", rules_desc: "睇下倉頡輸入法點樣拆碼。",
    footer_ref: "參考 倉頡輸入法 維基百科。",
    lookup_error: "搵唔到數據", lookup_code: "倉頡碼: ",
    cats: { "哲理": "哲理", "筆画": "筆畫", "人体": "人體", "字形": "字形", "特殊": "特殊" },
    extended_mode_label: "擴展字典（古字）", extended_mode_desc: "包埋全字庫（CNS11643）嘅古字同罕見字。要等多陣先load完。", loading_extended: "Load緊擴展字典...",
    rules_list: [
        {
            title: "基本原則：取碼方向",
            desc: "取碼方向主要係「由上而下」、「由左而右」、「由外而內」。",
            examples: [{char: "吉", code: "GR", note: "由上而下"}, {char: "明", code: "AB", note: "由左而右"}, {char: "国", code: "WIRM", note: "由外而內"}]
        },
        {
            title: "連體字",
            desc: "如果個字拆唔開，就係連體字。最多取4碼。如果多過4碼，取頭、二、三、尾碼。",
            examples: [{char: "鳥", code: "HAF", note: "全碼"}, {char: "雨", code: "MLBY", note: "全碼"}]
        },
        {
            title: "分體字",
            desc: "個字分得開（字首、字身）就係分體字。最多取5碼。通常字首取頭尾，字身取頭二尾。",
            examples: [{char: "時", code: "AGDI", note: "日(A) + 寺(GDI)"}, {char: "話", code: "YRHJR", note: "言(YR) + 舌(HJR)"}]
        }
    ]
  },
  'en': {
    flag: "🇺🇸",
    nav_home: "Home", nav_learn: "Learn", nav_practice: "Practice", nav_table: "Table", nav_rules: "Rules",
    home_title: "Cangjie Lookup", home_desc: "Enter a character to see its Cangjie decomposition.", home_placeholder: "Enter a character",
    learn_title: "Learn Radicals", learn_desc: "Press keyboard keys to see radicals and auxiliary shapes.", learn_aux_title: "Auxiliary Shapes",
    practice_title: "Decomposition Practice", practice_hint_prefix: "Hint: ", practice_instruction: "Type the Cangjie codes using your physical keyboard",
    btn_skip: "Skip", table_title: "The 5 Categories", rules_title: "Rules & Principles", rules_desc: "Basic principles of decomposition and code selection in Cangjie.",
    footer_ref: "Based on Cangjie Input Method Wikipedia.",
    lookup_error: "Data not found", lookup_code: "Cangjie Code: ",
    cats: { "哲理": "Philosophical", "筆画": "Strokes", "人体": "Body", "字形": "Shapes", "特殊": "Special" },
    extended_mode_label: "Extended Dictionary (Ancient)", extended_mode_desc: "Includes ancient and rare characters from CNS11643. Data loading may take some time.", loading_extended: "Loading extended dictionary...",
    rules_list: [
        {
            title: "Basic Principle: Direction",
            desc: "General direction: Top to Bottom, Left to Right, Outside to Inside.",
            examples: [{char: "吉", code: "GR", note: "Top to Bottom"}, {char: "明", code: "AB", note: "Left to Right"}, {char: "国", code: "WIRM", note: "Outside to Inside"}]
        },
        {
            title: "Connected Characters",
            desc: "Characters that cannot be split. Max 4 codes (First, Second, Third, Last).",
            examples: [{char: "鳥", code: "HAF", note: "Full Code"}, {char: "雨", code: "MLBY", note: "Full Code"}]
        },
        {
            title: "Separated Characters",
            desc: "Characters that can be split into Body and Remainder. Max 5 codes. Body: First, Last; Remainder: First, Second, Last.",
            examples: [{char: "時", code: "AGDI", note: "Sun(A) + Temple(GDI)"}, {char: "話", code: "YRHJR", note: "Speech(YR) + Tongue(HJR)"}]
        }
    ]
  }
};