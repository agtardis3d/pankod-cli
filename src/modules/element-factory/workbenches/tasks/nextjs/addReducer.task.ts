// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
// #endregion Global Imports

// #region Local Imports
import { ICommon, INextjsHelper } from '../../../../typings';
import { nextjs } from '../../../../paths';
import { getTemplate, writeFile, replaceContent } from '../../operations';
import { addActionConstIndex } from '.';
// #endregion Local Imports

export const addReducer = (
    answers: ICommon.IAnswers,
    params: INextjsHelper.IAddReducerParams
): void => {
    const {
        reducerIndexTemplatePath,
        reducerTemplatePath,
        addActionConstIndexParams,
        reducerStoreTemplatePath
    } = params;

    const {
        fileName,
        lowerFileName,
        isConnectStore = false,
        upperFileName
    } = answers;

    const reducerFileDir = `${nextjs.reducerDir}/${lowerFileName}.ts`;
    const templateProps = { fileName, lowerFileName, upperFileName };
    const replaceContentParams: ICommon.IReplaceContent = {
        fileDir: `${nextjs.reducerDir}/index.ts`,
        filetoUpdate: fs.readFileSync(
            path.resolve('', `${nextjs.reducerDir}/index.ts`),
            'utf8'
        ),
        getFileContent: () =>
            getTemplate(reducerIndexTemplatePath, templateProps),
        message: 'Reducer added to Redux/Reducers/index.ts',
        regexKey: /import { combineReducers } from 'redux';\n\w*/
    };

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: reducerFileDir,
        getFileContent: () => getTemplate(reducerTemplatePath, templateProps),
        message: 'Added new reducer file'
    };

    writeFile(writeFileProps);
    replaceContent(replaceContentParams);

    setTimeout(() => {
        const replaceReducerContentParams: ICommon.IReplaceContent = {
            fileDir: `${nextjs.reducerDir}/index.ts`,
            filetoUpdate: fs.readFileSync(
                path.resolve('', `${nextjs.reducerDir}/index.ts`),
                'utf8'
            ),
            getFileContent: () =>
                getTemplate(reducerStoreTemplatePath, templateProps),
            message:
                'Reducer file added combineReducers in Redux/Reducers/index.ts',
            regexKey: /export default combineReducers[(][{]/g
        };
        replaceContent(replaceReducerContentParams);
    }, 100);

    if (isConnectStore) {
        addActionConstIndex(templateProps, addActionConstIndexParams);
    }
};
