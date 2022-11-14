const clearCacheData=() => {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
    window.localStorage.clear()
    window.sessionStorage.clear()
    window.location.reload();
  };
  export default clearCacheData;