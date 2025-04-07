# Gentleman

Thank you and welcome.

Here, I go over the basics of what I wrote in the backend folder.

First of all, if you do not know how API's and springboot work and are curious to learn more, please make sure to visit this video; Very helpful and exactly how I learned springBoot : `https://www.youtube.com/watch?v=31KTdfRH6nY`

If you don't have time, or simply are not interested, here are the basics :

---

# The Basics

The basic idea of an API is like a simple website URL which you can access and it will return data.

That being said, you can access some simple and interesting API's, such as `https://v2.jokeapi.dev/joke/Any?flags=flag-value

It's an API which will give you jokes, I added what some  flags to a API url looks like.

That's what an API does. It usually gives back a JSON file.

---

# What did I make?

Basically, in the backend folder, what I wrote are simple methods.

When you call an API, usually there are a couple things you can do.

For example, you can POST, GET, PUT, DELETE

This follows the CRUD framework, that is Create, Read, Update, Delete

POST = Create

GET = Read

PUT = Update

DELETE = Delete

**In my backend, I implemented only CRD methods;**

So POST, GET, DELETE

---

# How to use my methods?

NOTE : In all that I wrote, the {tableName} should be replaced with the name of the table you intend to use; for example, if you want a GET on the clients table, you should do /get/clients

You can call the GET method

```plaintext
/get/{tableName}
```

You can call the POST method

```plaintext
// In the POST, if you get an error in the POST, I made sure it will return the colum names in the table you are trying to post to. This is all done automatically! 

/post/{tableName}

```

If you have never done something like a post request directly to an API, you can do so, either through the frontend Matias is about to write, or you can use tools like PostMan.

You can install postman here : `https://www.postman.com/downloads/`

Once you have postman, you can follow the instructions, and run it.

You need to run the springboot server locally before you can access any of this :

To do so, you can goto  [csiController](backend/src/main/java/com/example/csi/controller/csiController.java) or any of the other Java files, and just run it normally from the VS CODE Run button. This for me works best. Do not try to complile it as it becomes a hot mess when you need to complie all 4 java files before you run it.

Inside postman you add the URL, ` POST (Dropdown) > http://localhost:8080/post/client > BODY > RAW > {Add the JSON in there} > SEND`

```json
{
"full_name":"John Doe",
"address":"199 Tempelton",
"social_security_number": "12345678"
}
```

Then hit send and it will add this data in the clients table in the DB.

That said, you can use this exact same thing for other tables by simply changing the URL. You can make it /post/hotelchain to add the names of a hotel chain for example.

You can do a lot of different things too :)

---

One other method I have is the [metadata class](backend/src/main/java/com/example/csi/controller/metadataController.java). It's just helper methods. For example, you can do

  `http://localhost:8080/metadata/column/{tableName} `

where table name follows the same TableName convension as before. It will return the Columns in the table Name

You can also do :

`code`  // THIS WILL RETURN ALL THE tables in

And

`http://localhost:8080/metadata/tableTree`  // THIS will allow you to vizualize the TableStructure :)

there are other methods which you can find [here](backend/src/main/java/com/example/csi/controller/csiController.java) , but imo, these are the only 3 you need to know about. The others are mostly helper methods to allow the tableTree to work.

---

# Contact

If you need me, you all know how to contact me.

Incase this is being pushed to public years/months later, you can contact me at abain023@uottawa.ca
