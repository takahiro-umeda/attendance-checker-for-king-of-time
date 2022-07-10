FROM node:lts

WORKDIR /app

COPY ./dist/ .

ENTRYPOINT [ "/bin/bash", "-c" ]
CMD ["node ./index.js"]
