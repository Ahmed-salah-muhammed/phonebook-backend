3.1: Phonebook backend step 1

Implement a Node application that returns a hardcoded list of phonebook entries from the address http://localhost:3001/api/persons.

Data:

[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

Output in the browser after GET request:
JSON data of 4 people in browser from api/persons


The application must be started with the command npm start.

The application must also offer an npm run dev command that will run the application and restart the server whenever changes are made and saved to a file in the source code.
3.2: Phonebook backend step 2

Implement a page at the address http://localhost:3001/info that looks roughly like this:
Screenshot for 3.2

The page has to show the time that the request was received and how many entries are in the phonebook at the time of processing the request.
3.3: Phonebook backend step 3

Implement the functionality for displaying the information for a single phonebook entry. The url for getting the data for a person with the id 5 should be http://localhost:3001/api/persons/5

If an entry for the given id is not found, the server has to respond with the appropriate status code.
3.4: Phonebook backend step 4

Implement functionality that makes it possible to delete a single phonebook entry by making an HTTP DELETE request to the unique URL of that phonebook entry.

Test that your functionality works with either Postman or the Visual Studio Code REST client.
3.5: Phonebook backend step 5

Expand the backend so that new phonebook entries can be added by making HTTP POST requests to the address http://localhost:3001/api/persons.

Generate a new id for the phonebook entry with the Math.random function. Use a big enough range for your random values so that the likelihood of creating duplicate ids is small.
3.6: Phonebook backend step 6

Implement error handling for creating new entries. The request is not allowed to succeed, if:

    The name or number is missing
    The name already exists in the phonebook

Respond to requests like these with the appropriate status code, and also send back information that explains the reason for the error, e.g.:

{ error: 'name must be unique' }





Exercise 3.12.
3.12: Command-line database

Create a cloud-based MongoDB database for the phonebook application with MongoDB Atlas.

Create a mongo.js file in the project directory, that can be used for adding entries to the phonebook, and for listing all of the existing entries in the phonebook.

NB: Do not include the password in the file that you commit and push to GitHub!

The application should work as follows. You use the program by passing three command-line arguments (the first is the password), e.g.:

``` node mongo.js yourpassword Anna 040-1234556 ```

As a result, the application will print:

``` added Anna number 040-1234556 to phonebook ```

The new entry to the phonebook will be saved to the database. Notice that if the name contains whitespace characters, it must be enclosed in quotes:

``` node mongo.js yourpassword "Arto Vihavainen" 045-1232456```

If the password is the only parameter given to the program, meaning that it is invoked like this:

``` node mongo.js yourpassword```

Then the program should display all of the entries in the phonebook:

``` phonebook:
Anna 040-1234556
Arto Vihavainen 045-1232456
Ada Lovelace 040-1231236 ```

You can get the command-line parameters from the process.argv variable.

NB: do not close the connection in the wrong place. E.g. the following code will not work:

``` Person
  .find({})
  .then(persons=> {
    // ...
  })

mongoose.connection.close() ```

In the code above the mongoose.connection.close() command will get executed immediately after the Person.find operation is started. This means that the database connection will be closed immediately, and the execution will never get to the point where Person.find operation finishes and the callback function gets called.

The correct place for closing the database connection is at the end of the callback function:

``` Person
  .find({})
  .then(persons=> {
    // ...
    mongoose.connection.close()
  })```

NB: If you define a model with the name Person, mongoose will automatically name the associated collection as people.







Exercises 3.13.-3.14.

3.13: Phonebook database, step 1

Change the fetching of all phonebook entries so that the data is fetched from the database.

In the following exercises, write all Mongoose-specific code into its own module

3.14: Phonebook database, step 2

Change the backend so that new numbers are saved to the database.
At this stage, you can ignore whether there is already a person in the database with the same name as the person you are adding.



Exercises 3.15.-3.18.
3.15: Phonebook database, step 3

Change the backend so that deleting phonebook entries is reflected in the database.

3.16: Phonebook database, step 4

Move the error handling of the application to a new error handler middleware.
3.17*: Phonebook database, step 5

If the user tries to create a new phonebook entry for a person whose name is already in the phonebook, try to update the phone number of the existing entry by making an HTTP PUT request to the entry's unique URL.

Modify the backend to support this request.

3.18*: Phonebook database step 6

Also update the handling of the HTTP GET api/persons/:id and info routes to use the database, and verify that they work directly with the browser, Postman, or VS Code REST client.

Inspecting an individual phonebook entry from the browser should look like this:
screenshot of browser showing one person with api/persons/their_id 






Exercises 3.19.-3.21.
3.19*: Phonebook database, step 7

Expand the validation so that the name stored in the database has to be at least three characters long.
 Error handling can be implemented by adding a catch block as shown below:

``` personService
    .create({ ... })
    .then(createdPerson => {
      // ...
    })
    .catch(error => {
      // this is the way to access the error message
      console.log(error.response.data.error)
    })```

You can display the default error message returned by Mongoose.

NB: On update operations, mongoose validators are off by default. Read the documentation to determine how to enable them.
3.20*: Phonebook database, step 8

Add validation to your phonebook application, which will make sure that phone numbers are of the correct form. A phone number must:

    have length of 8 or more

    be formed of two parts that are separated by -, the first part has two or three numbers and the second part also consists of numbers
        eg. 09-1234556 and 040-22334455 are valid phone numbers
        eg. 1234556, 1-22334455 and 10-22-334455 are invalid

Use a Custom validator to implement the second part of the validation.

If an HTTP POST request tries to add a person with an invalid phone number, the server should respond with an appropriate status code and error message.
