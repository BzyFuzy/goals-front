const Loading = ({ isLoading, children }) => {
  return isLoading ? <div>Loading </div> : children;
};

export default Loading;
