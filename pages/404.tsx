import React, { FC } from 'react';
import style from '../styles/Home.module.css'


const  Page:FC=()=>{

return (
    <div className='container'>
        <article className={style.page404}>
        <h1 >Site is Under maintanence</h1>
        <a href='/blog'>Click to navigate to blog</a>
        </article>

    </div>
)

}

export default Page