import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    margin: "0 auto"
  },
  media: {
    height: 250
  },
  chip: {
    margin: 5
  },
  chipContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  deleteIcon: {
    position: "fixed",
    top: 10,
    right: 10
  }
});

export default function ImageCard({
  id,
  title,
  description,
  tags,
  url,
  onDelete
}) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={url}
          title={title}
          id={id}
        />
        {title !== "" && description !== "" && tags !== "" ? (
          <CardContent>
            <div className={classes.chipContainer}>
              {tags.split(",").map((tag, index) => {
                if (tag !== "") {
                  return (
                    <Chip
                      key={index}
                      label={tag.trim()}
                      className={classes.chip}
                      size="small"
                    />
                  );
                }
                return null;
              })}
            </div>
            {title !== "" ? (
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
            ) : null}
            {description !== "" ? (
              <Typography variant="body2" color="textSecondary" component="p">
                {description}
              </Typography>
            ) : null}
          </CardContent>
        ) : null}
      </CardActionArea>
      <CardActions style={{ justifyContent: "center" }}>
        <Button size="small" color="secondary" onClick={() => onDelete(id)}>
          DELETE
        </Button>
      </CardActions>
    </Card>
  );
}
