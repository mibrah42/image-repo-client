import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ImageCard from "./ImageCard";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  containerStyle: {
    flexWrap: "wrap"
  }
}));

function ImagesGrid({ images, onDelete }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.containerStyle}>
        {images.map(({ id, title, description, tags, url }, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ImageCard
              id={id}
              title={title}
              description={description}
              tags={tags}
              url={url}
              onDelete={onDelete}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default React.memo(ImagesGrid);
