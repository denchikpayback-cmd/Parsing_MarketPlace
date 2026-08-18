function Logout(){
    return(
        <div>
            <form>
                <h1>Форма входа в аккаунт</h1>
                <input type="email" placeholder="Введите email:" onChange={(e) => {setEmail(e.target.value)}}></input>
                <input type="password" placeholder="Введите password:" onChange={(e) => {setPassword(e.target.value)}}></input>
                <button type="button" onClick={request}>Зарегестрироваться</button>
                <p onClick={Direct}>Создать аккаунт</p>
                <p>{flag}</p>
            </form>
        </div>
    )
}