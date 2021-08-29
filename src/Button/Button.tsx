import css from "./Button.module.css";

const Button = ({ onClick }: { onClick: () => void }) => {
  return (
    <button type="button" onClick={onClick} className={css.Button}>
      Load More
    </button>
  );
};

export default Button;
