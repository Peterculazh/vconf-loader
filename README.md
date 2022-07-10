# vconf-loader

Small library that targets to dynamically load variables (mostly as configs) from files basing on passed parameters during runtime.

---

## Basic usage
##### Folder structure:
```
.
|── configs # Config folder. May contain any number of files
|	└── testing.ts
└── app.ts # Executing file
```
##### configs/testing.ts

```
export interface IConfig {
    someData: string,
    anotherSomeData: string,
}

const config: IConfig = {
    someData: "Lorem",
    anotherSomeData: "Ipsum"
}

export default config; #By default loader loads variable that exported as default. Can be changes by options
```


##### app.ts
```
import vconf from "vconf";

const loader = vconf();

const config = await loader.loadFileVariable<IConfig>({
            filePath: `./configs`, // using relative path to file folder
            fileName: `${process.env.NODE_ENV}.ts` // NODE_ENV=testing // So fetching file `testing.ts`
});
```



# API

---
* **loadDynamicFile**

`loadFileVariable<T>({
			filePath,
            fileName,
            defaultConfig?: T,
            absolutePath?,
            extension?,
            exportVariable? = 'default'
}): Promise<T>`

| Field | Type | Required | Default value | Description |
|----- | ----- | ----- | ----- | ----- |
| filePath | string | **true** |  | Path to file folder |
| fileName | string | **true** |  | Filename with extension |
| defaultConfig | Generic | **false** | | Object that return function in case if file isn't found. **If not passed and file still not found function will throw error with expected path** | 
| absolutePath | boolean | **false** | | In case of using absolute path to folder - set this field **true** |
| extension | string | **false** | | You may pass extension of file if you want. Should start with dot e.g. - `.mjs.js`|
| exportVariable | string | **false** | `default` | By default library get default exported variable. In case of using not default export - pass there variable that exporting |


