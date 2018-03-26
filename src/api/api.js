// Validate Password function from Firebase
export const passwordValidation = (payload) => {
   const endpoint =  `http://localhost:5000/react-firebase-19d1f/us-central1/checkPassword`;
   return fetch(endpoint, {
        body: JSON.stringify(payload), // must match 'Content-Type' header
        cache: 'no-cache', // *default, cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *omit
        headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
        },
        method: 'POST', // *GET, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *same-origin
        redirect: 'follow', // *manual, error
        referrer: 'no-referrer', // *client
    })
   .then( res => res.json())
   .catch( err => err )
}   