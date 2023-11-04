import { auth, app, firestore } from ".";
import { addDoc, getDoc, collection, doc, query, where, getDocs } from "firebase/firestore";

const teacher = collection(firestore, 'teacher');
const student = collection(firestore, 'student');

export const varify_teacher = async ({ email, uid, experience, qualification, bio, name, age }) => {
    try {
        await addDoc(collection(firestore, 'teacher'), {
            email: email,
            name: name,
            rating: null,
            uid: uid,
            age: age,
            qualification: qualification,
            subject: [],
            experience: experience,
            bio: bio,
            restricted: false,
            test_score: null,
            profileImageURL: null,
            createdAt: new Date(),
        })
    }
    catch (err) {
        console.error(err);
    }
}
export const student_signup = async ({ email, uid, classs, name, age }) => {
    try {
        if(!check_data_isexist(uid)){
            await addDoc(collection(firestore, 'student'), {
                name: name,
                email: email,
                restricted: false,
                class: classs,
                subject: [],
                age: age,
                quetions: [],
                topic: [],
                uid: uid,
                profileImageURL: null,
                createdAt: new Date(),
            })
        }
    }
    catch (err) {
        console.error(err);
    }
}


export const user = async ({ name, email, role, uid }) => {
    try {

        await addDoc(collection(firestore, 'user'), {
            name: name,
            email: email,
            role: role,
            createdAt: new Date(),
            uid: uid
        })
    }
    catch (err) {
        console.error(err);
    }
}
export const get_userdata_for_teacher = async (uid) => {
    try {
        const q = await query(teacher, where('uid', '==', uid));
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

export const get_userdata_for_student = async (uid) => {
    try {
        const q = await query(student, where('uid', '==', uid));
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
export const check_data_isexist = async (uid) => {
    try {
        const q = await query(student, where('uid', '==', uid));
        const doc_refs = await getDocs(q)
        if(doc_refs.exist()){
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







