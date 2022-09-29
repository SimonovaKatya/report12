FROM node:12-alpine
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --only=prod
RUN npm install typescript
#COPY . /app
#RUN npm run build
#FROM nginx:1.16.0-alpine
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["npm", "start"]
#CMD ["nginx", "-g", "daemon off;"]
