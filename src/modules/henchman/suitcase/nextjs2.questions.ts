// #region Local Imports
import * as questions from './questions/nextjs2';
import { INextjs2Questions } from '../../typings';
// #endregion Local Imports

const componentQuestions = [
    questions.enterComponentName,
    questions.addStyle,
    questions.connectStore,
    questions.isHaveReducer
];

const pageQuestions = [
    questions.enterPageName,
    questions.customPath,
    questions.enterRouteName,
    questions.connectStore,
    questions.isHaveReducer,
    questions.addStyle
];

export const nextjs2: INextjs2Questions = {
    ClassComponent: [
        questions.enterComponentName,
        questions.addStyle,
        questions.connectStore,
        questions.isHaveReducer
    ],

    FunctionalComponent: [
        questions.enterComponentName,
        questions.addStyle
    ],

    // Component: [
    //     questions.implementation, // ? isClass | isFunction
    //     ...componentQuestions
    // ],

    // Page: [
    //     questions.implementation, // ? isClass | isFunction
    //     ...pageQuestions
    // ],

    Page: [
        questions.enterPageName,
        questions.customPath,
        questions.enterRouteName,
        questions.connectStore,
        questions.isHaveReducer,
        questions.addStyle
    ],

    Plugin: [
        questions.addPlugin
    ]
};
