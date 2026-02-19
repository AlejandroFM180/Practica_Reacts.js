import{ useState } from 'react'

export function TwitterFollowCard({userName, name, InicialisFollowing}) {
     const [isFollowingState, setIsFollowingState] = useState(InicialisFollowing)


    const text = isFollowingState ? 'Siguiendo' : 'Seguir'
   
    const buttonClass = isFollowingState 
    ? 'TW-follower-card-button is-following' : 
    'TW-follower-card-button'

    const addAt = (userName) => `@${userName}`

    const handleClick = () => {
        setIsFollowingState(!isFollowingState)
    }

    return (
         <article className="TW-follower-card"> 
        <header className="TW-follower-card-header">
            <img 
            className="TW-follower-card-imagen"
             src='https://pbs.twimg.com/profile_images/1823479821504065536/3GM1Xngy_400x400.jpg' alt={`${name}'s profile picture`} />

           
           
            <div className="TW-follower-card-info">
                <strong className="TW-follower-card-info-name">{name}</strong>
                <samp className="TW-follower-card-info-Username">{addAt(userName)}</samp>
            </div>

        </header>


        <aside>
            <button className={buttonClass} onClick={handleClick}>
                
                 <span className='TW-follower-card-text'>{text}</span>
                <span className='TW-follower-card-stopfollow'>Dejar de seguir</span>
            </button>
        </aside>

    </article>
    )
}

//            
