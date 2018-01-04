## How to use

1. `npm install lets-i18n`

2. Wrap your component tree with the `TranslationProvider` and pass to its `translations` prop the JSON file of translations.

3. In the child component you want to translate, use the HOC `withTranslations`, then a `t` prop will be available so you can access your translation file.

4. (Optional) A `language` prop is also available from `withTranslations` as well. In order to use it, pass the desired language to the `TranslationProvider`.

## Example

> `index.js`
```js
export default class extends Component {
  render () {
    return (
      <TranslationProvider translations={this.state.translations} language={'pt-br'}>
        <MyApp />
      </TranslationProvider>
    )
  }

  componentDidMount () {
    const translations = require('./translations/pt-br.json')

    this.setState({ translations })
  }

  state = {
    translations: {}
  }
}
```

> `MyApp.js`
```js
const MyApp = (props) => <p>{props.t('hello.world')} - language: {props.language}</p>

export default withTranslations(MyApp)
```

> `translations/pt-br.json`
```json
{
  "hello": {
    "world": "Olá, Mundo"
  }
}
```

## Development
For debugging purposes, when the `NODE_ENV` is not `production`, a `translations` prop is also available in the components wrapped by `withTranslations` with all the available keys and values:

```js
const MyApp = (props) => {
  console.log(props.translations)

  return <p>{props.t('hello.world')} - language: {props.language}</p>
}

export default withTranslations(MyApp)
```

## Errors

1. Translation file not found: in a non-production environemnt it will not raise any error. In `production` it will print an error to the console:

```js
console.error('TRANSLATION_ERROR: Please, provide the files to translate.')
```

2. Translation key not found: it will raise different errors in `production` and other environments:

### Production

The last property of the translation string will be rendered:

```js
  <div>{t('this.translation.string.does.not.exist')}</div>
```

Will be rendered as:
```html
  <div>exist</div>
```

### Other environments
```js
  <div>{t('this.translation.string.does.not.exist')}</div>
```

Will be rendered as:
```html
  <div>TRANSLATION_ERROR: "this.translation.string.does.not.exist" does not exist.</div>
```

### See more examples for React and next.js at the [`examples`](https://github.com/viniciusCamargo/lets-i18n/tree/master/examples) directory
