


#Setup docker to make it work in school
###Launch it just after installing Docker through MSC

```
setup_docker () {
	#delete every old setting of docker that take too much space
	rm -rf ~/Library/Containers/com.docker.docker
	rm -rf ~/.docker
	rm -rf ~/docker ~/agent
	rm -rf ~/goinfre/docker ~/goinfre/agent ~/goinfre/helper
	rm ~/goinfre

	#Make sure that goinfre is good
	mkdir -p /Volumes/Storage/goinfre/bafraiki
	ln -s /Volumes/Storage/goinfre/bafraiki ~/goinfre
	mkdir ~/goinfre/helper

	#recreate dir that we delete in goinfre earlier and create symlink
	mkdir -p ~/goinfre/docker ~/goinfre/agent 
	mv ~/Library/Containers/com.docker.helper/* ~/Library/Containers/com.docker.helper/.* ~/goinfre/helper
	rm -rf ~/Library/Containers/com.docker.helper
	ln -s ~/goinfre/helper ~/Library/Containers/com.docker.helper
	ln -s ~/goinfre/agent ~/Library/Containers/com.docker.docker
	ln -s ~/goinfre/docker ~/.docker
	open /Applications/Docker.app
}
```

![alt text](https://i.pinimg.com/originals/a4/db/17/a4db1751b10fff03d2eaf915a9cd2de9.gif  "YEAAAH")
