const useIsLoading = (bool: boolean) => {
  localStorage.setItem('isLoading', JSON.stringify(bool))
  window.dispatchEvent(new Event("storage"))
}

export default useIsLoading;