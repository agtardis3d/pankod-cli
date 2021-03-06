// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
// #endregion Global Imports

// #region Local Imports
import { ICommon } from '../../../../typings';
import { getTemplate, writeFile, replaceContent } from '../../operations';
import { createInterfaceParams } from '../../params/nextjs2.params';
// #region Local Imports

export const createInterface = (options: ICommon.IAnswers) => {
    const { fileName, isPage, isConnectStore } = options;

    const {
        interfaceDir,
        pageInterfaceIndex,
        pageInterfaceDir,
        componentsDir,
        compInterfaceIndex,
        templatePath,
        reduxInterfaceDir,
        storeImportInterface,
        storeImportInterfaceFormatted,
        storeInterface
    } = createInterfaceParams;

    options.isClass = !!options.classDir;

    const pageDirPath = `${pageInterfaceDir}/${fileName}.d.ts`;
    const compDirPath = `${componentsDir}/${fileName}/${fileName}.d.ts`;

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: isPage ? pageDirPath : compDirPath,
        getFileContent: () => getTemplate(templatePath, options),
        message: 'Added new interface file'
    };

    const commonReplaceParams = (
        template: string,
        message: string,
        regexKey: RegExp,
        formatted: Array<any> = []
    ) => {
        const params = {
            fileDir: reduxInterfaceDir,
            filetoUpdate: fs.readFileSync(
                path.resolve('', reduxInterfaceDir),
                'utf8'
            ),
            getFileContent: () => getTemplate(template, options),
            message,
            regexKey
        };

        // * Change RegExp if file is formatted
        const [formattedTarget, formattedRegex] = formatted;

        if (formattedRegex && params.filetoUpdate.match(formattedRegex)) {
            return {
                ...params,
                regexKey: formattedRegex,
                getFileContent: () => getTemplate(formattedTarget, options)
            };
        }

        return params;
    };

    writeFile(writeFileProps);

    const replaceContentParams: ICommon.IReplaceContent = {
        fileDir: interfaceDir,
        filetoUpdate: fs.readFileSync(path.resolve('', interfaceDir), 'utf8'),
        message: 'Interface file added to Interfaces/index.ts',

        ...(isPage
            ? {
                  getFileContent: () =>
                      getTemplate(pageInterfaceIndex, options),
                  regexKey: /\/\/(?: |)#endregion Page Interfaces/g
              }
            : {
                  getFileContent: () =>
                      getTemplate(compInterfaceIndex, options),
                  regexKey: /\/\/(?: |)#endregion Component Interfaces/g
              })
    };

    replaceContent(replaceContentParams);

    if (isConnectStore) {
        const replaceStoreParams: ICommon.IReplaceContent = commonReplaceParams(
            storeInterface,
            'Interface file added to Redux/IStore.d.ts',
            /export interface IStore\s[{]/g
        );

        replaceContent(replaceStoreParams);

        const replaceStoreImportParams: ICommon.IReplaceContent = commonReplaceParams(
            storeImportInterface,
            'Interface file added to import section in Redux/IStore.d.ts',
            / } from "@Interfaces";/,
            [storeImportInterfaceFormatted, /(,|)\n} from "@Interfaces";/]
        );

        replaceContent(replaceStoreImportParams);
    }
};
