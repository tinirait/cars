import styles from './BookInstruction.module.scss'
import money_icon from '../../images/money_icon.png'
import { ReactComponent as CalendarIcon } from '../../images/calendar_icon.svg'
import contacts_icon from '../../images/contacts_icon.png'
import done_icon from '../../images/done_icon.png'

function BookInstruction() {
  return (
    <div className={styles.BookInstruction}>
      <h2 className={styles.heading}>How to book an order?</h2>

      <div className={styles.instruction_points}>
        <p className={styles.instruction_point}>
          <img src={money_icon} alt="Price" className={styles.instruction_point_icon} />
          <span>
            Get your price using the <a href="#calculator" className={styles.calculatorLink}>calculator</a>
          </span>
        </p>

        <p className={styles.instruction_point}>
          <CalendarIcon width="30px" />

          Press "Book an order" button
        </p>

        <p className={styles.instruction_point}>
          <img src={contacts_icon} alt="Contacts" className={styles.instruction_point_icon} />
          Enter your contact details and push "Submit"
        </p>

        <p className={styles.instruction_point}>
          <img src={done_icon} alt="Done" className={styles.instruction_point_icon} />
          Done! Our managers will contact you within 24 hours
        </p>
      </div>
    </div>
  )
}

export default BookInstruction
