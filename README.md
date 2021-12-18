# ReactJX - JSX UI Components for React

**ReactJX** helps you to create and handle front-end UI components easy and fast. All the components that avaibale are given below.

- **LoadList** - Render paginated API responses into scrollable view
- **PopUp** - Make you component functionable as a pop-up box
- **ScaleGraph** - Generate multiple SVG graphs using API responses
- **ToastMessage** - Display toast messages such as info, error, warning
- **WYSIWYGEditor** - Content editable tool that generates HTML output

## LoadList

Import LoadList component and place it in your app

```
import { LoadList } from 'react-jx'

<LoadList
  className="sample-load-list"
  toLoad={requestList}
  query={query}
/>
```

In above example **requestList** is the function that **LoadList** call when user reaches the end of scroll view to load more items. **query** is an object contains all the query parameters that can filter and sort the response. look at the following example.

```
let query = { sort : 'ascending', keyword : '' }

<div onInput={updateQuery}>
  <input name="keyword">
  <select name="sort" defaultValue="DESC">
    <option>ascending</option>
    <option>descending</option>
  </select>
</div>

let updateQuery = event => {
    LoadList.find('.sample-load-list').updateQueryByInputEvent(event)
}
```

Using **LoadList.find** you can access component and update query data using **updateQueryByInputEvent** method. At this time the list will be reloaded from begining accrding to new query setup.

```
let index = 0

let requestList = (query, count, callback) => {
  fetch('api/list?index=' + index++, {
    method : 'POST',
    body : JSON.stringify(query)
  })
  .then(resp => resp.json())
  .then(resp=> {
    callback(resp.map(obj => {
      return (
        <div className="Item">
          Name : { obj.name }
          Date : { obj.date }
        </div>
      )
    }))
  })
}
```

At last, you have to define the request function to callback the response from your API to component. This function should contain **query**, **count**, **callback** as parameters to recieve in order to make API request. **query** contains current updated query object ada and count is current item count in the list and callback should contain a JSX component with you item design using response for each item data in the response page.

## PopUp

To create a pop-up window, you can use the **PopUp** component.

```
import { PopUp } from 'react-jx'

<PopUp
  className="sample-pop-up"
  duration={300}
  toLoad={requestInfoLoad}
  toBold={requestInfoBold}
/>
```

Here you have to define two function for **toLoad** and **toBold**. **toLoad** returns JSX content in pop-up view and **toBold** is the background area of pop-up view to fade out of component. You can ignore this if you are not willing to fade them. Define your own styles to setup these two elements.

```
let requestInfoLoad = callback => {
  callback(
    <div className="sample-pop-up-inner">Content of PopUp</div>
  )
}

let requestInfoBold = callback => {
  callback (
    <div className="sample-pop-up-outer" onClick={hidePopUp}></div>
  )
}
```

When you need to close or open this pop-up, use ```PopUp.find().open()``` and ```PopUp.find().close()```. In above example, pop-up will be closed when you click out of window.

```
let showPopUp = () => PopUp.find('.sample-pop-up').open()
let hidePopUp = () => PopUp.find('.sample-pop-up').close()
```

## ScaleGraph

**ScaleGraph** can render mutiple graphs in one SVG element and resize according to it's parent container. Currently this component can generate line graphs and bar chars.

```
import { ScaleGraph } from 'react-jx'

<ScaleGraph
  className="sample-graph"
  width="30vw"
  height="calc(20vh - 12px)"
  toLoad={requestGraphData}
/>
```

First you have to create **ScaleGraph** component and provide width and height in css height units. This will generate an empty container and using the function you provide for **toLoad**, will be called to request graph data.

```
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

Callback data should be an array of objects. this each object counts as a single graph. Look at the following example for one graph.

```
{
  data : [12, 24, 56, 12, 34, 84, 95, 25, 0, 74],
  type : 'line',
  scale : 0.5,
  style : { stroke : 'green', strokeWidth : 1.5 }
}
```

According to this example, graph will be generated using data array and scale reperents the multiplier for each vertical unit to draw the graph. And you have to set styles for SVG lines using style object.

## ToastMessage

Using **ToastMessage** component, you can generate pop-up messages left bottom of the web view. Import the **ToastMessage** component and you can provide x and y direction offset for place the toast message tray.

```
import { ToastMessage } from 'react-jx'

<ToastMessage offsetX={50} offsetY={32} />
```

Then use ```ToastMessage.append``` to append an message into tray.

```
ToastMessage.append({
  head : { text : 'Sample Toast Message Title' },
  body : { text : 'Message Content' }
})
```

Also you can add an icon to the message. There are three default icons and types that you can define into message.

```
ToastMessage.append({
  type : ToastMessage.TYPES.ERROR,
  icon : ToastMessage.ICONS.ERROR,
  head : { text : 'Error Message Title' },
  body : { text : 'Message Content' }
})
```

```ToastMessage.TYPES``` contains three types of messages that can change the color of message (INFO, ERROR, WARNING). ```ToastMessage.ICONS``` contains the same.

```
ToastMessage.append({
  type : ToastMessage.TYPES.INFO,
  icon : ToastMessage.ICONS.INFO,
  head : { text : 'Info Message Title' },
  body : { text : 'Message Content' }
  time : { delay : 1000, clear : 3000 }
})
```

According to above example, Message will appear with one second of delay and will be disappear after three seconds.

## WYSIWYGEditor

**WYSIWYGEditor** component provides HTML content editable tool. Just import the component and it's extensions.

```
import { WYSIWYGEditor } from './modules/react-jx'
import { Extensions } from './modules/react-jx/wysiwyg-editor/extensions'

<WYSIWYGEditor
  content="Sample Text"
  placeholder="Type here..."
  extensions={Extensions}
/>
```

Provide default content and placeholder to the component. And you can import all the extensions or select few as following example

```
import { Bold, Italic } from './modules/react-jx/wysiwyg-editor/extensions'

<WYSIWYGEditor
  content="Sample Text"
  placeholder="Type here..."
  extensions={[Bold, Italic]}
/>
```

Provide ```onUpdate``` function to the component that will callback when the content is updated and callback will receive the content in html format.

```
<WYSIWYGEditor
  content="Sample Text"
  placeholder="Type here..."
  extensions={Extensions}
  onUpdate={html => { console.log(html) }}
/>
```