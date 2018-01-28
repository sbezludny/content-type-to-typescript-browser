# Usage

### 1. As CLI 

```bash
$ ./node_modules/.bin/content-type-typescript --access-token <token> --space <space> --output <filepath>
```

This command will generate TS Definition file. Could also be used as a npm script.

package.json:
```json
"scripts": {
  "sync-contentful-types": "content-type-typescript --access-token <token> --space <space> --output <filepath>"
}
```
Usage:

```
npm run sync-contentful-types
```

### 2. As a library using JSON preview from Web App

Copy JSON Preview from [Contentful Web App](https://app.contentful.com/)

```js
import { compileFromContentTypes } from 'content-type-to-typescript';

const category = {
    name: 'Category',
    description: null,
    fields: [
      {
        id: 'title',
        name: 'Title',
        type: 'Text',
        required: true,
        omitted: false,
      },
    ],
  }

const typings = await compileFromContentTypes([category]);

console.log(typings);
```

```ts
compileFromContentTypes(
  contentTypes: Array<Partial<ContentType>>,
  options?: Partial<Options>
): Promise<string>
```
