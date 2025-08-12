import styles from './App.module.scss'

import Header from './components/Header'
import Promo from './components/Promo'
import BookInstruction from './components/BookInstruction'
import WhyUs from './components/WhyUs/WhyUs'
import HowItWorks from './components/HowItWorks/HowItWorks'
import Stats from './components/Stats/Stats'
import Footer from './components/Footer'

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Promo />
      <WhyUs />
      <HowItWorks />
      <Stats />
      <BookInstruction />
      <Footer />
    </div>
  )
}

export default App
