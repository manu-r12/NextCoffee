import styles from './Banner.module.css'
import ScreenSearchDesktopOutlinedIcon from '@mui/icons-material/ScreenSearchDesktopOutlined';

const Banner = (props) =>{
return(
    <div className={styles.container}>
    <h1 className={styles.title}>Next<span className={styles.title2}>Coffe</span></h1>
    <p className={styles.subTitle}>Discover your daily Java nearby</p>
    <button onClick={props.handleOnClick} className={styles.button}><ScreenSearchDesktopOutlinedIcon/>{props.ButtonText}</button>
    </div>
    
    )



}



export default Banner;