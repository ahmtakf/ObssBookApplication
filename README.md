# obss
obss book application

books folder is the react application. Install packages before starting project.

ReadBooks folder is the spring webserver project which is coded in intellij idea.

SQLbooks folder is the tables for the database named favouritebooks.

Postman tests link : https://documenter.getpostman.com/view/4337809/RWMLHk8b

When user opens application login and signup forms comes in the first page. If user signups, he/she will login too. After login, user profile page will be opened. In user profile page, books which user started to read and books which user wished to read is displayed and a search button to navigate search page and logout button. If user is also admin, admin profile will be opened. It is simply user profile page with additions such as add author and add book buttons to navigate related pages. AddAuthor and AddBook simply adds author or book. In search page, user can search a key to display books that contain this key in any place of its name. There are also two buttons for each book in search page which user can wish or cancel wish if wished or read or cancel reading if reading process is already started. Token is stored in cookies.

In the web server, JWT is implemented but user roles are not. Thus, authorization with token is necessary to access private services, urls. Only login and signup is public url. Tokens in web-side are stored in the program so if you restart java program, tokens will disappear.  

