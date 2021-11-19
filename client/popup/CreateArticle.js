import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTab } from '../store/tab';
import {
  getExtensionUserArticles,
  createNewExtensionArticle,
} from '../store/userArticles';
import CreatableSelect from 'react-select/creatable';
import { ActionMeta, OnChangeValue } from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default () => {
  //In Order: supplies URL, User info, and Tag info
  const tab = useSelector((state) => state.tab);
  const user = useSelector((state) => state.auth);
  const articles = useSelector((state) => state.userArticles);
  const dispatch = useDispatch();
  const [tags, setTags] = useState([]);
  const [bookmarkName, setBookmarkName] = useState('');
  const [note, setNote] = useState('');

  //pulls bookmarks, tags and current tab details after render
  useEffect(() => {
    dispatch(getExtensionUserArticles(user.id));
    dispatch(fetchTab());
  }, [dispatch]);

  //sets default value for the Name input field
  useEffect(() => {
    if (tab.title) {
      setBookmarkName(tab.title);
    }
  }, [dispatch, tab]);

  function handleChange(options) {
    let tagArray = [];
    for (let i = 0; i < options.length; i++) {
      tagArray.push(options[i].value);
    }
    setTags(tagArray);
  }

  const tagOptions = [];
  articles.map((article) =>
    article.taggings.map((tag) =>
      tagOptions.push({ value: tag.tag.name, label: tag.tag.name })
    )
  );

  const submitBookmark = useCallback(
    async (event) => {
      event.preventDefault();
      const errCallback = () => toast('Something went wrong!');
      try {
        let result = await createNewExtensionArticle(
          tab.url,
          bookmarkName,
          note,
          user.id,
          tags
        );
        if (result.status === 201 || result.status === 200) {
          toast('Bookmark Added!', {
            onClose: () => {
              window.close();
            },
          });
        } else {
          errCallback();
        }
      } catch (err) {
        errCallback();
      }
    },
    [tab, bookmarkName, note, tags]
  );

  return (
    <div className="ext-main-container">
      <img
        src="https://raw.githubusercontent.com/Yoshi-s-Yodelers/BookItExtension/dev/public/main-transparent.png"
        width="60%"
        style={{ display: 'block', margin: '0 auto' }}
      />
      <form onSubmit={submitBookmark}>
        <label htmlFor="url">
          <b>Bookmark URL</b>
        </label>
        <input type="url" type="text" name="url" size="30" value={tab.url} />
        <label htmlFor="name">
          <b>Bookmark Name</b>
        </label>
        <input
          type="ntext"
          type="text"
          name="name"
          size="30"
          onChange={(e) => setBookmarkName(e.target.value)}
          value={bookmarkName}
        />
        <label htmlFor="note">
          <b>Add Bookmark Note</b>
        </label>
        <input
          type="ntext"
          type="text"
          name="note"
          size="30"
          onChange={(e) => setNote(e.target.value)}
          value={note}
        />
        <input type="hidden" id="tags" name="tags" value={tags} />
        <input type="hidden" id="userId" name="userId" value={user.id} />
        <label htmlFor="tagsetter">
          <b>Add Bookmark Tags</b>
        </label>
        <CreatableSelect
          id="tagsetter"
          className="select"
          isMulti
          onChange={handleChange}
          options={tagOptions}
        />
        <div>
          <input type="submit" value="Submit Bookmark" className="button" />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </form>
      <a href="https://book-it-web.herokuapp.com/" target="_blank">
        Go to BookIt Homepage!
      </a>
    </div>
  );
};
