import Head from 'next/head'
import styles from '../styles/Home.module.css'

import {useState} from 'react'

export default function Home() {

  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [text, setText] = useState<string>('I\'ve been loving you for so long, can you be my girlfriend?')
  const [time, setTime] = useState<number>(1)

  function usernameOnChange(e: React.ChangeEvent<HTMLInputElement>){
    setUsername(e.target.value)
  }

  function passwordOnChange(e: React.ChangeEvent<HTMLInputElement>){
    setPassword(e.target.value)
  }

  function textOnChange(e: React.ChangeEvent<HTMLTextAreaElement>){
    setText(e.target.value)
  }

  function timeOnChange(e: React.ChangeEvent<HTMLInputElement>){
    setTime(parseInt(e.target.value))
  }

  function handleSubmit(){
    fetch('/api/hello',{
      method: 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username:username,
        password:password,
        text:text,
        time:time,
      })
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>IG Direct Spammer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <label className="label">User name: </label>
          <input type='text' onChange={usernameOnChange}/>
          <label className="label">Password: </label>
          <input type='password' onChange={passwordOnChange}/>
          <label className="label">Text: </label>
          <textarea onChange={textOnChange}/>
          <label className="label">Time: </label>
          <input type='number' onChange={timeOnChange}/>
          <input type='submit' onClick={handleSubmit}/>
        </div>
      </main>
    </div>
  )
}
