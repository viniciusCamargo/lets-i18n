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

### See more examples for React and next.js at the [`examples`](https://github.com/viniciusCamargo/lets-i18n/tree/master/examples) directory
