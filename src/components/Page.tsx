import Main from 'components/Main'
import Side from 'components/Side'
import logo from './icons/logo_80.png'

import './Page.css'

const Page: React.FC = () => (
  <div className="Page">
    <header>
      <img src={logo} alt="Logo" />
    </header>
    <div className="Page__content">
      <Side />
      <Main />
    </div>
  </div>
)

export default Page
