import React, { Component } from 'react'
import { TranslationProvider, withTranslations } from 'lets-i18n'

const Hello = ({ t }) => <h2>{t('hello')}, {t('world.world.world.world.world.world.world.world.world.world')}!</h2>

const HelloTranslated = withTranslations(Hello)

const getTranslations = (language = 'pt-br') => require(`../locales/${language}.json`)

export default class App extends Component {
  static getInitialProps ({ query }) {
    const translations = getTranslations(query.lang)

    return { translations }
  }

  render () {
    return (
      <TranslationProvider translations={this.props.translations}>
        <header>
          <h1>Welcome to next.js with lets-i18n!</h1>
        </header>
        <main>
          <HelloTranslated />
        </main>
      </TranslationProvider>
    )
  }
}
