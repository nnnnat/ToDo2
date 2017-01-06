#ToDo2

Todo2 is a task management app I've built to learn a few new skills
 - How to build and deploy a simple PHP service
 - How to build a complex JavaScript frontend without a framework
 - How to meet AA conformance on a single page application

## Running Locally

You'll need Docker and Docker-Compose installed run `docker-compose up` from the project root to spin up the enviorment.

### PHP & MYSQL
You'll need to add the todo's table using Sequal Pro or phpmyadmin (running on localhost:8081) to do this.
Run this query to create the todo's table
```
CREATE TABLE todo (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), due_date DATE, completed INT NOT NULL)
```
### Javascript & SCSS

If you'd like to make changes to the frontend you'll need to run a few commands from the `www/` directory in terminal

for devin
```
npm run watch
```
for buildin
```
npm start
```
