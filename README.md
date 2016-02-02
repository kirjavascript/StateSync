StateSync
=====

StateSync is a data binding tool that allows you to use any component as a pimcore editable.

Usage notes
-------------


For installation, run `npm install` then `gulp install` to copy all required assets to /var/www/html

To remove, run `gulp clean`

StateSync has no dependencies

API Reference
-------------

#### Init


Include StateSync after your header and before the rest of the code like this;

```PHP
<?= $this->stateSync() ?>
```


To hide the data saved by StateSync from the frontend, use the following code;

```PHP
<?= $this->stateSync(null,1) ?>
```

In this mode you can only use PHP to render your frontend data.


#### Binding data


To bind a component's data like a normal pimcore editable, use the following syntax;

```javascript
stateSync
    .select("#slider")
    .watch(".value")
    .event("change")
```

Use .watch() to name the attribute or property you wish to bind, and .event() to say when to update the data.

For watching properties instead of attributes, preceed the property name with a dot.

You can chain multiple .watch() and .event() statements to extend this functionality.


This will only save and update the data on the backend. To have the data bound on the frontend, use .bind();

```javascript
stateSync
    .select("#slider")
    .bind()
    .watch(".value")
    .event("change")
```

#### Using data

There are two interfaces that can be used to access bound data, (via PHP or js).

PHP provides a simple interface for accessing data;

```PHP
<?= $this->stateSync("#slider")['.value'] ?>
```

If you only need PHP, it's recommended to hide your frontend data.


If you need more functionality than bind, you can use .suck() and .spit() to redirect output on the frontend;

```javascript
stateSync
    .select("#slider")
    .watch(".value")
    .event("change")
    .select("#slider-div")
    .suck(".value")
    .spit("innerHTML")
```

.select() is an optional method to redirect output to another element.


.spit() also accepts functions for even more powerful control of bound data;

```javascript
stateSync
    .select("#slider")
    .watch(".value")
    .event("change")
    .suck(".value")
    .spit(d => console.log(d))
```


#### Core


The following abstracts are only available when data is not hidden;

stateSync.editmode evaluates to not null in editmode

stateSync.set(str) will overwrite an element's data

stateSync.get(str) will return an object containing all the properties of str 