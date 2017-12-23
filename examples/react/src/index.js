import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { TranslationProvider, withTranslations } from 'lets-i18n'

const Hello = ({ t }) => <h2>{t('hello')}, {t('world.world.world.world.world.world.world.world.world.world')}!</h2>

const HelloTranslated = withTranslations(Hello)

class App extends Component {
  render () {
    return (
      <TranslationProvider translations={this.state.translations}>
        <header>
          <h1>Welcome to React with lets-i18n</h1>
        </header>
        <main>
          <HelloTranslated />
        </main>
      </TranslationProvider>
    )
  }

  componentDidMount () {
    const translations = require('./locales/pt-br.json')

    this.setState({ translations })
  }

  state = {
    translations: {}
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
