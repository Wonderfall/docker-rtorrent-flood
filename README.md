## wonderfall/rtorrent-flood

![](https://camo.githubusercontent.com/d8f5cb502f06e0ea1cc171550c2bed035293c1a9/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6a6f686e667572726f772e636f6d2f73686172652f666c6f6f642d73637265656e73686f742d612d303630362e706e67)

**Be aware this image was made for my own use.**

#### Main features
- Based on Alpine Linux.
- rTorrent and libtorrent are compiled from source.
- Provides by default a solid configuration.
- [Flood](https://github.com/jesec/flood), a modern web UI for rTorrent with a Node.js backend and React frontend (jesec fork).
- Automatically unpack RAR releases (so Sonarr can deal with them).

#### Build-time variables
- **RTORRENT_VER** : rtorrent version
- **LIBTORRENT_VER** : libtorrent version
- **MEDIAINFO_VER** : libmediainfo version
- **BUILD_CORES** : number of cores used during build

#### Environment variables
- **UID** : user id (default : 991)
- **GID** : group id (defaut : 991)
- **FLOOD_SECRET** : flood secret key (defaut : supersecret30charactersminimum) (CHANGE IT)
- **WEBROOT** : context path (base_URI) (default : /)
- **RTORRENT_SOCK** : true or false (default : true, if false rtorrent listens on 0.0.0.0:5000)
- **PKG_CONFIG_PATH** : `/usr/local/lib/pkgconfig` (don't touch)
- **DISABLE_AUTH** : disables Flood built-in authentication system (default : false)

### Note
- Run this container with tty mode enabled. In your `docker-compose.yml`, add `tty: true`. If you don't do this, [rtorrent will use 100% of CPU](https://github.com/Wonderfall/dockerfiles/issues/156).
- Connect Flood UI to rTorrent through `Unix socket`. Enter `/tmp/rtorrent.sock` as rTorrent Socket. If SCGI is used, configure accordingly.

#### Ports
- **49184** (bind it).
- **3000** [(reverse proxy!)](https://github.com/hardware/mailserver/wiki/Reverse-proxy-configuration)

#### Tags
- **latest** : latest versions of rTorrent/libtorrent/Flood.

#### Volumes
- **/data** : your downloaded torrents, session files, symlinks...
- **/flood-db** : Flood databases.
