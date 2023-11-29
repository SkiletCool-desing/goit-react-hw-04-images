import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from './service/imagesAPI';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGallery/ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Blocks } from 'react-loader-spinner';
import { Modal } from './Modal/Modal';
import css from './App.module.css';

export function App() {
  const [keyWord, setKeyWord] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(0);
  const [loader, setLoader] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    if (!keyWord) {
      return;
    }
    setLoader(true);
    fetchImages(keyWord, page);
  }, [keyWord, page]);

  const hendlSubmiForm = text => {
    setKeyWord(text);
    setPage(1);
    setImages([]);
    setTotal(0);
  };

  const fetchImages = async (keyWord, page) => {
    try {
      const { total, hits } = await getImages(keyWord, page);
      setImages(prevState => [...prevState, ...hits]);
      setTotal(total);
    } catch (error) {
      console.log('error: ', error);
    }
    setLoader(false);
  };

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const toglModal = largeImage => {
    setModalImage(largeImage);
    setOpenModal(!openModal);
  };

  return (
    <>
      <div className={css.App}>
        <Searchbar onSubmit={hendlSubmiForm} />
        <ImageGallery>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => {
            return (
              <ImageGalleryItem
                key={id}
                preview={webformatURL}
                largeImage={largeImageURL}
                tag={tags}
                tgModal={toglModal}
              />
            );
          })}
        </ImageGallery>
        {images.length < total && <Button addPhotos={onLoadMore} />}
      </div>
      {loader && (
        <Blocks
          wrapperClassName={css.Loader}
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
        />
      )}
      {openModal && <Modal modalImage={modalImage} closeModal={toglModal} />}
    </>
  );
}
