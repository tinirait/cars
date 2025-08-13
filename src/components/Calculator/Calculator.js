import { useState } from 'react'
import styles from './Calculator.module.scss'
import ContactsScreen from './ContactsScreen'
import DoneScreen from './DoneScreen'
import RouteMap from '../RouteMap'
import { getCalculation, getCities, getCarMakes, getCarModels, createOrderRequest } from './functions'
import Select from 'react-select'

function Calculator() {
  const [activeScreen, setActiveScreen] = useState('quote')

  const [calculationId, setCalculationId] = useState(null)
  const [price, setPrice] = useState(null)

  const [citiesFrom, setCitiesFrom] = useState([])
  const [citiesTo, setCitiesTo] = useState([])

  const years = []
  for (let i = new Date().getFullYear() + 1; i >= 1900; i--) {
    years.push({ value: String(i), label: String(i) })
  }

  const [makes, setMakes] = useState([])
  const [models, setModels] = useState([])

  const [readyToRequestCities, setReadyToRequestCities] = useState(true)
  const [priceIsLoading, setPriceIsLoading] = useState(false)

  const [selectedCityFrom, setSelectedCityFrom] = useState(null)
  const [selectedCityTo, setSelectedCityTo] = useState(null)
  const [selectedYear, setSelectedYear] = useState(null)
  const [selectedMake, setSelectedMake] = useState(null)
  const [selectedModel, setSelectedModel] = useState(null)
  const [selectedTrailerType, setSelectedTrailerType] = useState('open')
  const [selectedOperability, setSelectedOperability] = useState('running')
  const [selectedShippingDateOption, setSelectedShippingDateOption] = useState('asap')
  const [selectedShippingDate, setSelectedShippingDate] = useState(getDateYYYY_MM_DD(0))
  const [userEmail, setUserEmail] = useState('')
  const [userPhone, setUserPhone] = useState('')

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      borderColor: state.isFocused || state.menuIsOpen ? 'rgba(248, 199, 35, 0.75)' : 'var(--glass-border)',
      minHeight: 44,
      borderRadius: 12,
      boxShadow: 'none',
      '&:hover': { borderColor: 'rgba(248, 199, 35, 0.9)' }
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: 'var(--surface)',
      border: '1px solid var(--glass-border)',
      borderRadius: 12,
      overflow: 'hidden',
      marginTop: 8,
      boxShadow: '0 14px 38px rgba(0, 0, 0, 0.35)',
      zIndex: 9999
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    option: (base, state) => ({
      ...base,
      background: (state.isFocused || state.isSelected)
        ? 'linear-gradient(135deg, var(--accent), var(--accent-2))'
        : 'transparent',
      color: (state.isFocused || state.isSelected) ? '#0b0c10' : 'var(--text)',
      fontWeight: (state.isFocused || state.isSelected) ? 800 : 700,
      padding: 10,
      cursor: 'pointer'
    }),
    singleValue: (base) => ({ ...base, color: 'var(--text)', fontWeight: 700 }),
    placeholder: (base) => ({ ...base, color: 'var(--muted)', fontWeight: 600 }),
    input: (base) => ({ ...base, color: 'var(--text)' }),
    valueContainer: (base) => ({ ...base, padding: '0 8px' }),
    indicatorsContainer: (base) => ({ ...base, color: 'var(--muted)' }),
    dropdownIndicator: (base) => ({ ...base, color: 'var(--muted)' }),
    indicatorSeparator: () => ({ display: 'none' }),
    menuList: (base) => ({ ...base, padding: 0 })
  }

  const selectTheme = theme => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary: 'var(--accent)',
      primary25: 'rgba(248, 199, 35, 0.18)',
      primary50: 'rgba(248, 199, 35, 0.28)',
      neutral0: 'var(--surface)',
      neutral5: 'var(--surface)',
      neutral10: 'rgba(255, 255, 255, 0.08)',
      neutral20: 'var(--glass-border)',
      neutral30: 'rgba(248, 199, 35, 0.6)',
      neutral40: 'var(--muted)',
      neutral50: 'var(--muted)',
      neutral60: 'var(--text)',
      neutral70: 'var(--text)',
      neutral80: 'var(--text)'
    }
  })

  function getDateYYYY_MM_DD(daysAdded = 0) {
    const laterDate = new Date()
    laterDate.setDate(laterDate.getDate() + daysAdded)

    return laterDate.toISOString().split('T')[0]
  }

  function consistsOfLetters(str) {
    return str.split('').every(symbol => 'abcdefghijklmnopqrstuvwxyz '.includes(symbol.toLowerCase()))
  }

  function consistsOfDigits(str) {
    return str.split('').every(symbol => '1234567890'.includes(symbol))
  }

  async function createOrder() {
    await createOrderRequest(
      selectedCityFrom.value,
      selectedCityTo.value,
      selectedYear.value,
      selectedMake.value,
      selectedModel.value,
      selectedTrailerType,
      selectedOperability,
      selectedShippingDate,
      calculationId,
      userEmail,
      userPhone,
      price
    )

    setActiveScreen('done')
    setCalculationId(null)
    setPrice(null)

    setCitiesFrom([])
    setCitiesTo([])

    setMakes([])
    setModels([])

    setSelectedCityFrom(null)
    setSelectedCityTo(null)
    setSelectedYear(null)
    setSelectedMake(null)
    setSelectedModel(null)
    setSelectedTrailerType('open')
    setSelectedOperability('running')
    setSelectedShippingDateOption('asap')
    setSelectedShippingDate(getDateYYYY_MM_DD(0))
    setUserEmail('')
    setUserPhone('')
  }

  if (activeScreen === 'contacts') {
    return (
      <ContactsScreen
        setActiveScreen={setActiveScreen}
        userEmail={userEmail}
        setUserEmail={setUserEmail}
        userPhone={userPhone}
        setUserPhone={setUserPhone}
        consistsOfDigits={consistsOfDigits}
        createOrder={createOrder}
      />
    )
  }

  if (activeScreen === 'done') {
    return (
      <DoneScreen
        setActiveScreen={setActiveScreen}
      />
    )
  }

  return (
    <div className={styles.Calculator}>
      <h2 className={styles.heading}>Get instant quote</h2>

      <div className={styles.cities}>
        <Select
          className={styles.select}
          classNamePrefix="rs"
          styles={selectStyles}
          theme={selectTheme}
          menuPortalTarget={document.body}
          menuPosition="fixed"
          menuPlacement="auto"
          options={citiesFrom}
          onInputChange={shard => {
            if (!readyToRequestCities) return

            let shardType
            if (consistsOfLetters(shard)) {
              shardType = 'city'
            } else if (consistsOfDigits(shard)) {
              shardType = 'zip'
            } else {
              return
            }

            if (shard.length < 3) return
            if (shardType === 'zip' && shard.length !== 5) return

            getCities(shard, shardType)
              .then(cities => {
                const citiesOptions = cities.map(city => ({ label: city.fullName, value: city }))

                setCitiesFrom(citiesOptions)
              })

            setReadyToRequestCities(false)
            setTimeout(() => setReadyToRequestCities(true), 2000)
          }}
          onChange={option => {
            setSelectedCityFrom(option)
            setPrice(null)
            setCalculationId(null)
          }}
          placeholder="Departure city or zip"
        />

        <Select
          className={styles.select}
          classNamePrefix="rs"
          styles={selectStyles}
          theme={selectTheme}
          menuPortalTarget={document.body}
          menuPosition="fixed"
          menuPlacement="auto"
          options={citiesTo}
          onInputChange={shard => {
            if (!readyToRequestCities) return

            let shardType
            if (consistsOfLetters(shard)) {
              shardType = 'city'
            } else if (consistsOfDigits(shard)) {
              shardType = 'zip'
            } else {
              return
            }

            if (shard.length < 3) return
            if (shardType === 'zip' && shard.length !== 5) return

            getCities(shard, shardType)
              .then(cities => {
                const citiesOptions = cities.map(city => ({ label: city.fullName, value: city }))

                setCitiesTo(citiesOptions)
              })

            setReadyToRequestCities(false)
            setTimeout(() => setReadyToRequestCities(true), 2000)
          }}
          onChange={option => {
            setSelectedCityTo(option)
            setPrice(null)
            setCalculationId(null)
          }}
          placeholder="Destination city or zip"
        />
      </div>

      <div className={styles.car_details}>
        <Select
          className={styles.select}
          classNamePrefix="rs"
          styles={selectStyles}
          theme={selectTheme}
          menuPortalTarget={document.body}
          menuPosition="fixed"
          menuPlacement="auto"
          options={years}
          value={selectedYear}
          onChange={async option => {
            const makes = await getCarMakes(option.value)
            const makesOptions = makes.map(make => ({ label: make, value: make }))

            setMakes(makesOptions)
            setModels([])

            setSelectedYear(option)
            setSelectedMake(null)
            setSelectedModel(null)
            setPrice(null)
            setCalculationId(null)
          }}
          placeholder="Car year"
        />

        <Select
          className={styles.select}
          classNamePrefix="rs"
          styles={selectStyles}
          theme={selectTheme}
          menuPortalTarget={document.body}
          menuPosition="fixed"
          menuPlacement="auto"
          options={makes}
          value={selectedMake}
          onChange={async option => {
            const models = await getCarModels(selectedYear.value, option.value)
            const modelsOptions = models.map(model => ({ label: model, value: model }))

            setModels(modelsOptions)
            setSelectedMake(option)
            setSelectedModel(null)
            setPrice(null)
            setCalculationId(null)
          }}
          placeholder="Car make"
          isDisabled={makes.length === 0}
        />

        <Select
          className={styles.select}
          classNamePrefix="rs"
          styles={selectStyles}
          theme={selectTheme}
          menuPortalTarget={document.body}
          menuPosition="fixed"
          menuPlacement="auto"
          options={models}
          value={selectedModel}
          onChange={option => {
            setSelectedModel(option)
            setPrice(null)
            setCalculationId(null)
          }}
          placeholder="Car model"
          isDisabled={models.length === 0}
        />
      </div>

      <div className={styles.transportation_details}>
        <div>
          Select trailer type:

          <div className={styles.transportation_details__options}>
            <label className={styles.transportation_details__option}>
              <input
                type="radio"
                checked={selectedTrailerType === 'open'}
                onChange={() => {
                  setSelectedTrailerType('open')
                  setPrice(null)
                  setCalculationId(null)
                }}
              />
              Open
            </label>

            <label className={styles.transportation_details__option}>
              <input
                type="radio"
                checked={selectedTrailerType === 'enclosed'}
                onChange={() => {
                  setSelectedTrailerType('enclosed')
                  setPrice(null)
                  setCalculationId(null)
                }}
              />
              Enclosed
            </label>
          </div>
        </div>

        <div>
          Is the car operable?:

          <div className={styles.transportation_details__options}>
            <label className={styles.transportation_details__option}>
              <input
                type="radio"
                checked={selectedOperability === 'running'}
                onChange={() => {
                  setSelectedOperability('running')
                  setPrice(null)
                  setCalculationId(null)
                }}
              />
              Yes
            </label>

            <label className={styles.transportation_details__option}>
              <input
                type="radio"
                checked={selectedOperability === 'nonrunning'}
                onChange={() => {
                  setSelectedOperability('nonrunning')
                  setPrice(null)
                  setCalculationId(null)
                }}
              />
              No
            </label>
          </div>
        </div>
      </div>

      <div className={styles.shippingDate}>
        <div>
          Select preferred shipping date:

          <div className={styles.shippingDate__options}>
            <label className={styles.shippingDate__option}>
              <input
                type="radio"
                checked={selectedShippingDateOption === 'asap'}
                onChange={() => {
                  setSelectedShippingDateOption('asap')
                  setSelectedShippingDate(getDateYYYY_MM_DD(0))
                  setPrice(null)
                  setCalculationId(null)
                }}
              />
              As soon as possible
            </label>

            <label className={styles.shippingDate__option}>
              <input
                type="radio"
                checked={selectedShippingDateOption === 'week'}
                onChange={() => {
                  setSelectedShippingDateOption('week')
                  setSelectedShippingDate(getDateYYYY_MM_DD(7))
                  setPrice(null)
                  setCalculationId(null)
                }}
              />
              In 1 week
            </label>

            <label className={styles.shippingDate__option}>
              <input
                type="radio"
                checked={selectedShippingDateOption === 'month'}
                onChange={() => {
                  setSelectedShippingDateOption('month')
                  setSelectedShippingDate(getDateYYYY_MM_DD(30))
                  setPrice(null)
                  setCalculationId(null)
                }}
              />
              In 30 days
            </label>

            <label className={styles.shippingDate__option}>
              <input
                type="radio"
                checked={selectedShippingDateOption === 'other'}
                onChange={() => {
                  setSelectedShippingDateOption('other')
                  setPrice(null)
                  setCalculationId(null)
                }}
              />
              Other
            </label>
          </div>
        </div>

        {selectedShippingDateOption === 'other' && (
          <div className={styles.shippingDate__calendar_wrapper}>
            <input
              className={styles.shippingDate_calendar}
              type="date"
              min={getDateYYYY_MM_DD()}
              value={selectedShippingDate}
              onChange={e => {
                const suggestedYear = +e.target.value.split('-')[0]
                const currentYear = +getDateYYYY_MM_DD().split('-')[0]

                if (![currentYear, currentYear + 1].includes(suggestedYear)) return

                setSelectedShippingDate(e.target.value)
              }}
            />
          </div>
        )}
      </div>

      <div className={styles.calculatePrice}>
        {calculationId === null
          ? (
            <button
              className={styles.calculatePrice__calculate_button}
              disabled={
                [selectedCityFrom, selectedCityTo, selectedYear, selectedMake, selectedModel].includes(null)
                || price !== null
                || priceIsLoading
              }
              onClick={async () => {
                setPriceIsLoading(true)

                const calculation = await getCalculation(
                  selectedCityFrom.value,
                  selectedCityTo.value,
                  selectedYear.value,
                  selectedMake.value,
                  selectedModel.value,
                  selectedTrailerType,
                  selectedOperability,
                  selectedShippingDate
                )

                setPriceIsLoading(false)

                setCalculationId(calculation.id)
                setPrice(calculation.price)
              }}
            >
              CALCULATE PRICE
            </button>
          ) : (
            <button
              className={styles.calculatePrice__calculate_button}
              onClick={() => setActiveScreen('contacts')}
            >
              Book an order
            </button>
          )
        }
      </div>

      <div className={styles.price}>
        {priceIsLoading && (
          <div className={styles.price_loading}>
            <div className={styles.loading_spinner}></div>
            <span>Calculating your price...</span>
          </div>
        )}

        {price !== null && (
          <div className={styles.price_display}>
            <div className={styles.price_regular}>
              <span className={styles.price_label}>Regular price:</span>
              <span className={styles.price_value}>${Math.floor(price)}</span>
            </div>
            <div className={styles.price_discounted}>
              <span className={styles.price_label}>Discounted cash price:</span>
              <span className={styles.price_value}>${Math.floor(price * 0.95)}</span>
              <span className={styles.discount_badge}>Save 5%</span>
            </div>
          </div>
        )}

        {!priceIsLoading && price === null && (
          <div className={styles.price_placeholder}>
            <div className={styles.placeholder_icon}>💰</div>
            <div className={styles.placeholder_text}>
              <span className={styles.placeholder_title}>Get Your Quote</span>
              <span className={styles.placeholder_subtitle}>
                Fill in the details above and click "CALCULATE PRICE" to see your instant quote
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Route Map */}
      {selectedCityFrom && selectedCityTo && (
        <div className={styles.route_map_section}>
          <h3 className={styles.route_map_heading}>Your Route</h3>
          <RouteMap
            fromCity={selectedCityFrom.label}
            toCity={selectedCityTo.label}
          />
        </div>
      )}
    </div>
  )
}

export default Calculator
