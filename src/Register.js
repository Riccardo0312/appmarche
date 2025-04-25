import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect} from "react";
import{ faCheck, faInfoCircle, faTimes} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Register.css';
const UserReg = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const UserPassw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [passwd, setPasswd] = useState('');
    const [validPasswd, setValidPaswd] = useState(false);
    const [passwdFocus, setPasswdFocus] = useState(false);

    const [matchPasswd, setMatchPasswd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMessage, setErrMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() =>{
        userRef.current.focus();
    }, [])

    useEffect(() =>{
        const risultato = UserReg.test(user);
        console.log(risultato);
        console.log(user);
        setValidName(risultato);
    }, [user])

    useEffect(() =>{
        const risultato = UserPassw.test(passwd);
        console.log(risultato);
        console.log(passwd);
        setValidPaswd(risultato);
        const match = passwd === matchPasswd;
        setValidMatch(match);
    }, [passwd, matchPasswd])

    useEffect(() =>{
       setErrMessage('');
    }, [user, passwd, matchPasswd])

    const gestisciInvio = async (e) => {
        e.preventDefault();
        const c1 = UserReg.test(user);
        const c2 = UserPassw.test(passwd);
        if(!c1 || !c2){
            setErrMessage("Accesso non consentito");
            return;
        }
        
        const utente = {
            username: user,
            password: passwd
        };
        localStorage.setItem("utenteRegistrato", JSON.stringify(utente));

        console.log(user, passwd);
        setSuccess(true);
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    }
    
    return (
        <>
        { success ? (
            <section>
                <h1>Registrazione effettuata con successo!</h1>
                <p>
                 <Link to="/login">Accedi.</Link>
                </p>
            </section>
        ) : (
        <section>
            <p ref={errRef} className= {errMessage ? "errmsg": 
            "offscreen"} aria-live="assertive">{errMessage}</p>
            <h1>Registrazione</h1>
            <form onSubmit={gestisciInvio}>
                <label htmlFor="username"> 
                    Username: 
                    <span className={validName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={!validName && userFocus ? "invalid" : "hide"}>
                    <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>
                <input
                    type = "text"
                    id = "username"
                    ref = {userRef} 
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid = {validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={()=> setUserFocus(true)}
                    onBlur={()=> setUserFocus(false)}
                />
                <p id ="uidnote"className={ userFocus && user && 
                    !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    Da 4 a 24 lettere. <br/>
                    Deve iniziare con una lettera. <br/>
                    Sono concesse lettere, numeri, underscores, trattini. <br/>
                </p>

                <label htmlFor="password">
                    Password:
                    <span className={validPasswd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={!validPasswd && passwdFocus ? "invalid" : "hide"}>
                    <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>
                <input
                      type = "password"
                      id = "password"
                      onChange={(e) => setPasswd(e.target.value)}
                      required
                      aria-invalid = {validPasswd ? "false" : "true"}
                      aria-describedby="pwdnote"
                      onFocus={()=> setPasswdFocus(true)}
                      onBlur={()=> setPasswdFocus(false)}
                />
                <p id ="pwdnote"className={ passwdFocus && passwd && 
                    !validPasswd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    Da 8 a 24 lettere. <br/>
                    Devono essere inculse delle lettere maiuscole e minuscole, numeri e un carattere speciale. <br/> 
                </p>

                <label htmlFor="conferma_pass">
                    Conferma password:
                    <span className={validMatch &&  matchPasswd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={!validMatch && matchFocus ? "invalid" : "hide"}>
                    <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>
                <input
                    type="password"
                    id="conferma_pass"
                    onChange={(e) => setMatchPasswd(e.target.value)}
                    required
                    aria-invalid = {validMatch ? "false" : "true"}
                    aria-describedby="confermanote"
                    onFocus={()=> setMatchFocus(true)}
                    onBlur={()=> setMatchFocus(false)}
                />
                <p id="confermanote" className={matchFocus && !validMatch ? 
                "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon ={faInfoCircle}/>
                    Le due password devono corrispondere.
                </p>
                <button disabled={!validName || !validPasswd || !validMatch ?true : false}>
                    Registrati!
                </button>
            </form>
            <p>
                Hai già effettuato la registrazione? <br/>
                <span className="line">
                    <Link to="/login">Log in.</Link>
                </span>
            </p>
        </section>
        )}
        </>
    )
}

export default  Register;