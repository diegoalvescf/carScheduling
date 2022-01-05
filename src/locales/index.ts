import {NativeModules, Platform} from 'react-native';

import I18n from 'i18n-js';
import { en } from './en-US';
import { pt } from './pt-BR';
import { es } from './es';

const normalizeTranslate = {
  // ingles
  en: 'en_US',
  en_US: 'en_US',
  en_BZ: 'en_US',
  en_CA: 'en_US',
  en_CB: 'en_US',
  en_GB: 'en_US',
  en_IE: 'en_US',
  en_JM: 'en_US',
  en_NZ: 'en_US',
  en_PH: 'en_US',
  en_TT: 'en_US',
  en_ZA: 'en_US',
  en_AU: 'en_US',
  en_ZW: 'en_US',
  // Portugues
  pt_US: 'pt_BR',
  pt_BR: 'pt_BR',
  pt_PT: 'pt_BR',
  // Espanhol
  es: 'es_BR',
  es_BR: 'es_BR',
  es_AR: 'es_BR',
  es_BO: 'es_BR',
  es_CL: 'es_BR',
  es_CO: 'es_BR',
  es_CR: 'es_BR',
  es_DO: 'es_BR',
  es_EC: 'es_BR',
  es_ES: 'es_BR',
  es_GT: 'es_BR',
  es_HN: 'es_BR',
  es_MX: 'es_BR',
  es_NI: 'es_BR',
  es_PA: 'es_BR',
  es_PE: 'es_BR',
  es_PR: 'es_BR',
  es_PY: 'es_BR',
  es_SV: 'es_BR',
  es_UY: 'es_BR',
  es_VE: 'es_BR',
};

type NormalizeTranslate = keyof typeof normalizeTranslate;

const getLanguageByDevice = (): NormalizeTranslate =>
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;

I18n.fallbacks = true;

I18n.translations = {
  en_US: en,
  pt_BR: pt,
  es_BR: es,
};

const setLanguageToI18n = () => {
  const language = getLanguageByDevice();
  const translateNormalize = normalizeTranslate[language];
  const iHaveThisLanguage = I18n.translations.hasOwnProperty(
    translateNormalize,
  );
  iHaveThisLanguage
    ? (I18n.locale = translateNormalize)
    : (I18n.defaultLocale = 'en_US');
};

setLanguageToI18n();

export const translate = (key: string) => I18n.t(key);