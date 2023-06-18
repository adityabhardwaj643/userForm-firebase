import { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/Auth';
import { db } from './firebase';
import { getDocs ,collection,addDoc,deleteDoc,doc} from 'firebase/firestore';//getDocs function gives just the documents but we have to specify from which collection we have to get docs from so we use the collection function and make a instance of it  
import { deleteUser } from 'firebase/auth';
//addDoc is used to add a Doc in a  collection


function App() {

const[userList,setUserList]=useState([])

//New User States
const[newName,setNewName]=useState("")
const[newAge,SetNewAge]=useState(0)
const[newAddress,SetNewAddress]=useState("")




const userCollectionRef=collection(db,"users") //here we made a reference called userCollectionRef that points to the collection users in database db ,db is the reference of firestore database we made in firebase.js file


//get
const getUserlist=async()=>{
  //read the data from data list 
  try{
  const data = await getDocs(userCollectionRef)
  const filteredData = data.docs.map((doc)=>(
    {...doc.data(),
    id:doc.id,}))
  console.log(filteredData)
  setUserList(filteredData)
  }catch(err){
    console.error(err)
  }
}

useEffect(()=>{
  getUserlist();
},[])//we displayed the data below in return


//post
const onSubmitUser=async()=>{
  try{
  await addDoc(userCollectionRef,{ //here we add an doc to collection using addDoc method that takes two inputs,1 the ref of the collection in which the doc will be added and the other is the format what should be added 
    name: newName,
    age:newAge,
    Address:newAddress,
  });
  getUserlist();
}catch(err){
  alert(err)
  console.error(err)
}

//delete
const deleteUser=async(id)=>{
  
    const userDoc = doc(db,"users",id);
    await deleteDoc(userDoc)
  
}

}

  return (
    <div className='App' >
      <Auth></Auth>

      <div>
        <label>Enter details of user </label>
        <input onChange={(e)=>setNewName(e.target.value)} className="mx-2 my-2" placeholder='Enter the name of user'/>
        <input onChange={(e)=>SetNewAge(Number(e.target.value))} className="mx-2 my-2" placeholder='Enter the age of user' type='number'/>
        <input onChange={(e)=>SetNewAddress(e.target.value)} className="mx-2 my-2" placeholder='Enter the Address of user'/>
        <button onClick={onSubmitUser}>Submit User</button>
        </div>


     <div className='my-5'>
     <h1>List and Details of Users</h1>
     
      <div className='my-5'>
        {userList.map((user)=>(
          <div> 
            <h2>{user.name}</h2>
            <p>Age:{user.age}</p>
            <p>Address:{user.Address}</p>
        </div>
          
        ))}
      </div>
      </div>
    </div>
  );
}

export default App;
