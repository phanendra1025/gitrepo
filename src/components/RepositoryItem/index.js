// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {details} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = details
  return (
    <li className="repository-item">
      <div className="item-container">
        <img className="avatar-image" src={avatarUrl} alt={name} />
        <h1 className="name">{name}</h1>
        <div className="details-containers">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png "
            alt="stars"
            className="icons"
          />
          <p className="count">{starsCount} stars</p>
        </div>
        <div className="details-containers">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="icons"
          />
          <p className="count">{forksCount} forks</p>
        </div>
        <div className="details-containers">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="icons"
          />
          <p className="count">{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
