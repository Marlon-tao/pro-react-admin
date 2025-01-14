import React from 'react'
import styles from './index.module.less'
const AvatarCard = ({ avatar, text }) => {
  return (
    <div className={styles.avatarCard}>
      <div className={styles.card}>
        <figure>
          <img alt="" src={avatar} className={styles.avatar} />
        </figure>
        <p className={styles.content}>{text}</p>
      </div>
    </div>
  )
}

export default AvatarCard
