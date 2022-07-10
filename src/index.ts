import path from 'path';
import { CallerLocation } from './helpers/callerLocation';
import { ILoadDynamicFile } from './interfaces';
import { promises } from 'fs'

const vconf = () => {
    return new ConfigLoader();
}

class ConfigLoader {

    async loadFileVariable<T>(params: ILoadDynamicFile<T>): Promise<T> {
        const {
            filePath,
            fileName,
            defaultConfig,
            absolutePath,
            extension,
            exportVariable = 'default',
        } = params;

        let fullPath: string;

        if (absolutePath) {
            fullPath = path.resolve(`${filePath}/${fileName}`);
        } else {
            const callerLocationHelper = new CallerLocation();
            fullPath = path.resolve(`${callerLocationHelper.getCallerFilePath()}/${filePath}/${fileName}`);
        }

        if (extension) {
            fullPath = fullPath.concat(extension);
        }

        try {
            await promises.access(fullPath);
        } catch (error) {
            if (defaultConfig) {
                return defaultConfig;
            }

            throw new Error(`Don't found file. Expected path to file: ${fullPath}`);
        }

        const config: T = (await import(fullPath))[exportVariable];

        return config;
    }
}


export default vconf;
