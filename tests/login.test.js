import url from "node:url";
const __dirname = url.fileURLToPath(new URL('.', import.meta.url)).replace(/\/$/, '');

import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';
import { Central, Model, ControllerMixinDatabase } from '@lionrockjs/central';
import { ORMAdapterSQLite, DatabaseAdapterBetterSQLite3 } from '@lionrockjs/adapter-database-better-sqlite3';
import ControllerAuth from '../classes/controller/Auth.mjs';

import IdentifierUser from "../classes/model/IdentifierUser.mjs";
import Person from "../classes/model/Person.mjs";
import Role from "../classes/model/Role.mjs";
import User from "../classes/model/User.mjs";
import Login from "../classes/model/Login.mjs";

Model.defaultAdapter = ORMAdapterSQLite;
ControllerMixinDatabase.DEFAULT_DATABASE_DRIVER = DatabaseAdapterBetterSQLite3;

Central.classPath.set('model/IdentifierUser.mjs', IdentifierUser);
Central.classPath.set('model/Person.mjs', Person);
Central.classPath.set('model/Role.mjs', Role);
Central.classPath.set('model/User.mjs', User);
Central.classPath.set('model/Login.mjs', Login);

describe('login test', () => {
  beforeEach(async () => {
    await Central.init({ EXE_PATH: `${__dirname}/loginTest/test`, APP_PATH: `${__dirname}/loginTest/test` });
    await Central.initConfig(new Map([
      ['cookie', ''],
      ['session', ''],
      ['auth', (await import('../config/auth.mjs')).default],
      ['register', (await import('../config/register.mjs')).default],
      ['edm', ''],
    ]));
  });

  afterEach(async () => {
  });

  // copy db
  const target = path.normalize(`${__dirname}/loginTest/db/user.sqlite`);
  if (fs.existsSync(target))fs.unlinkSync(target);
  fs.copyFileSync(path.normalize(`${__dirname}/loginTest/defaultDB/user.sqlite`), target);
  const db = new Database(target);

  const target2 = path.normalize(`${__dirname}/loginTest/db/session.sqlite`);
  if (fs.existsSync(target2))fs.unlinkSync(target2);
  fs.copyFileSync(path.normalize(`${__dirname}/loginTest/defaultDB/session.sqlite`), target2);
  const db2 = new Database(target2);

  beforeEach(() => {
    db.exec('INSERT INTO persons (id, first_name, last_name) VALUES (1, \'test\', \'\');');
    db.exec('INSERT INTO users (id, person_id) VALUES (1, 1);');
    db.exec('INSERT INTO user_roles (user_id, role_id) VALUES (1, 2)');

    db.exec('INSERT INTO persons (id, first_name, last_name) VALUES (2, \'peter\', \'\');');
    db.exec('INSERT INTO users (id, person_id) VALUES (2, 2);');
    db.exec('INSERT INTO user_roles (user_id, role_id) VALUES (2, 2)');
  });

  afterEach(() => {
    db.exec('DELETE FROM persons');
    db.exec('DELETE FROM users');
    db.exec('DELETE FROM user_roles');

    db2.exec('DELETE FROM sessions');
  });

  test('test login page', async () => {
    const c = new ControllerAuth({ body: 'username=test&password=Hello1234!', headers: {}, query: {}, raw: { url: 'example.html' }, cookies: {} });
    const r = await c.execute('login');
    if (r.status === 500 || r.status === 404)console.log(c.error);
  });

  test('display login fail', async () => {
    const c = new ControllerAuth({ body: 'username=hellox&password=Hello1234!', headers: {}, query: {}, raw: { url: 'example.html' }, cookies: {} });
    const r = await c.execute('fail');
    if (r.status === 500 || r.status === 404)console.log(c.body);
    expect(r.status).toBe(200);
  });
});
