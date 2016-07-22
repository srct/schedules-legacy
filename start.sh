cd schedules
sudo service mongod start
echo "** visit localhost:3000 for the server"
DEBUG=myapp:* nodemon start
