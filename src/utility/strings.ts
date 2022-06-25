import env from './env';

class NotTranslatedException extends Error {
    constructor(public language: string, message: string) {
        super(message);
        Object.setPrototypeOf(this, NotTranslatedException);
    }
}
class NoTranslationsException extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, NoTranslationsException);
    }
}
class SpecifyLanguageException extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, SpecifyLanguageException);
    }
}
class Translatable {
    translations = {}
    constructor(dictionary: { [languageCode: string ]: string}) {
        if(!dictionary || Object.keys(dictionary).length === 0) {
            throw new NoTranslationsException("No translations defined");
        }
        Object.keys(dictionary).map(language => {
            this.translations[language] = dictionary[language];
            if(language.includes("-")) {
                const [generic] = language.split("-");
                if(!(generic in dictionary)) {
                    this.translations[generic] = dictionary[language];
                }
            }
        })
    }
    t(language: string): string {
        if(language in this.translations) {
            return this.translations[language];
        }
        if(language.includes("-")) {
            const [generic] = language.split("-");
            if(generic in this.translations) {
                return this.translations[generic];
            }
        }
        if(!env.debug && env.defaultLanguage in this.translations) {
            return this.translations[env.defaultLanguage];
        }
        throw new NotTranslatedException(language, `Only languages ${Object.keys(this.translations).join(", ")} are available`)
    }
    toString(): string {
        if(env.debug) {
            throw new SpecifyLanguageException("Implicit toString wrongly called");
        } else {
            return this.t(env.defaultLanguage);
        }
    }
}
export {
    Translatable,
    NotTranslatedException,
    NoTranslationsException
}