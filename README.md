## wonderfall/rtorrent-flood

### What is this image?
This image was made for my own use a few years ago and while it is being updated, the structure hasn't changed much. I do not trust third-party Dockerfiles, and so should you: consider this repository as a base for your own Docker setup. If you want to do it "the Docker way", you should consider using proper containers for Flood and rtorrent, and use docker-compose.

### Security
As many images from the time it was first made, this image follows the principle of degrading privileges. It runs first as root to ensure permissions are set correctly and then only makes use of the UID/GID of your choice. While I agree it's not perfect (due to Linux insecurity), it seemed the best security/comfort balance at the time and it'll remain so for a while.

### Main features
- Based on Alpine Linux.
- rTorrent and libtorrent are compiled from source.
- Provides by default a solid configuration.
- [Flood](https://github.com/jesec/flood), a modern web UI for rTorrent with a Node.js backend and React frontend (jesec fork).
- Automatically unpack RAR releases (so Sonarr can deal with them).

### Build-time variables
- **RTORRENT_VER** : rtorrent version
- **LIBTORRENT_VER** : libtorrent version
- **MEDIAINFO_VER** : libmediainfo version
- **BUILD_CORES** : number of cores used during build

### Environment variables
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

### Ports
- **49184**
- **3000** (use a reverse proxy)

### Tags
- **latest** : latest versions of rTorrent/libtorrent/Flood.

### Volumes
- **/data** : your downloaded torrents, session files, symlinks...
- **/flood-db** : Flood databases.

### My docker-compose

```yaml
  rtorrent:
    image: wonderfall/rtorrent-flood
    container_name: rtorrent
    restart: unless-stopped
    tty: true
    security_opt:
      - no-new-privileges:true
    ports:
      - 49184:49184
      - 49184:49184/udp
    environment:
      - UID=1000
      - GID=1000
      - FLOOD_SECRET=supersecret
      # - RTORRENT_SOCK=false
    volumes:
      - /home/docker/flood:/flood-db
      - /home/media/torrents:/data
    networks:
      - http_network
      - rtorrent_network
    labels:
      - traefik.enable=true
      - traefik.http.routers.rtorrent.entrypoints=http
      - traefik.http.routers.rtorrent.rule=Host(`box.domain.tld`)
      - traefik.http.routers.rtorrent.middlewares=https-redirect@file
      - traefik.http.routers.rtorrent-secure.entrypoints=https
      - traefik.http.routers.rtorrent-secure.rule=Host(`box.domain.tld`)
      - traefik.http.routers.rtorrent-secure.tls=true
      - traefik.http.routers.rtorrent-secure.middlewares=secure-headers@file,hsts-headers@file
      - traefik.http.routers.rtorrent-secure.tls.certresolver=http
      - traefik.http.routers.rtorrent-secure.service=rtorrent
      - traefik.http.services.rtorrent.loadbalancer.server.port=3000
      - traefik.docker.network=http_network
```
