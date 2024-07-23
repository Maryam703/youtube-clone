import React, { useState } from 'react';
import "./CreateChannel.css"
import { uploadBytes, ref ,  getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import {db, storage} from "../../Config/FirebaseConfig";
import { useNavigate } from 'react-router-dom';

export default function CreateChannel({closecreateModal}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [file, setFile] = useState(null);
    const navigate = useNavigate()    
    
    let user = JSON.parse(localStorage.getItem('user'))

    const selectFile =() =>{
        const input = document.getElementById('fileInput');
        input.click()
    }

    const channelData = {
        name: name,
        email: email,
        subscribers: [],
    }

    const createChannel=async() => {
        try {
            const date = Date.now();
          const fileRef = ref(storage, date.toString());
          await uploadBytes(fileRef, file)

          const url = await getDownloadURL(fileRef);

          const docRef = doc(db, "channel", user.uid);
          await setDoc(docRef, {...channelData, file: url})

        } catch (error) {
            console.error(error)
        }
        setName("");
        setEmail("");

        closecreateModal();
        navigate("/")
    }
    
    return (
        <div className='create-channel-container'>
            <div className='create-channel-box'>
                How You'll appear
                <div className='create-channel-1'>
                    <div className='create-image-image-box' onClick={selectFile}><img className='create-channel-img' src='' /></div>
                    <input id='fileInput' class="hidden" name='file' accept='image/*' type='file' onChange={(e)=> setFile(e.target.files[0])} />
                    <p>Create your profile</p>
                </div>
                <input name='name' type='text' placeholder='Enter your Name:' value={name} onChange={(e) => setName(e.target.value)} />
                <input name='email' type='email' placeholder='Enter your Name:' value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className='create-channel-2'>
                    <button onClick={closecreateModal}>Cancel</button>
                    <button onClick={createChannel}>Create</button>
                </div>
            </div>
        </div>
    )
}