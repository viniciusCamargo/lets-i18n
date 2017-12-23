import React, { Component } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'

export class TranslationProvider extends Component {
  // set the context name and type
  static childContextTypes = {
    translations: PropTypes.object
  }

  getChildContext () {
    // set the name and value of the prop the children will receive
    return { translations: this.props.translations }
  }

  render () {
    // return all/any children, each with a "translations" prop
    return this.props.children
  }
}

export const withTranslations = (ToWrap) => {
  class Wrapped extends Component {
    // set the the name and type of the context it will receive from parent
    static contextTypes = { translations: PropTypes.object }

    translate = (translationProps) => get(this.context.translations, translationProps, null)

    render () {
      // the received component with its "t" prop
      return <ToWrap t={this.translate} />
    }
  }

  return Wrapped
}
