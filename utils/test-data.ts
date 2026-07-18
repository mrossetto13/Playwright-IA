import 'dotenv/config';
import path from 'node:path';
import { readFileSync } from 'node:fs';

type Credential = {
  username: string;
  password: string;
};

type TestData = {
  usuarios: {
    standard: Credential;
    locked: Credential;
  };
};

const dataPath = path.resolve(process.cwd(), 'data/test-data.json');
const testData = JSON.parse(readFileSync(dataPath, 'utf-8')) as TestData;

export const users = testData.usuarios;

export const lockedEnvCredentials: Credential = {
  username: process.env.LOCKED_USERNAME ?? '',
  password: process.env.LOCKED_PASSWORD ?? '',
};
