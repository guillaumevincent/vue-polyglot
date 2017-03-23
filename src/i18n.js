export default {
  translate(locale, key, fallbackMessage, context){
    if (locale && key in locale) {
      return this.compile(locale[key], context);
    }
    if (fallbackMessage) {
      return this.compile(fallbackMessage, context);
    }
    return key;
  },
  compile(string, data){
    if (!data) {
      return string;
    }
    return string.replace(
      /{(\w*)}/g,
      (m, key) => {
        return data.hasOwnProperty(key) ? data[key] : '';
      }
    );
  },
  getBestLanguage(languagesAvailable, navigatorLanguage, defaultLanguage){
    for (let i = 0; i < languagesAvailable.length; i++) {
      const lang = languagesAvailable[i];
      const closeLanguages = lang.split('-')[0] === navigatorLanguage || navigatorLanguage.split('-')[0] === lang;
      if (lang === navigatorLanguage || closeLanguages) {
        return lang;
      }
    }
    return defaultLanguage;
  }
};
