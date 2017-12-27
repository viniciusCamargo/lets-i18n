## How to use

Wrap your component tree with the `TranslationProvider` and pass to its `translations` prop the JSON file of translations you want to make available in that component.

In the child component you want to translate, use the HOC `withTranslations`. A `t` prop will be available so you can access your translation file.

