const set = (key, value) => {
  localStorage[key] = JSON.stringify(value);
};

const get = (key) => (localStorage[key] ? JSON.parse(localStorage[key]) : null);

const remove = (key) => {
  localStorage.removeItem(key);
};

export { set, get, remove };
