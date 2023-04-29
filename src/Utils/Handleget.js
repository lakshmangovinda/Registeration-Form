import { db } from "./fireBaseConfig";
import { collection, getDocs } from "firebase/firestore";
async function fetchAllData() {
    const querySnapshot = await getDocs(collection(db, "Registration"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
  }
  
let UsersData=[]
export const Handleget = () => {
    fetchAllData()
    .then((data) => {
        UsersData=data
       
  })
  return UsersData
  
    
};

