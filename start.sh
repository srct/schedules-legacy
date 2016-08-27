cd schedules
echo "** Your sudo privalleges are needed to start the database, MongoDB"
sudo systemctl start mongod
echo "** visit localhost:3000 for the server"
DEBUG=myapp:* nodemon start
