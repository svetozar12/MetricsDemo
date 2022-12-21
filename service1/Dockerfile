FROM node
WORKDIR /app

COPY . .
RUN yarn --frozen-lockfile

EXPOSE 5000

CMD ["yarn","start"]
