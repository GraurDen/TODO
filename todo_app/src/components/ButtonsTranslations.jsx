import React from 'react';
import { useTranslation } from 'react-i18next';

const ButtonsTranslations = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
    };

    return (
        <div>
            <button onClick={changeLanguage} value='en'>
                EN
            </button>
            <button onClick={changeLanguage} value='ru'>
                RU
            </button>
        </div>
    );
};

export default ButtonsTranslations;
