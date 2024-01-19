import { auth, app, firestore, storage } from ".";
import {
  addDoc,
  getDoc,
  collection,
  doc,
  query,
  where,
  getDocs,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useuserdatacontext } from "../context/usercontext";

const user = collection(firestore, "user");
export const Create_Account = async ({
  email,
  uid,
  bio,
  name,
  age,
  username,
  profileimg,
}) => {
  try {
    await addDoc(user, {
      email: email,
      name: name,
      uid: uid,
      dateofbirth: age,
      bio: bio,
      restricted: false,
      profileImageURL: profileimg,
      createdAt: new Date(),
      follower: [],
      following: [],
      blockusers: [],
      saved: [],
      username: username,
      post: [],
    });
  } catch (err) {
    console.error(err);
  }
};

export const createnewpost = async (uid, text, image) => {
  try {
    var imgurl;
    if (image !== null) {
      const imageurl = await Getimagedownloadlink(image);
      imgurl = imageurl;
    }

    var newpost = [
      {
        content: `${text}`,
        likes: [],
        comments: [],
        shares: 0,
        postedby: uid,
        postedat: new Date(),
        img: imgurl || null,
      },
      ...res.post,
    ];

    await updateDoc(doc(firestore, `user/${docid}`), {
      post: newpost,
    });
  } catch (err) {
    console.log(err);
  }
};

export const get_userdata = async (uid) => {
  try {
    const q = await query(user, where("uid", "==", uid));
    const doc_refs = await getDocs(q);
    const res = [];
    doc_refs.forEach((country) => {
      res.push({
        ...country.data(),
      });
    });

    return res[0];
  } catch (err) {
    console.error(err);
  }
};
export const get_userdatabyname = async (username) => {
  try {
    const q = await query(user, where("username", "==", username.trim()));
    const doc_refs = await getDocs(q);
    const res = [];
    doc_refs.forEach((country) => {
      res.push({
        ...country.data(),
      });
    });

    return res[0];
  } catch (err) {
    console.error(err);
  }
};

export const getpostdata = async (username, postid) => {
  try {
    var res = [];
    const data = await get_userdatabyname(username);
    await data?.post.map((pot) => {
      if (postid === pot.postid) {
        res.push(pot);
      }
    });
    return res[0];
  } catch (err) {
    console.error("Error: Post not found");
  }
};
export const getpostdatabyuid = async (uid, postid) => {
  try {
    var res = [];
    const data = await get_userdata(uid);
    await data?.post.map((pot) => {
      if (postid === pot.postid) {
        res.push(pot);
      }
    });
    return res[0];
  } catch (err) {
    console.error("Error: Post not found");
  }
};

export const updateuserdata = async (userdata) => {
  try {
    const q = await query(user, where("uid", "==", auth.currentUser.uid));
    const doc_refs = await getDocs(q);
    var docid;
    doc_refs.forEach((country) => {
      docid = country.id;
    });

    await updateDoc(doc(firestore, `user/${docid}`), userdata);

    console.log("userdata updatee", userdata, " with ", docid);
  } catch (err) {
    console.error(err);
  }
};
export const updateprofileuserdata = async (userdata, username) => {
  try {
    const q = await query(user, where("username", "==", username));
    const doc_refs = await getDocs(q);
    var docid;
    doc_refs.forEach((country) => {
      docid = country.id;
    });

    await updateDoc(doc(firestore, `user/${docid}`), userdata);

    console.log("userdata updatee", userdata, " with ", docid);
  } catch (err) {
    console.error(err);
  }
};
export const getallpost = async () => {
  try {
    const q = await query(user);
    const doc_refs = await getDocs(q);
    const res = [];
    doc_refs.forEach((country) => {
      res.push(country.data().post);
    });
    return res;
  } catch (err) {
    console.error(err);
  }
};
export const getallprofile = async () => {
  try {
    const q = await query(user);
    const doc_refs = await getDocs(q);
    const res = [];
    doc_refs.forEach((country) => {
      res.push(country.data());
    });

    res.sort();
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const check_data_is_exist = async (uid) => {
  try {
    const data = await get_userdata(uid);
    return !!data;
  } catch (err) {
    console.error(err);
  }
};
export const check_username_is_exist = async (username) => {
  try {
    return await get_userdatabyname(username);
  } catch (err) {
    console.error(err);
  }
};
export const Getimagedownloadlink = async (image, uid) => {
  try {
    // Use a promise to wait for the download URL
    const imageUrl = await new Promise((resolve, reject) => {
      try {
        const storageRef = ref(storage, `${uid}/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            // // setProgress(progress);
          },
          (error) => {
            console.error("Error during upload:", error);
            reject(error);
          },
          async () => {
            try {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(url);
            } catch (error) {
              console.error("Error getting download URL:", error);
              reject(error);
            }
          }
        );
      } catch (error) {
        console.log(err);
        resolve(null);
      }
    });
    return imageUrl;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const updatepost = async (post, postedby) => {
  try {
    const q = await query(user, where("uid", "==", postedby));
    const doc_refs = await getDocs(q);
    var docid;

    doc_refs.forEach(async (country) => {
      docid = country.id;
      var postdata = country.data().post;
      postdata.map(async (currentpost, index) => {
        if (post.postid === currentpost.postid) {
          postdata[index] = post;
          await updateDoc(doc(firestore, `user/${docid}`), {
            post: postdata,
          });
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};
