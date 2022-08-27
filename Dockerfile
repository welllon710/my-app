FORM nginx
LEBAL name="my-app"
LEBAL version="1.0"
COPY ./dist /usr/share/nginx/html
COPY ./my-app.conf /etc/nginx/conf.d
EXPOSE 80