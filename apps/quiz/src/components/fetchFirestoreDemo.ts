export async function fetchFirestoreDemo() {
  const doc = await window.firebase
    .firestore()
    .doc('firestore_demo/demo')
    .get()
  const data = doc.data()
  return data.blogoslawienstwo
}
