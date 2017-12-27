import React, { Component } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'
import has from 'lodash.has'

export class TranslationProvider extends Component {
  // set the context name and type
  static childContextTypes = {
    translations: PropTypes.object,
    language: PropTypes.string
  }

  getChildContext () {
    // set the name and value of the props the children will receive
    return {
      translations: this.props.translations,
      language: this.props.language
    }
  }

  render () {
    // return all/any children, each with a "translations" and "language" prop
    return this.props.children
  }
}

export const withTranslations = (ToWrap) => {
  class Wrapped extends Component {
    // set the the name and type of the context it will receive from parent
    static contextTypes = {
      translations: PropTypes.object,
      language: PropTypes.string
    }

    translate = (translationProp) => {
      if (has(this.context.translations, translationProp)) {
        return get(this.context.translations, translationProp)
      } else {
        console.error(`Translation Error: "${translationProp}" does not exist.`)
      }
    }

    render () {
      // the received component with its "t" and "language" prop
      return <ToWrap t={this.translate} language={this.context.language} />
    }
  }

  return Wrapped
}
