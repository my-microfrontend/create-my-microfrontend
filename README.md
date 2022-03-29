# My Micro Frontend

The My Micro Frontend is used to generate framework templates from the micro frontend which can be used directly. For the configuration of the My Micro Frontend which will be used to create a micro frontend directly from the .env file. This My Micro Frontend is already available in several frameworks such as `React`, `Vue` and will likely continue to grow again.
<hr/>

<h2>How to install</h2>

```
npx create-my-microfrontend [project-name] [project-framework]
```
Example:
```
npx create-my-microfrontend main --vue
```
or

```
npm i -g create-my-microfrontend
npx create-my-microfrontend [project-name] [project-framework]
```
Example:
```
npm i -g create-my-microfrontend
npx create-my-microfrontend main --vue
```

No  | Command | Description | Default
--- | --- | --- | ---
1   | project-name | To determine the name of the project you will create | micro
2   | project-framework | To determine the framework to be used, you can use "--react" "--vue" | --react

<h2>.env File Configuration</h2>
<p>There are two configurations, the first is a configuration for the app itself, and the second is a configuration for remote apps or taking components from other apps</p>
    
## [Internal App](https://github.com/ugiispoyo/Micro-Id/blob/master/README.md#configuration-for-internal-app)

No  |   Name
--- |   ---
1   |   [APP_NAME](https://github.com/ugiispoyo/Micro-Id/blob/master/README.md#app_name)
2   |   [PORT_APP_DEV](https://github.com/ugiispoyo/Micro-Id/blob/master/README.md#port_app_dev)
3   |   [PORT_APP_PROD](https://github.com/ugiispoyo/Micro-Id/blob/master/README.md#port_app_prod)
4   |   [ENDPOINT_DEV](https://github.com/ugiispoyo/Micro-Id/blob/master/README.md#endpoint_dev)
5   |   [ENDPOINT_PROD](https://github.com/ugiispoyo/Micro-Id/blob/master/README.md#endpoint_prod)
6   |   [FILE_NAME](https://github.com/ugiispoyo/Micro-Id/blob/master/README.md#file_name)
7   |   [NAME_COMPONENT_EXPOSE](https://github.com/ugiispoyo/Micro-Id/blob/master/README.md#name_component_expose) 
8   |   [SRC_COMPONENT_EXPOSE](https://github.com/ugiispoyo/Micro-Id/blob/master/README.md#src_component_expose)
    
## [External App](https://github.com/ugiispoyo/Micro-Id/blob/master/README.md#configuration-for-external-app-or-remote-app)

No  |   Name
--- |   ---
1   |   [REMOTE_NAME](https://github.com/ugiispoyo/Micro-Id/blob/master/README.md#remote_name)
2   |   [REMOTE_PORT_APP_DEV](https://github.com/ugiispoyo/Micro-Id/blob/master/README.md#remote_port_app_dev)
3   |   [REMOTE_PORT_APP_PROD](https://github.com/ugiispoyo/Micro-Id/blob/master/README.md#remote_port_app_prod)
4   |   [REMOTE_ENDPOINT_DEV](https://github.com/ugiispoyo/Micro-Id/blob/master/README.md#remote_endpoint_dev)
5   |   [REMOTE_ENDPOINT_PROD](https://github.com/ugiispoyo/Micro-Id/blob/master/README.md#remote_endpoint_prod)
6   |   [REMOTE_FILE](https://github.com/ugiispoyo/Micro-Id/blob/master/README.md#remote_file)


===========================

<h3>Configuration for internal app</h3>
<p>for configuration from internal app</p>
<hr/>
<h4><b>APP_NAME</b></h4>
<p>For naming from app if going to export component to other app, <b>this is mandatory</b></p>
<span>For example:</span>
    
```
APP_NAME=main
```
    
<h4><b>PORT_APP_DEV</b></h4>
<p>To determine the <i>development</i> port that will be used, do not use a port that is already in use by other applications, <b>this is mandatory</b></p>
<span>For example:</span>
    
```
PORT_APP_DEV=8080
```
    
<h4><b>PORT_APP_PROD</b></h4>
<p>To determine the <i>production</i> port that will be used, do not use a port that is already in use by other applications</p>
<span>For example:</span>
    
```
PORT_APP_PROD=8000
```
    
<h4><b>ENDPOINT_DEV</b></h4>
<p>Used to determine the endpoint during the development process</p>
<span>For example:</span>
    
```
ENDPOINT_DEV=http://localhost
```
    
<h4><b>ENDPOINT_PROD</b></h4>
<p>Used to determine the endpoint during the production process, <b>this is mandatory</b></p>
<span>For example:</span>
    
```
ENDPOINT_PROD=http://prod.com
```
    
<h4><b>FILE_NAME</b></h4>
<p>To specify a file name to call or remote from another app if this app is used for remote file. <b>Mandatory if you want to expose component</b></p>
<span>For example:</span>
    
```
FILE_NAME=remoteEntry.js
```
    
<h4><b>NAME_COMPONENT_EXPOSE</b></h4>
<p>For naming files from js files that will be remote by other apps, for file naming must be prefixed with "./" for example "./Foo". And this can be more than one file to be remote, by simply adding the prefix _1, _2 and so on. <b>Mandatory if you want to expose component</b></p>
<span>For example:</span>
    
```
NAME_COMPONENT_EXPOSE_1=./Navbar
NAME_COMPONENT_EXPOSE_2=./Footer
NAME_COMPONENT_EXPOSE_3=./Sidebar
```
    
<h4><b>SRC_COMPONENT_EXPOSE</b></h4>
<p>To call the place where the js file is stored that will be remote by other apps, for file calling must be prefixed with "./" for example "./src/components/Navbar". And this can be more than one file to be remote, by simply adding the prefix _1, _2 and so on. <b>Mandatory if you want to expose component</b></p>
<span>For example:</span>
    
```
SRC_COMPONENT_EXPOSE_1=./src/components/Navbar
SRC_COMPONENT_EXPOSE_2=./src/components/Footer
SRC_COMPONENT_EXPOSE_3=./src/components/Sidebar
```

===========================

<h3>Configuration for External app or remote app</h3>
<p>This configuration is used to call or remote file from outside app or second app or other app. for this configuration it always ends with a "_" or underscore then followed by a number indicating the number of apps being called</p>
<hr/>

<h4><b>REMOTE_NAME</b></h4>
<p>The name of the remote application. <b>this is mandatory</b></p>
<span>For example:</span>
    
```
REMOTE_NAME_1=app2
```
<h4><b>REMOTE_PORT_APP_DEV</b></h4>
<p>Port of app development the remote application. <b>this is mandatory</b></p>
<span>For example:</span>
    
```
REMOTE_PORT_APP_DEV_1=8081
```

<h4><b>REMOTE_PORT_APP_PROD</b></h4>
<p>Port of app production the remote application.</p>
<span>For example:</span>
    
```
REMOTE_PORT_APP_PROD_1=8001
```

<h4><b>REMOTE_ENDPOINT_DEV</b></h4>
<p>Endpoint of app development the remote application.  <b>this is mandatory</b></p>
<span>For example:</span>
    
```
REMOTE_ENDPOINT_DEV_1=http://localhost
```

<h4><b>REMOTE_ENDPOINT_PROD</b></h4>
<p>Endpoint of app production the remote application.  <b>this is mandatory</b></p>
<span>For example:</span>
    
```
REMOTE_ENDPOINT_PROD_1=http://prod.com
```

<h4><b>REMOTE_FILE</b></h4>
<p>Filename the remote application.  <b>this is mandatory</b></p>
<span>For example:</span>
    
```
REMOTE_FILE_1=remoteEntry.js
```

===============================
===============================

<h3>Usage examples</h3>
<p>We will create 2 sample projects, the first app is as the main app, and the second app is the component that will be used by the first app</p>

<h5>========= Main app =========</h5>

``` 
npx create-my-microfrontend main
```

src/App.js
```javascript
import React, { lazy } from "react";

const Navbar = lazy(() => import("app2/Navbar"));
const Footer = lazy(() => import("app2/Footer"));

function App() {
    return (
        <div>
            <React.Suspense fallback={null}>
                <Navbar/>
            </React.Suspense>
            Hello Microfrontend
            <React.Suspense fallback={null}>
                <Footer/>
            </React.Suspense>
        </div>
    );
}

export default App;
```


.env
``` 
# ======== For Internal App ===========
# === Initial name app ===
APP_NAME=main
# === Port of app on dev mode === 
PORT_APP_DEV=8080
# === Port of app on prod mode if any === 
PORT_APP_PROD=8000
# === Endpoint dev ===
ENDPOINT_DEV=http://localhost
# === Endpoint prod ===
ENDPOINT_PROD=http://prod.com


# ======== For External app or remote app ========
# === For remote name ===
REMOTE_NAME_1=app2
# === Port of app on dev mode === 
REMOTE_PORT_APP_DEV_1=8081
# === Port of app on prod mode if any === 
REMOTE_PORT_APP_PROD_1=8001
# === Endpoint dev ===
REMOTE_ENDPOINT_DEV_1=http://localhost
# === Endpoint prod ===
; REMOTE_ENDPOINT_PROD_1=http://prod.com
# === File remote ====
REMOTE_FILE_1=remoteEntry.js
```

``` 
npm start
```

<h5>========= Second app =========</h5>

``` 
npx create-my-microfrontend app2
```

Create components "src/components/Navbar"
```javascript
import React from 'react'

export default function Navbar() {
  return (
    <div>Navbar from app2</div>
  )
}
```

Create components "src/components/Footer"
```javascript
import React from 'react'

export default function Footer() {
  return (
    <div>Footer from app2</div>
  )
}
```

.env
``` 
# ======== For Internal App ===========
# === Initial name app ===
APP_NAME=app2
# === Port of app on dev mode === 
PORT_APP_DEV=8081
# === Port of app on prod mode if any === 
PORT_APP_PROD=8001
# === Endpoint dev ===
ENDPOINT_DEV=http://localhost
# === Endpoint prod ===
ENDPOINT_PROD=http://prod.com
# === File name of remote file ===
FILE_NAME=remoteEntry.js
# === File name of file expose to another app ===
NAME_COMPONENT_EXPOSE_1=./Navbar
NAME_COMPONENT_EXPOSE_2=./Footer

# === Src component of file expose to another app ===
SRC_COMPONENT_EXPOSE_1=./src/components/Navbar
SRC_COMPONENT_EXPOSE_2=./src/components/Footer

```

```
npm start
```

<span>Open on browser http://localhost:8080</span>
<br/>
<br/>

### [Live preview](https://stackblitz.com/edit/node-9tejzx)

<hr/>
<span>Note: Can only run on node js version 14 and above</span>
<hr/>
<br/>

<h2>Report bugs</h2>

##### [https://github.com/ugiispoyo/Micro-Id/issues](https://github.com/ugiispoyo/Micro-Id/issues)

<br/>
<br/>
<hr/>

<span>By: Ugi Ispoyo Widodo</span>
