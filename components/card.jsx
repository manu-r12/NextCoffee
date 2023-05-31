import Image from "next/image";
import Link from "next/link";
import styles from "./Card.module.css"
import cls from 'classnames'
const Card = (props) =>{

    return( 
        <Link className={styles.cardLink} href={props.href}>
    <div className={cls("glass", styles.container)}>
         <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{props.name}</h2>
          </div>
        <div className={styles.ardHeaderWrapper}>
           <Image alt={props.alt} className={styles.cardImage} src={props.imgUrl} width={260} height={160}/>
        </div>
    </div>
        </Link>
    )
}
export default Card;


