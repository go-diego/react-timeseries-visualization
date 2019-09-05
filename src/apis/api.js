export default function Timeseries() {
  function getTags() {
    const url = `${process.env.REACT_APP_API_HOST}/api/tag`;
    return fetch(url);
  }

  function getTagById(tagId) {
    const url = `${process.env.REACT_APP_API_HOST}/api/tag`;
    return fetch(url)
      .then(response => {
        if (!response.ok) return Promise.reject(response);

        return response.json();
      })
      .then(response => {
        return response.filter(item => item.tagId === tagId);
      })
      .catch(error => error.text());
  }

  function getDatapoints({ tagId, startTS, endTS }) {
    const url = `${process.env.REACT_APP_API_HOST}/api/datapoint/${tagId}?startTS=${startTS}&endTS=${endTS}`;
    return fetch(url);
  }

  return Object.freeze({
    getTags,
    getTagById,
    getDatapoints
  });
}
