mvn package &&
sudo java -jar target/avengers-1.0-SNAPSHOT.jar -Dserver.port 8080 -Dserver.address 13.59.251.84 &
cd React_Full_Project
sudo npm start &
