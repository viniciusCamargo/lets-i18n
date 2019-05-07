import React from "react";
import get from "lodash.get";

import EN from "../examples/react/src/locales/en.json";

const TranslationContext = React.createContext({});

export function cheetos() {
  return "NOPE";
}

interface IProvider {
  language: string;
  translations: any;
}

const TranslationProvider = (
  props: IProvider & { children: React.ReactNode }
) => (
  <TranslationContext.Provider
    value={{
      translations: props.translations,
      language: props.language
    }}>
    {props.children}
  </TranslationContext.Provider>
);

const withTranslations = (WrappedComponent) => {
  return class extends React.Component<any> {
    render() {
      return (
        <TranslationContext.Consumer>
          {(context: IProvider) => (
            <WrappedComponent
              t={(translationKey) =>
                get(context.translations, translationKey, "NOPE")
              }
              language={context.language}
              {...this.props}
            />
          )}
        </TranslationContext.Consumer>
      );
    }
  };
};

const Hello = ({ language, t }) => (
  <h2>
    <span>{language}</span>
    <span>{t("hello")} </span>
    {t("world.world.world.world.world.world.world.world.world.world")}!
  </h2>
);

const HelloTranslated2 = withTranslations(Hello);

export default () => (
  <TranslationProvider language="en" translations={EN}>
    <HelloTranslated2 />
  </TranslationProvider>
);
