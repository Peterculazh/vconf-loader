import vconf from "../../src";
import { IDatabaseConfig } from "./common/configs/database";

const configLoader = vconf();

const dbconfig = await configLoader.loadFileVariable<IDatabaseConfig>({
    filePath: `./common/configs`,
    fileName: `database`,
    extension: `${process.env.NODE_ENV === `production` ? `.js` : `.ts`}`,
    exportVariable: "databaseConfig",
});


// Working with dbconfig
