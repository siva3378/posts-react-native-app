export class RestHelper {

  getHeaders = (extraHeaders = {}) => {
    const headers = {
      // default headers
      'Content-Type': 'application/json',
      // add extra headers
      ...extraHeaders
    }
    return headers;
  }

  getResponseBody = async (response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to read data', response);
    }
  }

  _fetch = async (url, options) => {
    try {
      // make api call
      const response = await fetch(url, options);

      // check the status and get the response body
      const responseBody = await this.getResponseBody(response);

      // return only the response body
      return responseBody;

    } catch (error) {
      console.error('REST Api call failed', url, options, error);
    }
  }

  get = async (uri, filterParams) => {
    const options = {
      method: 'GET',
      headers: this.getHeaders()
    };

    let urlWithFilter = uri;
    if (filterParams) {
      const filter = JSON.stringify(filterParams);
      urlWithFilter = `${uri}?filter=${encodeURIComponent(filter)}`
    }

    return this._fetch(urlWithFilter, options);
  }

  post = async (uri, requestBody = {}) => this._fetch(uri, {
    method: 'POST',
    headers: this.getHeaders(),
    body: JSON.stringify(requestBody),
  });

  patch = async (uri, id, requestBody = {}) => this._fetch(`${uri}/${id}`, {
    method: 'PATCH',
    headers: this.getHeaders(),
    body: JSON.stringify(requestBody),
  });

  del = async (uri, id) => this._fetch(`${uri}/${id}`, {
    method: 'DELETE',
    headers: this.getHeaders(),
  });

}

// single instance pattern
const _RestHelper = new RestHelper();
export default _RestHelper;