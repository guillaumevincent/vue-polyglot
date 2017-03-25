Vue.use(window.Polyglot.default, {
  defaultLanguage: 'en',
  languagesAvailable: ['fr', 'es', 'it', 'de']
});

Vue.locales({
  'fr': {
    'title': 'Vue-Polyglot en Français',
    'createdBy': 'Créé par {user}',
    'Load Chinese Translation': 'Charger la traduction en chinois',
  },
  'es': {
    'title': 'Vue-Polyglot en Español',
    'createdBy': 'Creado por {user}',
    'Load Chinese Translation': 'Cargar Traducción Chino'
  },
  'it': {
    'title': 'Vue-Polyglot in italiano',
    'createdBy': 'Creato da {user}',
    'Load Chinese Translation': 'Caricare Traduzione'

  },
  'de': {
    'title': 'Vue-Polyglot Deutsch',
    'createdBy': 'Erstellt von {user}',
    'Load Chinese Translation': 'Laden Chinesisch Übersetzung'
  }
});

new Vue({
  el: '#app',
  methods: {
    showAppIn: function(lang) {
      this.$polyglot.setLang({lang: lang});
    },
    getTranslationAndShowAppInChinese: function() {
      this.$polyglot.getLocale({lang: 'zh'});
    }
  },
  computed:{
    createdBy:function(){
      return this.$t('createdBy', 'Created by {user}', {user: 'Guillaume Vincent (@guillaume20100)'});
    }
  }
});

