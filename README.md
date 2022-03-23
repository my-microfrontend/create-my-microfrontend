# My MicroFrontend

<h2>How to install</h2>

```
npx create-my-microfrontend [project-name]
```

or

```
npm i -g create-my-microfrontend
npx create-my-microfrontend [project-name]
```

<h3>How to use</h3>
<p>We will create 2 sample projects, the first app is as the main app, and the second app is the component that will be used by the first app</p>

<h5>========= Main app =========<h5>

``` 
npx create-my-microfrontend main
```

src/App.js
```
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

<h5>========= Second app =========<h5>

``` 
npx create-my-microfrontend app2
```

Create components "src/components/Navbar"
```
import React from 'react'

export default function Navbar() {
  return (
    <div>Navbar from app2</div>
  )
}
```

Create components "src/components/Footer"
```
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
SRC_COMPONENT_EXPOSE_1=./src/component/Navbar
SRC_COMPONENT_EXPOSE_2=./src/component/Footer

```

```
npm start
```


<hr>
<span>Open on browser http://localhost:8080<span>
<br/>
<br/>

<span>Note: Can only run on node js version 14 and above<span>
