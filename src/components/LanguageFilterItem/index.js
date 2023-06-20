// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {isActive, filterItemDetails, changeTheActiveFilterItem} = props
  const {id, language} = filterItemDetails
  const buttonClassName = isActive
    ? 'active-language-button'
    : 'language-button'

  const changeActiveId = () => {
    changeTheActiveFilterItem(id)
  }

  return (
    <li className="language-filter-item">
      <button
        type="button"
        onClick={changeActiveId}
        className={buttonClassName}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
