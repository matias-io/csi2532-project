# Installation

If you want to run our application locally, you can navigate to your terminal or command prompt(windows), and run the following command :

```bash
git clone https://github.com/matias-io/csi2532-project.git
```

This will download the zip file of the project.

If you are lost as to where it was downloaded, you can run

```bash
# For mac, you must make sure it says bash and not zsh. (if it does say zsh, you can simply type `bash` in the terminal to switch to a bash terminal)

# Because ZSH will not accept the # commented part. 

# Preferably, you should only run `pwd` or `cd` to avoid any comment related errors

---------------------------------------------------------------------------------------------------------
pwd # Mac (bash), Linux(bash), PowerShell 

cd  # For Command prompt on windows

```

Once cloned, you can navigate to the `cd [downloads’s directory] / [csi2532-project](https://github.com/matias-io/csi2532-project.git)`

```
cd $PWD/csi-2532 (Mac, Bash)
```

From now on, we will assume you are in the [csi2532-project](https://github.com/matias-io/csi2532-project.git) directory.

Now you can do : (frontend)

```bash
cd [project-path]/csi2532-project
cd frontend
npm install i 
npm run dev
```

You can now visit: http://localhost:3000/ to see the local instance


---

For the backend, you can go to the [main class ](backend/src/main/java/com/example/csi/CsiApplication.java)of the backend, can you can run the project normall from vs code. 

It will be hosted on http://localhost:8080/

---



Finally, you can visit the completed application at : [https://hotels.matiass.ca/](https://hotels.matiass.ca/)for the complete experience.
