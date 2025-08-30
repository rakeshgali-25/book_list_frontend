import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [books,setBooks]=useState([])
  const [title,setTitle]=useState("")
  const [releaseYear,setReleaseYear]=useState(0)
  const [newTitle,setNewTitle]=useState("")

  useEffect(()=>{
    fetchBooks();
  },[])

  const fetchBooks=async()=>{
    try{

      const  response=await fetch("http://127.0.0.1:8000/api/books/");
      const data=await response.json()
      setBooks(data)
      console.log(data)

    }catch(e){
      console.log(e)
    }
  }

  const addClick=async()=>{

    const bookData={
      bookTitle:title,
      release_year:releaseYear
    }

    try{

      const response=await fetch("http://127.0.0.1:8000/api/books/create",{
      method:"POST",
      headers:{
        'Content-Type':"application/json",

      },
      body:JSON.stringify(bookData)
    })

    const data=await response.json()
    setBooks((Prev)=>[...Prev,data])
    console.log(data)

    }catch(e){

    }

    
  }

  const updateTitle=async(pk,release_year)=>{

    const bookData={
      bookTitle:newTitle,
      release_year:release_year
    }

    try{

      const response=await fetch(`http://127.0.0.1:8000/api/books/${pk}`,{
      method:"PUT",
      headers:{
        'Content-Type':"application/json",

      },
      body:JSON.stringify(bookData)
    })

    const data=await response.json()
    setBooks((Prev)=>Prev.map((book)=>{
      if(book.id==pk){
        return data 

      }
      else{
        return book
      }
    }))
    console.log(data)

    }catch(e){

    }

  }

  const DeleteBook=async(pk)=>{



    try{

      const response=await fetch(`http://127.0.0.1:8000/api/books/${pk}`,{
      method:"DELETE"
  
    })

    setBooks((prev)=>prev.filter((book)=>{
      if(book.id!==pk){
        return book
      }
    }))

    }catch(e){

    }

  }

  return (
    <>
    <h1>Book Website</h1>
    <div>
      <input type='text' placeholder='book title' onChange={(e)=>setTitle(e.target.value)} />
      <input type='number' placeholder='release year'  onChange={(e)=>setReleaseYear(e.target.value)}/>
      <button  onClick={addClick}>Add button   </button>
    </div>
    {books.map((book)=>{
      return <div>
        <p>Title:{book.bookTitle}</p>
        <p>Release Year:{book.release_year}</p>
        <input type='text' placeholder='new Title' onChange={(e)=>setNewTitle(e.target.value)}/>
        <button onClick={()=>updateTitle(book.id,book.release_year)}>Change Title</button>
        <button onClick={()=>DeleteBook(book.id)}>Delete Book</button>
      </div>
    })}
    </>
  )
}

export default App
