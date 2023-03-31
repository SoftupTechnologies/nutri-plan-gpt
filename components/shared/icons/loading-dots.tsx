import styles from "./loading-dots.module.css";

const LoadingDots = ({ color = "#000" }: { color?: string }) => {
  const customStyle={backgroundColor:color,width:15,height:15};
  return (
    <span style={{paddingLeft:2}} className={styles.loading}>
      <span style={customStyle} />
      <span style={customStyle} />
      <span style={customStyle} />
    </span>
  );
};

export default LoadingDots;
