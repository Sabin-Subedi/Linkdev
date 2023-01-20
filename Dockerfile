FROM node:16

# Create app directory with server folder
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

ENV NODE_ENV=production
ENV PORT=5000
ENV MONGO_URI=mongodb+srv://Sabin:600cvapbDVVbI7Xo@linkdev.sqehd.mongodb.net/?retryWrites=true&w=majority
ENV JWT_SECRET=7a5668254018a8c71d007dddb888190fca719bfa99297ffcfacce068bf69c787
ENV GOOGLE_USER=verifylinkdev@gmail.com
ENV GOOGLE_PASS=Linkdev@123


EXPOSE 5000
CMD [ "npm", "start" ]