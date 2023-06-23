import { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/Auth';
import { db } from './firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc,setDoc ,getDoc} from 'firebase/firestore';

function App() {
  const [userList, setUserList] = useState([]);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState(0);
  const [newAddress, setNewAddress] = useState('');

  const userCollectionRef = collection(db, 'users');

  const getUserList = async () => {
    try {
      const data = await getDocs(userCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData);
      setUserList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  const onSubmitUser = async () => {
    try {
      const userData = {
        name: newName,
        age: newAge,
        address: newAddress,
      };
  
      // Get the current user count to determine the next ID
      const userCountSnapshot = await getDocs(collection(db, 'userCount'));
      const userCount = userCountSnapshot.docs[0]?.data()?.count || 0;
      const nextId = String(userCount + 1).padStart(4, '0'); // Pad with leading zeros
  
      // Create a new document with the generated ID
      const userDocRef = doc(db, 'users', nextId);
      await setDoc(userDocRef, userData);
  
      // Update the user count
      const countDocRef = doc(db, 'userCount', 'count');
      await setDoc(countDocRef, { count: userCount + 1 });
  
      getUserList();
    } catch (err) {
      alert(err);
      console.error(err);
    }
  };
  
  

  const deleteUser = async (id) => {
    const userDoc = doc(db, 'users', id);
    await deleteDoc(userDoc);
  
    // Decrement the user count
    const userCountDocRef = doc(db, 'userCount', 'count');
    const userCountSnapshot = await getDoc(userCountDocRef);
    const userCount = userCountSnapshot.data().count || 0;
    await setDoc(userCountDocRef, { count: userCount - 1 });
  
    getUserList();
  };

  const updateUser = async (id) => {
    const userDoc = doc(db, 'users', id);

    const updatedName = prompt('Enter the new name:');
    const updatedAge = Number(prompt('Enter the new age:'));
    const updatedAddress = prompt('Enter the new address:');

    if (updatedName && updatedAge && updatedAddress) {
      await updateDoc(userDoc, {
        name: updatedName,
        age: updatedAge,
        address: updatedAddress,
      });
      getUserList();
    }
  };

  return (
    <div className='App'>
      <Auth></Auth>

      <div>
        <label>Enter details of user </label>
        <input
          onChange={(e) => setNewName(e.target.value)}
          className='mx-2 my-2'
          placeholder='Enter the name of user'
        />
        <input
          onChange={(e) => setNewAge(Number(e.target.value))}
          className='mx-2 my-2'
          placeholder='Enter the age of user'
          type='number'
        />
        <input
          onChange={(e) => setNewAddress(e.target.value)}
          className='mx-2 my-2'
          placeholder='Enter the Address of user'
        />
        <button onClick={onSubmitUser}>Submit User</button>
      </div>

      <div className='my-5'>
        <h1>List and Details of Users</h1>

        <div className='my-5'>
          {userList.map((user) => (
            <div key={user.id}>
              <h2>{user.name}</h2>
              <p>Age: {user.age}</p>
              <p>Address: {user.address}</p>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
              <button onClick={() => updateUser(user.id)}>Update</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;