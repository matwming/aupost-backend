<u>This app is structured as follows:</u>
* src: this is the main entry folder of this app;
     
     1.Three are three sub folders: 
     * controllers: functions that handles all requests
     * models: where interfaces are defined
     * routes: redirect post, get, path and delete requests to respective controllers

<u> Packages that are used in this app:</u>

* axios: handles all http requests in node environment
* body-parser: parse body content
* express: lightweight framework,
* nodemon: automatic restart service in development

<u>How to start the app:</u>
1. install all dependencies:
<code>npm install </code>
2. start the service:
<code>npm start</code>

After the two steps, you should see the following in the console:
<code>Example app listening on port 8180!
</code>

<u><b>If App cannot be started:</b></u>
* is port 8180 is used before starting this app?
* run the following commands to reinstall all dependencies:
<code>rm -rf node_modules && npm install </code>
