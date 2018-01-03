import React, { Component } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'

const devOrProd = (other, prod = null) => (process.env.NODE_ENV !== 'production' ? other : prod)

export class TranslationProvider extends Component {
  // set the context name and type
  static childContextTypes = {
    translations: PropTypes.object,
    language: PropTypes.string
  }

  getChildContext() {
    // set the name and value of the props the children will receive
    return {
      translations: this.props.translations,
      language: this.props.language
    }
  }

  render() {
    // return all/any children, each with a "translations" and "language" prop
    return this.props.children
  }
}

const errors = {
  notFound: (translation) => devOrProd(`TRANSLATION_ERROR: "${translation}" does not exist.`),
  noFiles: () => console.error('TRANSLATION_ERROR: Please, provide the files to translate.')
}

export const withTranslations = (ToWrap) => {
  class Wrapped extends Component {
    // set the the name and type of the context it will receive from parent
    static contextTypes = {
      translations: PropTypes.object,
      language: PropTypes.string,
      translations: PropTypes.object
    }

    translate = (translationProp) => get(this.context.translations, translationProp, errors.notFound(translationProp))

    render() {
      // the received component with its "t" and "language" prop
      return devOrProd(
        <ToWrap t={this.translate} language={this.context.language} translations={this.context.translations} />,
        <ToWrap t={this.translate} language={this.context.language} />
      )
    }
  }

  return Wrapped
}
