


function getUserNotes(){    
    // Fetch user notes from the API
    setSelectedPage("All notes");
    axios.get("/api/getUserNotes").then((response) => {
      console.log(response.data);
      // Update the notes state with the fetched data
      setNotes(response.data);

      //if there are notes, set the first note as the selected note
      if (response.data.length > 0) {
          setSelectedNote(response.data[0].noteId);
      }
      console.log(response.data);
  }).catch((error) => {
      console.log(error);
      if (error.response.status === 403) {
          // If the user is forbidden, redirect to the home page
          navigate("/");
      }
  });
}

export { getUserNotes };