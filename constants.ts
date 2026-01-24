import { CangjieChar, PracticeItem, Translations, LangCode } from './types';

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

export const PRACTICE_LIST: PracticeItem[] = [
  { word: '明', code: 'AB' }, { word: '林', code: 'DD' },
  { word: '信', code: 'OYR' }, { word: '想', code: 'DUP' },
  { word: '和', code: 'HDR' }, { word: '地', code: 'GPD' },
  { word: '時', code: 'AGDI' }, { word: '門', code: 'AN' },
  { word: '車', code: 'JWJ' }, { word: '音', code: 'YTA' },
  { word: '道', code: 'YTHU' }, { word: '倉', code: 'OIR' }
];

export const DICTIONARY: Record<string, string> = {
  '明': 'AB', '林': 'DD', '信': 'OYR', '想': 'DUP',
  '和': 'HDR', '地': 'GPD', '時': 'AGDI', '門': 'AN',
  '車': 'JWJ', '音': 'YTA', '道': 'YTHU', '倉': 'OIR',
  '頡': 'GRMBC', '漢': 'ETO', '字': 'JND', '学': 'HBD',
  '習': 'SMA', '日': 'A', '月': 'B'
};

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
