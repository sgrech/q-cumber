import dev from './configs/dev'
import prod from './configs/prod'
import test from './configs/test'

const config = {
  env: loadEnvConfig()
}

function loadEnvConfig () {
  switch (process.env.NODE_ENV) {
    case 'dev': return dev
    case 'prod': return prod
    case 'test': return test
  }
}

export default config
