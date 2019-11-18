// #region Local Imports
import { ICommon } from '../../ICommon';
import { Config } from '../../../config';
import { CommonHelper } from '../../Common';
import { INextjsHelper } from '../INextjsTypes';
// #endregion Local Imports

export const addAction = (
    answers: ICommon.IAnswers,
    params: INextjsHelper.IAddActionParams
): void => {
    const { actionIndexTemplatePath, actionTemplatePath } = params;
    const { fileName } = answers;
    const actionFileDir = `${Config.nextjs.actionDir}/${fileName}Actions.ts`;
    const templateProps = { fileName };

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: actionFileDir,
        getFileContent: () => CommonHelper.getTemplate(actionTemplatePath, templateProps),
        message: 'Added new action file'
    };

    const addIndexParams: ICommon.IAddIndex = {
        dirPath: `${Config.nextjs.actionDir}/index.ts`,
        getFileContent: () => CommonHelper.getTemplate(actionIndexTemplatePath, templateProps),
        message: 'Added action file to index.ts Actions/index.ts'
    };

    CommonHelper.addToIndex(addIndexParams);
    CommonHelper.writeFile(writeFileProps);
};
