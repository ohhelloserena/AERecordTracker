#this kills the backend
sudo kill -9 $(jps | grep avengers | awk '{print $1}')
#this kills the frontend
sudo kill -9 $(sudo netstat -nptl | grep node | awk '{split($7,pid,"/");print pid[1]}') &
