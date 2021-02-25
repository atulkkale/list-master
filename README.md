# PRDXN Framework's Usage Guide: #

## What is this repository for? ##
Repository has been created for providing PRDXN's boilerplate for Projects.

## How do I get set up? ##
* Clone the package.
* Checkout to branch dev-responsive for Responsive projects and dev-static for Static projects.
* Remove the .git folder.
* Initialize git for your project.

## Detailed Usage Guide ##
- Remove the .git folder which accompanies on cloning the repository. This is important as you'll be developing your project using this framework and pushing it to the online repository chosen by your PM/Client.
- Do not remove the License embedded in any file.
- Vendor folder should only be used if the dependencies cannot be found on bower.
- Delete plugin.js and Vendor folder if you won't be using it.
- Delete Normalize.css since it's for Developer's to understand what normalize.css does. Normalize.min.css should be used.
- Bootstrap projects do not need normalize.css since it's already embedded in bootstrap.css.
- Delete README.md file before uploading to production site. This file is for PRDXN's use only.
- Remove Google Analytics Code if you do not intend to use it.
- The folder bower_components will always be ignored. The new Developer pulling the code from the Version Control System should be provided with the bower.json file. All he should do is type "bower install" by opening the command prompt in current project directory after pulling the code.
- The other developer should know that if he is installing a new package using bower, then he should install it in a following way: bower install <package_name> -S. -S has to be added since we want the package name to be listed in bower.json file.

## Bower_components: ##

- All dependencies a.k.a vendor packages such as jQuery, Modernizr etc. should be present in Bower_components which will be created by bower automatically.
- This folder should be ignored while committing.
- Do use bower init in the root folder for creating the bower.json file for other users.

## Modernizr: ##

- Go through this video to utilize the power of modernizr-2.6.2:
https://www.youtube.com/watch?v=RG5gAMnJ8Hs
- Note that Modernizr should not be used unnecessarily.
- If you just want your tags to be supported in older browsers then just html5shiv would be sufficient. Else use Modernizr and remove the html5shiv block from the index page.


## Normalize.css: ##

- The minified version should be used.
- Do not use this on bootstrap projects because it's already embedded in bootstrap.css.
- The unminified version is provided for you to understand normalize.css. Delete it once you understand what it does.


## Respond.js: ##

- Only use this for projects that need Responsive support for older browsers else do not use it.
- The goal of this script is to provide a fast and lightweight (3kb minified / 1kb gzipped) script to enable responsive web designs in browsers that don't support CSS3 Media Queries - in particular, Internet Explorer 8 and under.
- It's written in such a way that it will probably patch support for other non-supporting browsers as well.


## Main.css: ##

- Remove the unnecessary CSS codes especially the Helper classes that's not gonna be used in the project but be careful.
- Take guidance if your not sure what to do. Also, .ir class can be used for Image Replacement.


## Crossdomain.xml: ##

- What is the crossdomain.xml file?
A. The crossdomain.xml file is a cross-domain policy file. It grants the Flash Player permission to talk to servers other than the one it's hosted on.

- In what circumstances do I need to use one?
A. You need a crossdomain.xml file when your Speedtest uses external hosts as testing servers.

	- the Speedtest application is hosted on your main webserver (www.mycompany.com for example), but you have a dedicated testing server that the test uses. (speedtest.mycompany.com)
	- You want to use more than 2 threads. You will need a crossdomain file to allow access to speedtest2.mycompany.com
	- You have multiple servers

- What should it look like?
A. If your company's website is hosted at www.mycompany.com and you also wanted to allow speedtest.net to use your server as a host, your crossdomain would look like:

	<?xml version="1.0"?>
	<cross-domain-policy>
	    <allow-access-from domain="*.mycompany.com" />
	    <allow-access-from domain="*.speedtest.net" />
	</cross-domain-policy>

	This file goes in the root of document folder on the server you want to allow access. Ex: http://www.prdxn.com/crossdomain.xml in this case.

## Robots.txt: ##

- Web Robots (also known as Web Wanderers, Crawlers, or Spiders), are programs that traverse the Web automatically. Search engines such as Google use them to index the web content, spammers use them to scan for email addresses, and they have many other uses.

- On this site you can learn more about web robots: http://www.robotstxt.org/

## Humans.txt: ##

- Humans.txt is an initiative to meet the people behind a website.
- It's a TXT file that contains information about the different people who have contributed to building the website.

Example:
 ______ _                    _____        __ _
 |  ____| |                  / ____|      / _| |
 | |__  | |_ _ __   __ _ ___| (___   ___ | |_| |_
 |  __| | __| '_ \ / _` / __|\___ \ / _ \|  _| __|
 | |____| |_| | | | (_| \__ \____) | (_) | | | |_
 |______|\__|_| |_|\__,_|___/_____/ \___/|_|  \__|

/* MAIN */
  Develop & Main Design: Carlos Benítez
  Twitter: @etnassoft
  Site: http://www.etnassoft.com

/* SITE */
  Last update: 11/07/2011
  Doctype: HTML5
  IDE: Notepad++, Photoshop

/* SPECIAL THANKS */
  Designer: Fabián Fernández
  Twitter: @principef3

  Designer: David Barredo
  Twitter: @davidbarredo

  Designer: Miquel Camps
  Twitter: @miquelcamps

  Usability: Sergio Ruiz
  Twitter: @SeRGiNaToR

  And, of course, all humanstxt.org team!

## Gulp ##
Gulp is a task-runner.

For more information and to learn gulp please click on the link provided below:


* [Gulp.js](http://gulpjs.com/)
* [Introduction to Gulp](https://www.youtube.com/watch?v=dwSLFai8ovQ)

## How to use it within PRDXN Framework? ##
* Clone the framework.
* Follow the above given instructions.
* Run **npm install** in your project folder using the terminal.
* Run **bower install** in your project folder using the terminal.
* Run **gulp** in your project folder using the terminal.

Your project should be up and running.

## Which branch is for what? ##

* master - Initial Package.
* dev-responsive - Package for responsive projects
* dev-static - Package for static projects
* live - initial package with .htaccess addition.

## Who do I talk to? ##
* Rahul Shetty (Slack: srahulprdxn, Gmail: rahul.shetty.prdxn@gmail.com)
* Bharat Poptwani (Slack: pbharatprdxn, Gmail: bharat.poptwani.prdxn@gmail.com)