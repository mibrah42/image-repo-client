import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import FloatingButton from "./FloatingButton";
import TextInput from "./TextInput";
import SimpleButton from "./SimpleButton";
import { useState, useCallback } from "react";
import { storage, db } from "../firebase/config";
import ProgressBar from "./ProgressBar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3)
  },
  margin: {
    margin: theme.spacing(1)
  }
}));

export default function UploadModal({ images, setImages }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  const fileChangedHandler = useCallback(
    event => {
      setSelectedFile(event.target.files[0]);
    },
    [setSelectedFile]
  );

  const addImageHandler = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const uploadHandler = () => {
    if (!selectedFile) return;
    setUploading(true);
    const image = selectedFile;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressValue(progress);
      },
      error => {
        console.log("ERROR UPLOADING", error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            db.collection("images")
              .add({
                title,
                description,
                tags,
                url
              })
              .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                handleClose();
                const newImages = [
                  ...images,
                  { id: docRef.id, title, description, tags, url }
                ];
                setImages(newImages);
                setUploading(false);
              })
              .catch(function(error) {
                console.error("Error adding document: ", error);
              });
          });
      }
    );
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setDescription("");
    setTags("");
    setSelectedFile(null);
  };

  return (
    <div>
      <FloatingButton addClicked={handleOpen} />
      <input
        type="file"
        id="imageInput"
        hidden="hidden"
        onChange={fileChangedHandler}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {uploading ? <ProgressBar value={progressValue} /> : null}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {selectedFile ? <span>{selectedFile.name}</span> : null}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <SimpleButton
                label="Pick Image"
                color="primary"
                onClick={addImageHandler}
              />
              <SimpleButton
                label="Upload"
                color="default"
                onClick={uploadHandler}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TextInput
                label="Title"
                placeholder="Enter title"
                onChange={e => setTitle(e.target.value)}
                value={title}
              />
              <TextInput
                label="Description"
                placeholder="Enter description"
                onChange={e => setDescription(e.target.value)}
                value={description}
              />
              <TextInput
                label="Tags"
                placeholder="ie. tech, nature,..."
                onChange={e => {
                  setTags(e.target.value);
                }}
                value={tags}
              />
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
