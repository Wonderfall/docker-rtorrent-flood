const CONFIG = {
  baseURI: process.env.WEBROOT || '/',
  dbCleanInterval: 1000 * 60 * 60,
  dbPath: '/flood-db/',
  tempPath: '/tmp/',
  floodServerPort: 3000,
  maxHistoryStates: 30,
  pollInterval: 1000 * 5,
  secret: process.env.FLOOD_SECRET || 'secret',
  disableUsersAndAuth: process.env.DISABLE_AUTH === 'true' || process.env.DISABLE_AUTH === true,
  configUser: {
    host: process.env.RTORRENT_SCGI_HOST || 'localhost',
    port: process.env.RTORRENT_SCGI_PORT || 5000,
    socket: process.env.RTORRENT_SOCK === 'true' || process.env.RTORRENT_SOCK === true,
    socketPath: '/tmp/rtorrent.sock',
  },
};

module.exports = CONFIG;
