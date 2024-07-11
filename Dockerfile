# stage build
FROM node:18-alpine

## ENV VARS
ENV VITE_API_URL=${VITE_API_URL}

WORKDIR /app

# copy everything to the container
COPY package.json  ./

# clean install all dependencies
RUN npm install -g pnpm

COPY . .

# remove potential security issues

# build SvelteKit app
RUN pnpm install
RUN pnpm build

# stage run
FROM node:18-alpine

WORKDIR /app

# copy dependency list
COPY --from=0 /app/package*.json ./

# clean install dependencies, no devDependencies, no prepare script
#RUN pnpm install --production --ignore-scripts

# remove potential security issues
#RUN npm audit fix

# copy built SvelteKit app to /app
COPY --from=0 /app ./

EXPOSE 3000
CMD ["node", "build"]
