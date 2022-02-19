# build react
FROM node:17.5.0-alpine as ui-build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY client/package.json ./
COPY client/package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@5.0.0 -g --silent
COPY client/ ./
RUN npm run build

FROM node:17.5.0-alpine as api-build
WORKDIR /app
COPY api/ ./api/
RUN cd api && npm install && npm run build


FROM node:17.5.0-alpine
WORKDIR /app
COPY --from=ui-build /app/build ./client/build
COPY --from=api-build /app/api/dist ./
RUN ls

# production environment
EXPOSE 3080
CMD ["node", "./api.bundle.js"]
