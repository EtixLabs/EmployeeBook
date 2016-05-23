FROM node:5.11-wheezy

WORKDIR /usr/src/app

# Install dependencies
ADD dist/package.json /usr/src/app/package.json
RUN npm install --production

# Copy sources
ADD dist /usr/src/app/

# Default env: prod
ENV NODE_ENV 'production'

# Required env config:
ENV ETIX_LDAP_USER ''
ENV ETIX_LDAP_PASSWORD ''

EXPOSE 8080

CMD npm start
