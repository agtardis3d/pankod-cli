import { fs } from 'memfs';
import { CommonHelper } from '../../../src/Scripts/Common';
import { ICommon } from '../../../src/Scripts/ICommon';
import { Plugins } from '../../../src/Scripts/nextjs/pluginsEnum';

describe('Common Helper', () => {
	describe('addToIndex', () => {
		it('should add index file', async () => {
			const fileContent = `export { test } from 'test'`;
			const addToIndexParams: ICommon.IAddIndex = {
				dirPath: '/src/Templates/index.ts',
				getFileContent: () => fileContent,
				message: 'Test index added'
			};

			CommonHelper.addToIndex(addToIndexParams);

			const addedIndex = fs.readFileSync('/src/Templates/index.ts');

			expect(String(addedIndex)).toEqual(`${fileContent}\n`);
		});
	});

	describe('createFile', () => {
		it('should create file', () => {
			CommonHelper.createFile('/src/test.ts');

			expect(fs.existsSync('/src/test.ts')).toEqual(true);
		});
	});

	describe('getPankodConfig', () => {
		it('should get config', () => {
			const config = CommonHelper.getPankodConfig();

			expect(config).toEqual({ projectType: 'test', plugins: ['styled'] });
		});
	});

	describe('getTemplate', () => {
		it('should get template', () => {
			const template = CommonHelper.getTemplate(
				'/src/Templates/nextjs/nextjs.mustache',
				{ fileName: 'test' }
			);

			expect(template).toEqual('Test template nextjs.mustache test');
		});
	});

	describe('hasPlugin', () => {
		describe('when plugin exist', () => {
			it('should return true', () => {
				const hasPlugin = CommonHelper.hasPlugin(Plugins.styled);

				expect(hasPlugin).toEqual(true);
			});
		});

		describe('when plugin doesnt exist', () => {
			it('should return false', () => {
				const hasPlugin = CommonHelper.hasPlugin(Plugins.sass);

				expect(hasPlugin).toEqual(false);
			});
		});
	});

	describe('isAlreadyExist', () => {
		describe('page', () => {
			describe('when page exist', () => {
				it('should return true', () => {
					const isAlreadyExist = CommonHelper.isAlreadyExist(
						'/app/pages',
						'test',
						false,
						'page'
					);

					expect(isAlreadyExist).toEqual(true);
				});
			});

			describe('when page doesnt exist', () => {
				it('should return false', () => {
					const isAlreadyExist = CommonHelper.isAlreadyExist(
						'/app/pages',
						'non-existent-page',
						false,
						'page'
					);

					expect(isAlreadyExist).toEqual(false);
				});
			});
		});

		describe('service', () => {
			describe('when service exist', () => {
				it('should return true', () => {
					const isAlreadyExist = CommonHelper.isAlreadyExist(
						'/app/services',
						'test',
						false,
						'service'
					);

					expect(isAlreadyExist).toEqual(true);
				});
			});

			describe('when service doesnt exist', () => {
				it('should return false', () => {
					const isAlreadyExist = CommonHelper.isAlreadyExist(
						'/app/services',
						'non-existent-service',
						false,
						'service'
					);

					expect(isAlreadyExist).toEqual(false);
				});
			});
		});

		describe('helper', () => {
			describe('when helper exist', () => {
				it('should return true', () => {
					const isAlreadyExist = CommonHelper.isAlreadyExist(
						'/app/helpers',
						'test',
						true,
						'helper'
					);

					expect(isAlreadyExist).toEqual(true);
				});
			});

			describe('when helper doesnt exist', () => {
				it('should return false', () => {
					const isAlreadyExist = CommonHelper.isAlreadyExist(
						'/app/helpers',
						'non-existent-helper',
						true,
						'helper'
					);

					expect(isAlreadyExist).toEqual(false);
				});
			});
		});

		describe('folder', () => {
			describe('when folder exist', () => {
				it('should return true', () => {
					const isAlreadyExist = CommonHelper.isAlreadyExist(
						'/app',
						'test'
					);

					expect(isAlreadyExist).toEqual(true);
				});
			});

			describe('when folder doesnt exist', () => {
				it('should return false', () => {
					const isAlreadyExist = CommonHelper.isAlreadyExist(
						'/app2'
					);

					expect(isAlreadyExist).toEqual(false);
				});
			});
		});
	});

	describe('replaceContent', () => {
		it('should replace content of the file', async () => {
			const filePath: string = '/app/pages/test/index.tsx';

			const replaceContentParams: ICommon.IReplaceContent = {
				fileDir: filePath,
				filetoUpdate: String(fs.readFileSync(filePath, 'utf8')),
				getFileContent: () => 'replaced for test',
				message: 'Test content replaced',
				regexKey: /nextjs test page/gm
			};

			CommonHelper.replaceContent(replaceContentParams);

			const replacedContent = String(fs.readFileSync(filePath));

			expect(replacedContent).toEqual('replaced for test');
		});
	});

	describe('validate', () => {
		describe('empty val', () => {
			it('should return an error message', () => {
				const msg = CommonHelper.validate('', '', true, '');

				expect(msg).toEqual('Can not be empty');
			});
		});

		describe('non-existent file', () => {
			it('should return true', () => {
				const msg = CommonHelper.validate('non-existent-file.ts', '/src', true, '');

				expect(msg).toEqual(true);
			});
		});

		describe('existing file', () => {
			it('should return an error message', () => {
				const msg = CommonHelper.validate('index.tsx', '/app/pages/test', true, 'page');

				expect(msg).toEqual('This page name already used before, enter new name.');
			});
		});
	});

	describe('writeFile', () => {
		describe('error', () => {
			it('should exit process', () => {
				const mockExit = jest.spyOn(process, 'exit').mockImplementation();

				CommonHelper.writeFile({ dirPath: 'non-existent-path/123', getFileContent: () => 'test', message: 'Test' });

				expect(mockExit).toHaveBeenCalled();
			});
		});
	});
});