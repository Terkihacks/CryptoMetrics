# Step 1: Use the official Node.js image from Docker Hub
FROM node:16
# Step 2: Set the working directory inside the container
WORKDIR /user/src/app
# Step 3: Copy the package.json and package-lock.json to the working directory
COPY package*.json ./
# Step 4: Install the app's dependencies
RUN npm install
# Step 5: Copy the rest of the application files into the working directory
COPY . .
# Step 6: Expose the port that your app will be running on (e.g., 3000,8000)
EXPOSE 3000
# Step 7: Start the application
CMD ["npm", "start"]
