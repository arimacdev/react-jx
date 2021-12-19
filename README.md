# ReactJX - JSX UI Components for React

<p style="text-align: center; margin: 40px 0px;">
  <img src="logo.png" height="200">
</p>

**ReactJX** helps you to develop front-end web applications that mainly interact with APIs. Using **ReactJX API Caller** it will be easy to request data from your server and use **ReactJX Components**  to render them on your web application interface. There are bunch of UI components here in **ReactJX Library**. Before I explain about each of them individually, first look at how the **ReactJX API Caller** works.

## ReactJX API Caller

When you request data from servers, you need to use one of API call method such as XMLHttpRequest, fetch, Axios. **ReactJX** provides it's own API caller that you can configure default settings for any request you going to do in future.

For an example, imagine you login with your username and password to receive the access token. Then you can configure API header authorization values for future use. After that you don't need to worry about token beacuse it will send with your request headers everytime you make a request.

```JavaScript
import { API } from 'react-jx'

API.request.post('https://api.app.com/login')
  .body({ username : 'my_username', password : 'my_password' })
  .send(data => {
    // save token in configuration
    API.configure.headers.Authorization += data.token
  }, error => {
    alert(error.message)
  })
```

**ReactJX API Caller** has nine request methods and four setup methods that you can setup before you make the request.

### Setup Methods 

- `.params()` - Provide URL search parameters as ***object***
- `.headers()` - Provide request header values as ***object***
- `.body()` - Provide request body values as ***object***
- `.options()` - Provide other request options as ***object***

### Request Methods

- `API.request.get()` - `.body()` is not available
- `API.request.head()` - `.body()` is not available
- `API.request.post()` - Supports all setup methods
- `API.request.put()` - Supports all setup methods
- `API.request.delete()` - Supports all setup methods
- `API.request.connect()` - `.body()` is not available
- `API.request.options()` - `.body()` is not available
- `API.request.trace()` - `.body()` is not available
- `API.request.patch()` - Supports all setup methods

After setting up all the methods you need, just call `.send()` with callbacks for response and error to make the request.

```JavaScript
API.request.get('https://api.app.com/list')
  .params({ start : '2022-03-12', end : '2022-50-28' })
  .options({ cache : 'no-cache', redirect : 'error' })
  .send(console.log, console.error)
```

Here look at `API.configure` object that contains certain values that you can change anytime. When you make a request, API caller will get this default configuration and combine with your data that you've specified in request to make the call. At that time request specified data has the first priority. Look at following configuration and their default values.

- `API.configure.root` - ***string*** Specify server root
  - Default is empty ***string***
- `API.configure.headers` - ***object*** Request header values
  - `Content-Type : application/json`
  - `Accept : application/json`
  - `Authorization : Bearer`
- `API.configure.body` - ***object*** Request body
  - Default is empty ***object***
- `API.configure.params` - ***object*** URL search parameters
  - Default is empty ***object***
- `API.configure.options` - ***object*** Other request options
  - `mode : cors`
  - `cache : default`
  - `credentials : same-origin`
  - `redirect : follow`
  - `referrerPolicy : no-referrer-when-downgrade`
- `API.configure.callback` - ***function*** Callback for response
  - Default is `console.log`
- `API.configure.error`
  - Default is `console.error` - ***function*** Callback for error

In this case, you can configure even URL search parameters to be default. The that parameters will send with every request you make.

If you need to make a request without the default configuration, just provide `false` as second parameter to the request method.

```JavaScript
// no default configuration added
API.request.get('sample.json', false)
  .send(console.log, console.error)
```

Here I have given another example for **ReactJX API Caller**

```JavaScript
// .env contains https://app.com/api/v1/
API.configure.root = process.env.REACT_APP_API_ROOT

// login
API.request.post('login')
  .body({ username : 'my_username', password : 'my_password' })
  .send(data => {
    // save token in configuration
    API.configure.headers.Authorization += data.token
    // get data for graph right after login
    API.request.get('graph/list')
      .params({ page : 11, limit : 30 })
      .send(buildGraph, alert('Server Error!'))
  }, error => {
    alert(error.message)
  })
```

## ReactJX UI Components

Let's have a look at **ReactJX Components**. Currently there are five components in **ReactJX** and wait for more soon.

- **PopUp** - Display certain content or element as a Pop-Up Box
- **SearchList** - Load paginated list with scroll effect and query inputs
- **ToastMessage** - Display toast messages such as info, warning, error
- **VectorGraph** - Generate multiple SVG graph together in scalable area
- **WYSIWYGEditor** - HTML Content Editable tool

All these components have some similar properties. When you use these components and load contet or any elements inside them, you need to provide them as a callback function. Since **ReactJX** is always about API response rendering in UI, you can use **ReactJX API Caller** inside this callback function and return them to component. Look at all these similar properties given below. these properties should provide as component props.

### Similar Properties of UI Components

- `className` - ***string*** Style class name for component container
- `preloader` - ***boolean*** Show loading state middle of component container


- `onMount` - ***function*** Calls when component is mounted
- `toLoad` - ***function*** Function with callback to return content
- `onLoad` - ***function*** Calls when content is added inside to component

Let's look at each UI component and learn how to use these props inside them.

## PopUp

**PopUp** will display your content with element as a sperated fade-in window. You have to provide some specific JSX elements with component props to use this.

```JavaScript
import { API, PopUp } from 'react-jx'

<PopUp
  className="my-popup"
  outerElement={<div className="my-popup-outer"></div>}
  innerElement={<div className="my-popup-inner"></div>}
  toLoad={requestPopUpData}
  preloader={true}
/>

let requestPopUpData = callback => {
  API.request.get('/account')
    .send(data => {
      callback(
        <div className="my-popup-inner">
          Name : { data.name }
          Town : { data.town }
        </div>
      )
    })
}
```

In above example, `outerElement` is the element that fade the background andstay behind the PopUp window. and `innerElement` is the container of the window. You have to steup all the CSS styles including `position, z-index, top, left` to render this as a PopUp. You can see here `requestPopUpData` is a function with one parameter that will component send into the as a function to get your JSX setup inside to the component. Like this, you can use all the **ReactJX Components** with `toLoad` function to callback all the content into component.

### Setup Custom Preloader

Above examlpe you saw the prop `preloader` is given as `true` to display spinner in the middle of the element until callback receive the rendering data. You can customize this icon using following CSS settings. Just setup your container class combined with `.rjx-preloader`

```CSS
.my-popup-inner.rjx-preloader {
  background-image: url("bin/my-spinner.svg");
  background-size: 80px auto;
}

.my-popup-inner.rjx-preloader-end {
  background-image: none;
}
```

## SearchList

This component is much more usable to display list of items with sorting options and pagined API response. Component will automatically detect when user reachs the bottom of scroll view and request next page from API to display.

```JavaScript
import { API, SearchList } from 'react-jx'

<SearchList
  className="my-list"
  toLoad={requestList}
  query={{
    sort : 'DESC',
    keyword : '',
    limit : 10
  }}
/>

let page  = 0
let requestList = (query, count, callback) => {
  query.page = page++
  API.request.get('/list').params(query).send(arr => {
    callback(data.map(item => {
      return (
        <div className="my-list-item">
          Name : { item.name }
          Date : { item.date }
        </div>
      )
    }))
  })
}
```

Setup your callback to increase you page index query parameter for every each call. And return items as JSX element array to callback to render into the list tray.

### Component Find Method

When you need to update the query parameters from HTML inputs and reload the list, you have to use `SearchList.find()` method. Search it with your own class name and use `updateQuery` to update query and auto reload component.

```JavaScript
let updateQueryData = event => {
  page  = 0 // reset page index
  let key = event.target.name
  SearchList.find('.my-list').updateQuery({ key : event.target.value })
}

<div onInput={updateQueryData}>
  <input name="keyword">
    <select name="sort">
      <option>ASC</option>
      <option>DESC</option>
    </select>
</div>
```

Also you can reload **SearchList** using `.reloadList()` method.

```JavaScript
SearchList.find('.my-list').reloadList()
```

## ToastMessage

Using **ToastMessage** component, you can generate pop-up messages left bottom of the web view. Import the **ToastMessage** component and you can provide x and y direction offset for place the toast message tray.

```JavaScript
import { ToastMessage } from 'react-jx'

<ToastMessage offsetX={50} offsetY={32} />
```

Then use `ToastMessage.append` to append an message into tray.

```JavaScript
ToastMessage.append({
  head : { text : 'Sample Toast Message Title' },
  body : { text : 'Message Content' }
})
```

Also you can add an icon to the message. There are three default icons and types that you can define into message.

```JavaScript
ToastMessage.append({
  type : ToastMessage.TYPES.ERROR,
  icon : ToastMessage.ICONS.ERROR,
  head : { text : 'Error Message Title' },
  body : { text : 'Message Content' }
})
```

`ToastMessage.TYPES` contains three types of messages that can change the color of message (INFO, ERROR, WARNING). `ToastMessage.ICONS` contains the same.

```JavaScript
ToastMessage.append({
  type : ToastMessage.TYPES.INFO,
  icon : ToastMessage.ICONS.INFO,
  head : { text : 'Info Message Title' },
  body : { text : 'Message Content' }
  time : { delay : 1000, clear : 3000 }
})
```

According to above example, Message will appear with one second of delay and will be disappear after three seconds.

## VectorGraph

**VectorGraph** can render mutiple graphs in one SVG element and resize according to it's parent container. Currently this component can generate line graphs and bar chars.

```JavaScript
import { ScaleGraph } from 'react-jx'

<VectorGraph
  className="my-graph"
  width="30vw"
  height="calc(20vh - 12px)"
  toLoad={requestGraphData}
  preloader={true}
/>
```

First you have to create **VectorGraph** component and provide width and height in css height units. This will generate an empty container and using the function you provide for **toLoad**, will be called to request graph data.

```JavaScript
let requestGraphData = callback => {
  fetch('api/graph')
  .then(resp => resp.json())
  .then(resp=> {
    callback([
      {
        data : resp.graph_1_data,
        type : 'bar',
        scale : 10,
        style : { fill : '#999' }
      },
      {
        data : resp.graph_2_data,
        type : 'line',
        scale : 10,
        style : { stroke : 'green', strokeWidth : 1.5 }
      }
    ])
  })
}
```

Callback data should be an array of objects. This each object counts as a single graph. Look at the following example for one graph.

```JavaScript
{
  data : [12, 24, 56, 12, 34, 84, 95, 25, 0, 74],
  type : 'line',
  scale : 0.5,
  style : { stroke : 'green', strokeWidth : 1.5 }
}
```

According to this example, graph will be generated using data array and scale reperents the multiplier for each vertical unit to draw the graph. And you have to set styles for SVG lines using style object.

## WYSIWYGEditor

**WYSIWYGEditor** component provides HTML content editable tool. Just import the component and it's extensions.

```JavaScript
import { WYSIWYGEditor } from 'react-jx'
import { Extensions } from 'react-jx/wysiwyg-editor/extensions'

<WYSIWYGEditor
  content={loadContent}
  placeholder="Type here..."
  extensions={Extensions}
/>

let loadContent = callback => {
  API.request.get('/data').send(callback)
}
```

Provide default content callback and placeholder to the component. And you can import all the extensions or select few as following example

```JavaScript
import { Bold, Italic } from 'react-jx/wysiwyg-editor/extensions'

<WYSIWYGEditor
  content={loadContent}
  placeholder="Type here..."
  extensions={[Bold, Italic]}
/>
```

Provide ```onUpdate``` function to the component that will callback when the content is updated and callback will receive the content in html format. Also if you don't provide extensions within props, **WYSIWYGEditor** load all the extensions to the component.

```JavaScript
<WYSIWYGEditor
  content={loadContent}
  placeholder="Type here..."
  onUpdate={html => { console.log(html) }}
/>
```

### Developed by Deshan Nawanjana

[https://dnjs.info/](https://dnjs.info/)

[LinkedIn](https://www.linkedin.com/in/deshan-nawanjana/)
&ensp;|&ensp;
[GitHub](https://github.com/deshan-nawanjana)
&ensp;|&ensp;
[YouTube](https://www.youtube.com/channel/UCfqOF8_UTa6LhaujoFETqlQ)
&ensp;|&ensp;
[Blogger](https://dn-w.blogspot.com/)
&ensp;|&ensp;
[Facebook](https://www.facebook.com/nawanjana.wickramasinhe/)
&ensp;|&ensp;
[Gmail](mailto:deshan.uok@gmail.com)