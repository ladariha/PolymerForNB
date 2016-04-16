# Polymer code completion in NetBeans IDE 8.0+
## Updated for latest Polymer 1.0

This is a simple workaround to get code completion for Polymer (http://www.polymer-project.org/) in NetBeans in HTML files.

## How to use it
1. Close NetBeans IDE
2. Download the ```customs.json``` (located in dist folder) file and place it into ```nbproject``` folder which is located in your project folder (if you already have such file, you need to "merge" them, it is plain JSON)
3. Start NetBeans IDE
4. Try code completion in HTML5 file, it should offer Polymer's elements and attributes

## Why it works?
If you are using HTML5 in NetBeans, you can learn the editor your own custom HTML elements and their attributes. The process is following:

1. Type your own custom tag in HTML file, e.g. ```<myelement foo="1"></myelement>```
2. NetBeans will underline this element and mark it as error
3. In editor, there is a bulb icon in the gutter instead of line number
4. Click on the bulb icon
5. IDE offers you couple of options, the intersted one is ```Add element "myelement" to the project's custom elements```, click on it
6. NetBeans will create (if not existing already) file ```[projectFolder]/nbproject/customs.json``` and the error goes away
7. Click on the bulb icon again
8. NetBeans will offer you to declare attribute ```foo``` as either attribute of the ```myelement``` or as a global attribute (for all elements). Select some option
9. Try code completion for the ```myelement```, you should see it in code completion list. The same should work for the attribute as well.
