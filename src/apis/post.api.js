import { POSTS } from '../config';
import rest from './rest';

class _PostApi {

  count = async () => {
    return rest.get(`${POSTS.endpoint}/count`);
  }

  load = async (skip) => {
    return rest.get(POSTS.endpoint, {
      limit: POSTS.LIMIT,
      skip,
      order: 'id DESC'
    })
  }

  add = async (content) => {
    return rest.post(POSTS.endpoint, { content });
  }

  update = async (id, aPost) => {
    return rest.patch(POSTS.endpoint, id, aPost);
  }

  delete = async (id) => {
    return rest.del(POSTS.endpoint, id);
  }
}

export default new _PostApi();