import axios from 'axios'


function App() {

  axios.get("/api/test").then((res) => {
    console.log(res.data)
  })

  return (
    <>
      <h1>React App</h1>
    </>
  )
}

export default App
