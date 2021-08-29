const Button = ({ onClick }: { onClick: () => void }) => {
  return (
    <button type="button" onClick={onClick}>
      Load More
    </button>
  );
};

export default Button;
