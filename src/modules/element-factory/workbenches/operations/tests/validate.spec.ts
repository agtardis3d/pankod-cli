// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
// #endregion Global Imports

// #region Local Imports
import { operations } from '../../../../utils';
import { validate } from '../validate.operation';
import { failsafe } from '../failsafe.operation';
// #endregion Local Imports

describe(operations, () => {
    describe('validate.operation', () => {
        describe('checks input and existence for inquirer', () => {
            describe('if filename is valid AND not already created', () => {
                it('should return true', () => {
                    expect(
                        validate(
                            'nonExistent',
                            './nonExistent/',
                            true,
                            'default'
                        )
                    ).toBe(true);
                });
            });

            describe('if filename is valid BUT already created', () => {
                const elementPath = './__temp__/validateOperation/Sample.ts';

                failsafe(elementPath);
                fs.writeFileSync(path.resolve(elementPath), '');

                it('should return error message', () => {
                    expect(
                        validate(
                            'sample',
                            './__temp__/validateOperation/',
                            true,
                            'default'
                        )
                    ).toContain('already used before');
                });
            });

            describe('if filename is INVALID', () => {
                it('should return error message', () => {
                    expect(validate('', '', true, '')).toContain('empty!');
                });
            });
        });
    });
});
