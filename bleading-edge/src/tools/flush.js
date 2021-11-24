import {driver} from './ogm';

if (!/^((true)|1)$/i.test(process.env.IS_LOCAL)) {
  console.error('Cannot flush non-local databases. Exiting.');
  process.exit(2);
}

driver.session()
    .run('MATCH (p) DETACH DELETE (p)')
    .catch((reason) => {
      console.error(reason);
      process.exit(1);
    })
    .finally(() => driver.close());
