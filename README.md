#ToDo2

Todo2 is a task manegment app I've built to learn a few new skills
 - How to build and deploy a simple PHP service
 - How to build a complex Javascript frontend without a framework
 - How to meet AAA conformance on a single page application

## Running Localy

### PHP & MYSQL
You'll need a way to run this app on Apache with PHP and MYSQL. I've been running this app with MAMP

You'll need to make a database named ```todo2``` and create the todo's table. I've used Sequal Pro or phpmyadmin to do this.

After you've created the ```todo2``` database run this query to create the todo's table
```
CREATE TABLE todo (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), due_date DATE, created_date DATE, overdue INT NOT NULL, completed INT NOT NULL)
```
### Javascript & SCSS

If you'd like to make changes to the frontend you'll need to run a few comands from the project root in terminal

```
npm install
```
after our Node Modules have installed we can run our gulp task

for devin
```
gulp watch
```
for buildin
```
gulp
```
