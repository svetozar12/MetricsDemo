FROM node
WORKDIR /app

COPY . .
RUN yarn --frozen-lockfile

EXPOSE 4000

CMD ["yarn","start"]
