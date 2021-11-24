import path, {join} from 'path';
import {readdirSync} from 'fs';

const folder = process.env.SCHEMA_PATH || './src/schemas';

export const load = () => readdirSync(folder)
    .map((file) => join(path.resolve(), folder, file));
