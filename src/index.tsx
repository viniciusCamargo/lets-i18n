import React, { Component } from "react";
import get from "lodash.get";

function devOrProd(other, prod = null) {
  return process.env.NODE_ENV !== "production" ? other : prod;
}

interface ITranslation {
  translations: any;
  language: string;
}

export class TranslationProvider extends Component<ITranslation> {
  getChildContext() {
    // set the name and value of the props the children will receive
    return {
      translations: this.props.translations,
      language: this.props.language
    };
  }

  render() {
    // return all/any children, each with a "translations" and "language" prop
    return this.props.children;
  }
}

function returnLastKey(str) {
  return str.split(".").pop();
}

const errors = {
  notFound(translation) {
    return devOrProd(
      `TRANSLATION_ERROR: "${translation}" does not exist.`,
      returnLastKey(translation)
    );
  },
  noFiles() {
    return console.error(
      "TRANSLATION_ERROR: Please, provide the files to translate."
    );
  }
};

export function withTranslations(ToWrap) {
  return class extends Component<ITranslation> {
    translate(translationProp) {
      return get(
        this.context.translations,
        translationProp,
        errors.notFound(translationProp)
      );
    }

    render() {
      // the received component with its "t" and "language" prop
      return devOrProd(
        <ToWrap
          t={this.translate}
          language={this.context.language}
          translations={this.context.translations}
          {...this.props}
        />,
        <ToWrap
          t={this.translate}
          language={this.context.language}
          {...this.props}
        />
      );
    }
  };
}
