[![Build Status](https://travis-ci.org/guillaumevincent/vue-polyglot.svg?branch=master)](https://travis-ci.org/guillaumevincent/vue-polyglot)

> basic translation plugin for VueJS 2+

## Vue-Polyglot

## Installation

    npm install --save vue-polyglot

## TLDR

 * can load translation asynchronously with HTTP requests (use `axios` module)
 
 * guess browser language and use it automatically
 
 * default message directly in your component
 
    `{{ $t('error_684', 'User already exists') }}`
 
 * load data in translation
 
    `this.$t('helloUser', 'hello {user}', {user: 'toto'})` > _hello toto_
    
### Disclaimer:

This is not a plugin to integrate AirBnb's [Polyglot.js](http://airbnb.io/polyglot.js/) into Vue, but a different implementation of its own.

## Demo

[demo](https://guillaumevincent.github.io/vue-polyglot/example/)

## Example

```html
<div id="app">
  <h1>{{$t('title', 'Vue-Polyglot in English')}}</h1>
  <p>{{ createdBy }}</p>
  <p>
    <button type="button"
            v-for="lang in this.$polyglot.languagesAvailable"
            v-on:click="showAppIn(lang)">
      {{lang}}
    </button>
  </p>
</div>
```

```js
import Polyglot from 'vue-polyglot';

Vue.use(window.Polyglot.default, {
  defaultLanguage: 'en',
  languagesAvailable: ['fr', 'es']
});

Vue.locales({
  'fr': {
    'title': 'Vue-Polyglot en Français',
    'createdBy': 'Créé par {user}',
  },
  'es': {
    'title': 'Vue-Polyglot en Español',
    'createdBy': 'Creado por {user}',
  }
});

new Vue({
  el: '#app',
  methods: {
    showAppIn: function(lang) {
      this.$polyglot.setLang({lang: lang});
    }
  },
  computed: {
    createdBy: function() {
      return this.$t('createdBy', 'Created by {user}', {user: 'Guillaume Vincent (@guillaume20100)'});
    }
  }
});
```

## API

```js
Vue.use(Polyglot, {
  defaultLanguage: 'en',
  languagesAvailable: ['zh', 'fr']
});

Vue.locales({
  'fr': {
    'hello': 'bonjour',
    'hiUser': 'bonjour {user}'
  },
  'zh': {
    'hello': '你好',
    'hiUser': '你好 {user}'
  }
})
```

### $t(key[, fallbackMessage][, data])

| browser locale | method | translated text |
| --- | --- | ---- |
|`en-US` | `$t('hello')` | _hello_ |
|`zh-CN` | `$t('hello')` | _你好_ |
|`fr-FR` | `$t('hello')` | _bonjour_ |
|`en-US` | `$t('hello', 'Hello !')` | _Hello !_ |
|`es-ES` | `this.$t('hiUser', 'hi {user}', {user: 'Guillaume'})` | _hi Guillaume_ |
|`fr-FR` | `this.$t('hiUser', 'hi {user}', {user: 'Guillaume'})` | _bonjour Guillaume_ |


### Loading translations synchronously

Set locales with `Vue.locales` option in your app:

```js
Vue.locales({
  'fr': {
    'hello world': 'bonjour monde'
  },
  'zh': {
    'hello world': '你好，世界'
  }
});
```

### Loading translation file asynchronously

#### this.$polyglot.getLocale(options = {baseURL = 'i18n', lang = 'auto', ext = '.json'})

```js
Vue.use(Polyglot, {
  defaultLanguage: 'en',
  languagesAvailable: ['zh', 'fr']
});

new Vue({
    el: '#test',
    beforeCreate() {
      this.$polyglot.getLocale({baseURL: 'dist/i18n'});
    },
    methods: {
      getTranslationAndShowAppInChinese() {
        this.$polyglot.getLocale({lang: 'zh'});
      }
    }
  })
```

It will load asynchronously translations using browser's language.  
For example if browser language is `fr-FR`, languages available are `['zh', 'fr']`, `this.$polyglot.getLocale({baseURL: 'dist/i18n'})` will get translation from `dist/i18n/fr.json` file.

`this.$polyglot.getLocale({lang: 'zh'})` will get translation from `i18n/zh.json` file.


### Extend translations synchronously
Vue.locales replace all locales. If you want to update translations use `extendLocales` method instead:

```js
this.$polyglot.extendLocales({
  'fr': {
    'title': 'Vue-Polyglot en Français (🦄🖐️)'
  },
  'es': {
    'title': 'Vue-Polyglot en Español (🦄🖐️)',
  },
  'zh': {
    'title': 'Vue-Polyglot在中国 (🦄🖐️)',
  }
});
```

### Changing the language to use

Use the `setLang` method of the `$polyglot` property, like this:
```js
Vue.component({
  methods: {
    showAppInChinese() {
      this.$polyglot.setLang({lang: 'zh'});
    }
  }
});
```

## Utils

See [Vue-Polyglot-Utils](https://github.com/guillaumevincent/vue-polyglot-utils)

## Similar plugin

 * [vue-i18n](https://github.com/kazupon/vue-i18n)
 * [VueTranslate](https://github.com/javisperez/vuetranslate)


## License

License MIT (see [LICENSE](LICENSE) file)
