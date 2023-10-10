import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';
import { Central, ORM, ControllerMixinDatabase } from '@lionrockjs/central';
import { ORMAdapterSQLite, DatabaseAdapterBetterSQLite3 } from '@lionrockjs/adapter-database-better-sqlite3';

import IdentifierUser from "../classes/model/IdentifierUser.mjs";
import Person from "../classes/model/Person.mjs";
import Role from "../classes/model/Role.mjs";
import User from "../classes/model/User.mjs";
import Login from "../classes/model/Login.mjs";

import ControllerRegister from '../classes/controller/Register.mjs';

import ConfigAuth from '../config/auth.mjs';
import ConfigRegister from '../config/register.mjs';

Central.classPath.set('model/IdentifierUser.mjs', IdentifierUser);
Central.classPath.set('model/Person.mjs', Person);
Central.classPath.set('model/Role.mjs', Role);
Central.classPath.set('model/User.mjs', User);
Central.classPath.set('model/Login.mjs', Login);

ORM.defaultAdapter = ORMAdapterSQLite;
ControllerMixinDatabase.DEFAULT_DATABASE_DRIVER = DatabaseAdapterBetterSQLite3;

describe('register test', () => {
  beforeEach(async () => {
    await Central.init({ EXE_PATH: `${__dirname}/registerTest/test`, APP_PATH: `${__dirname}/registerTest/test` });
    await Central.initConfig(new Map([
      ['cookie', ''],
      ['session', ''],
      ['auth', ConfigAuth],
      ['register', ConfigRegister],
      ['edm', ''],
    ]));
  });

  afterEach(async () => {
  });

  // copy db
  const target = path.normalize(`${__dirname}/registerTest/db/user.sqlite`);
  if (fs.existsSync(target))fs.unlinkSync(target);
  fs.copyFileSync(path.normalize(`${__dirname}/registerTest/defaultDB/user.sqlite`), target);
  const db = new Database(target);

  const target2 = path.normalize(`${__dirname}/registerTest/db/session.sqlite`);
  if (fs.existsSync(target2))fs.unlinkSync(target2);
  fs.copyFileSync(path.normalize(`${__dirname}/registerTest/defaultDB/session.sqlite`), target2);

  afterEach(() => {
    db.exec('DELETE FROM persons');
    db.exec('DELETE FROM users');
  });

  test('constructor', async () => {
    const c = new ControllerRegister({ headers: {}, body: 'name=test&email=test@example.com&username=hello&password=Hello1234!', cookies: {} });
    const r = await c.execute();
    if (r.status === 500)console.log(c.error);
    expect(r.status).toBe(200);
    expect(c.error).toBe(null);
  });

  test('register new user', async () => {
    const c = new ControllerRegister({ headers: {}, body: 'username=hello', cookies: {} });
    const r = await c.execute('register_post');
    if (r.status === 404 || r.status === 500)console.log(c.error, c.body);

    const vp1 = db.prepare('SELECT * FROM persons').get();
    expect(vp1.first_name).toBe('hello');

    const v1 = db.prepare('SELECT * FROM users').get();
    expect(v1.person_id).toBe(vp1.id);

    const v2 = db.prepare('SELECT * FROM identifier_users').all();

    expect(v2.length).toBe(1);
    const identifier = v2[0];
    expect(identifier.name).toBe('hello');

    expect(c.request.session.logged_in).toBe(true);
  });

  test('username already use', async () => {
    const c0 = new ControllerRegister({ headers: {}, body: 'username=hello', cookies: {} });
    const r0 = await c0.execute('register_post');
    // eslint-disable-next-line no-console
    if (r0.status === 404 || r0.status === 500)console.log(c0.error, c0.body);

    const c = new ControllerRegister({ headers: {}, body: 'username=hello', cookies: {} });
    const r = await c.execute('register_post');
    expect(r.status).toBe(500);
    expect(c.error.message).toBe('User Name hello already registered.');
  });

  test('auto assign first name and last name', async () => {
    const c = new ControllerRegister({ headers: {}, body: 'first_name=Peter&last_name=Pan&username=hello', cookies: {} });
    const r = await c.execute('register_post');

    if (r.status === 404 || r.status === 500)console.log(c.error, c.body);

    const vp1 = db.prepare('SELECT * FROM persons').get();
    expect(vp1.first_name).toBe('Peter');
    expect(vp1.last_name).toBe('Pan');

    const v2 = db.prepare('SELECT * FROM identifier_users').all();
    expect(v2.length).toBe(1);
  });
});