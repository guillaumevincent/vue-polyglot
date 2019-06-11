import i18n from "./i18n";

let vm;

export function install(
  Vue,
  options = { languagesAvailable: [], defaultLanguage: "en-US" }
) {
  if (!vm) {
    vm = new Vue({
      data() {
        return {
          languagesAvailable: options.languagesAvailable,
          defaultLanguage: options.defaultLanguage,
          lang: this.getLang(),
          locales: {}
        };
      },

      computed: {
        locale() {
          if (!this.locales[this.lang]) {
            return null;
          }
          return this.locales[this.lang];
        }
      },

      methods: {
        setLang({ lang }) {
          this.lang = lang;
        },
        setLocale({ lang, locale }) {
          this.locales = Object.assign({}, this.locales, { [lang]: locale });
        },
        extendLocales(locales) {
          Object.keys(locales).forEach(lang => {
            const locale = this.locales.hasOwnProperty(lang)
              ? Object.assign({}, this.locales[lang], locales[lang])
              : locales[lang];
            this.setLocale({ lang, locale });
          });
        },
        getLang() {
          const languagesAvailable = options.languagesAvailable;
          const navigatorLanguage =
            window.navigator.userLanguage || window.navigator.language;
          const defaultLanguage = options.defaultLanguage;
          return i18n.getBestLanguage(
            languagesAvailable,
            navigatorLanguage,
            defaultLanguage
          );
        },
        _translate(key, fallbackMessage, data) {
          return i18n.translate(this.locale, key, fallbackMessage, data);
        }
      }
    });

    Vue.prototype.$polyglot = vm;
  }

  Vue.mixin({
    methods: {
      $t(key, fallbackMessage, data) {
        return this.$polyglot._translate(key, fallbackMessage, data);
      }
    }
  });

  Vue.locales = locales => {
    Object.keys(locales).forEach(lang => {
      vm.$polyglot.setLocale({ lang, locale: locales[lang] });
    });
  };
}
