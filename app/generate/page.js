'use client';

import { useUser } from "@clerk/nextjs";
import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Grid, 
  CardActionArea, 
  CardContent, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions 
} from "@mui/material";
import { writeBatch } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    fetch('api/generate', {
      method: 'POST',
      body: text,
    })
    .then((res) => res.json())
    .then((data) => setFlashcards(data))

    // if (!text.trim()) {
    //   alert('Please enter some text to generate flashcards.')
    //   return
    // }
  
    // try {
    //   const response = await fetch('/api/generate', {
    //     method: 'POST',
    //     body: text,
    //   })
    //   if (!response.ok) {
    //     throw new Error('Failed to generate flashcards')
    //   }
    //   const data = await response.json()
    //   setFlashcards(data)
    // } 
    
    // catch (error) {
    //   console.error('Error generating flashcards:', error)
    //   alert('An error occurred while generating flashcards. Please try again.')
    // }

    // try {
    //   if (!text.trim()) {
    //     alert('Please enter some text to generate flashcards.')
    //     return
    //   }
  
    //   const response = await fetch('/api/generate', {
    //     method: 'POST',
    //     body: text,
    //   })
  
    //   if (!response.ok) {
    //     throw new Error('Failed to generate flashcards')
    //   }
  
    //   const data = await response.json()
    //   if (!Array.isArray(data)) {
    //     throw new Error('Invalid response from API')
    //   }
  
    //   setFlashcards(data)
    // } catch (error) {
    //   console.error('Error generating flashcards:', error)
    //   alert('An error occurred while generating flashcards. Please try again.')
    // }
  }


  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const saveFlashcards = async () => {
    if (!name) {
      alert("Please enter a name")
      return
    }

    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, "users"), user.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || []
      if (collections.find((f) => f.name === name)) {
        alert("A flashcard with this name already exists");
        return
      } else {
        collections.push({name})
        batch.set(userDocRef, {flashcards: collections}, {merge: true})
      }
    }

    else {
      batch.set(userDocRef, {flashcards: [{name}]})
    }

    const colRef = collection(userDocRef, name)
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef) 
      batch.set(cardDocRef, flashcard)
    })

    await batch.commit()
    handleClose()
    router.push('/flashcards')
  }
  
  return (
    <Container maxWidth="md">
      <Box
        sx={{mt: 4, mb: 6, display: "flex", flexDirection: "column", alignItems: "center"}}
      >
        <Typography variant="h4">Generate Flashcards</Typography>
        <Paper sx={{p: 4, width: "100%"}}>
          <TextField
            label="Enter text"
            multiline
            fullWidth
            rows={3}
            variant="outlined"
            sx={{mb: 2,}}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />  
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleSubmit}
            fullWidth
            >
            {' '}
            Submit
          </Button>
        </Paper>
      </Box>

      {flashcards.length > 0 && (
        <Box sx={{mt: 4}}>
          <Typography variant="h5">Flashcards Preview</Typography>
          <Grid container spacing={3}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardActionArea onClick={() => {
                    handleCardClick(index)
                  }}>
                    <CardContent>
                      <Box
                        sx={{
                          perspective: "1000px", 
                          '& > div': {
                            transition: "transform 0.6s",
                            transformStyle: "preserve-3d",
                            position: "relative",
                            width: "100%",
                            height: "200px",
                            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                            transform: flipped[index]
                              ? "rotateY(180deg)"
                              : "rotateY(0deg)",
                          },
                          '& > div > div': {
                            position: "absolute",
                            width: "100%",
                            height: "200px",
                            backfaceVisibility: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 2,
                            boxSizing: "border-box",
                          },
                          '& > div > div:nth-of-type(2)': {
                            transform: "rotateY(180deg)",
                          }
                        }}
                      >
                        <div>
                          <div>
                            <Typography variant="h6" component="div">
                              {flashcard.front}
                            </Typography>
                          </div>
                          <div>
                            <Typography variant="h6" component="div">
                              {flashcard.back}
                            </Typography>
                          </div>
                        </div>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{mt: 4, display: "flex", justifyContent: "center"}}>
            <Button variant="contained" color="primary" onClick={handleOpen}>Save</Button>
          </Box>
        </Box>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Flashcards</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name of the deck you want to save the flashcards to.
          </DialogContentText>
          <TextField 
            autoFocus
            margin="dense"
            label="Collection Name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveFlashcards}>Save</Button>
        </DialogActions>
      </Dialog>
      
    </Container>
  )

}