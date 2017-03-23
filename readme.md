[![Build Status](https://travis-ci.org/guillaumevincent/vue-polyglot.svg?branch=master)](https://travis-ci.org/guillaumevincent/vue-polyglot)

> basic translation plugin for VueJS 2+

## Vue-Polyglot v0.1.0

:construction: this plugin is in construction, so API can change.
Wait for version 1.0.0 for production use.

## Installation

    npm install vue-polyglot

## Is it like Vue-i18n or Vue-Translate?

Vue-Polyglot is also a plugin used to translate your pages. 
So yes it's like Vue-i18n or Vue-Translate but the API corresponds to my needs.

## TLDR

 * can load translation asynchronously with HTTP requests (use `axios` module)
 
 * guess browser language and use it automatically
 
 * default message directly in your component
 
    `{{ $t('error_684', 'User already exists') }}`
 
 * load data in translation
 
    `this.$t('helloUser', 'hello {user}', {user: 'toto'})` > _hello toto_

## Example

```html
<body>
<div id="test">
  <p>lang: {{this.$polyglot.lang}}</p>
  <p>$t('hello', 'Hello !'): {{$t('hello', 'Hello !')}}</p>
  <p>$t('helloUser', 'hello {user}', {user: 'toto'}): {{$t('helloUser', 'hello {user}', {user: 'toto'})}}</p>
  <button v-on:click="showAppInChinese">show App in Chinese</button>
</div>

<script>
  Vue.use(Polyglot, {
    defaultLanguage: 'en',
    languagesAvailable: ['zh', 'fr']
  });

  Vue.locales({
    'fr': {
      'hello': 'bonjour',
      'helloUser': 'bonjour {user}'
    },
    'zh': {
      'hello': '你好',
      'helloUser': '你好 {user}'
    }
  });

  new Vue({
    el: '#test',
    methods: {
      showAppInChinese() {
        this.$polyglot.setLang('zh');
      }
    }
  })
</script>
</body>
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
    'helloUser': 'bonjour {user}'
  },
  'zh': {
    'hello': '你好',
    'helloUser': '你好 {user}'
  }
})
```

### $t(key[, fallbackMessage][, data])

| browser locale | translation key | translated text |
| --- | --- | ---- |
|`en-US` | `$t('hello')` | _hello_ |
|`zh-CN` | `$t('hello')` | _你好_ |
|`fr-FR` | `$t('hello')` | _bonjour_ |
|`en-US` | `$t('hello', 'Hello !')` | _Hello !_ |
|`es-ES` | `$t('helloUser', 'hello {user}', {user: 'toto'})` | _hello toto_ |
|`fr-FR` | `$t('helloUser', 'hello {user}', {user: 'toto'})` | _bonjour toto_ |


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

#### this.$polyglot.getLocales(options = {baseURL = 'i18n', lang = 'auto'})

```js
Vue.use(Polyglot, {
  defaultLanguage: 'en',
  languagesAvailable: ['zh', 'fr']
});

new Vue({
    el: '#test',
    beforeCreate() {
      this.$polyglot.getLocales({baseURL: 'dist/i18n'});
    },
    methods: {
      getTranslationAndShowAppInChinese() {
        this.$polyglot.getLocales({lang: 'zh'});
      }
    }
  })
```

It will load asynchronously translations using browser's language.  
For example if browser language is `fr-FR`, languages available are `['zh', 'fr']`, `this.$polyglot.getLocales('dist/i18n')` will get translations from `/dist/i18n/fr.json` file.


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

## Similar plugin

Vue-Polyglot is similar to [Vue-Translate](https://github.com/javisperez/vuetranslate)


## License

License MIT (see [LICENSE](LICENSE) file)
