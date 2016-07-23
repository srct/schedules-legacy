cd schedules
sudo systemctl start mongodb
echo "** visit localhost:3000 for the server"
DEBUG=myapp:* nodemon start
