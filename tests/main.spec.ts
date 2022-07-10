import vconf from "../src";
import { IConfig } from "./configs/config.interface";
import testingConfig from "./configs/testing";
import { variableConfig } from "./configs/variable.config";

describe('Main flow tests', () => {
    const configLoader = vconf();
    it('Should load config by dynamic filename taken from command line specified environment', async () => {

        const result = await configLoader.loadFileVariable<IConfig>({
            filePath: `./configs`,
            fileName: `${process.env.NODE_ENV}.ts`
        });

        expect(result).toBeDefined();

        expect(result!.anotherSomeData).toBeDefined();
        expect(result!.anotherSomeData).toEqual(testingConfig.anotherSomeData);

        expect(result!.someData).toBeDefined();
        expect(result!.someData).toEqual(testingConfig.someData);
    });

    it(`Should get config as exported variable, not just default exported variable from file`, async () => {
        const result = await configLoader.loadFileVariable<IConfig>({
            filePath: `./configs`,
            fileName: `variable.config.ts`,
            exportVariable: `variableConfig`
        });

        expect(result).toBeDefined();

        expect(result!.anotherSomeData).toBeDefined();
        expect(result!.anotherSomeData).toEqual(variableConfig.anotherSomeData);

        expect(result!.someData).toBeDefined();
        expect(result!.someData).toEqual(variableConfig.someData);
    });

    it(`Should get config from file with specified extension`, async () => {
        const result = await configLoader.loadFileVariable<IConfig>({
            filePath: `./configs`,
            fileName: `variable.config`,
            exportVariable: `variableConfig`,
            extension: `.ts`,
        });

        expect(result).toBeDefined();

        expect(result!.anotherSomeData).toBeDefined();
        expect(result!.anotherSomeData).toEqual(variableConfig.anotherSomeData);

        expect(result!.someData).toBeDefined();
        expect(result!.someData).toEqual(variableConfig.someData);
    });
})
