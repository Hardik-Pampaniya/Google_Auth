import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function Signup() {
    const googleAuth = () => {
        window.open(
            `http://localhost:8080/google/callback`,
            "_self"
        );
    }
    
    return (
        <div className={styles.container}>
            <hl className={styles.heading}>Sign Up Form </hl>
            <div className={styles.form_container}>
                < div className={styles.left} >
                    < img className={styles.img} src="./images/signup.jpg" alt="signup" />
                </div>
                < div className={styles.right} >
                    <h2 className={styles.from_heading}>Create Account </h2>
                    <input type="text" className={styles.input} placeholder="Username" />
                    <input type="text" className={styles.input} placeholder="Email" />
                    <input type="password" className={styles.input} placeholder="Password" />
                    <button className={styles.btn}>SignUp</button>
                    <p className={styles.text}>or</p>
                    < button className={styles.google_btn} onClick={googleAuth}>
                        < img src="./images/google.png" alt="google icon" />
                        <span>Sign up with Google</span>
                    </button>
                    <p className={styles.text}>
                        Already Have an Account ? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup;




