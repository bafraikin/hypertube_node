


# Setup docker to make it work in school

### Launch it just after installing Docker through MSC

# those instruction are for 42 school only
```
setup_docker () {
	#delete every old setting of docker that take too much space
	rm -rf ~/Library/Containers/com.docker.docker
	rm -rf ~/.docker
	rm -rf ~/docker ~/agent
	rm -rf ~/goinfre/docker ~/goinfre/agent ~/goinfre/helper
	rm ~/goinfre

	#Make sure that goinfre is good
	mkdir -p /Volumes/Storage/goinfre/$(whoami)
	ln -s /Volumes/Storage/goinfre/$(whoami) ~/goinfre
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

 il vous faudra cree un fichier back/.env avec vos token 42
Que vous pouvez trouver ici : https://profile.intra.42.fr/oauth/applications/new

 avec  http://127.0.0.1:8080/oauth42/callback en redirect
 
et localhost:8080 en site web
l'interieure du ficher ressemble a ca :
```
client_id_42=<votre id api >
client_secret_42=<votre cle secrete>
OMDB_KEY=<votre cle secrete>
client_id_google=< votre id api>
client_secret_google=<votre cle secrete>
email_pseudo=<email>
email_password=<email password>
```
pour google il faut cree un compte sur google console
cree un projet et aller ici https://console.cloud.google.com/apis/dashboard
puis venez voir adejbakh et je vous aide.


![alt text](https://i.pinimg.com/originals/a4/db/17/a4db1751b10fff03d2eaf915a9cd2de9.gif  "YEAAAH")
