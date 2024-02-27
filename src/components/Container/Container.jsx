import s from "./Container.module.scss";

const Container = ({ children }) => (
  <div className={s.container}>{children}</div>
);

export default Container;
