# Gentelman

Thank you and welcome.

Here, I go over the basics of what I wrote in the backend folder.

First of all, if you do not know how API's and springboot work and are curious to learn more, please make sure to visit this video; Very helpful and exactly how I learned springBoot : https://www.youtube.com/watch?v=31KTdfRH6nY

If you don't have time, or simply are not interested, here are the basics :

---

# The Basics

The basic idea of an API is like a simple website URL which you can access and it will return data.

That being said, you can access some simple and interesting API's, such as https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit

It's an API which will give you jokes, to keep it appropriate, I added some flags which the creator provided.

That's why an API does, gives back, usually a JSON file.

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


In my backend, I implemented only CRD methods; 

So POST, GET, DELETE


# **How to use my methods?** 

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


If you have never done something like a post request directly to an API, you can do so, either through the frontend Mathias is about to write, or you can use tools like PostMan.

You can install postman here : https://www.postman.com/downloads/

Once you have postman, you can follow the instructions, and run it. 

Inside postman 

{

"full_name":"John Doe"

"address":"199 Tempelton",

"social_security_number": "12345678"

}
