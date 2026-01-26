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

export interface RuleExample {
  char: string;
  code: string;
  note?: string;
}

export interface RuleItem {
  title: string;
  desc: string;
  examples: RuleExample[];
}

export interface Translations {
  flag: string;
  nav_home: string;
  nav_learn: string;
  nav_practice: string;
  nav_table: string;
  nav_rules: string;
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
  rules_title: string;
  rules_desc: string;
  footer_ref: string;
  lookup_error: string;
  lookup_code: string;
  cats: Record<string, string>;
  rules_list: RuleItem[];
}

export type TabId = 'home' | 'learn' | 'practice' | 'table' | 'rules';