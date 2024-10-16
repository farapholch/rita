FROM node:18 AS build

WORKDIR /opt/node_app

COPY package.json yarn.lock ./
RUN yarn --ignore-optional --network-timeout 600000

ARG NODE_ENV=production

COPY . .
# disable webpack env loader, use dynamic env
RUN sed -i 's/import.meta.env/window._env_/g' $(grep 'import.meta.env' -R -l --include "*.ts" --include "*.tsx" --exclude-dir node_modules .)
RUN yarn build:app:docker

FROM nginx:1.25.3-alpine

#USER root

RUN apk update && apk add sed bash python3 py3-pip

RUN pip3 install beautifulsoup4

# env from upstream .env.production

ENV VITE_APP_BACKEND_V2_GET_URL=https://json.excalidraw.com/api/v2/
ENV VITE_APP_BACKEND_V2_POST_URL=https://json.excalidraw.com/api/v2/post/
ENV VITE_APP_LIBRARY_URL=https://libraries.excalidraw.com
ENV VITE_APP_LIBRARY_BACKEND=https://us-central1-excalidraw-room-persistence.cloudfunctions.net/libraries
ENV VITE_APP_PORTAL_URL=https://portal.excalidraw.com
ENV VITE_APP_PLUS_LP=https://plus.excalidraw.com
ENV VITE_APP_PLUS_APP=https://app.excalidraw.com
ENV VITE_APP_WS_SERVER_URL=""
ENV VITE_APP_FIREBASE_CONFIG='{"apiKey":"AIzaSyAd15pYlMci_xIp9ko6wkEsDzAAA0Dn0RU","authDomain":"excalidraw-room-persistence.firebaseapp.com","databaseURL":"https://excalidraw-room-persistence.firebaseio.com","projectId":"excalidraw-room-persistence","storageBucket":"excalidraw-room-persistence.appspot.com","messagingSenderId":"654800341332","appId":"1:654800341332:web:4a692de832b55bd57ce0c1"}'
ENV VITE_APP_DISABLE_TRACKING=""

COPY --from=build /opt/node_app/build /usr/share/nginx/html

# Adjust nginx conf-file with metrics value
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build /opt/node_app/default.conf /etc/nginx/conf.d/default.conf
RUN chgrp -R 0 /usr/share/nginx/html && \ 
         chmod -R g=u /usr/share/nginx/html

# Adjust permissions env
COPY --from=build --chmod=755 /opt/node_app/src/packages/excalidraw/env.js /usr/share/nginx/html/env.js
RUN chown -R $(whoami) /usr/share/nginx/html/env.js

COPY --chmod=755 launcher.py /

HEALTHCHECK CMD wget -q -O /dev/null http://localhost:80 || exit 1
EXPOSE 80

# Run excali
CMD ["python3", "/launcher.py", "/usr/share/nginx/html"]
