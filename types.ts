export type LangCode = 'ja' | 'zh-hans' | 'zh-hant' | 'zh-hk';

export interface CangjieChar {
  key: string;
  char: string;
  cat: '哲理' | '筆画' | '人体' | '字形' | '特殊';
  aux: string[];
  desc_ja: string;
  desc_zh: string;
}

export interface PracticeItem {
  word: string;
  code: string;
}

export interface Translations {
  flag: string;
  nav_home: string;
  nav_learn: string;
  nav_practice: string;
  nav_table: string;
  home_title: string;
  home_desc: string;
  home_placeholder: string;
  learn_title: string;
  learn_desc: string;
  learn_aux_title: string;
  practice_title: string;
  practice_hint_prefix: string;
  practice_instruction: string;
  btn_skip: string;
  table_title: string;
  footer_ref: string;
  lookup_error: string;
  lookup_code: string;
  cats: Record<string, string>;
}

export type TabId = 'home' | 'learn' | 'practice' | 'table';
