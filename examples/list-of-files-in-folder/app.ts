import vconf from "../../src";
import { IConfig } from "./configs/config.interface";

const configLoader = vconf();

const config = await configLoader.loadFileVariable<IConfig>({
    filePath: `./configs`,
    fileName: `${process.env.NODE_ENV}.ts`
});


// Working with config
