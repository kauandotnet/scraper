import acceptanceSuite from './acceptance-suite';
import Storage from '../../src/storage/base/Storage';
import KnexStorage from '../../src/storage/knex/KnexStorage';
import * as sqliteConn from '../config/storage/sqlite/sqlite-conn.json';
import * as mysqlConn from '../config/storage/mysql/mysql-conn.json';
import * as pgConn from '../config/storage/pg/pg-conn.json';
import CheerioClient from '../../src/domclient/CheerioClient';
import { ConcurrencyOptions } from '../../src/scraper/ConcurrencyManager';

const storage:Storage[] = [
  new KnexStorage(sqliteConn),
  new KnexStorage(mysqlConn),
  new KnexStorage(pgConn),
];

const concurrencyOptions:ConcurrencyOptions[] = [
  {
    proxyPool: [ {
      host: '127.0.0.1',
      port: 8080,
    } ],
  },
  {
    proxy: {
      maxRequests: 10,
      delay: 100,
    },
    domain: {
      maxRequests: 10,
      delay: 100,
    },
    proxyPool: [ {
      host: '127.0.0.1',
      port: 8080,
    } ],
  },
];

for (let i = 0; i < storage.length; i += 1) {
  for (let j = 0; j < concurrencyOptions.length; j += 1) {
    acceptanceSuite(
      'dom-static-content',
      storage[i],
      CheerioClient,
      concurrencyOptions[j],
    );
  }
}
