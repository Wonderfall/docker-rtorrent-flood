let connectionSettings = {
  client: 'rTorrent',
  version: 1,
};

if (process.env.RTORRENT_SOCK === 'true' || process.env.RTORRENT_SOCK === true) {
  Object.assign(connectionSettings, {
    type: 'socket',
    socket: '/tmp/rtorrent.sock',
  });
} else {
  Object.assign(connectionSettings, {
    type: 'tcp',
    host: process.env.RTORRENT_SCGI_HOST || 'localhost',
    port: process.env.RTORRENT_SCGI_PORT || 5000,
  });
}

const CONFIG = {
  baseURI: process.env.WEBROOT || '/',
  dbCleanInterval: 1000 * 60 * 60,
  dbPath: '/flood-db/',
  tempPath: '/tmp/',
  authMethod: process.env.DISABLE_AUTH === 'true' || process.env.DISABLE_AUTH === true ? 'none' : 'default',
  floodServerHost: '0.0.0.0',
  floodServerPort: 3000,
  maxHistoryStates: 30,
  torrentClientPollInterval: 1000 * 5,
  torrentClientPollIntervalIdle: 1000 * 60 * 15,
  secret: process.env.FLOOD_SECRET || 'supersecret30charactersminimum',
  configUser: connectionSettings
};

module.exports = CONFIG;
