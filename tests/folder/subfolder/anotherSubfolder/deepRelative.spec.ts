import vconf from "../../../../src";
import { IConfig } from "../../../configs/config.interface";
import testingConfig from "../../../configs/testing";


describe('Relative folder testing', () => {
    it('Should load config by dynamic filename and in deep folder with relative path', async () => {
        const configLoader = vconf();

        const result = await configLoader.loadFileVariable<IConfig>({
            filePath: `../../../configs`,
            fileName: `${process.env.NODE_ENV}.ts`
        });

        expect(result).toBeDefined();

        expect(result?.anotherSomeData).toBeDefined();
        expect(result?.anotherSomeData).toEqual(testingConfig.anotherSomeData);

        expect(result?.someData).toBeDefined();
        expect(result?.someData).toEqual(testingConfig.someData);
    });

    it(`Should get error that caused by incorrect relative path`, async () => {
        expect.assertions(1);

        const configLoader = vconf();

        try {
            await configLoader.loadFileVariable<IConfig>({
                filePath: `../../../../configs`,
                fileName: `${process.env.NODE_ENV}.ts`
            })
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }

    })
})
