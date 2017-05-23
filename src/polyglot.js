"use strict";
import axios from 'axios/dist/axios';
import i18n from '../src/i18n';

let vm;

export default {
  install(Vue, options = {languagesAvailable: [], defaultLanguage: 'en-US'}) {
    if (!vm) {
      vm = new Vue({
        data(){
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
          setLang({lang}) {
            this.lang = lang;
          },
          addLangInLanguagesAvailable({lang}) {
            if (this.languagesAvailable.indexOf(lang) === -1) {
              this.languagesAvailable.push(lang);
            }
          },
          setLocale({lang, locale}) {
            this.locales = Object.assign({}, this.locales, {[lang]: locale});
          },
          getLang(){
            const languagesAvailable = options.languagesAvailable;
            const navigatorLanguage = window.navigator.userLanguage || window.navigator.language;
            const defaultLanguage = options.defaultLanguage;
            return i18n.getBestLanguage(languagesAvailable, navigatorLanguage, defaultLanguage);
          },
          getLocale({baseURL = 'i18n', lang = 'auto', ext = '.json'} = {}){
            lang = lang === 'auto' ? this.getLang() : lang;
            if (lang !== options.defaultLanguage) {
              axios.get(`${baseURL}/${lang}${ext}`)
                .then(response => {
                  const locale = response.data;
                  this.setLocale({lang, locale});
                  this.setLang({lang});
                  this.addLangInLanguagesAvailable({lang});
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
