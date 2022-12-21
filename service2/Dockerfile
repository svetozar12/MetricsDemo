FROM node
WORKDIR /app

COPY . .
RUN yarn --frozen-lockfile

EXPOSE 5001

CMD ["yarn","start"]
