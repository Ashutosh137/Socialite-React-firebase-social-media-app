import { auth, app, firestore } from ".";
import { addDoc, getDoc, collection, doc, query, where, getDocs } from "firebase/firestore";

const user = collection(firestore, 'user');

export const Create_Account = async ({ email, uid, bio, name, age ,username}) => {
    try {
        await addDoc(collection(firestore, 'user'), {
            email: email,
            name: name,
            uid: uid,
            dateofbirth: age,
            bio: bio,
            restricted: false,
            profileImageURL: null,
            createdAt: new Date(),
            follower:[],
            following:[],
            username:username,
            post:[],

        })
    }
    catch (err) {
        console.error(err);
    }
}


export const get_userdata = async (uid) => {
    try {
        const q = await query(user, where('uid', '==', uid));
        const doc_refs = await getDocs(q)
        const res = []
        doc_refs.forEach(country => {
            res.push({
                ...country.data()
            })
        })
        return res;
    }
    catch (err) {
        console.error(err);
    }
}
export const getallpost = async () => {
    try {
        const q = await query(user);
        const doc_refs = await getDocs(q)
        const res = []
        console.log(doc_refs)
        doc_refs.forEach(country => {
            res.push({
                ...country.data().post
            })})
        console.log(res)
        return res;
    }
    catch (err) {
        console.error(err);
    }
}


export const check_data_is_exist = async (uid) => {
    try {
        const q = await query(user, where('uid', '==', uid));
        const doc_refs = await getDocs(q)
        console.log(doc_refs)
        if(doc_refs){
            alert('data already exist');
            return true;
        }
        else{
            return false
        }
    }
    catch (err) {
        console.error(err);
    }
}
