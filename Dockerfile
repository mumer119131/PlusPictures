# node block

FROM node:14.17.6-alpine3.14 as nodework
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build


# ngnix block
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=nodework /app/dist .
ENTRYPOINT ["nginx", "-g", "daemon off;"]