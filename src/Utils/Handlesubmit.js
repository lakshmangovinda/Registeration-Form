import { db } from "./fireBaseConfig";
import { collection, addDoc } from "firebase/firestore";
const HandleData = (testdata) => {
    addDoc(collection(db, "Registration"), {
        item: testdata,
      });
    
};
export default HandleData;
