import test from 'ava';
import i18n from '../src/i18n';

const locales = {
  'fr-FR': {
    'hello': 'bonjour',
    'helloUser': 'bonjour {user}'
  },
  'zh-CN': {
    'hello': '你好',
    'helloUser': '你好 {user}'
  }
};

test('translate with only key', t => {
  const key = 'hello';
  t.is(i18n.translate(locales['fr-FR'], key), 'bonjour');
  t.is(i18n.translate(locales['zh-CN'], key), '你好');
});

test('translate with fallback message', t => {
  const key = 'hello';
  t.is(i18n.translate(locales['fr-FR'], key, 'o/'), 'bonjour');
  t.is(i18n.translate(locales['zh-CN'], key, 'o/'), '你好');
});

test('translate with data', t => {
  const key = 'helloUser';
  t.is(i18n.translate(locales['fr-FR'], key, '', {user: 'toto'}), 'bonjour toto');
  t.is(i18n.translate(locales['zh-CN'], key, '', {user: 'toto'}), '你好 toto');
});

test('translate with unknown key', t => {
  const key = 'unknown';
  t.is(i18n.translate(locales['fr-FR'], key), 'unknown');
  t.is(i18n.translate(locales['zh-CN'], key), 'unknown');
});

test('translate with unknown key and fallback message', t => {
  const key = 'unknown';
  t.is(i18n.translate(locales['fr-FR'], key, 'o/'), 'o/');
  t.is(i18n.translate(locales['zh-CN'], key, 'o/'), 'o/');
});

test('translate with undefined locale', t => {
  const key = 'hello';
  t.is(i18n.translate(locales['es-ES'], key), 'hello');
});

test('translate with undefined locale and fallback message', t => {
  const key = 'hello';
  t.is(i18n.translate(locales['es-ES'], key, 'o/'), 'o/');
});

test('translate with undefined locale and fallback message and data', t => {
  const key = 'helloUser';
  t.is(i18n.translate(locales['es-ES'], key, 'hello {user}', {user: 'toto'}), 'hello toto');
});

test('get best language', t=>{
  const navigatorLanguage = 'en-US';
  const languagesAvailable = ['en-US', 'fr-FR', 'zh-CN'];
  t.is(i18n.getBestLanguage(languagesAvailable, navigatorLanguage), 'en-US')
});

test('get best language with shortcut version', t=>{
  const navigatorLanguage = 'en';
  const languagesAvailable = ['en-US', 'fr-FR', 'zh-CN'];
  t.is(i18n.getBestLanguage(languagesAvailable, navigatorLanguage), 'en-US')
});

test('get best language with shortcut version reverse', t=>{
  const navigatorLanguage = 'fr-FR';
  const languagesAvailable = ['en', 'fr', 'zh'];
  t.is(i18n.getBestLanguage(languagesAvailable, navigatorLanguage), 'fr')
});

test('get best language fallback', t=>{
  const navigatorLanguage = 'es-ES';
  const languagesAvailable = ['en-US', 'fr-FR', 'zh-CN'];
  const defaultLanguage = 'en-US';
  t.is(i18n.getBestLanguage(languagesAvailable, navigatorLanguage, defaultLanguage), 'en-US')
});

test('get best language with two langs', t=>{
  const navigatorLanguage = 'zh-CN';
  const languagesAvailable = ['en', 'fr', 'zh', 'zh-CN'];
  t.is(i18n.getBestLanguage(languagesAvailable, navigatorLanguage), 'zh-CN')
});

test('get best language with minuscules (thanks Safari)', t=>{
  const navigatorLanguage = 'zh-cn';
  const languagesAvailable = ['en', 'fr', 'zh', 'zh-CN'];
  t.is(i18n.getBestLanguage(languagesAvailable, navigatorLanguage), 'zh-CN')
});

test('get best language with variant', t=>{
  const navigatorLanguage = 'zh-hk';
  const languagesAvailable = ['en', 'fr', 'zh', 'zh-CN'];
  t.is(i18n.getBestLanguage(languagesAvailable, navigatorLanguage), 'zh')
});
