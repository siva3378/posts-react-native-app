import { decorate, observable, action, flow, computed } from "mobx"
import { PostApi } from '../apis';
import { POSTS } from '../config';

class _PostStore {
  // premitive observables
  callInProgress = false;
  page = 0;
  totalPosts = 0;
  editId = null;
  // object and array observables
  _posts = [];
  aPostFormData;

  constructor() {
    this.clearFormData();
  }

  get posts() {
    return this._posts.toJSON();
  }

  get hasMoreData() {
    return this._posts.length < this.totalPosts;
  }

  get newPostData() {
    return this.aPostFormData;
  }

  clearFormData = () => {
    this.aPostFormData = {
      isValid: false,
      content: "",
    }
    this.editId = null;
  }

  validate = () => {
    this.aPostFormData.isTouched = true;
    if (this.aPostFormData.content) {
      this.aPostFormData.isValid = true;
    } else {
      this.aPostFormData.isValid = false;
    }
  }

  onContentChange = (txt) => {
    this.aPostFormData.content = txt;
    this.validate();
  }

  editPost = (item) => {
    this.clearFormData()
    this.editId = item.id;
    this.aPostFormData = Object.assign(this.aPostFormData, item);
  }

  updateCount = flow(function* () {
    const totalPosts = yield PostApi.count();
    this.totalPosts = totalPosts.count;
  });

  deletePost = flow(function* (item) {
    this.callInProgress = 'Deleting a post...';
    try {
      yield PostApi.delete(item.id);
      this._posts.remove(item);
      this.updateCount();
    } catch (error) {
      console.error(error);
    } finally {
      this.callInProgress = '';
    }
  });

  updatePost = flow(function* (id, content) {
    this.callInProgress = 'Updating a the post...';
    try {
      const updatedData = yield PostApi.update(id, { content });
      const anItem = this._posts.find((i) => i.id === id);
      anItem.content = updatedData.content;
      this.clearFormData();
    } catch (error) {
      console.error(error);
    } finally {
      this.callInProgress = '';
    }
  });

  addPost = flow(function* (content) {
    this.callInProgress = 'Adding a new post...';
    try {
      const createdData = yield PostApi.add(content);
      this._posts.unshift(createdData);
      this.updateCount();
      this.clearFormData();
    } catch (error) {
      console.error(error);
    } finally {
      this.callInProgress = '';
    }
  });

  addOrUpdate = (id, content) => {
    this.validate();
    if (this.aPostFormData.isValid) {
      if (id) {
        this.updatePost(id, content);
      } else {
        this.addPost(content);
      }
    }
  };

  loadData = flow(function* () {
    // restrict from making multiple calls by infinite scroll component
    if (!this.callInProgress) {
      this.callInProgress = 'Loading data...';
      try {
        // load the data
        const postList = yield PostApi.load(this.page);

        // update the data in store
        this.page += POSTS.LIMIT;
        this._posts = this._posts.concat(postList);

        this.updateCount();

      } catch (error) {
        console.error(error);
      } finally {
        this.callInProgress = '';
      }
    }
  })
}

decorate(_PostStore, {
  editId: observable,
  callInProgress: observable,
  totalPosts: observable,
  page: observable,
  aPostFormData: observable,

  _posts: observable,

  hasMoreData: computed,
  // actions
  loadData: action.bound,
  addOrUpdate: action.bound,
  editPost: action.bound,
  deletePost: action.bound,
  onContentChange: action.bound
})

export default new _PostStore();