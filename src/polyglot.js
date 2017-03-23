import axios from 'axios';
import i18n from '../src/i18n';

let vm = null;

module.exports = {
  install(Vue, options = {languagesAvailable: [], defaultLanguage: 'en-US'}) {
    if (!vm) {
      vm = new Vue({
        data(){
          return {
            lang: this.getLang(),
            locales: {}
          };
        },

        computed: {
          lang() {
            return this.lang;
          },
          locale() {
            if (!this.locales[this.lang]) {
              return null;
            }
            return this.locales[this.lang];
          }
        },

        methods: {
          setLang({lang}) {
            this.lang = lang;
          },
          setLocale({lang, locale}) {
            this.locales = Object.assign({}, this.locales, {[lang]: locale});
          },
          getLang(){
            const languagesAvailable = options.languagesAvailable;
            const navigatorLanguage = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
            const defaultLanguage = options.defaultLanguage;
            return i18n.getBestLanguage(languagesAvailable, navigatorLanguage, defaultLanguage);
          },
          getLocales({baseURL = 'i18n', lang = this.getLang()} = {}){
            if (lang !== options.defaultLanguage) {
              return axios
                .get(`${baseURL}/${lang}.json`)
                .then(response => {
                  const locale = response.data;
                  this.setLang({lang});
                  this.setLocale({lang, locale});
                  return {lang, locale};
                });
            }
          },
          _t(key, fallbackMessage, data) {
            return i18n.translate(this.locale, key, fallbackMessage, data);
          },
        }
      });

      Vue.prototype.$polyglot = vm;
    }

    Vue.mixin({
      methods: {
        $t(key, fallbackMessage, data) {
          return this.$polyglot._t(key, fallbackMessage, data);
        }
      }
    });

    Vue.locales = (locales) => {
      Object.keys(locales).forEach(function(lang) {
        vm.$polyglot.setLocale({lang, locale: locales[lang]});
      })
    };
  }
};
