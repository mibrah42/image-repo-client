import React, { useCallback, useEffect, useState } from "react";
import SimpleContainer from "./SimpleContainer";
import SearchBar from "./SearchBar";
import ImagesGrid from "./ImagesGrid";
import UploadModal from "./UploadModal";
import client from "../graphqlApollo/apolloClient";
import {
  getImagesQuery,
  searchImagesQuery,
  deleteImageQuery
} from "../graphqlApollo/Queries";

function ImagesContainer() {
  const [images, setImages] = useState([]);

  const getImages = useCallback(async () => {
    try {
      const response = await client.query({
        query: getImagesQuery
      });
      setImages(response.data.images);
    } catch (error) {
      console.log("error fetching images", error);
    }
  }, [setImages]);

  useEffect(() => {
    getImages();
  }, [getImages]);

  const deleteImage = useCallback(
    async id => {
      console.log("deleting image with id", id);
      try {
        await client.query({
          query: deleteImageQuery,
          variables: { id }
        });
        const newImages = images.filter(image => image.id !== id);
        setImages(newImages);
      } catch (error) {
        console.log("error deleting image", error);
      }
    },
    [getImages, images]
  );

  const filterImages = useCallback(
    async query => {
      try {
        const response = await client.query({
          query: searchImagesQuery,
          variables: { query }
        });
        setImages(response.data.search);
      } catch (error) {
        console.log("error searching images", error);
      }
    },
    [setImages]
  );

  const onSearchChange = useCallback(
    e => {
      filterImages(e.target.value);
    },
    [filterImages]
  );

  return (
    <div>
      <SimpleContainer>
        <SearchBar onChange={onSearchChange} />
        <ImagesGrid images={images} onDelete={deleteImage} />
      </SimpleContainer>
      <UploadModal
        getImages={getImages}
        setImages={setImages}
        images={images}
      />
    </div>
  );
}

export default ImagesContainer;
